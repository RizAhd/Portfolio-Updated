export interface Project {
  no: string;
  title: string;
  description: string;
  stack: string[];
  repo: string;
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

export const profile = {
  name: 'Riflan Mohamed',
  title: 'Software Engineer & AI Developer',
  tagline: 'Software Engineer · AI Engineer',
  status: 'Available for Work',
  year: '2026',
  photo: '/riflan.png',
  location: 'Sri Lanka',
  shortBio:
    'I build scalable, data-driven applications and intelligent AI solutions — blending full-stack engineering with machine learning and real-time systems.',
  about:
    "Aspiring Software Engineering Intern and AI enthusiast with strong expertise in Java, JavaScript, PHP, and Python, complemented by experience in React, React Native, and full-stack development. I specialize in building scalable, data-driven applications, developing AI solutions using Flask, OpenAI, and Pinecone, and implementing real-time systems with WebSockets. I'm familiar with databases, REST APIs, Git/GitHub, and modern development tooling. I also build AI automation workflows with n8n, Zapier & Make — and bring a strong problem-solving mindset with an eagerness to contribute to impactful projects in AI, Machine Learning, and innovative technologies.",
} as const;

export const contact = {
  email: 'rizlanahmd4545@gmail.com',
  github: 'https://github.com/RizAhd',
  linkedin: 'https://www.linkedin.com/in/riflan/',
} as const;

export const navLinks = [
  { label: 'ABOUT', href: '#about' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'RESUME', href: '#resume' },
  { label: 'CONTACT', href: '#contact' },
];

export const projects: Project[] = [
  {
    no: '01',
    title: 'Loki — AI Voice Assistant',
    description:
      'Hands-free, wake-word voice assistant for Windows — speech is transcribed, reasoned over by Claude with live MCP tool access, and spoken back, all driving a real-time browser waveform. Multilingual (English, Sinhala, Tamil).',
    stack: ['Python', 'Claude', 'MCP', 'LiveKit', 'OpenAI', 'FastMCP', 'WebSocket', 'aiohttp'],
    repo: 'https://github.com/RizAhd/Loki-AI-Personal-Assitant',
  },
  {
    no: '02',
    title: 'Replate — Food Rescue App',
    description:
      'Complete full-stack, Firebase-connected food-rescue platform — connecting surplus food with people in need.',
    stack: ['Kotlin', 'Java', 'JavaScript', 'Firebase', 'Android Studio', 'Gradle'],
    repo: 'https://github.com/RizAhd/Replate',
  },
  {
    no: '03',
    title: 'PingMe — Real-Time Chat',
    description:
      'Full-stack real-time chat application with authentication and WebSocket messaging across web & mobile.',
    stack: ['TypeScript', 'Java', 'WebSocket', 'Node.js', 'Express', 'Expo', 'MySQL', 'REST API'],
    repo: 'https://github.com/RizAhd/PingMe-Real-time-Chat-Application',
  },
  {
    no: '04',
    title: 'Universal Research Assistant',
    description:
      'API-orchestration research chatbot that answers from multiple verified sources with citations and live summaries.',
    stack: ['Python', 'OpenAI', 'Jupyter', 'HTML', 'CSS', 'JavaScript'],
    repo: 'https://github.com/RizAhd/reasearch-asistant',
  },
  {
    no: '05',
    title: 'Medi Guide Chatbot',
    description:
      'AI medical assistant — symptom checking, real-time conversational guidance, and personalized recommendations.',
    stack: ['Python', 'Flask', 'OpenAI', 'NLP', 'Pinecone'],
    repo: 'https://github.com/RizAhd/Medi-Guide-Chat-Bot',
  },
  {
    no: '06',
    title: 'Qiera — Real Estate App',
    description:
      'Real-estate mobile application — property search, listings, profiles, and a polished responsive UI.',
    stack: ['React Native', 'TypeScript', 'JavaScript', 'Appwrite'],
    repo: 'https://github.com/RizAhd/Qiera',
  },
  {
    no: '07',
    title: 'Cinemax — Movie App',
    description:
      'Movie-discovery app with TMDB data, real-time features, and a sleek native UI with gradients & blur.',
    stack: ['React Native', 'TypeScript', 'Expo Router', 'NativeWind', 'Socket.io', 'TMDB API', 'Appwrite'],
    repo: 'https://github.com/RizAhd/cinemax-movie-app',
  },
  {
    no: '08',
    title: 'Heart Disease Prediction',
    description:
      'Machine-learning model predicting heart-disease risk — built as a Diploma in ML & AI project.',
    stack: ['Python', 'Jupyter', 'Pandas', 'scikit-learn', 'ML'],
    repo: 'https://github.com/RizAhd/Heart-Disease-Prediction',
  },
  {
    no: '09',
    title: 'Booksy — Java Web App',
    description:
      'Java web application with Servlets & Hibernate, a MySQL backend, and PayHere payment integration.',
    stack: ['Java', 'Servlets', 'Hibernate', 'MySQL', 'PayHere', 'HTML', 'CSS'],
    repo: 'https://github.com/RizAhd/Booksy',
  },
  {
    no: '10',
    title: 'Bluemoon Private Limited',
    description:
      'Corporate website for Bluemoon Private Limited — clean, responsive marketing front-end.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    repo: 'https://github.com/RizAhd/Bluemoon-Private-limited-Website',
  },
  {
    no: '11',
    title: 'Momento — To-Do App',
    description: 'Full-stack productivity to-do application with a relational backend.',
    stack: ['Java', 'JavaScript', 'React Native', 'MySQL', 'CSS'],
    repo: 'https://github.com/RizAhd/momento-todo-app',
  },
  {
    no: '12',
    title: 'Z Gen Cinema Reservation',
    description:
      'Cinema reservation system — movie scheduling, cashier handling, and ticketing. Contributed as a junior developer.',
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
    role: 'AI Automation Engineer — Intern',
    company: 'Innov8Smart',
    period: 'Feb 2026 – Present',
    points: [
      'Building AI-powered automation workflows using n8n, Zapier, and Make to streamline repetitive business processes.',
      'Automating marketing operations — lead capture, email/social campaigns, and CRM sync — with AI-driven content and decisioning.',
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

export const stats = [
  { value: '8', label: 'Languages' },
  { value: '12', label: 'Projects' },
  { value: '3', label: 'Certifications' },
];
