import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { navItems, profileName } from '@/data/cvData';
import { ProfileSidebar } from '@/components/cv/ProfileSidebar';
import { MainSections } from '@/components/cv/MainSections';

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
    const stickyStyles = stickyElements.map((stickyElement) => ({
      element: stickyElement,
      position: stickyElement.style.position,
      top: stickyElement.style.top,
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
      setIsGeneratingPdf(false);
    }
  };

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
        <div id="mobile-nav-menu" className="md:hidden fixed top-16 left-0 right-0 z-40 bg-white shadow-md p-4">
          <nav className="flex flex-col space-y-2" aria-label="Mobile section navigation">
            {navItems.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                className="px-4 py-2 rounded-md hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}

      <div className="container mx-auto px-4 pt-8 md:pt-16 pb-16" id="cv-content">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 lg:col-span-3">
            <ProfileSidebar
              baseUrl={baseUrl}
              isGeneratingPdf={isGeneratingPdf}
              onDownloadPdf={downloadPDF}
              onGeneratePdf={generatePDF}
            />
          </div>

          <main id="main-content" className="md:col-span-8 lg:col-span-9" tabIndex={-1}>
            <MainSections />
          </main>
        </div>
      </div>
    </div>
  );
}
