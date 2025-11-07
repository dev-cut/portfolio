import { projects } from '@/lib/data';
import ProjectCard from './ProjectCard';
import Section from './ui/Section';
import styles from './Projects.module.scss';

export default function Projects() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <Section id="projects" title="Projects" className={styles.projects}>
      {/* Featured Projects */}
      <div className={styles.featuredGrid}>
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} variant="featured" />
        ))}
      </div>

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <div className={styles.otherGrid}>
          {otherProjects.map((project) => (
            <ProjectCard key={project.id} project={project} variant="small" />
          ))}
        </div>
      )}
    </Section>
  );
}
