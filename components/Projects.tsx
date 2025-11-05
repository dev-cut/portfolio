import { projects } from '@/lib/data';
import Link from 'next/link';
import styles from './Projects.module.scss';

export default function Projects() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.content}>
        <h2 className={styles.title}>Projects</h2>

        {/* Featured Projects */}
        <div className={styles.featuredGrid}>
          {featuredProjects.map((project) => (
            <div key={project.id} className={styles.projectCard}>
              <div className={styles.imageContainer}>
                <div className={styles.imageContent}>
                  <span className={styles.imageText}>{project.title}</span>
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDescription}>{project.description}</p>
                <div className={styles.techList}>
                  {project.technologies.map((tech) => (
                    <span key={tech} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className={styles.cardLinks}>
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      Live Demo →
                    </Link>
                  )}
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.link} ${styles.secondary}`}
                    >
                      GitHub →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div className={styles.otherGrid}>
            {otherProjects.map((project) => (
              <div key={project.id} className={styles.smallCard}>
                <h3 className={styles.smallCardTitle}>{project.title}</h3>
                <p className={styles.smallCardDescription}>
                  {project.description}
                </p>
                <div className={styles.smallTechList}>
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className={styles.smallTechTag}>
                      {tech}
                    </span>
                  ))}
                </div>
                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.smallLink}
                  >
                    GitHub →
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
