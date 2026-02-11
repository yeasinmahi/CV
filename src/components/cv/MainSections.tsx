import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  aboutSummary,
  contactDetails,
  coreStack,
  educationEntries,
  experiences,
  keyProjects,
  personalDetails,
  skillGroups,
  socialLinks,
} from '@/data/cvData';
import { Facebook, Github, Linkedin, Mail, MapPin, Phone, type LucideIcon } from 'lucide-react';

const socialIconMap: Record<(typeof socialLinks)[number]['icon'], LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  facebook: Facebook,
};

export function MainSections() {
  return (
    <div className="space-y-8 pt-16 md:pt-0">
      <section id="about" className="scroll-mt-20">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{aboutSummary}</p>
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

      <section id="projects" className="scroll-mt-20">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>Key Projects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {keyProjects.map((project, index) => (
              <div key={project.title}>
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium text-lg">{project.title}</h3>
                  <Badge variant="outline">{project.period}</Badge>
                </div>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                  {project.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                {index < keyProjects.length - 1 ? <Separator className="mt-6" /> : null}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section id="experience" className="scroll-mt-20">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>Work Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {experiences.map((experience, index) => (
              <div key={`${experience.company}-${experience.role}`}>
                <div className="flex justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-lg">{experience.role}</h3>
                    <p className="text-muted-foreground">{experience.company}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{experience.period}</Badge>
                  </div>
                </div>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                  {experience.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                {index < experiences.length - 1 ? <Separator className="mt-8" /> : null}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section id="skills" className="scroll-mt-20">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={skillGroups[0].value}>
              <TabsList className="grid w-full grid-cols-3">
                {skillGroups.map((skillGroup) => (
                  <TabsTrigger key={skillGroup.value} value={skillGroup.value}>
                    {skillGroup.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {skillGroups.map((skillGroup) => (
                <TabsContent key={skillGroup.value} value={skillGroup.value} className="mt-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {skillGroup.items.map((item) => (
                      <Badge key={`${skillGroup.value}-${item}`} className="justify-center py-2">
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

      <section id="education" className="scroll-mt-20">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {educationEntries.map((entry, index) => (
              <div key={entry.degree}>
                <div className="flex justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-lg">{entry.degree}</h3>
                    <p className="text-muted-foreground">{entry.institution}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{entry.period}</Badge>
                  </div>
                </div>
                <p className="text-muted-foreground">{entry.details}</p>
                {index < educationEntries.length - 1 ? <Separator className="mt-6" /> : null}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section id="personal" className="scroll-mt-20">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {personalDetails.map((detail) => (
                <div key={detail.label}>
                  <p className="font-medium">{detail.label}</p>
                  <p className="text-muted-foreground">{detail.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="contact" className="scroll-mt-20">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle>Get In Touch</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">Feel free to reach out for collaborations or just a friendly chat.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Contact Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
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
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Social Profiles</h3>
                <div className="flex space-x-3">
                  {socialLinks.map(({ href, icon, label }) => {
                    const Icon = socialIconMap[icon];
                    return (
                      <Button key={label} variant="outline" size="icon" asChild>
                        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                          <Icon className="h-5 w-5" />
                        </a>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
