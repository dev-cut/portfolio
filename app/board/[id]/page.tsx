import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { getPost } from '@/app/actions/posts';
import { createClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils/date';
import { FRONTEND_TECH_STACK, CATEGORY_COLORS } from '@/lib/tech-stack';
import PostActions from '@/components/PostActions';
import styles from './[id].module.scss';

// 기술 스택 이름으로 카테고리 색상 찾기
function getTechCategoryColor(techName: string) {
  const tech = FRONTEND_TECH_STACK.find((t) => t.name === techName);
  return tech ? CATEGORY_COLORS[tech.category] : null;
}

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PostDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const post = await getPost(id);
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
    
    return {
      title: `${post.title} | 게시판`,
      description: post.content.slice(0, 160) || post.title,
      openGraph: {
        title: post.title,
        description: post.content.slice(0, 160) || post.title,
        type: 'article',
        publishedTime: post.created_at,
        modifiedTime: post.updated_at,
        url: `${baseUrl}/board/${id}`,
      },
      twitter: {
        card: 'summary',
        title: post.title,
        description: post.content.slice(0, 160) || post.title,
      },
    };
  } catch {
    return {
      title: '게시글을 찾을 수 없습니다',
    };
  }
}

async function PostActionButtons({ postId, authorId }: { postId: string; authorId: string }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user || user.id !== authorId) return null;

  return <PostActions postId={postId} />;
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;
  
  let post;
  try {
    post = await getPost(id);
  } catch (error) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.content.slice(0, 160) || post.title,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    url: `${baseUrl}/board/${id}`,
  };

  return (
    <div className={styles.container}>
      <Script
        id={`structured-data-article-${id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className={styles.header}>
        <Link href="/board" className={styles.backLink}>
          목록으로
        </Link>
        <PostActionButtons postId={id} authorId={post.author_id} />
      </div>
      
      <article className={styles.post}>
        <h1 className={styles.title}>{post.title}</h1>
        
        {(post.overview || post.work_period || post.team_composition || post.role || post.tech_stack) && (
          <div className={styles.infoSection}>
            {post.overview && (
              <div className={styles.infoItem}>
                <h3 className={styles.infoLabel}>개요</h3>
                <p className={styles.infoValue}>{post.overview}</p>
              </div>
            )}
            
            <div className={styles.infoGrid}>
              {post.work_period && (
                <div className={styles.infoItem}>
                  <h3 className={styles.infoLabel}>작업 기간</h3>
                  <p className={styles.infoValue}>
                    {(() => {
                      // "2024-01-15 - 2024-03-20" 형식을 "2024년 1월 15일 - 2024년 3월 20일" 형식으로 변환
                      const parts = post.work_period.split(' - ');
                      if (parts.length === 2) {
                        try {
                          const startDate = new Date(parts[0].trim());
                          const endDate = new Date(parts[1].trim());
                          if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
                            const formatDate = (date: Date) => {
                              const year = date.getFullYear();
                              const month = date.getMonth() + 1;
                              const day = date.getDate();
                              return `${year}년 ${month}월 ${day}일`;
                            };
                            return `${formatDate(startDate)} - ${formatDate(endDate)}`;
                          }
                        } catch (e) {
                          // 파싱 실패 시 원본 반환
                        }
                      }
                      return post.work_period;
                    })()}
                  </p>
                </div>
              )}
              {post.role && (
                <div className={styles.infoItem}>
                  <h3 className={styles.infoLabel}>역할</h3>
                  <p className={styles.infoValue}>{post.role}</p>
                </div>
              )}
            </div>
            
            {post.team_composition && post.team_composition.length > 0 && (
              <div className={styles.infoItem}>
                <h3 className={styles.infoLabel}>팀 구성</h3>
                <div className={styles.techStack}>
                  {post.team_composition.map((member, index) => (
                    <span key={index} className={styles.techTag}>
                      {member}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {post.tech_stack && post.tech_stack.length > 0 && (
              <div className={styles.infoItem}>
                <h3 className={styles.infoLabel}>사용 기술 스택</h3>
                <div className={styles.techStack}>
                  {post.tech_stack.map((tech, index) => {
                    const categoryColor = getTechCategoryColor(tech);
                    return (
                      <span
                        key={index}
                        className={styles.techTag}
                        style={
                          categoryColor
                            ? {
                                backgroundColor: categoryColor.bg,
                                color: categoryColor.text,
                                borderColor: categoryColor.border,
                              }
                            : undefined
                        }
                      >
                        {tech}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className={styles.meta}>
          <span className={styles.date}>
            작성일: {formatDate(post.created_at, { includeTime: true })}
          </span>
          {post.updated_at !== post.created_at && (
            <span className={styles.updated}>
              수정일: {formatDate(post.updated_at, { includeTime: true })}
            </span>
          )}
        </div>
        
        {post.main_contribution && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>주요 기여</h2>
            <div className={styles.sectionContent}>
              {post.main_contribution.split('\n').map((paragraph, index) => (
                <p key={`contribution-${index}`}>{paragraph || '\u00A0'}</p>
              ))}
            </div>
          </section>
        )}
        
        <div className={styles.content}>
          {post.content.split('\n').map((paragraph, index) => (
            <p key={`paragraph-${index}`}>{paragraph || '\u00A0'}</p>
          ))}
        </div>
        
        {post.achievements && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>성과</h2>
            <div className={styles.sectionContent}>
              {post.achievements.split('\n').map((paragraph, index) => (
                <p key={`achievements-${index}`}>{paragraph || '\u00A0'}</p>
              ))}
            </div>
          </section>
        )}
        
        {post.reflection && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>회고 및 배운 점</h2>
            <div className={styles.sectionContent}>
              {post.reflection.split('\n').map((paragraph, index) => (
                <p key={`reflection-${index}`}>{paragraph || '\u00A0'}</p>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}

