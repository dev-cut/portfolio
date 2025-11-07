import { socialLinks } from '@/lib/data';
import Section from './ui/Section';
import styles from './Contact.module.scss';

export default function Contact() {
  return (
    <Section id="contact" title="Contact" className={styles.contact}>
      <p className={styles.description}>
        프로젝트나 협업에 관심이 있으시다면 언제든 연락주세요!
      </p>
      <div className={styles.links}>
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {link.name}
          </a>
        ))}
      </div>
    </Section>
  );
}
