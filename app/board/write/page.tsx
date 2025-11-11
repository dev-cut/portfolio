'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { createPost, updatePost, getPost } from '@/app/actions/posts';
import Button from '@/components/ui/Button';
import FormField from '@/components/ui/FormField';
import DateRangePicker from '@/components/ui/DateRangePicker';
import Chip from '@/components/ui/Chip';
import { FRONTEND_TECH_STACK, CATEGORY_COLORS, CATEGORY_LABELS, getTechStackByCategory, type TechStackCategory, type TechStackInfo } from '@/lib/tech-stack';
import { EXPERIENCE_LABELS, formatTeamComposition, parseTeamComposition, type TeamMember, type ExperienceLevel } from '@/lib/team-roles';
import styles from './write.module.scss';

interface PostFormData {
  title: string;
  content: string;
  overview: string;
  work_period: string;
  team_composition: string[];
  role: string;
  tech_stack: string[];
  main_contribution: string;
  achievements: string;
  reflection: string;
}

export default function WritePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    overview: '',
    work_period: '',
    team_composition: [],
    role: '',
    tech_stack: [],
    main_contribution: '',
    achievements: '',
    reflection: '',
  });
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<TechStackCategory>>(
    new Set()
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [postId, setPostId] = useState<string | null>(null);
  const [loadingPost, setLoadingPost] = useState(false);

  // 편집 모드인지 확인 및 기존 게시글 로드
  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setIsEditMode(true);
      setPostId(id);
      setLoadingPost(true);
      getPost(id)
        .then((post) => {
          const defaultValues = {
            title: '',
            content: '',
            overview: '',
            work_period: '',
            team_composition: [],
            role: '',
            tech_stack: [],
            main_contribution: '',
            achievements: '',
            reflection: '',
          };
          
          setFormData({
            ...defaultValues,
            ...post,
            team_composition: post.team_composition || [],
            tech_stack: post.tech_stack || [],
          });
          setTeamMembers(parseTeamComposition(post.team_composition || []));
        })
        .catch((err) => {
          setError(err instanceof Error ? err.message : '게시글을 불러오는데 실패했습니다.');
        })
        .finally(() => {
          setLoadingPost(false);
        });
    }
  }, [searchParams]);

  // 모든 hooks는 early return 이전에 호출되어야 함
  const groupedTechStack = useMemo(() => getTechStackByCategory(), []);

  const filteredTechStack = useMemo(() => {
    const filtered: Partial<Record<TechStackCategory, TechStackInfo[]>> = {};

    Object.entries(groupedTechStack).forEach(([category, techs]) => {
      const filteredTechs = techs.filter((tech) => {
        const matchesSearch = !searchQuery || 
          tech.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = !showSelectedOnly || 
          formData.tech_stack.includes(tech.name);
        return matchesSearch && matchesFilter;
      });
      
      if (filteredTechs.length > 0) {
        filtered[category as TechStackCategory] = filteredTechs;
      }
    });

    return filtered as Record<TechStackCategory, TechStackInfo[]>;
  }, [groupedTechStack, searchQuery, showSelectedOnly, formData.tech_stack]);

  // 팀 구성 변경 시 formData 업데이트
  useEffect(() => {
    const formatted = formatTeamComposition(teamMembers);
    setFormData((prev) => ({ ...prev, team_composition: formatted }));
  }, [teamMembers]);

  if (loadingPost) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>게시글을 불러오는 중...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.container}>
        <div className={styles.authRequired}>
          <p>게시글을 작성하려면 로그인이 필요합니다.</p>
          <Button onClick={() => router.push('/')}>홈으로 가기</Button>
        </div>
      </div>
    );
  }

  const handleFieldChange = (field: keyof PostFormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTechStackToggle = (techName: string) => {
    setFormData((prev) => {
      const currentStack = prev.tech_stack;
      const isSelected = currentStack.includes(techName);
      const newStack = isSelected
        ? currentStack.filter((item) => item !== techName)
        : [...currentStack, techName];
      return { ...prev, tech_stack: newStack };
    });
  };

  const handleTeamMemberCountChange = (level: ExperienceLevel, count: number) => {
    if (count < 0) return;
    
    setTeamMembers((prev) => {
      if (count === 0) {
        return prev.filter((m) => m.level !== level);
      }
      
      const existingIndex = prev.findIndex((m) => m.level === level);
      if (existingIndex >= 0) {
        return prev.map((m, idx) => idx === existingIndex ? { ...m, count } : m);
      }
      
      return [...prev, { level, count }];
    });
  };

  const toggleCategory = (category: TechStackCategory) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      prev.has(category) ? newSet.delete(category) : newSet.add(category);
      return newSet;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formattedTeam = formatTeamComposition(teamMembers);
      const postData = {
        title: formData.title,
        content: formData.content,
        overview: formData.overview || undefined,
        work_period: formData.work_period || undefined,
        team_composition: formattedTeam.length > 0 ? formattedTeam : undefined,
        role: formData.role || undefined,
        tech_stack: formData.tech_stack.length > 0 ? formData.tech_stack : undefined,
        main_contribution: formData.main_contribution || undefined,
        achievements: formData.achievements || undefined,
        reflection: formData.reflection || undefined,
      };

      if (isEditMode && postId) {
        await updatePost(postId, postData, user?.id);
      } else {
        await createPost(postData, user?.id);
      }
      router.push('/board');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : '게시글 작성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>
          {isEditMode ? '게시글 수정' : '게시글 작성'}
        </h1>
        <p className={styles.pageDescription}>
          {isEditMode 
            ? '게시글을 수정할 수 있습니다.' 
            : '새로운 게시글을 작성해보세요.'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && (
          <div className={styles.error}>
            <svg
              className={styles.errorIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </div>
        )}

        <FormField
          label="제목"
          id="title"
          value={formData.title}
          onChange={(e) => handleFieldChange('title', e.target.value)}
          placeholder="게시글 제목을 입력하세요"
          required
        />

        <FormField
          label="개요"
          id="overview"
          value={formData.overview}
          onChange={(e) => handleFieldChange('overview', e.target.value)}
          placeholder="프로젝트 개요를 입력하세요"
        />

        <div className={styles.field}>
          <label htmlFor="work_period" className={styles.label}>
            작업 기간
          </label>
          <DateRangePicker
            id="work_period"
            value={formData.work_period}
            onChange={(value) => handleFieldChange('work_period', value)}
            placeholder="시작 날짜와 종료 날짜를 선택하세요"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>팀 구성</label>
          <div className={styles.teamRoleContainer}>
            {(Object.keys(EXPERIENCE_LABELS) as ExperienceLevel[]).map((level) => {
              const member = teamMembers.find((m) => m.level === level);
              const count = member?.count || 0;
              
              return (
                <div key={level} className={styles.teamRoleItem}>
                  <label className={styles.levelLabel}>
                    {EXPERIENCE_LABELS[level]}
                  </label>
                  <div className={styles.countInputWrapper}>
                    <input
                      type="number"
                      min="0"
                      max="99"
                      value={count === 0 ? '' : count}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '') {
                          handleTeamMemberCountChange(level, 0);
                        } else {
                          const newCount = parseInt(value, 10) || 0;
                          handleTeamMemberCountChange(level, newCount);
                        }
                      }}
                      onFocus={(e) => {
                        // 포커스 시 전체 선택
                        e.target.select();
                      }}
                      className={styles.countInput}
                      placeholder="0"
                    />
                    <span className={styles.countLabel}>명</span>
                  </div>
                </div>
              );
            })}
          </div>
          <p className={styles.helpText}>
            {(() => {
              const total = teamMembers.reduce((sum, m) => sum + m.count, 0);
              return total > 0 ? `총 ${total}명` : '';
            })()}
          </p>
        </div>

        <FormField
          label="역할"
          id="role"
          value={formData.role}
          onChange={(e) => handleFieldChange('role', e.target.value)}
          placeholder="본인의 역할을 입력하세요"
        />

        <div className={styles.field}>
          <div className={styles.techStackHeader}>
            <label className={styles.label}>사용 기술 스택</label>
            <div className={styles.techStackControls}>
              <input
                type="text"
                placeholder="검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={showSelectedOnly}
                  onChange={(e) => setShowSelectedOnly(e.target.checked)}
                  className={styles.checkbox}
                />
                선택된 것만 보기
              </label>
            </div>
          </div>
          
          <div className={styles.categoryContainer}>
            {Object.entries(filteredTechStack).map(([category, techs]) => {
              if (!techs || techs.length === 0) return null;
              
              const isExpanded = expandedCategories.has(category as TechStackCategory);
              const categoryColor = CATEGORY_COLORS[category as TechStackCategory];
              const selectedCount = techs.filter((tech) => 
                formData.tech_stack.includes(tech.name)
              ).length;

              return (
                <div key={category} className={styles.categorySection}>
                  <button
                    type="button"
                    className={styles.categoryHeader}
                    onClick={() => toggleCategory(category as TechStackCategory)}
                    style={{ borderLeftColor: categoryColor.border }}
                  >
                    <span className={styles.categoryTitle}>
                      {CATEGORY_LABELS[category as TechStackCategory]}
                      <span className={styles.categoryCount}>
                        ({selectedCount}/{techs.length})
                      </span>
                    </span>
                    <span className={styles.expandIcon}>
                      {isExpanded ? '▼' : '▶'}
                    </span>
                  </button>
                  {isExpanded && (
                    <div className={styles.chipContainer}>
                      {techs.map((tech) => (
                        <Chip
                          key={tech.name}
                          label={tech.name}
                          selected={formData.tech_stack.includes(tech.name)}
                          onClick={() => handleTechStackToggle(tech.name)}
                          categoryColor={CATEGORY_COLORS[tech.category]}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <p className={styles.helpText}>
            {formData.tech_stack.length > 0 && `${formData.tech_stack.length}개 기술 스택 선택됨`}
          </p>
        </div>

        <div className={styles.field}>
          <label htmlFor="main_contribution" className={styles.label}>
            주요 기여
          </label>
          <textarea
            id="main_contribution"
            value={formData.main_contribution}
            onChange={(e) => handleFieldChange('main_contribution', e.target.value)}
            className={styles.textarea}
            placeholder="본인이 주요하게 기여한 부분을 입력하세요"
            rows={5}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="achievements" className={styles.label}>
            성과
          </label>
          <textarea
            id="achievements"
            value={formData.achievements}
            onChange={(e) => handleFieldChange('achievements', e.target.value)}
            className={styles.textarea}
            placeholder="프로젝트의 성과를 입력하세요"
            rows={5}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="content" className={styles.label}>
            내용
          </label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) => handleFieldChange('content', e.target.value)}
            className={styles.textarea}
            placeholder="게시글 내용을 입력하세요&#10;&#10;여러 줄로 작성할 수 있습니다."
            rows={15}
            required
          />
          <p className={styles.helpText}>
            {formData.content.length}자 작성됨
          </p>
        </div>

        <div className={styles.field}>
          <label htmlFor="reflection" className={styles.label}>
            회고 및 배운 점
          </label>
          <textarea
            id="reflection"
            value={formData.reflection}
            onChange={(e) => handleFieldChange('reflection', e.target.value)}
            className={styles.textarea}
            placeholder="프로젝트를 통해 배운 점과 회고를 입력하세요"
            rows={8}
          />
        </div>

        <div className={styles.actions}>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
            disabled={loading}
          >
            취소
          </Button>
          <Button
            type="submit"
            loading={loading}
            loadingText={isEditMode ? '수정 중...' : '작성 중...'}
            disabled={!formData.title.trim() || !formData.content.trim()}
          >
            {isEditMode ? '수정하기' : '작성하기'}
          </Button>
        </div>
      </form>
    </div>
  );
}

