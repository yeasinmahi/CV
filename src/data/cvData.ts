export type SocialIconKey = 'github' | 'linkedin' | 'facebook';
export type RoleVariant = 'backend' | 'platform' | 'genai';

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
  problem: string;
  solution: string;
  impact: string;
  tech: string[];
  focus: RoleVariant[];
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

export interface StatItem {
  value: string;
  label: string;
}

export interface RoleVariantOption {
  value: RoleVariant;
  label: string;
  description: string;
}

export interface RoleVariantProfile {
  valueStatement: string;
  aboutSummary: string;
  coreStack: string[];
}

export interface AchievementItem {
  title: string;
  detail: string;
}

export const profileName = 'Md. Yeasin Arafat';
export const profileTitle = 'Sr. Software Engineer';
export const defaultRoleVariant: RoleVariant = 'backend';
export const socialProofBadge = 'Worked on Singapore government Town Council GenAI project';

export const roleVariants: RoleVariantOption[] = [
  {
    value: 'backend',
    label: 'Backend CV',
    description: 'API-first backend engineering and service reliability focus.',
  },
  {
    value: 'platform',
    label: 'Platform CV',
    description: 'Cross-cloud data and platform operations focus.',
  },
  {
    value: 'genai',
    label: 'GenAI CV',
    description: 'Applied GenAI assistant delivery and retrieval quality focus.',
  },
];

export const roleVariantProfiles: Record<RoleVariant, RoleVariantProfile> = {
  backend: {
    valueStatement:
      'I design and deliver backend platforms that turn complex business flows into reliable APIs, integrations, and production services.',
    aboutSummary:
      'Senior backend engineer with 10+ years of experience delivering API-first platforms, event-driven services, and enterprise integrations. I focus on dependable architecture, fast delivery, and practical leadership that improves team output.',
    coreStack: ['C# / ASP.NET', 'Microservices', 'REST APIs', 'NATS / Kafka', 'SQL Server / PostgreSQL', 'CI/CD'],
  },
  platform: {
    valueStatement:
      'I build cloud-ready platform pipelines that improve data reliability, observability, and enterprise integration speed.',
    aboutSummary:
      'Senior engineer focused on platform reliability across ingestion pipelines, event streams, and monitoring workflows. I have delivered production workloads across AWS and Azure while aligning teams around maintainable operations.',
    coreStack: ['AWS + Azure', 'Ingestion Pipelines', 'Event Streaming', 'Observability', 'Docker', 'Power BI'],
  },
  genai: {
    valueStatement:
      'I deliver GenAI assistants grounded in business data so teams get faster, more relevant answers they can trust.',
    aboutSummary:
      'Senior engineer working on applied GenAI systems for enterprise support workflows. I build ingestion and retrieval pipelines that keep answers scoped to domain-specific business knowledge and operational context.',
    coreStack: ['GenAI Assistants', 'RAG Workflows', 'Knowledge Ingestion', 'SharePoint/PDF Parsing', 'C# / ASP.NET', 'Prompt Quality'],
  },
};

export const statsStrip: StatItem[] = [
  { value: '10+', label: 'Years Experience' },
  { value: '2', label: 'Cloud Platforms' },
  { value: '6', label: 'Data Source Types' },
  { value: '5+', label: 'Enterprise Integrations' },
];

export const selectedAchievementsByVariant: Record<RoleVariant, AchievementItem[]> = {
  backend: [
    { title: '5+ Integrations', detail: 'Integrated multiple partner systems across identity, upsell, and enterprise data workflows.' },
    { title: '3 Core Apps', detail: 'Delivered ASP.NET applications for exam, CMS, and BOS admin operations at Banglalink.' },
    { title: '6 Source Types', detail: 'Enabled unified ingestion from PDF, SharePoint, JSON, Word, text, and websites for AI workflows.' },
  ],
  platform: [
    { title: '2 Clouds', detail: 'Delivered mirrored ingestion across AWS S3 and Azure Blob for resiliency.' },
    { title: 'NATS Events', detail: 'Published telemetry streams for downstream analytics and vendor data consumption.' },
    { title: 'Power BI Ops', detail: 'Improved incident triage speed through centralized operational dashboards.' },
  ],
  genai: [
    { title: 'Gov Project', detail: 'Delivered a Singapore Town Council GenAI assistant for business support workflows.' },
    { title: 'Council Scope', detail: 'Implemented Town Council data separation for context-safe answer retrieval.' },
    { title: '6 Data Inputs', detail: 'Supported ingestion and training from six enterprise knowledge source types.' },
  ],
};

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

