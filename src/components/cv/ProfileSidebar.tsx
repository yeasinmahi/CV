import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { contactDetails, navItems, profileName, profileTitle, socialLinks, type RoleVariant } from '@/data/cvData';
import { trackCtaClick } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { Facebook, Github, Globe, Linkedin, Mail, Phone, Download, MapPin, type LucideIcon } from 'lucide-react';

const socialIconMap: Record<(typeof socialLinks)[number]['icon'], LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  facebook: Facebook,
};

type ProfileSidebarProps = {
  baseUrl: string;
  activeSection: string;
  activeVariant: RoleVariant;
  isGeneratingPdf: boolean;
  onDownloadPdf: () => void;
  onGeneratePdf: () => void;
};

export function ProfileSidebar({ baseUrl, activeSection, activeVariant, isGeneratingPdf, onDownloadPdf, onGeneratePdf }: ProfileSidebarProps) {
  return (
    <div className="sticky top-8">
      <Card data-reveal className="border border-slate-200/70 shadow-lg">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-32 h-32 rounded-full overflow-hidden mb-4">
            <img src={`${baseUrl}Yeasin.jpg`} alt="Profile" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <p className="text-3xl font-bold text-slate-900">{profileName}</p>
          <p className="text-muted-foreground mt-1">{profileTitle}</p>
          <Badge variant="outline" className="mx-auto mt-3 border-slate-300 bg-slate-50 text-slate-700">
            Available for backend and GenAI roles
          </Badge>

          <div className="flex justify-center mt-4 space-x-2">
            {socialLinks.map(({ href, icon, label }) => {
              const Icon = socialIconMap[icon];
              return (
                <Button key={label} size="icon" variant="ghost" asChild>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    onClick={() => {
                      trackCtaClick({ action: `sidebar_social_${icon}`, location: 'social', variant: activeVariant, href });
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </Button>
              );
            })}
          </div>
        </CardHeader>

        <CardContent>
          <Separator className="my-4" />

          <div className="space-y-4 text-sm">
            <div className="flex items-start">
              <Mail className="h-4 w-4 mr-3 mt-1 text-muted-foreground" />
              <a href={`mailto:${contactDetails.email}`} className="break-all hover:underline">
                {contactDetails.email}
              </a>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
              <a href={`tel:${contactDetails.phone}`} className="hover:underline">
                {contactDetails.phone}
              </a>
            </div>
            <div className="flex items-start">
              <MapPin className="h-4 w-4 mr-3 mt-1 text-muted-foreground" />
              <span>{contactDetails.location}</span>
            </div>
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-3 text-muted-foreground" />
              <span>{contactDetails.nationality}</span>
            </div>
          </div>

          <div className="space-y-2 mt-6">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                trackCtaClick({ action: 'sidebar_download_pdf', location: 'sidebar', variant: activeVariant });
                onDownloadPdf();
              }}
            >
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                trackCtaClick({ action: 'sidebar_generate_ats_pdf', location: 'sidebar', variant: activeVariant });
                onGeneratePdf();
              }}
              disabled={isGeneratingPdf}
            >
              <Download className="mr-2 h-4 w-4" /> {isGeneratingPdf ? 'Generating...' : 'Generate ATS PDF'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="hidden md:block mt-8">
        <Card data-reveal className="border border-blue-100 bg-blue-50/40 shadow-lg">
          <CardContent className="pt-6">
            <nav className="space-y-2" aria-label="Section navigation">
              {navItems.map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => {
                    trackCtaClick({ action: `sidebar_nav_${href.replace('#', '')}`, location: 'nav', variant: activeVariant, href });
                  }}
                  className={cn(
                    'flex px-4 py-2 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    activeSection === href.replace('#', '')
                      ? 'bg-blue-100 text-blue-900 border-l-2 border-blue-600 font-semibold'
                      : 'hover:bg-blue-100/70 text-slate-700'
                  )}
                >
                  {label}
                </a>
              ))}
            </nav>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
