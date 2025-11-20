'use client';

import Button from '@/components/ui/Button';
import FormField from '@/components/ui/FormField';
import DateRangePicker from '@/components/ui/DateRangePicker';
import TechStackField from '@/components/Board/TechStackField';
import TeamCompositionField from '@/components/Board/TeamCompositionField';
import RoleField from '@/components/Board/RoleField';
import { usePostForm } from './usePostForm';
import styles from './write.module.scss';

export default function WritePage() {
  const {
    formData,
    teamMembers,
    setTeamMembers,
    loading,
    error,
    isEditMode,
    loadingPost,
    user,
    handleFieldChange,
    handleSubmit,
    router,
  } = usePostForm();

  if (loadingPost) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>프로젝트를 불러오는 중...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.container}>
        <div className={styles.authRequired}>
          <p>프로젝트를 등록하려면 로그인이 필요합니다.</p>
          <Button onClick={() => router.push('/')}>홈으로 가기</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>
          {isEditMode ? '프로젝트 수정' : '프로젝트 등록'}
        </h1>
        <p className={styles.pageDescription}>
          {isEditMode
            ? '프로젝트를 수정할 수 있습니다.'
            : '새로운 프로젝트를 등록해보세요.'}
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
          placeholder="프로젝트 제목을 입력하세요"
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
          <TeamCompositionField
            teamMembers={teamMembers}
            onChange={setTeamMembers}
          />
        </div>

        <div className={styles.field}>
          <RoleField
            roles={formData.role}
            onChange={(roles) => handleFieldChange('role', roles)}
          />
        </div>

        <div className={styles.field}>
          <TechStackField
            selectedStack={formData.tech_stack}
            onChange={(stack) => handleFieldChange('tech_stack', stack)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="main_contribution" className={styles.label}>
            주요 기여
          </label>
          <textarea
            id="main_contribution"
            value={formData.main_contribution}
            onChange={(e) =>
              handleFieldChange('main_contribution', e.target.value)
            }
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
            placeholder="프로젝트 내용을 입력하세요&#10;&#10;여러 줄로 작성할 수 있습니다."
            rows={15}
            required
          />
          <p className={styles.helpText}>{formData.content.length}자 작성됨</p>
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
            {isEditMode ? '수정하기' : '등록하기'}
          </Button>
        </div>
      </form>
    </div>
  );
}
