import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import {
  contactDetails,
  defaultRoleVariant,
  educationEntries,
  experiences,
  keyProjects,
  navItems,
  personalDetails,
  profileName,
  profileTitle,
  roleVariantProfiles,
  selectedAchievementsByVariant,
  skillGroups,
  socialLinks,
  statsStrip,
  type RoleVariant,
} from '@/data/cvData';
import { ProfileSidebar } from '@/components/cv/ProfileSidebar';
import { MainSections } from '@/components/cv/MainSections';
import { trackCtaClick } from '@/lib/analytics';
import { cn } from '@/lib/utils';

type JsPdfInstance = {
  internal: {
    pageSize: {
      getWidth: () => number;
      getHeight: () => number;
    };
  };
  setFont: (fontName: string, fontStyle?: 'normal' | 'bold' | 'italic' | 'bolditalic') => void;
  setFontSize: (fontSize: number) => void;
  text: (text: string | string[], x: number, y: number) => void;
  splitTextToSize: (text: string, size: number) => string[];
  addPage: () => void;
  save: (filename: string) => void;
};

type JsPdfConstructor = new (orientation: string, unit: string, format: string) => JsPdfInstance;

export default function CV() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [activeVariant, setActiveVariant] = useState<RoleVariant>(defaultRoleVariant);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const baseUrl = import.meta.env.BASE_URL;

  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = `${baseUrl}Yeasin_Arafat_CV.pdf`;
    link.download = 'Yeasin_Arafat_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPdf = () => {
    trackCtaClick({ action: 'download_prebuilt_pdf', location: 'sidebar', variant: activeVariant });
    downloadPDF();
  };

  const generatePDF = async () => {
    if (isGeneratingPdf) return;

    setIsGeneratingPdf(true);

    try {
      const jsPdfModule = await import('jspdf');
      const jsPdfSource = jsPdfModule as { jsPDF?: JsPdfConstructor; default?: JsPdfConstructor };
      const JsPdf = jsPdfSource.jsPDF ?? jsPdfSource.default;
      if (!JsPdf) {
        throw new Error('Unable to load jsPDF constructor');
      }

      const pdf = new JsPdf('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 14;
      const contentWidth = pdfWidth - margin * 2;
      const lineHeight = 5;
      const variantProfile = roleVariantProfiles[activeVariant];
      const selectedAchievements = selectedAchievementsByVariant[activeVariant];
      const featuredProjects = keyProjects.filter((project) => project.focus.includes(activeVariant)).slice(0, 2);
      const linkedInProfile = socialLinks.find((link) => link.icon === 'linkedin')?.href ?? '';

      let y = margin;

      const ensureSpace = (requiredHeight = lineHeight) => {
        if (y + requiredHeight > pdfHeight - margin) {
          pdf.addPage();
          y = margin;
        }
      };

      const writeTitle = (text: string) => {
        ensureSpace(8);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(18);
        pdf.text(text, margin, y);
        y += 8;
      };

      const writeSubTitle = (text: string) => {
        ensureSpace(6);
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(12);
        pdf.text(text, margin, y);
        y += 6;
      };

      const writeSection = (title: string) => {
        ensureSpace(8);
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(13);
        pdf.text(title, margin, y);
        y += 6;
      };

      const writeParagraph = (text: string) => {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10.5);
        const lines = pdf.splitTextToSize(text, contentWidth);
        lines.forEach((line) => {
          ensureSpace(lineHeight);
          pdf.text(line, margin, y);
          y += lineHeight;
        });
        y += 1.5;
      };

      const writeBullets = (items: string[]) => {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10.5);
        items.forEach((item) => {
          const lines = pdf.splitTextToSize(`- ${item}`, contentWidth);
          lines.forEach((line) => {
            ensureSpace(lineHeight);
            pdf.text(line, margin, y);
            y += lineHeight;
          });
        });
        y += 1.5;
      };

      writeTitle(profileName);
      writeSubTitle(`${profileTitle} | Recruiter view: ${activeVariant.toUpperCase()}`);
      writeParagraph(`Contact: ${contactDetails.email} | ${contactDetails.phone} | ${contactDetails.location}`);
      if (linkedInProfile) {
        writeParagraph(`LinkedIn: ${linkedInProfile}`);
      }
      writeParagraph(variantProfile.valueStatement);

      writeSection('Selected Achievements');
      writeBullets(selectedAchievements.map((achievement) => `${achievement.title}: ${achievement.detail}`));

      writeSection('Stats');
      writeParagraph(statsStrip.map((stat) => `${stat.value} ${stat.label}`).join(' | '));

      writeSection('About');
      writeParagraph(variantProfile.aboutSummary);

      writeSection('Core Stack');
      writeParagraph(variantProfile.coreStack.join(', '));

      writeSection('Key Projects');
      featuredProjects.forEach((project) => {
        writeParagraph(`${project.title} (${project.period})`);
        writeParagraph(`Problem: ${project.problem}`);
        writeParagraph(`Solution: ${project.solution}`);
        writeParagraph(`Impact: ${project.impact}`);
        writeParagraph(`Tech: ${project.tech.join(', ')}`);
      });

      writeSection('Experience');
      experiences.forEach((experience) => {
        writeParagraph(`${experience.role} | ${experience.company} | ${experience.period}`);
        writeBullets(experience.bullets);
      });

      writeSection('Skills');
      skillGroups.forEach((skillGroup) => {
        writeParagraph(`${skillGroup.label}: ${skillGroup.items.join(', ')}`);
      });

      writeSection('Education');
      educationEntries.forEach((entry) => {
        writeParagraph(`${entry.degree} | ${entry.institution} | ${entry.period}`);
        writeParagraph(entry.details);
      });

      writeSection('Personal Details');
      personalDetails.forEach((detail) => {
        writeParagraph(`${detail.label}: ${detail.value}`);
      });

      trackCtaClick({ action: 'generate_ats_pdf', location: 'sidebar', variant: activeVariant });
      pdf.save(`Yeasin_Arafat_CV_ATS_${activeVariant.toUpperCase()}.pdf`);
    } catch (error) {
      console.error('Error generating ATS PDF:', error);
      alert('Error generating ATS PDF. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleVariantChange = (variant: RoleVariant) => {
    setActiveVariant(variant);
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
    }
  };

  useEffect(() => {
    const sectionElements = navItems
      .map((navItem) => document.getElementById(navItem.href.replace('#', '')))
      .filter((section): section is HTMLElement => section !== null);

    if (!sectionElements.length) {
      return;
    }

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visibleEntries[0]) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-35% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    sectionElements.forEach((sectionElement) => sectionObserver.observe(sectionElement));

    return () => {
      sectionObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!revealElements.length) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      revealElements.forEach((revealElement) => revealElement.classList.add('is-visible'));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    );

    revealElements.forEach((revealElement) => revealObserver.observe(revealElement));

    return () => {
      revealObserver.disconnect();
    };
  }, [activeVariant]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:shadow-lg"
      >
        Skip to main content
      </a>

      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">{profileName}</h2>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden transition-opacity duration-300">
          <button
            type="button"
            aria-label="Close menu overlay"
            className="absolute inset-0 bg-slate-900/45 motion-safe:animate-[fadeInOverlay_200ms_ease-out]"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div
            id="mobile-nav-menu"
            className="absolute inset-y-0 right-0 w-full max-w-sm bg-white px-6 pb-8 pt-6 shadow-2xl motion-safe:animate-[slideInRight_260ms_ease-out]"
          >
            <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Navigation</p>
                <p className="text-lg font-semibold text-slate-900">{profileName}</p>
              </div>
              <Button variant="ghost" size="icon" aria-label="Close navigation menu" onClick={() => setMobileMenuOpen(false)}>
                <X />
              </Button>
            </div>

            <nav className="flex flex-col space-y-2" aria-label="Mobile section navigation">
              {navItems.map(({ href, label }) => {
                const sectionId = href.replace('#', '');
                return (
                  <a
                    key={label}
                    href={href}
                    aria-current={activeSection === sectionId ? 'page' : undefined}
                    className={cn(
                      'rounded-md px-4 py-3 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                      activeSection === sectionId ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                    )}
                    onClick={() => {
                      trackCtaClick({ action: `mobile_nav_${sectionId}`, location: 'nav', variant: activeVariant, href });
                      setMobileMenuOpen(false);
                    }}
                  >
                    {label}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 pt-24 md:pt-16 pb-16" id="cv-content">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 lg:col-span-3">
            <ProfileSidebar
              baseUrl={baseUrl}
              activeSection={activeSection}
              activeVariant={activeVariant}
              isGeneratingPdf={isGeneratingPdf}
              onDownloadPdf={handleDownloadPdf}
              onGeneratePdf={generatePDF}
            />
          </div>

          <main id="main-content" className="md:col-span-8 lg:col-span-9" tabIndex={-1}>
            <MainSections activeVariant={activeVariant} onVariantChange={handleVariantChange} onDownloadPdf={handleDownloadPdf} />
          </main>
        </div>
      </div>
    </div>
  );
}
