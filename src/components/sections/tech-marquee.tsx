import { LogoCloud } from '@/components/ui/logo-cloud-4';

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
const SI = 'https://cdn.simpleicons.org';

const techLogos = [

  { src: `${DEVICON}/java/java-original.svg`, alt: 'Java' },
  { src: `${DEVICON}/javascript/javascript-original.svg`, alt: 'JavaScript' },
  { src: `${DEVICON}/typescript/typescript-original.svg`, alt: 'TypeScript' },
  { src: `${DEVICON}/python/python-original.svg`, alt: 'Python' },
  { src: `${DEVICON}/php/php-original.svg`, alt: 'PHP' },
  { src: `${DEVICON}/kotlin/kotlin-original.svg`, alt: 'Kotlin' },
  { src: `${DEVICON}/html5/html5-original.svg`, alt: 'HTML5' },
  { src: `${DEVICON}/css3/css3-original.svg`, alt: 'CSS3' },
  { src: `${DEVICON}/react/react-original.svg`, alt: 'React' },
  { src: `${DEVICON}/flask/flask-original.svg`, alt: 'Flask' },
  { src: `${DEVICON}/tailwindcss/tailwindcss-original.svg`, alt: 'Tailwind CSS' },
  { src: `${DEVICON}/nodejs/nodejs-original.svg`, alt: 'Node.js' },
  { src: `${DEVICON}/express/express-original.svg`, alt: 'Express' },
  { src: `${DEVICON}/pandas/pandas-original.svg`, alt: 'Pandas' },
  { src: `${DEVICON}/numpy/numpy-original.svg`, alt: 'NumPy' },
  { src: `${DEVICON}/matplotlib/matplotlib-original.svg`, alt: 'Matplotlib' },
  { src: `${DEVICON}/scikitlearn/scikitlearn-original.svg`, alt: 'scikit-learn' },
  { src: `${DEVICON}/jupyter/jupyter-original.svg`, alt: 'Jupyter' },
  { src: `${DEVICON}/mysql/mysql-original.svg`, alt: 'MySQL' },
  { src: `${DEVICON}/appwrite/appwrite-original.svg`, alt: 'Appwrite' },
  { src: `${DEVICON}/git/git-original.svg`, alt: 'Git' },
  { src: `${DEVICON}/github/github-original.svg`, alt: 'GitHub' },
  { src: `${DEVICON}/vscode/vscode-original.svg`, alt: 'VS Code' },
  { src: `${DEVICON}/netbeans/netbeans-original.svg`, alt: 'NetBeans' },
  { src: `${DEVICON}/androidstudio/androidstudio-original.svg`, alt: 'Android Studio' },
  { src: `${DEVICON}/postman/postman-original.svg`, alt: 'Postman' },
  { src: `${DEVICON}/socketio/socketio-original.svg`, alt: 'Socket.IO' },
  { src: `${SI}/n8n`, alt: 'n8n' },
  { src: `${SI}/zapier`, alt: 'Zapier' },
];

export const TechMarquee = () => (
  <section
    id="tech"
    className="relative w-full overflow-x-hidden bg-background py-10 sm:py-14 md:py-20"
  >
    <LogoCloud logos={techLogos} />
  </section>
);
// Built by N.M. Riflan Mohamed · GitHub: https://github.com/RizAhd · LinkedIn: https://www.linkedin.com/in/riflan/
