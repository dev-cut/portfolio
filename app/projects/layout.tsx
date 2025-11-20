import Header from '@/components/Header';
import { ReactNode } from 'react';

export default function ProjectsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

