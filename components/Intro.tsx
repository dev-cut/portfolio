import Link from 'next/link';
import { INTRO_DATA } from '@/lib/data/home';
import FadeIn from './animations/FadeIn';
import styles from './Intro.module.scss';

export default function Intro() {
  return (
    <section className={styles.intro} id="about">
      <div className={styles.container}>
        {/* Left Content */}
        <FadeIn direction="right" className={styles.content}>
          <h2 className={styles.greeting}>
            {INTRO_DATA.greeting.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </h2>
          <p className={styles.description}>{INTRO_DATA.description}</p>
          <Link
            href={INTRO_DATA.ctaLink}
            target="_blank"
            className={styles.ctaButton}
          >
            {INTRO_DATA.ctaText}
          </Link>
        </FadeIn>

        {/* Right Image Section */}
        <FadeIn direction="left" delay={0.2} className={styles.imageSection}>
          <div className={styles.imageWrapper}>
            {/* Circle Background */}
            <div className={styles.circleBg}></div>

            {/* Profile Image Placeholder */}
            <div className={styles.profileImagePlaceholder}></div>

            {/* Contact Card Overlay - Moved to ResumeGrid */}

            {/* Decorative Elements */}
            <div className={styles.dateBadge}>
              {INTRO_DATA.contact.birthDate}
            </div>
            <div className={styles.nationalityBadge}>
              {INTRO_DATA.contact.nationality}
            </div>
            <div className={styles.contactCard}>
              <h3 className={styles.contactTitle}>Contact</h3>
              <ul className={styles.contactList}>
                <li>
                  <span className={styles.icon}>📍</span>{' '}
                  {INTRO_DATA.contact.location}
                </li>
                <li>
                  <span className={styles.icon}>✉️</span>{' '}
                  {INTRO_DATA.contact.email}
                </li>
                <li>
                  <span className={styles.icon}>📞</span>{' '}
                  {INTRO_DATA.contact.phone}
                </li>
              </ul>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
