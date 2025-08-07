import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, MapPin, Github, Linkedin, Download, Menu, X, Globe, Facebook } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function CV() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
    try {
      // Get the CV content div
      const element = document.getElementById('cv-content');
      if (!element) return;

      // Temporarily remove sticky positioning for better PDF generation
      const stickyElements = element.querySelectorAll('.sticky');
      stickyElements.forEach(el => {
        (el as HTMLElement).style.position = 'static';
        (el as HTMLElement).style.top = 'auto';
      });

      // Configure html2canvas options
      const canvas = await html2canvas(element, {
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        height: element.scrollHeight,
        windowHeight: element.scrollHeight
      });

      // Restore sticky positioning
      stickyElements.forEach(el => {
        (el as HTMLElement).style.position = 'sticky';
        (el as HTMLElement).style.top = '2rem'; // top-8 = 2rem
      });

      const imgData = canvas.toDataURL('image/png');
      
      // Calculate PDF dimensions
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      // Add image to PDF
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      // If content is too long, split into multiple pages
      if (imgHeight * ratio > pdfHeight) {
        const totalPages = Math.ceil(imgHeight * ratio / pdfHeight);
        
        for (let i = 1; i < totalPages; i++) {
          pdf.addPage();
          const yOffset = -pdfHeight * i;
          pdf.addImage(imgData, 'PNG', imgX, imgY + yOffset, imgWidth * ratio, imgHeight * ratio);
        }
      }

      pdf.save('Yeasin_Arafat_CV_Generated.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
      
      // Ensure sticky positioning is restored even if there's an error
      const element = document.getElementById('cv-content');
      if (element) {
        const stickyElements = element.querySelectorAll('.sticky');
        stickyElements.forEach(el => {
          (el as HTMLElement).style.position = 'sticky';
          (el as HTMLElement).style.top = '2rem';
        });
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Md. Yeasin Arafat</h2>
        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 z-40 bg-white shadow-md p-4">
          <div className="flex flex-col space-y-2">
            <a href="#about" className="px-4 py-2 hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#experience" className="px-4 py-2 hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>Experience</a>
            <a href="#skills" className="px-4 py-2 hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>Skills</a>
            <a href="#education" className="px-4 py-2 hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>Education</a>
            <a href="#contact" className="px-4 py-2 hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>Contact</a>
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
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-2xl font-bold">Md. Yeasin Arafat</CardTitle>
                  <p className="text-muted-foreground mt-1">Sr. Software Engineer</p>
                  
                  <div className="flex justify-center mt-4 space-x-2">
                    <Button size="icon" variant="ghost" aria-label="GitHub" onClick={() => window.open('https://github.com/yeasinmahi', '_blank')}>
                      <Github className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant="ghost" aria-label="LinkedIn" onClick={() => window.open('https://www.linkedin.com/in/yeasinmahi/', '_blank')}>
                      <Linkedin className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant="ghost" aria-label="Facebook" onClick={() => window.open('https://www.facebook.com/yeasinmahi72', '_blank')}>
                      <Facebook className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <Separator className="my-4" />
                  
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start">
                      <Mail className="h-4 w-4 mr-3 mt-1 text-muted-foreground" />
                      <span>yeasinmahi72@gmail.com</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                      <span>+8801676272718</span>
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
                    <Button variant="outline" className="w-full" onClick={generatePDF}>
                      <Download className="mr-2 h-4 w-4" /> Generate PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation - Desktop Only */}
              <div className="hidden md:block mt-8">
                <Card className="border-none shadow-lg">
                  <CardContent className="pt-6">
                    <nav className="space-y-2">
                      <a href="#about" className="flex px-4 py-2 hover:bg-gray-100 rounded-md">About</a>
                      <a href="#experience" className="flex px-4 py-2 hover:bg-gray-100 rounded-md">Experience</a>
                      <a href="#skills" className="flex px-4 py-2 hover:bg-gray-100 rounded-md">Skills</a>
                      <a href="#education" className="flex px-4 py-2 hover:bg-gray-100 rounded-md">Education</a>
                      <a href="#contact" className="flex px-4 py-2 hover:bg-gray-100 rounded-md">Contact</a>
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
                    I am a Senior Software Engineer with extensive experience in web development, microservices, 
                    and cloud technologies. My expertise spans across back-end and front-end development, 
                    with a focus on creating scalable and efficient solutions. I have worked on various IoT projects, 
                    API integrations, and enterprise applications, demonstrating strong technical skills and leadership abilities.
                  </p>
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
                        <Badge variant="outline">May 2019 - Present</Badge>
                      </div>
                    </div>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                      <li>Led an IoT project to collect data from various sources and store it in AWS S3 with required transformations and aggregation to database</li>
                      <li>Developed a service to publish aggregated data to a NATS server, enabling vendors to use the data for analysis</li>
                      <li>Designed building layouts to assist the team in accurately positioning lighting, ensuring optimal placement and efficiency</li>
                      <li>Directed an IoT project to gather data from various sources, store it in Azure Blob Storage, and transform the data before saving it to a database</li>
                      <li>Developed a Power BI solution to visualize data, creating an interactive analysis portal for reporting and monitoring</li>
                      <li>Facilitated client onboarding with DHL applications by developing transformations for incoming requests and integrating them into the DHL system via plugin</li>
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
                      <li>Implemented 3rd party integrations through API for various applications including MyBL Apps, eSelfCare, Identity Management, Google Upsell, Facebook Upsell, and more</li>
                      <li>Developed web applications using ASP.NET including Exam management, Selfcare Admin (CMS), and BOS Admin (CMS)</li>
                      <li>Created Windows Services for Google Push Notification, CFL SMS management, and MyBL Apps Sign In/Sign Up Bonus Process</li>
                      <li>Built monitoring & analyzing tools for service monitoring with SMS alerts, log processing and summary services, and API service trend monitoring with email reporting</li>
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
                      <li>Developed products using ASP.NET MVC including Enterprise Resource Planning (ERP) and Akij Development Architecture (ADA)</li>
                      <li>Added Test-Driven Development (TDD) to existing applications</li>
                      <li>Implemented and managed SQL Server Integration Services (SSIS)</li>
                      <li>Implemented and managed Azure DevOps</li>
                      <li>Created Network Status Checker Desktop Application</li>
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
                      <li>Developed various products using ASP.NET MVC including Human Resource Management System (HRMS), Multi-Vendor ecommerce, Diagnostic Centre Management System, and Inventory Management System (IMS)</li>
                      <li>Developed various games using Unity including "Kids Puzzle", "Humming Bird", and "Coloring Blocks"</li>
                      <li>Developed various Android web view apps including Shatpach and Barca Match Schedule</li>
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
                  <Tabs defaultValue="technical">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="technical">Technical</TabsTrigger>
                      <TabsTrigger value="backend">Backend</TabsTrigger>
                      <TabsTrigger value="frontend">Frontend & DB</TabsTrigger>
                    </TabsList>
                    <TabsContent value="technical" className="mt-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        <Badge className="justify-center py-2">Microservice</Badge>
                        <Badge className="justify-center py-2">Azure DevOps</Badge>
                        <Badge className="justify-center py-2">AWS</Badge>
                        <Badge className="justify-center py-2">Docker</Badge>
                        <Badge className="justify-center py-2">Kafka</Badge>
                        <Badge className="justify-center py-2">NATS</Badge>
                        <Badge className="justify-center py-2">IIS</Badge>
                        <Badge className="justify-center py-2">Apache</Badge>
                        <Badge className="justify-center py-2">Loadbalancer</Badge>
                        <Badge className="justify-center py-2">Git</Badge>
                        <Badge className="justify-center py-2">TFVC</Badge>
                        <Badge className="justify-center py-2">GitHub</Badge>
                        <Badge className="justify-center py-2">Bitbucket</Badge>
                        <Badge className="justify-center py-2">Jira</Badge>
                        <Badge className="justify-center py-2">TFS</Badge>
                        <Badge className="justify-center py-2">Trello</Badge>
                        <Badge className="justify-center py-2">PowerBI</Badge>
                      </div>
                    </TabsContent>
                    <TabsContent value="backend" className="mt-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        <Badge className="justify-center py-2">C</Badge>
                        <Badge className="justify-center py-2">C++</Badge>
                        <Badge className="justify-center py-2">C#</Badge>
                        <Badge className="justify-center py-2">ASP.NET</Badge>
                        <Badge className="justify-center py-2">Java</Badge>
                        <Badge className="justify-center py-2">Android</Badge>
                        <Badge className="justify-center py-2">Python</Badge>
                        <Badge className="justify-center py-2">Unity</Badge>
                      </div>
                    </TabsContent>
                    <TabsContent value="frontend" className="mt-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        <Badge className="justify-center py-2">XML</Badge>
                        <Badge className="justify-center py-2">HTML</Badge>
                        <Badge className="justify-center py-2">CSS</Badge>
                        <Badge className="justify-center py-2">Bootstrap</Badge>
                        <Badge className="justify-center py-2">JavaScript</Badge>
                        <Badge className="justify-center py-2">Ajax</Badge>
                        <Badge className="justify-center py-2">jQuery</Badge>
                        <Badge className="justify-center py-2">SQL Server</Badge>
                        <Badge className="justify-center py-2">MySQL</Badge>
                        <Badge className="justify-center py-2">SQLite</Badge>
                        <Badge className="justify-center py-2">Access</Badge>
                        <Badge className="justify-center py-2">Oracle 11g</Badge>
                        <Badge className="justify-center py-2">PostgreSQL</Badge>
                        <Badge className="justify-center py-2">Crystal</Badge>
                        <Badge className="justify-center py-2">RDLC</Badge>
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
                          <span>yeasinmahi72@gmail.com</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                          <span>+8801676272718</span>
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
                        <Button variant="outline" size="icon" onClick={() => window.open('https://github.com/yeasinmahi', '_blank')}>
                          <Github className="h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => window.open('https://www.linkedin.com/in/yeasinmahi/', '_blank')}>
                          <Linkedin className="h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => window.open('https://www.facebook.com/yeasinmahi72', '_blank')}>
                          <Facebook className="h-5 w-5" />
                        </Button>
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