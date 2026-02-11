import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  aboutSummary,
  contactDetails,
  coreStack,
  educationEntries,
  experiences,
  heroValueStatement,
  keyProjects,
  personalDetails,
  profileName,
  profileTitle,
  skillGroups,
  socialLinks,
  socialProofBadge,
  statsStrip,
} from '@/data/cvData';
import { cn } from '@/lib/utils';
import {
  Award,
  BadgeCheck,
  BriefcaseBusiness,
  FolderKanban,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

type MainSectionsProps = {
  onDownloadPdf: () => void;
};

type SectionTitleProps = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accentClassName: string;
};

function SectionTitle({ title, subtitle, icon: Icon, accentClassName }: SectionTitleProps) {
  return (
    <div className="flex items-start gap-3">
      <div className={cn('mt-1 rounded-md p-2 text-white', accentClassName)}>
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <h2 className="text-2xl font-bold leading-tight text-slate-900 md:text-3xl">{title}</h2>
        <p className="mt-1 max-w-3xl text-sm text-slate-600 md:text-base">{subtitle}</p>
      </div>
    </div>
  );
}

export function MainSections({ onDownloadPdf }: MainSectionsProps) {
  const linkedInProfile = socialLinks.find((link) => link.icon === 'linkedin')?.href ?? '#';

  return (
    <div className="space-y-8 pt-16 md:pt-0">
      <section data-reveal className="scroll-mt-20">
        <Card className="overflow-hidden border border-blue-200/70 bg-gradient-to-r from-blue-50 via-white to-cyan-50 shadow-lg">
          <CardContent className="p-6 md:p-8">
            <Badge className="mb-4 inline-flex items-center gap-2 bg-blue-700 px-3 py-1 text-blue-50 hover:bg-blue-700">
              <BadgeCheck className="h-3.5 w-3.5" />
              {socialProofBadge}
            </Badge>

            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">{profileTitle}</p>
            <h1 className="mt-2 text-3xl font-bold leading-tight text-slate-900 md:text-5xl">{profileName}</h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700 md:text-lg">{heroValueStatement}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-blue-700 text-white hover:bg-blue-800">
                <a href="#contact">Contact</a>
              </Button>
              <Button size="lg" variant="outline" onClick={onDownloadPdf}>
                Download CV
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section data-reveal className="scroll-mt-20">
        <Card className="border border-slate-200 bg-white shadow-md">
          <CardContent className="grid grid-cols-2 gap-3 p-4 md:grid-cols-4 md:gap-4 md:p-6">
            {statsStrip.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center md:p-4">
                <p className="text-2xl font-bold text-slate-900 md:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-600 md:text-sm">{stat.label}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section id="about" data-reveal className="scroll-mt-20">
        <Card className="border border-blue-100 bg-blue-50/50 shadow-lg">
          <CardHeader>
            <SectionTitle
              title="About Me"
              subtitle="Backend-focused engineering leadership with strong delivery discipline."
              icon={Sparkles}
              accentClassName="bg-blue-700"
            />
          </CardHeader>
          <CardContent>
            <p className="max-w-3xl leading-relaxed text-slate-700">{aboutSummary}</p>
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-700">Core Stack</h3>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {coreStack.map((skill) => (
                  <Badge key={skill} variant="outline" className="justify-center border-blue-200 bg-white py-2 text-slate-700">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="projects" data-reveal className="scroll-mt-20">
        <Card className="border border-emerald-100 bg-emerald-50/50 shadow-lg">
          <CardHeader>
            <SectionTitle
              title="Key Projects"
              subtitle="Featured work with clear business context and outcomes."
              icon={FolderKanban}
              accentClassName="bg-emerald-700"
            />
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {keyProjects.map((project) => (
                <article key={project.title} className="rounded-lg border border-emerald-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xl font-semibold text-slate-900">{project.title}</h3>
                    <Badge variant="outline" className="border-emerald-200 text-emerald-800">
                      {project.period}
                    </Badge>
                  </div>

                  <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
                    <p>
                      <span className="font-semibold text-slate-900">Problem:</span> {project.problem}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">Solution:</span> {project.solution}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">Impact:</span> {project.impact}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((item) => (
                      <Badge key={`${project.title}-${item}`} variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-800">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="experience" data-reveal className="scroll-mt-20">
        <Card className="border border-amber-100 bg-amber-50/50 shadow-lg">
          <CardHeader>
            <SectionTitle
              title="Work Experience"
              subtitle="Timeline view for fast recruiter scanning."
              icon={BriefcaseBusiness}
              accentClassName="bg-amber-700"
            />
          </CardHeader>
          <CardContent>
            <div className="relative pl-6 md:pl-8">
              <div className="absolute left-2 top-1 bottom-1 w-px bg-amber-200" />
              {experiences.map((experience) => (
                <article key={`${experience.company}-${experience.role}`} className="relative pb-8 last:pb-0">
                  <span className="absolute -left-[1.12rem] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-amber-300 bg-amber-600" />
                  <div className="rounded-lg border border-amber-200 bg-white p-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{experience.role}</h3>
                        <p className="text-sm text-slate-600">{experience.company}</p>
                      </div>
                      <Badge variant="outline" className="border-amber-200 text-amber-800">
                        {experience.period}
                      </Badge>
                    </div>
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-700">
                      {experience.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="skills" data-reveal className="scroll-mt-20">
        <Card className="border border-cyan-100 bg-cyan-50/50 shadow-lg">
          <CardHeader>
            <SectionTitle
              title="Skills"
              subtitle="Core capabilities grouped by delivery domain."
              icon={Award}
              accentClassName="bg-cyan-700"
            />
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={skillGroups[0].value}>
              <TabsList className="grid w-full grid-cols-3 bg-white">
                {skillGroups.map((skillGroup) => (
                  <TabsTrigger key={skillGroup.value} value={skillGroup.value}>
                    {skillGroup.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {skillGroups.map((skillGroup) => (
                <TabsContent key={skillGroup.value} value={skillGroup.value} className="mt-4">
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                    {skillGroup.items.map((item) => (
                      <Badge key={`${skillGroup.value}-${item}`} className="justify-center bg-cyan-700 py-2 text-cyan-50 hover:bg-cyan-700">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </section>

      <section id="education" data-reveal className="scroll-mt-20">
        <Card className="border border-rose-100 bg-rose-50/50 shadow-lg">
          <CardHeader>
            <SectionTitle
              title="Education"
              subtitle="Academic background and formal qualifications."
              icon={GraduationCap}
              accentClassName="bg-rose-700"
            />
          </CardHeader>
          <CardContent className="space-y-4">
            {educationEntries.map((entry) => (
              <div key={entry.degree} className="rounded-lg border border-rose-200 bg-white p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{entry.degree}</h3>
                    <p className="text-sm text-slate-600">{entry.institution}</p>
                  </div>
                  <Badge variant="outline" className="border-rose-200 text-rose-800">
                    {entry.period}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-slate-700">{entry.details}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section id="personal" data-reveal className="scroll-mt-20">
        <Card className="border border-slate-200 bg-slate-50 shadow-lg">
          <CardHeader>
            <SectionTitle
              title="Personal Details"
              subtitle="Additional profile information."
              icon={BadgeCheck}
              accentClassName="bg-slate-700"
            />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {personalDetails.map((detail) => (
                <div key={detail.label} className="rounded-lg border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold uppercase tracking-wide text-slate-600">{detail.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-800">{detail.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="contact" data-reveal className="scroll-mt-20">
        <Card className="border border-blue-200 bg-gradient-to-r from-slate-50 to-blue-50 shadow-lg">
          <CardHeader>
            <SectionTitle
              title="Get In Touch"
              subtitle="Open to senior backend and platform-focused opportunities."
              icon={Mail}
              accentClassName="bg-blue-700"
            />
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-blue-200 bg-white p-5">
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-blue-700 text-white hover:bg-blue-800">
                  <a href={`mailto:${contactDetails.email}`}>Let&apos;s Talk</a>
                </Button>
                <Button asChild variant="outline">
                  <a href={`mailto:${contactDetails.email}`}>Email</a>
                </Button>
                <Button asChild variant="outline">
                  <a href={linkedInProfile} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                  </a>
                </Button>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 text-sm text-slate-700 md:grid-cols-3">
                <div className="flex items-center rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
                  <Mail className="mr-2 h-4 w-4 text-slate-500" />
                  <a href={`mailto:${contactDetails.email}`} className="truncate hover:underline">
                    {contactDetails.email}
                  </a>
                </div>
                <div className="flex items-center rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
                  <Phone className="mr-2 h-4 w-4 text-slate-500" />
                  <a href={`tel:${contactDetails.phone}`} className="hover:underline">
                    {contactDetails.phone}
                  </a>
                </div>
                <div className="flex items-center rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
                  <MapPin className="mr-2 h-4 w-4 text-slate-500" />
                  <span className="truncate">{contactDetails.location}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
