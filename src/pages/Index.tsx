import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, MapPin, Github, Linkedin, Download, Menu, X, Globe, Facebook } from 'lucide-react';

type SocialLink = {
  href: string;
  icon: typeof Github;
  label: string;
};

const socialLinks: SocialLink[] = [
  { href: 'https://github.com/yeasinmahi', icon: Github, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/yeasinmahi/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://www.facebook.com/yeasinmahi72', icon: Facebook, label: 'Facebook' },
];

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
  { href: '#personal', label: 'Personal' },
  { href: '#contact', label: 'Contact' },
];

const coreStack = [
  'C# / ASP.NET',
  'Microservices',
  'AWS + Azure',
  'NATS / Kafka',
  'SQL Server / PostgreSQL',
  'GenAI Assistants',
];

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
      const [{ default: html2canvas }, { default: JsPdf }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ]);

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
      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Md. Yeasin Arafat</h2>
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
          <div className="flex flex-col space-y-2">
            {navItems.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                className="px-4 py-2 hover:bg-gray-100 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 pt-8 md:pt-16 pb-16" id="cv-content">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sidebar - Profile Information */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="sticky top-8">
              <Card className="border-none shadow-lg">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto w-32 h-32 rounded-full overflow-hidden mb-4">
                    <img
                      src={`${baseUrl}Yeasin.jpg`}
                      alt="Profile"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-2xl font-bold">Md. Yeasin Arafat</CardTitle>
                  <p className="text-muted-foreground mt-1">Sr. Software Engineer</p>

                  <div className="flex justify-center mt-4 space-x-2">
                    {socialLinks.map(({ href, icon: Icon, label }) => (
                      <Button key={label} size="icon" variant="ghost" asChild>
                        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                          <Icon className="h-5 w-5" />
                        </a>
                      </Button>
                    ))}
                  </div>
                </CardHeader>

                <CardContent>
                  <Separator className="my-4" />

                  <div className="space-y-4 text-sm">
                    <div className="flex items-start">
                      <Mail className="h-4 w-4 mr-3 mt-1 text-muted-foreground" />
                      <a href="mailto:yeasinmahi72@gmail.com" className="break-all hover:underline">
                        yeasinmahi72@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                      <a href="tel:+8801676272718" className="hover:underline">
                        +8801676272718
                      </a>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-3 mt-1 text-muted-foreground" />
                      <span>Comilla, Bangladesh</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-3 text-muted-foreground" />
                      <span>Bangladeshi</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-6">
                    <Button variant="outline" className="w-full" onClick={downloadPDF}>
                      <Download className="mr-2 h-4 w-4" /> Download PDF
                    </Button>
                    <Button variant="outline" className="w-full" onClick={generatePDF} disabled={isGeneratingPdf}>
                      <Download className="mr-2 h-4 w-4" /> {isGeneratingPdf ? 'Generating...' : 'Generate PDF'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation - Desktop Only */}
              <div className="hidden md:block mt-8">
                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6">
                    <nav className="space-y-2">
                      {navItems.map(({ href, label }) => (
                        <a key={label} href={href} className="flex px-4 py-2 hover:bg-gray-100 rounded-md">
                          {label}
                        </a>
                      ))}
                    </nav>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-8 lg:col-span-9 space-y-8 pt-16 md:pt-0">
            {/* About Section */}
            <section id="about" className="scroll-mt-20">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Sr. Software Engineer with 10+ years of experience building backend platforms, API integrations, and
                    event-driven services. I have delivered production workloads across 2 cloud environments (AWS and Azure),
                    led development of a Singapore government Town Council GenAI assistant, and drive reliable delivery through
                    practical technical leadership.
                  </p>
                  <div className="mt-5">
                    <h3 className="text-sm font-semibold mb-2">Core Stack</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {coreStack.map((skill) => (
                        <Badge key={skill} variant="outline" className="justify-center py-2">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Key Projects Section */}
            <section id="projects" className="scroll-mt-20">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Key Projects</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium text-lg">Singapore Town Council GenAI Assistant</h3>
                      <Badge variant="outline">2025 - Present</Badge>
                    </div>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                      <li>Built a government-facing chatbot with Town Council-specific knowledge bases for business-domain responses.</li>
                      <li>Implemented ingestion and training across 6 source formats: PDF, SharePoint, JSON, Word, text, and websites.</li>
                      <li>Enabled council-level data separation so each Town Council receives responses from its own business dataset.</li>
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium text-lg">Cross-Cloud IoT Data Platform</h3>
                      <Badge variant="outline">2023 - Present</Badge>
                    </div>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                      <li>Built ingestion and transformation pipelines across 2 cloud targets: AWS S3 and Azure Blob Storage.</li>
                      <li>Developed NATS-based event publishing services for vendor analytics and downstream integrations.</li>
                      <li>Delivered operational visibility with Power BI dashboards for monitoring and issue triage.</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Experience Section */}
            <section id="experience" className="scroll-mt-20">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Work Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-lg">Sr. Software Engineer</h3>
                        <p className="text-muted-foreground">Surbana Jurong</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">May 2023 - Present</Badge>
                      </div>
                    </div>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                      <li>Led development of a Singapore government Town Council GenAI assistant chatbot for business-focused support use cases.</li>
                      <li>Implemented ingestion and training across 6 source formats: PDF, SharePoint, JSON, Word, text, and websites.</li>
                      <li>Designed council-specific data separation so each Town Council receives answers from its own dataset.</li>
                      <li>Delivered backend data pipelines on 2 cloud environments (AWS S3 and Azure Blob) for resilient ingestion and storage.</li>
                      <li>Built NATS-based event publishing services to distribute aggregated telemetry to vendor analytics consumers.</li>
                      <li>Acted as unofficial lead for the Bangladesh engineering team, coordinating sprint delivery and mentoring developers.</li>
                      <li>Implemented backend transformation plugins for DHL onboarding flows and improved downstream integration reliability.</li>
                    </ul>
                  </div>
                  
                  <Separator />

                  <div>
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-lg">Application Developer</h3>
                        <p className="text-muted-foreground">Banglalink</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">Sep 2019 - Apr 2023</Badge>
                      </div>
                    </div>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                      <li>Integrated 5+ third-party platforms, including MyBL, eSelfCare, identity systems, and upsell partners.</li>
                      <li>Delivered 3 ASP.NET applications: Exam Management, Selfcare Admin (CMS), and BOS Admin (CMS).</li>
                      <li>Built 3 Windows Services for push notifications, SMS workflows, and sign-in/sign-up bonus processing.</li>
                      <li>Implemented service monitoring with SMS/email alerts, log summaries, and API trend reporting.</li>
                    </ul>
                  </div>
                  
                  <Separator />

                  <div>
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-lg">Software Engineer</h3>
                        <p className="text-muted-foreground">Akij Group</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">Mar 2018 - Sep 2019</Badge>
                      </div>
                    </div>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                      <li>Developed core ASP.NET MVC backend modules for 2 enterprise platforms: ERP and ADA.</li>
                      <li>Introduced Test-Driven Development (TDD) practices to improve code quality and reduce regressions.</li>
                      <li>Implemented and maintained SQL Server Integration Services (SSIS) ETL workflows.</li>
                      <li>Managed Azure DevOps pipelines and release processes to improve delivery consistency.</li>
                    </ul>
                  </div>
                  
                  <Separator />

                  <div>
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-lg">Project Manager & Team Lead</h3>
                        <p className="text-muted-foreground">Futuristic Technologies Limited</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">Aug 2017 - Mar 2018</Badge>
                      </div>
                    </div>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                      <li>Led delivery of 4 ASP.NET MVC products: HRMS, multi-vendor ecommerce, diagnostic center, and inventory systems.</li>
                      <li>Owned planning, team execution, architecture alignment, and stakeholder communication as Project Manager and Team Lead.</li>
                      <li>Built supporting Unity and Android applications integrated with business workflows and backend services.</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Skills Section */}
            <section id="skills" className="scroll-mt-20">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="backend">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="backend">Backend Engineering</TabsTrigger>
                      <TabsTrigger value="cloud">Cloud & Operations</TabsTrigger>
                      <TabsTrigger value="data">Data & Integration</TabsTrigger>
                    </TabsList>
                    <TabsContent value="backend" className="mt-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        <Badge className="justify-center py-2">C#</Badge>
                        <Badge className="justify-center py-2">ASP.NET</Badge>
                        <Badge className="justify-center py-2">ASP.NET MVC</Badge>
                        <Badge className="justify-center py-2">Microservices</Badge>
                        <Badge className="justify-center py-2">REST API Integration</Badge>
                        <Badge className="justify-center py-2">Event-Driven Services</Badge>
                        <Badge className="justify-center py-2">Windows Services</Badge>
                        <Badge className="justify-center py-2">Python</Badge>
                        <Badge className="justify-center py-2">Java</Badge>
                      </div>
                    </TabsContent>
                    <TabsContent value="cloud" className="mt-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        <Badge className="justify-center py-2">AWS (S3)</Badge>
                        <Badge className="justify-center py-2">Azure (Blob)</Badge>
                        <Badge className="justify-center py-2">Docker</Badge>
                        <Badge className="justify-center py-2">Azure DevOps</Badge>
                        <Badge className="justify-center py-2">IIS</Badge>
                        <Badge className="justify-center py-2">Apache</Badge>
                        <Badge className="justify-center py-2">Load Balancing</Badge>
                        <Badge className="justify-center py-2">Monitoring & Alerting</Badge>
                        <Badge className="justify-center py-2">Git / GitHub / Bitbucket</Badge>
                      </div>
                    </TabsContent>
                    <TabsContent value="data" className="mt-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        <Badge className="justify-center py-2">SQL Server</Badge>
                        <Badge className="justify-center py-2">PostgreSQL</Badge>
                        <Badge className="justify-center py-2">MySQL</Badge>
                        <Badge className="justify-center py-2">SQLite</Badge>
                        <Badge className="justify-center py-2">SSIS / ETL</Badge>
                        <Badge className="justify-center py-2">NATS</Badge>
                        <Badge className="justify-center py-2">Kafka</Badge>
                        <Badge className="justify-center py-2">Power BI</Badge>
                        <Badge className="justify-center py-2">JSON / XML</Badge>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </section>

            {/* Education Section */}
            <section id="education" className="scroll-mt-20">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-lg">BSc in Computer Science and Engineering</h3>
                        <p className="text-muted-foreground">American International University-Bangladesh (AIUB)</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">2011 - 2015</Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      Cumulative GPA: 3.02 (out of 4.00)
                    </p>
                  </div>
                  
                  <Separator />

                  <div>
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-lg">Higher Secondary Certificate (HSC)</h3>
                        <p className="text-muted-foreground">Ibn Taimiya College, Comilla</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">2010</Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      Group: Science | GPA: 4.10
                    </p>
                  </div>
                  
                  <Separator />

                  <div>
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-lg">Secondary School Certificate (SSC)</h3>
                        <p className="text-muted-foreground">PDB High School, Comilla</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">2008</Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      Group: Science | GPA: 5.00
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Personal Details Section */}
            <section id="personal" className="scroll-mt-20">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Personal Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Father's Name</p>
                      <p className="text-muted-foreground">Md. Anwar Hossain</p>
                    </div>
                    <div>
                      <p className="font-medium">Mother's Name</p>
                      <p className="text-muted-foreground">Amena Begum</p>
                    </div>
                    <div>
                      <p className="font-medium">Date of Birth</p>
                      <p className="text-muted-foreground">January 30, 1994</p>
                    </div>
                    <div>
                      <p className="font-medium">Gender</p>
                      <p className="text-muted-foreground">Male</p>
                    </div>
                    <div>
                      <p className="font-medium">Permanent Address</p>
                      <p className="text-muted-foreground">Village: Durgapur (Nuapara), Post office: Kabila Bazar, Thana: Burichang, District: Comilla</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Contact Section */}
            <section id="contact" className="scroll-mt-20">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Get In Touch</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Feel free to reach out for collaborations or just a friendly chat.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">Contact Details</h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                          <a href="mailto:yeasinmahi72@gmail.com" className="break-all hover:underline">
                            yeasinmahi72@gmail.com
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                          <a href="tel:+8801676272718" className="hover:underline">
                            +8801676272718
                          </a>
                        </div>
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 mr-3 mt-1 text-muted-foreground" />
                          <span>Comilla, Bangladesh</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Social Profiles</h3>
                      <div className="flex space-x-3">
                        {socialLinks.map(({ href, icon: Icon, label }) => (
                          <Button key={label} variant="outline" size="icon" asChild>
                            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                              <Icon className="h-5 w-5" />
                            </a>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
