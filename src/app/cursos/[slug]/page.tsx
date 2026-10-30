import type { Metadata } from 'next';
import CourseDetail from '@/components/CourseDetail/CourseDetail';

export const metadata: Metadata = {
  title: 'Curso',
};

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CourseDetail slug={slug} />;
}
