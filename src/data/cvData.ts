export type SocialIconKey = 'github' | 'linkedin' | 'facebook';

export interface NavItem {
  href: string;
  label: string;
}

export interface SocialLink {
  href: string;
  icon: SocialIconKey;
  label: string;
}

export interface ProjectEntry {
  title: string;
  period: string;
  bullets: string[];
}

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface SkillGroup {
  value: 'backend' | 'cloud' | 'data';
  label: string;
  items: string[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  details: string;
}

export interface PersonalDetail {
  label: string;
  value: string;
}

export const profileName = 'Md. Yeasin Arafat';
export const profileTitle = 'Sr. Software Engineer';

export const navItems: NavItem[] = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
  { href: '#personal', label: 'Personal' },
  { href: '#contact', label: 'Contact' },
];

export const socialLinks: SocialLink[] = [
  { href: 'https://github.com/yeasinmahi', icon: 'github', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/yeasinmahi/', icon: 'linkedin', label: 'LinkedIn' },
  { href: 'https://www.facebook.com/yeasinmahi72', icon: 'facebook', label: 'Facebook' },
];

export const contactDetails = {
  email: 'yeasinmahi72@gmail.com',
  phone: '+8801676272718',
  location: 'Comilla, Bangladesh',
  nationality: 'Bangladeshi',
};

export const aboutSummary =
  'Sr. Software Engineer with 10+ years of experience building backend platforms, API integrations, and event-driven services. I have delivered production workloads across 2 cloud environments (AWS and Azure), led development of a Singapore government Town Council GenAI assistant, and drive reliable delivery through practical technical leadership.';

export const coreStack = [
  'C# / ASP.NET',
  'Microservices',
  'AWS + Azure',
  'NATS / Kafka',
  'SQL Server / PostgreSQL',
  'GenAI Assistants',
];

export const keyProjects: ProjectEntry[] = [
  {
    title: 'Singapore Town Council GenAI Assistant',
    period: '2025 - Present',
    bullets: [
      'Reduced manual knowledge lookup by centralizing Town Council-specific policy and process answers in one assistant.',
      'Cut knowledge onboarding effort by supporting 6 source formats: PDF, SharePoint, JSON, Word, text, and websites.',
      "Improved answer relevance by enforcing council-scoped data retrieval for each Town Council's dataset.",
    ],
  },
  {
    title: 'Cross-Cloud IoT Data Platform',
    period: '2023 - Present',
    bullets: [
      'Improved ingestion resiliency by deploying mirrored pipelines across 2 cloud targets: AWS S3 and Azure Blob.',
      'Reduced vendor data delivery friction through NATS-based event publishing for downstream analytics.',
      'Improved triage speed with Power BI monitoring dashboards and consolidated operational views.',
    ],
  },
];

export const experiences: ExperienceEntry[] = [
  {
    role: 'Sr. Software Engineer',
    company: 'Surbana Jurong',
    period: 'May 2023 - Present',
    bullets: [
      'Led development of a Singapore government Town Council GenAI assistant for business support workflows.',
      'Cut knowledge onboarding effort by implementing ingestion and training across 6 source formats.',
      'Improved response precision by implementing council-specific data separation for each Town Council.',
      'Increased backend reliability by delivering ingestion pipelines across 2 cloud platforms (AWS and Azure).',
      'Enabled vendor analytics consumption through NATS-based aggregated telemetry publishing.',
      'Improved sprint delivery consistency as unofficial lead for the Bangladesh engineering team.',
      'Reduced onboarding integration issues with DHL via backend transformation plugins.',
    ],
  },
  {
    role: 'Application Developer',
    company: 'Banglalink',
    period: 'Sep 2019 - Apr 2023',
    bullets: [
      'Accelerated partner launches by integrating 5+ third-party platforms, including identity and upsell systems.',
      'Delivered 3 ASP.NET applications that supported exam, selfcare CMS, and BOS admin operations.',
      'Automated recurring customer workflows with 3 Windows Services for push, SMS, and bonus processing.',
      'Improved incident visibility with service monitoring, SMS/email alerts, and API trend reporting.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Akij Group',
    period: 'Mar 2018 - Sep 2019',
    bullets: [
      'Delivered core backend modules for 2 enterprise platforms: ERP and Akij Development Architecture (ADA).',
      'Reduced regression risk by introducing Test-Driven Development (TDD) into existing codebases.',
      'Automated data movement through SQL Server Integration Services (SSIS) ETL workflows.',
      'Improved release consistency by managing Azure DevOps pipelines and deployment processes.',
    ],
  },
  {
    role: 'Project Manager & Team Lead',
    company: 'Futuristic Technologies Limited',
    period: 'Aug 2017 - Mar 2018',
    bullets: [
      'Led delivery of 4 ASP.NET MVC products: HRMS, multi-vendor ecommerce, diagnostic center, and inventory systems.',
      'Improved team predictability by owning planning, architecture alignment, and stakeholder communication.',
      'Delivered supporting Unity and Android applications integrated with business and backend workflows.',
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    value: 'backend',
    label: 'Backend Engineering',
    items: [
      'C#',
      'ASP.NET',
      'ASP.NET MVC',
      'Microservices',
      'REST API Integration',
      'Event-Driven Services',
      'Windows Services',
      'Python',
      'Java',
    ],
  },
  {
    value: 'cloud',
    label: 'Cloud & Operations',
    items: [
      'AWS (S3)',
      'Azure (Blob)',
      'Docker',
      'Azure DevOps',
      'IIS',
      'Apache',
      'Load Balancing',
      'Monitoring & Alerting',
      'Git / GitHub / Bitbucket',
    ],
  },
  {
    value: 'data',
    label: 'Data & Integration',
    items: [
      'SQL Server',
      'PostgreSQL',
      'MySQL',
      'SQLite',
      'SSIS / ETL',
      'NATS',
      'Kafka',
      'Power BI',
      'JSON / XML',
    ],
  },
];

export const educationEntries: EducationEntry[] = [
  {
    degree: 'BSc in Computer Science and Engineering',
    institution: 'American International University-Bangladesh (AIUB)',
    period: '2011 - 2015',
    details: 'Cumulative GPA: 3.02 (out of 4.00)',
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Ibn Taimiya College, Comilla',
    period: '2010',
    details: 'Group: Science | GPA: 4.10',
  },
  {
    degree: 'Secondary School Certificate (SSC)',
    institution: 'PDB High School, Comilla',
    period: '2008',
    details: 'Group: Science | GPA: 5.00',
  },
];

export const personalDetails: PersonalDetail[] = [
  { label: "Father's Name", value: 'Md. Anwar Hossain' },
  { label: "Mother's Name", value: 'Amena Begum' },
  { label: 'Date of Birth', value: 'January 30, 1994' },
  { label: 'Gender', value: 'Male' },
  {
    label: 'Permanent Address',
    value: 'Village: Durgapur (Nuapara), Post office: Kabila Bazar, Thana: Burichang, District: Comilla',
  },
];
