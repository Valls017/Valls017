import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";

type Props = {
  labels: {
    github: string;
    linkedin: string;
    email: string;
    whatsapp: string;
  };
  urls: {
    github: string;
    linkedin: string;
    email: string;
    whatsapp: string;
  };
};

export default function SocialLinks({ labels, urls }: Props) {
  return (
    <ul className="m-0 grid list-none gap-2 p-0">
      <li>
        <a
          href={urls.github}
          className="js-link inline-flex items-center gap-2 border-b border-[var(--border)] pb-0.5 [font-family:var(--font-mono)] text-[0.9rem] transition duration-300 hover:-translate-y-px hover:border-[var(--fg)]"
          target="_blank"
          rel="noreferrer"
        >
          <Github size={16} strokeWidth={1.8} />
          <span>{labels.github}</span>
        </a>
      </li>
      <li>
        <a
          href={urls.linkedin}
          className="js-link inline-flex items-center gap-2 border-b border-[var(--border)] pb-0.5 [font-family:var(--font-mono)] text-[0.9rem] transition duration-300 hover:-translate-y-px hover:border-[var(--fg)]"
          target="_blank"
          rel="noreferrer"
        >
          <Linkedin size={16} strokeWidth={1.8} />
          <span>{labels.linkedin}</span>
        </a>
      </li>
      <li>
        <a
          href={`mailto:${urls.email}`}
          className="js-link inline-flex items-center gap-2 border-b border-[var(--border)] pb-0.5 [font-family:var(--font-mono)] text-[0.9rem] transition duration-300 hover:-translate-y-px hover:border-[var(--fg)]"
        >
          <Mail size={16} strokeWidth={1.8} />
          <span>{labels.email}</span>
        </a>
      </li>
      <li>
        <a
          href={urls.whatsapp}
          className="js-link inline-flex items-center gap-2 border-b border-[var(--border)] pb-0.5 [font-family:var(--font-mono)] text-[0.9rem] transition duration-300 hover:-translate-y-px hover:border-[var(--fg)]"
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={16} strokeWidth={1.8} />
          <span>{labels.whatsapp}</span>
        </a>
      </li>
    </ul>
  );
}
