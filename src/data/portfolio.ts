export interface Project {
  no: string;
  title: string;
  description: string;
  stack: string[];
  repo: string;
  /** Category pill shown on the project card. */
  tag: string;
  /** Shown as a full-width card in the home page's featured stack. */
  featured?: boolean;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  points: string[];
}

export interface EducationItem {
  qualification: string;
  institution: string;
  period: string;
}

export interface LanguageItem {
  name: string;
  level: string;
  percent: number;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  /** Omitted when the certificate itself carries no issue date. */
  date?: string;
  image: string;
}

export const profile = {
  name: 'Riflan Mohamed',
  title: 'Software Engineer & AI Developer',
  tagline: 'Software Engineer · AI Engineer',
  status: 'Available for Work',
  year: '2026',
  photo: '/riflan-portrait.webp',
  location: 'Sri Lanka',
  shortBio:
    'I build scalable, data-driven applications and intelligent AI solutions, blending full-stack engineering with machine learning and real-time systems.',
  about:
    "Aspiring Software Engineering Intern and AI enthusiast with strong expertise in Java, JavaScript, PHP, and Python, complemented by experience in React, React Native, and full-stack development. I specialize in building scalable, data-driven applications, developing AI solutions using Flask, OpenAI, and Pinecone, and implementing real-time systems with WebSockets. I'm familiar with databases, REST APIs, Git/GitHub, and modern development tooling. I also build AI automation workflows with n8n, Zapier & Make, and bring a strong problem-solving mindset with an eagerness to contribute to impactful projects in AI, Machine Learning, and innovative technologies.",
} as const;

export const contact = {
  email: 'rizlanahmd4545@gmail.com',
  github: 'https://github.com/RizAhd',
  linkedin: 'https://www.linkedin.com/in/riflan/',
  whatsapp: 'https://wa.me/94784342391',
} as const;

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#journey' },
];