export const keyProjects: ProjectEntry[] = [
  {
    title: 'Singapore Town Council GenAI Assistant',
    period: '2025 - Present',
    problem: 'Town Council teams spent time searching fragmented SOP and policy references before responding.',
    solution:
      'Built a council-scoped GenAI assistant with ingestion pipelines across PDF, SharePoint, JSON, Word, text, and websites.',
    impact:
      'Reduced manual lookup time and improved answer relevance by enforcing Town Council-specific business context at retrieval time.',
    tech: ['C#', 'ASP.NET', 'GenAI', 'RAG', 'SharePoint', 'JSON'],
    focus: ['backend', 'genai'],
  },
  {
    title: 'Cross-Cloud IoT Data Platform',
    period: '2023 - Present',
    problem: 'IoT analytics workflows suffered from fragmented vendor feeds and limited operational visibility.',
    solution:
      'Implemented mirrored ingestion across AWS S3 and Azure Blob with NATS event publishing and consolidated Power BI monitoring.',
    impact: 'Improved data pipeline reliability and reduced incident triage time for downstream analytics consumers.',
    tech: ['AWS S3', 'Azure Blob', 'NATS', 'Power BI', 'SQL Server'],
    focus: ['backend', 'platform', 'genai'],
  },
  {
    title: 'Enterprise Partner Integration Suite',
    period: '2019 - 2023',
    problem: 'Partner onboarding and customer campaign launches were slowed by manual integration dependencies.',
    solution: 'Delivered reusable ASP.NET integration services and automated Windows services for messaging and bonus workflows.',
    impact: 'Accelerated rollout for 5+ partner integrations and improved recurring campaign operations.',
    tech: ['ASP.NET', 'Windows Services', 'API Integration', 'SQL Server', 'Monitoring'],
    focus: ['backend', 'platform'],
  },
];

export const experiences: ExperienceEntry[] = [
  {
    role: 'Sr. Software Engineer',
    company: 'Surbana Jurong',
    period: 'May 2023 - Present',
    bullets: [
      'Delivered 1 Singapore government Town Council GenAI assistant for business support workflows.',
      'Enabled ingestion and training across 6 source formats: PDF, SharePoint, JSON, Word, text, and websites.',
      'Implemented Town Council-specific data separation for context-safe, council-level answer retrieval.',
      'Built ingestion pipelines across 2 cloud platforms (AWS S3 and Azure Blob) to improve resilience.',
      'Published aggregated telemetry via NATS streams for downstream analytics and vendor consumption.',
      'Acted as unofficial lead for the Bangladesh engineering pod, improving sprint predictability and release flow.',
      'Reduced DHL onboarding friction through backend transformation plugin delivery.',
    ],
  },
  {
    role: 'Application Developer',
    company: 'Banglalink',
    period: 'Sep 2019 - Apr 2023',
    bullets: [
      'Integrated 5+ third-party platforms to accelerate partner launch timelines.',
      'Delivered 3 ASP.NET applications covering exam, selfcare CMS, and BOS admin operations.',
      'Automated recurring customer workflows with 3 Windows Services for push, SMS, and bonus processing.',
      'Improved incident visibility with service monitoring, SMS/email alerts, and API trend reporting.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Akij Group',
    period: 'Mar 2018 - Sep 2019',
    bullets: [
      'Delivered backend modules for 2 enterprise platforms: ERP and Akij Development Architecture (ADA).',
      'Reduced regression risk by introducing Test-Driven Development (TDD) in existing codebases.',
      'Automated enterprise data movement through SSIS ETL workflows.',
      'Improved release consistency through Azure DevOps CI/CD pipeline ownership.',
    ],
  },
  {
    role: 'Project Manager & Team Lead',
    company: 'Futuristic Technologies Limited',
    period: 'Aug 2017 - Mar 2018',
    bullets: [
      'Led delivery of 4 ASP.NET MVC products: HRMS, multivendor ecommerce, diagnostic center, and inventory systems.',
      'Owned delivery planning, architecture alignment, and stakeholder communication for cross-functional teams.',
      'Delivered 2 supporting client apps (Unity and Android) integrated with backend business workflows.',
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
    items: ['SQL Server', 'PostgreSQL', 'MySQL', 'SQLite', 'SSIS / ETL', 'NATS', 'Kafka', 'Power BI', 'JSON / XML'],
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
