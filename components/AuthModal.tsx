'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import FormField from './ui/FormField';
import ErrorMessage from './ui/ErrorMessage';
import Button from './ui/Button';
import {
  validateEmail,
  validatePassword,
  validatePasswordMatch,
} from '@/lib/utils/validation';
import {
  getLoginErrorMessage,
  getSignupErrorMessage,
} from '@/lib/utils/authMessages';
import styles from './AuthModal.module.scss';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'signup';
}

const SIGNUP_SUCCESS_DELAY = 2000;

export default function AuthModal({
  isOpen,
  onClose,
  initialTab = 'login',
}: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Supabase 클라이언트 메모이제이션
  const supabase = useMemo(() => createClient(), []);

  // 폼 초기화 함수
  const resetForm = useCallback(() => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      resetForm();

      // 모달이 열릴 때 body 스크롤만 방지
      document.body.style.overflow = 'hidden';
    } else {
      // 모달이 닫힐 때 스크롤 복원
      document.body.style.overflow = '';
    }

    return () => {
      // 컴포넌트 언마운트 시에도 스크롤 복원
      document.body.style.overflow = '';
    };
  }, [isOpen, initialTab, resetForm]);

  // ESC 키 핸들러 메모이제이션
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, handleEscape]);

  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setLoading(true);

      try {
        const emailValidation = validateEmail(email);
        if (!emailValidation.isValid) {
          setError(emailValidation.error!);
          setLoading(false);
          return;
        }

        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
          setError(passwordValidation.error!);
          setLoading(false);
          return;
        }

        const { data, error: authError } =
          await supabase.auth.signInWithPassword({
            email: email.trim(),
            password: password.trim(),
          });

        if (authError) {
          setError(getLoginErrorMessage(authError.message));
          setLoading(false);
          return;
        }

        if (data?.user) {
          setLoading(false);
          resetForm();
          onClose();
        } else {
          setError('로그인에 실패했습니다. 다시 시도해주세요.');
          setLoading(false);
        }
      } catch (err) {
        console.error('Login error:', err);
        setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
        setLoading(false);
      }
    },
    [email, password, supabase, resetForm, onClose]
  );

  const handleSignup = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setLoading(true);

      try {
        const emailValidation = validateEmail(email);
        if (!emailValidation.isValid) {
          setError(emailValidation.error!);
          setLoading(false);
          return;
        }

        const passwordValidation = validatePassword(password);
        if (!passwordValidation.isValid) {
          setError(passwordValidation.error!);
          setLoading(false);
          return;
        }

        const passwordMatchValidation = validatePasswordMatch(
          password,
          confirmPassword
        );
        if (!passwordMatchValidation.isValid) {
          setError(passwordMatchValidation.error!);
          setLoading(false);
          return;
        }

        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password: password.trim(),
        });

        if (signUpError) {
          setError(getSignupErrorMessage(signUpError.message));
          setLoading(false);
          return;
        }

        if (data?.user) {
          setLoading(false);
          setError('회원가입이 완료되었습니다! 이메일을 확인해주세요.');
          setTimeout(() => {
            setActiveTab('login');
            resetForm();
          }, SIGNUP_SUCCESS_DELAY);
        } else {
          setError('회원가입에 실패했습니다. 다시 시도해주세요.');
          setLoading(false);
        }
      } catch (err) {
        console.error('Signup error:', err);
        setError('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
        setLoading(false);
      }
    },
    [email, password, confirmPassword, supabase, resetForm]
  );

  // 탭 변경 핸들러 메모이제이션
  const handleTabChange = useCallback((tab: 'login' | 'signup') => {
    setActiveTab(tab);
    setError(null);
  }, []);

  // 오버레이 클릭 핸들러 메모이제이션
  const handleOverlayClick = useCallback(() => {
    if (!loading) {
      onClose();
    }
  }, [loading, onClose]);

  // 모달 클릭 핸들러 메모이제이션 (이벤트 전파 방지)
  const handleModalClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const isSuccessMessage = useMemo(
    () => error?.includes('완료') ?? false,
    [error]
  );

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div
        className={styles.modal}
        onClick={handleModalClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        <div className={styles.content}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'login' ? styles.active : ''}`}
              onClick={() => handleTabChange('login')}
            >
              로그인
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'signup' ? styles.active : ''}`}
              onClick={() => handleTabChange('signup')}
            >
              회원가입
            </button>
          </div>

          <div className={styles.formContainer}>
            {activeTab === 'login' ? (
              <form onSubmit={handleLogin} className={styles.form}>
                <h2 id="auth-modal-title" className={styles.title}>
                  로그인
                </h2>
                <FormField
                  label="이메일"
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  autoComplete="email"
                  required
                />
                <FormField
                  label="비밀번호"
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  autoComplete="current-password"
                  required
                />
                <ErrorMessage message={error || ''} />
                <Button
                  type="submit"
                  loading={loading}
                  loadingText="로그인 중..."
                >
                  로그인
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className={styles.form}>
                <h2 id="auth-modal-title" className={styles.title}>
                  회원가입
                </h2>
                <FormField
                  label="이메일"
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  autoComplete="email"
                  required
                />
                <FormField
                  label="비밀번호"
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="최소 6자 이상"
                  autoComplete="new-password"
                  required
                />
                <FormField
                  label="비밀번호 확인"
                  id="signup-confirm"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="비밀번호를 다시 입력하세요"
                  autoComplete="new-password"
                  required
                />
                <ErrorMessage
                  message={error || ''}
                  type={isSuccessMessage ? 'success' : 'error'}
                />
                <Button
                  type="submit"
                  loading={loading}
                  loadingText="가입 중..."
                >
                  회원가입
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
