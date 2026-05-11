export type Lang = "en" | "es";
export type ThemeMode = "light" | "dark";

export const profile = {
  name: "Marcos Velaquez Vela",
  handle: "Dauphinsss",
  email: "marcosvelasquezvela123@gmail.com",
  github: "https://github.com/Dauphinsss",
  linkedin: "https://www.linkedin.com/in/dauphinsss/",
  whatsapp: "https://wa.me/59172776768"
};

export const copy = {
  en: {
    label: "Digital Playground",
    name: "Marcos Velaquez Vela",
    bio: "Web, mobile, and desktop developer... and much more, I think..., I am good, I promise.",
    workTitle: "Visual Pulse",
    workItems: ["THIS SHOULD", "REPRESENT ME", "FOR REAL"],
    aboutTitle: "About",
    aboutText:
      "Hi, I am Marko... I know a lot of things as a developer, so I am fullstack and, em..., mmm..., well, I want to get a job, so I made this portfolio to show what I can do :).",
    linksTitle: "Contact",
    skillsTitle: "Skills",
    skillsRows: [
      "JavaScript · TypeScript · React · React Native · Expo · Next.js · Angular · Astro · HTML5 · CSS3 · TailwindCSS",
      "Node.js · Express · NestJS · Rust · Python · PostgreSQL · MySQL · Prisma · Firebase",
      "GSAP · Framer Motion · Tauri · Git · VS Code · Claude"
    ],
    github: "GitHub",
    linkedin: "LinkedIn",
    email: "Email",
    whatsapp: "WhatsApp",
    footer: "Made with a lot of <3 and caffeine."
  },
  es: {
    label: "Playground Digital",
    name: "Marcos Velaquez Vela",
    bio: "Desarrollador web, mobile y desktop... y mucho mas, creo..., soy bueno, lo prometo.",
    workTitle: "Pulso Visual",
    workItems: ["ESTO DEBERIA", "REPRESENTARME", "DE VERDAD"],
    aboutTitle: "Sobre Mi",
    aboutText:
      "Hola, soy Marko... se muchas cosas como desarrollador, por eso soy fullstack y, em..., mmm..., bueno, quiero conseguir trabajo, asi que hice este portafolio para mostrar lo que puedo hacer :).",
    linksTitle: "Contacto",
    skillsTitle: "Skills",
    skillsRows: [
      "JavaScript · TypeScript · React · React Native · Expo · Next.js · Angular · Astro · HTML5 · CSS3 · TailwindCSS",
      "Node.js · Express · NestJS · Rust · Python · PostgreSQL · MySQL · Prisma · Firebase",
      "GSAP · Framer Motion · Tauri · Git · VS Code · Claude"
    ],
    github: "GitHub",
    linkedin: "LinkedIn",
    email: "Email",
    whatsapp: "WhatsApp",
    footer: "Hecho con mucho <3 y cafeina."
  }
} as const;
