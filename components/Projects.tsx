import { useMemo } from 'react';
import { projects } from '@/lib/data';
import ProjectCard from './ProjectCard';
import Section from './ui/Section';
import styles from './Projects.module.scss';

export default function Projects() {
  const { featuredProjects, otherProjects } = useMemo(
    () => ({
      featuredProjects: projects.filter((p) => p.featured),
      otherProjects: projects.filter((p) => !p.featured),
    }),
    []
  );

  return (
    <Section id="projects" title="Projects" className={styles.projects}>
      <div className={styles.featuredGrid}>
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} variant="featured" />
        ))}
      </div>

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
