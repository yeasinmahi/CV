import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { navItems, profileName } from '@/data/cvData';
import { ProfileSidebar } from '@/components/cv/ProfileSidebar';
import { MainSections } from '@/components/cv/MainSections';
import { cn } from '@/lib/utils';

type JsPdfInstance = {
  internal: {
    pageSize: {
      getWidth: () => number;
      getHeight: () => number;
    };
  };
  addImage: (...args: unknown[]) => void;
  addPage: () => void;
  save: (filename: string) => void;
};

type JsPdfConstructor = new (orientation: string, unit: string, format: string) => JsPdfInstance;

export default function CV() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Get the base URL for assets
  const baseUrl = import.meta.env.BASE_URL;

  // Function to download pre-made PDF file
  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = `${baseUrl}Yeasin_Arafat_CV.pdf`;
    link.download = 'Yeasin_Arafat_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to generate PDF from webpage
  const generatePDF = async () => {
    const element = document.getElementById('cv-content');
    if (!element || isGeneratingPdf) return;

    const stickyElements = Array.from(element.querySelectorAll<HTMLElement>('.sticky'));
    const revealElements = Array.from(element.querySelectorAll<HTMLElement>('[data-reveal]'));
    const stickyStyles = stickyElements.map((stickyElement) => ({
      element: stickyElement,
      position: stickyElement.style.position,
      top: stickyElement.style.top,
    }));
    const revealVisibilityState = revealElements.map((revealElement) => ({
      element: revealElement,
      wasVisible: revealElement.classList.contains('is-visible'),
    }));

    setIsGeneratingPdf(true);

    try {
      const [{ default: html2canvas }, jsPdfModule] = await Promise.all([import('html2canvas'), import('jspdf')]);
      const jsPdfSource = jsPdfModule as { jsPDF?: JsPdfConstructor; default?: JsPdfConstructor };
      const JsPdf = jsPdfSource.jsPDF ?? jsPdfSource.default;
      if (!JsPdf) {
        throw new Error('Unable to load jsPDF constructor');
      }

      // Temporarily remove sticky positioning for better PDF generation
      stickyElements.forEach((stickyElement) => {
        stickyElement.style.position = 'static';
        stickyElement.style.top = 'auto';
      });
      revealElements.forEach((revealElement) => {
        revealElement.classList.add('is-visible');
      });

      // Configure html2canvas options
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        height: element.scrollHeight,
        windowHeight: element.scrollHeight,
        scrollY: -window.scrollY,
      });

      const imgData = canvas.toDataURL('image/png');

      // Fit PDF to full width and paginate by height.
      const pdf = new JsPdf('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save('Yeasin_Arafat_CV_Generated.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      stickyStyles.forEach(({ element: stickyElement, position, top }) => {
        stickyElement.style.position = position;
        stickyElement.style.top = top;
      });
      revealVisibilityState.forEach(({ element: revealElement, wasVisible }) => {
        if (!wasVisible) {
          revealElement.classList.remove('is-visible');
        }
      });
      setIsGeneratingPdf(false);
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
  }, []);

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
                    onClick={() => setMobileMenuOpen(false)}
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
              isGeneratingPdf={isGeneratingPdf}
              onDownloadPdf={downloadPDF}
              onGeneratePdf={generatePDF}
            />
          </div>

          <main id="main-content" className="md:col-span-8 lg:col-span-9" tabIndex={-1}>
            <MainSections onDownloadPdf={downloadPDF} />
          </main>
        </div>
      </div>
    </div>
  );
}