export const projects: Project[] = [
  {
    no: '01',
    tag: 'AI Assistant',
    featured: true,
    title: 'Loki: AI Voice Assistant',
    description:
      'Hands-free, wake-word voice assistant for Windows. Speech is transcribed, reasoned over by Claude with live MCP tool access, and spoken back, all driving a real-time browser waveform. Multilingual (English, Sinhala, Tamil).',
    stack: ['Python', 'Claude', 'MCP', 'LiveKit', 'OpenAI', 'FastMCP', 'WebSocket', 'aiohttp'],
    repo: 'https://github.com/RizAhd/Loki-AI-Personal-Assitant',
  },
  {
    no: '02',
    tag: 'Mobile App',
    featured: true,
    title: 'Replate: Food Rescue App',
    description:
      'Complete full-stack, Firebase-connected food-rescue platform connecting surplus food with people in need.',
    stack: ['Kotlin', 'Java', 'JavaScript', 'Firebase', 'Android Studio', 'Gradle'],
    repo: 'https://github.com/RizAhd/Replate',
  },
  {
    no: '03',
    tag: 'Full-Stack',
    featured: true,
    title: 'PingMe: Real-Time Chat',
    description:
      'Full-stack real-time chat application with authentication and WebSocket messaging across web & mobile.',
    stack: ['TypeScript', 'Java', 'WebSocket', 'Node.js', 'Express', 'Expo', 'MySQL', 'REST API'],
    repo: 'https://github.com/RizAhd/PingMe-Real-time-Chat-Application',
  },
  {
    no: '04',
    tag: 'AI Research',
    title: 'Universal Research Assistant',
    description:
      'API-orchestration research chatbot that answers from multiple verified sources with citations and live summaries.',
    stack: ['Python', 'OpenAI', 'Jupyter', 'HTML', 'CSS', 'JavaScript'],
    repo: 'https://github.com/RizAhd/reasearch-asistant',
  },
  {
    no: '05',
    tag: 'AI Chatbot',
    featured: true,
    title: 'Medi Guide Chatbot',
    description:
      'AI medical assistant for symptom checking, real-time conversational guidance, and personalized recommendations.',
    stack: ['Python', 'Flask', 'OpenAI', 'NLP', 'Pinecone'],
    repo: 'https://github.com/RizAhd/Medi-Guide-Chat-Bot',
  },
  {
    no: '06',
    tag: 'Mobile App',
    title: 'Qiera: Real Estate App',
    description:
      'Real-estate mobile application with property search, listings, profiles, and a polished responsive UI.',
    stack: ['React Native', 'TypeScript', 'JavaScript', 'Appwrite'],
    repo: 'https://github.com/RizAhd/Qiera',
  },
  {
    no: '07',
    tag: 'Mobile App',
    title: 'Cinemax: Movie App',
    description:
      'Movie-discovery app with TMDB data, real-time features, and a sleek native UI with gradients & blur.',
    stack: ['React Native', 'TypeScript', 'Expo Router', 'NativeWind', 'Socket.io', 'TMDB API', 'Appwrite'],
    repo: 'https://github.com/RizAhd/cinemax-movie-app',
  },
  {
    no: '08',
    tag: 'Machine Learning',
    title: 'Heart Disease Prediction',
    description:
      'Machine-learning model predicting heart-disease risk, built as a Diploma in ML & AI project.',
    stack: ['Python', 'Jupyter', 'Pandas', 'scikit-learn', 'ML'],
    repo: 'https://github.com/RizAhd/Heart-Disease-Prediction',
  },
  {
    no: '09',
    tag: 'Web App',
    title: 'Booksy: Java Web App',
    description:
      'Java web application with Servlets & Hibernate, a MySQL backend, and PayHere payment integration.',
    stack: ['Java', 'Servlets', 'Hibernate', 'MySQL', 'PayHere', 'HTML', 'CSS'],
    repo: 'https://github.com/RizAhd/Booksy',
  },
  {
    no: '10',
    tag: 'Website',
    title: 'Bluemoon Private Limited',
    description:
      'Corporate website for Bluemoon Private Limited: a clean, responsive marketing front-end.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    repo: 'https://github.com/RizAhd/Bluemoon-Private-limited-Website',
  },
  {
    no: '11',
    tag: 'Full-Stack',
    title: 'Momento: To-Do App',
    description: 'Full-stack productivity to-do application with a relational backend.',
    stack: ['Java', 'JavaScript', 'React Native', 'MySQL', 'CSS'],
    repo: 'https://github.com/RizAhd/momento-todo-app',
  },
  {
    no: '12',
    tag: 'Desktop App',
    title: 'Z Gen Cinema Reservation',
    description:
      'Cinema reservation system with movie scheduling, cashier handling, and ticketing. Contributed as a junior developer.',
    stack: ['Java', 'MySQL', 'Jasper Reports'],
    repo: 'https://github.com/RizAhd/Cinema-Reservation-System',
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: 'Programming Languages',
    items: ['Java', 'JavaScript', 'TypeScript', 'PHP', 'Python', 'HTML', 'CSS'],
  },
  {
    category: 'Frameworks & Libraries',
    items: ['React', 'React Native', 'Flask', 'Tailwind CSS', 'REST APIs', 'Node.js'],
  },
  {
    category: 'AI & Data Science',
    items: ['Machine Learning', 'NLP', 'RAG Chatbots', 'OpenAI', 'Pinecone', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
  },
  {
    category: 'Databases & Tools',
    items: ['MySQL', 'Appwrite', 'Git / GitHub', 'NetBeans', 'VS Code'],
  },
  {
    category: 'Real-Time & Networking',
    items: ['WebSocket', 'Real-Time Apps'],
  },
  {
    category: 'AI Automation',
    items: ['n8n', 'Zapier', 'Make', 'Workflow Automation', 'API Orchestration'],
  },
  {
    category: 'Other Skills',
    items: ['IoT Basics', 'Mobile App Dev', 'Full-Stack Dev', 'Responsive UI', 'API Integration'],
  },
];

export const experience: ExperienceItem[] = [
  {
    role: 'AI Automation Engineer Intern',
    company: 'Innov8Smart',
    period: 'Feb 2026 – Present',
    points: [
      'Building AI-powered automation workflows using n8n, Zapier, and Make to streamline repetitive business processes.',
      'Automating marketing operations (lead capture, email/social campaigns and CRM sync) with AI-driven content and decisioning.',
      'Integrating AI tools and APIs (LLMs, OpenAI) into workflows for smart routing, summarization, and data enrichment.',
      'Researching and evaluating AI tools and automation platforms to design efficient, scalable solutions for the team.',
    ],
  },
];

export const education: EducationItem[] = [
  {
    qualification: 'BSc (Hons) Software Engineering',
    institution: 'Birmingham City University',
    period: '2022 – 2026',
  },
  {
    qualification: 'Diploma in Machine Learning & AI',
    institution: 'ICBS International',
    period: '2025 – 2026',
  },
  {
    qualification: 'Diploma in English',
    institution: 'ESOFT',
    period: '2024 – 2025',
  },
];

export const languages: LanguageItem[] = [
  { name: 'Tamil', level: 'Native', percent: 100 },
  { name: 'English', level: 'Conversational', percent: 80 },
  { name: 'Sinhala', level: 'Conversational', percent: 80 },
];

// Transcribed from the source certificates in /public/certificates.
// Newest first; entries without a `date` carry no issue date on the artwork.
export const certifications: CertificationItem[] = [
  {
    title: 'AI Engineering Bootcamp',
    issuer: 'STEMLink',
    date: 'Aug 2026',
    image: '/certificates/1.jpg',
  },
  {
    title: 'AWS Cloud Practitioner (CLF-C02)',
    issuer: 'DataCamp',
    date: 'Aug 2026',
    image: '/certificates/2.jpg',
  },
  {
    title: 'AI Engineer for Developers Associate',
    issuer: 'DataCamp',
    date: 'Aug 2026',
    image: '/certificates/3.jpg',
  },
  {
    title: 'The AI Filmmaking Pipeline',
    issuer: 'Higgsfield Academy',
    date: 'Jul 2026',
    image: '/certificates/4.jpg',
  },
  {
    title: 'Claude Code 101',
    issuer: 'Anthropic',
    image: '/certificates/6.jpg',
  },
  {
    title: 'Claude 101',
    issuer: 'Anthropic',
    image: '/certificates/7.jpg',
  },
  {
    title: 'n8n Course Level 1',
    issuer: 'n8n',
    image: '/certificates/5.jpg',
  },
  {
    title: 'Intermediate Machine Learning',
    issuer: 'Kaggle',
    date: 'Dec 2025',
    image: '/certificates/8.jpg',
  },
  {
    title: 'Intro to Machine Learning',
    issuer: 'Kaggle',
    date: 'Dec 2025',
    image: '/certificates/9.jpg',
  },
  {
    title: 'OCI Foundations Associate',
    issuer: 'Oracle',
    date: '2024',
    image: '/certificates/10.jpg',
  },
];

export const stats = [
  { value: '8', label: 'Languages' },
  { value: '12', label: 'Projects' },
  { value: '10', label: 'Certifications' },
];
export interface Service {
  title: string;
  description: string;
  tools: string[];
}

export const services: Service[] = [
  {
    title: 'AI & Machine Learning',
    description:
      'RAG chatbots, NLP assistants and predictive models, from data prep in Pandas to production answers grounded in your own sources.',
    tools: ['Python', 'OpenAI', 'Pinecone', 'Flask', 'scikit-learn', 'Pandas'],
  },
  {
    title: 'Full-Stack Development',
    description:
      'Typed, maintainable web apps with clean REST APIs, real-time features over WebSockets and relational data underneath.',
    tools: ['React', 'TypeScript', 'Node.js', 'Java', 'MySQL', 'WebSocket'],
  },
  {
    title: 'Mobile Apps',
    description:
      'Cross-platform and native Android apps with polished, responsive UI, authentication and cloud-backed data.',
    tools: ['React Native', 'Expo', 'Kotlin', 'Firebase', 'Appwrite'],
  },
  {
    title: 'AI Automation',
    description:
      'Workflows that take repetitive work off your team: lead capture, CRM sync, AI summarisation and smart routing.',
    tools: ['n8n', 'Zapier', 'Make', 'OpenAI', 'API Orchestration'],
  },
];

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

export interface Tool {
  name: string;
  /** Logo URL; tools without a public logo get a lettered tile. */
  icon?: string;
}

export interface ToolGroup {
  category: string;
  tools: Tool[];
}

const SI = 'https://cdn.simpleicons.org';
const dev = (slug: string, variant = 'original') => `${DEVICON}/${slug}/${slug}-${variant}.svg`;

export const techGroups: ToolGroup[] = [
  {
    category: 'Languages',
    tools: [
      { name: 'Python', icon: dev('python') },
      { name: 'Java', icon: dev('java') },
      { name: 'JavaScript', icon: dev('javascript') },
      { name: 'TypeScript', icon: dev('typescript') },
      { name: 'PHP', icon: dev('php') },
      { name: 'Kotlin', icon: dev('kotlin') },
      { name: 'HTML5', icon: dev('html5') },
      { name: 'CSS3', icon: dev('css3') },
    ],
  },
  {
    category: 'Frontend & Mobile',
    tools: [
      { name: 'React', icon: dev('react') },
      { name: 'React Native', icon: dev('react') },
      { name: 'Expo', icon: dev('expo') },
      { name: 'Tailwind CSS', icon: dev('tailwindcss') },
      { name: 'NativeWind' },
      { name: 'Android Studio', icon: dev('androidstudio') },
    ],
  },
  {
    category: 'Backend & Real-Time',
    tools: [
      { name: 'Node.js', icon: dev('nodejs') },
      { name: 'Express', icon: dev('express') },
      { name: 'Flask', icon: dev('flask') },
      { name: 'Hibernate', icon: dev('hibernate') },
      { name: 'Socket.IO', icon: dev('socketio') },
      { name: 'aiohttp', icon: `${SI}/aiohttp` },
      { name: 'WebSocket' },
      { name: 'REST APIs' },
    ],
  },
  {
    category: 'AI & Machine Learning',
    tools: [
      { name: 'OpenAI' },
      { name: 'Claude', icon: `${SI}/claude` },
      { name: 'MCP', icon: `${SI}/modelcontextprotocol` },
      { name: 'LiveKit', icon: `${SI}/livekit/151413` },
      { name: 'Pinecone' },
      { name: 'scikit-learn', icon: dev('scikitlearn') },
      { name: 'Pandas', icon: dev('pandas') },
      { name: 'NumPy', icon: dev('numpy') },
      { name: 'Matplotlib', icon: dev('matplotlib') },
      { name: 'Seaborn' },
      { name: 'Jupyter', icon: dev('jupyter') },
      { name: 'Kaggle', icon: dev('kaggle') },
    ],
  },
  {
    category: 'Data & Cloud',
    tools: [
      { name: 'MySQL', icon: dev('mysql') },
      { name: 'Firebase', icon: dev('firebase') },
      { name: 'Appwrite', icon: dev('appwrite') },
      { name: 'AWS', icon: dev('amazonwebservices', 'original-wordmark') },
      { name: 'Oracle Cloud', icon: dev('oracle') },
    ],
  },
  {
    category: 'Automation & Tools',
    tools: [
      { name: 'n8n', icon: `${SI}/n8n` },
      { name: 'Zapier', icon: `${SI}/zapier` },
      { name: 'Make', icon: `${SI}/make` },
      { name: 'Git', icon: dev('git') },
      { name: 'GitHub', icon: dev('github') },
      { name: 'Postman', icon: dev('postman') },
      { name: 'VS Code', icon: dev('vscode') },
      { name: 'NetBeans', icon: dev('netbeans') },
      { name: 'Gradle', icon: dev('gradle') },
    ],
  },
];

export interface ProcessStep {
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    title: 'Discover & Plan',
    description:
      'I start with the problem, the people it affects and the constraints, then turn that into a clear scope and roadmap.',
  },
  {
    title: 'Design & Prototype',
    description:
      'Flows, data models and API contracts are sketched and validated early, so the build has a solid shape before code.',
  },
  {
    title: 'Build',
    description:
      'Clean, typed code across front-end, back-end and AI, shipped in small increments you can see working.',
  },
  {
    title: 'Test & Optimise',
    description:
      'I test across devices, profile performance and tune prompts and models until the experience feels right.',
  },
  {
    title: 'Ship & Support',
    description:
      'Deployment, monitoring and iteration after launch, so the product keeps working as it grows.',
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: 'What services do you offer?',
    answer:
      'AI and machine-learning solutions (RAG chatbots, NLP, predictive models), full-stack web development, mobile apps with React Native and Kotlin, and AI automation workflows with n8n, Zapier and Make.',
  },
  {
    question: 'Are you available for work?',
    answer:
      "Yes. I'm currently an AI Automation Engineer intern at Innov8Smart and open to software engineering and AI roles, internships and freelance projects.",
  },
  {
    question: 'Which technologies do you work with?',
    answer:
      'Mainly Python, Java, TypeScript and JavaScript, with React, React Native, Flask and Node.js, MySQL, Firebase and Appwrite for data, and OpenAI and Pinecone for AI features.',
  },
  {
    question: 'How do you approach a new project?',
    answer:
      'Discover and plan, design and prototype, build in small increments, test and optimise, then ship and support. The process is laid out in more detail above.',
  },
  {
    question: 'Can I see your code?',
    answer:
      'Yes. Every project on this site links to its GitHub repository, and more of my work is on github.com/RizAhd.',
  },
  {
    question: 'How do we get started?',
    answer:
      "Send me a message with the form below or email me directly. Tell me what you're building and I'll get back to you.",
  },
];

// Built by N.M. Riflan Mohamed · GitHub: https://github.com/RizAhd · LinkedIn: https://www.linkedin.com/in/riflan/
