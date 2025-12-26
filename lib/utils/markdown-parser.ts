import { cache } from 'react';

export interface ProjectMetadata {
  id: string;
  title: string;
  period: string;
  techStack: string[];
  summary: string;
}

export const parseProjectMarkdown = cache((
  id: string,
  markdown: string
): ProjectMetadata => {
  const lines = markdown.split('\n');
  let title = 'Untitled Project';
  let period = '';
  let techStack: string[] = [];
  let summary = '';

  // 1. Extract Title (First line starting with # )
  const titleLine = lines.find((line) => line.startsWith('# '));
  if (titleLine) {
    title = titleLine.replace('# ', '').trim();
  }

  // 2. Extract Period (Look for ### 작업 기간 section)
  const periodIndex = lines.findIndex((line) => line.includes('### 작업 기간'));
  if (periodIndex !== -1) {
    // Usually the next line is empty, then the bullet point
    for (
      let i = periodIndex + 1;
      i < Math.min(periodIndex + 5, lines.length);
      i++
    ) {
      const line = lines[i].trim();
      if (line.startsWith('- ')) {
        period = line.replace('- ', '').trim();
        break;
      }
    }
  }

  // 3. Extract Tech Stack (Look for ### 사용 기술 스택 section)
  const techIndex = lines.findIndex((line) =>
    line.includes('### 사용 기술 스택')
  );
  if (techIndex !== -1) {
    for (let i = techIndex + 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('### ')) break; // Next section
      if (line.startsWith('- ')) {
        // Remove bold markers if present (**React** -> React)
        const tech = line.replace('- ', '').replace(/\*\*/g, '').trim();
        if (tech) techStack.push(tech);
      }
    }
  }

  // 4. Extract Summary (Text under ### 개요)
  const summaryIndex = lines.findIndex((line) => line.includes('### 개요'));
  if (summaryIndex !== -1) {
    const summaryLines = [];
    for (let i = summaryIndex + 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('### ')) break;
      if (line.length > 0) {
        summaryLines.push(line);
      }
    }
    summary = summaryLines.join(' ');
  }

  return {
    id,
    title,
    period,
    techStack,
    summary,
  };
});
