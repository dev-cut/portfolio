'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import styles from './AuthModal.module.scss';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'signup';
}

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
  const supabase = createClient();

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError(null);
      
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
  }, [isOpen, initialTab]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!email || !email.trim()) {
        setError('이메일을 입력해주세요.');
        setLoading(false);
        return;
      }

      if (!password || !password.trim()) {
        setError('비밀번호를 입력해주세요.');
        setLoading(false);
        return;
      }

      const { data, error: authError } = await supabase.auth.signInWithPassword(
        {
          email: email.trim(),
          password,
        }
      );

      if (authError) {
        let errorMessage = authError.message;
        if (authError.message.includes('Invalid login credentials')) {
          errorMessage = '이메일 또는 비밀번호가 올바르지 않습니다.';
        } else if (authError.message.includes('Email not confirmed')) {
          errorMessage = '이메일 인증이 필요합니다.';
        }
        setError(errorMessage);
        setLoading(false);
        return;
      }

      if (data?.user) {
        onClose();
        window.location.reload();
      } else {
        setError('로그인에 실패했습니다. 다시 시도해주세요.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!email || !email.trim()) {
        setError('이메일을 입력해주세요.');
        setLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        setError('올바른 이메일 형식을 입력해주세요.');
        setLoading(false);
        return;
      }

      if (!password || !password.trim()) {
        setError('비밀번호를 입력해주세요.');
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError('비밀번호가 일치하지 않습니다.');
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError('비밀번호는 최소 6자 이상이어야 합니다.');
        setLoading(false);
        return;
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
      });

      if (signUpError) {
        let errorMessage = signUpError.message;
        if (signUpError.message.includes('User already registered')) {
          errorMessage = '이미 등록된 이메일입니다.';
        } else if (
          signUpError.message.includes('Password should be at least')
        ) {
          errorMessage = '비밀번호는 최소 6자 이상이어야 합니다.';
        }
        setError(errorMessage);
        setLoading(false);
        return;
      }

      if (data?.user) {
        setError(null);
        setError('회원가입이 완료되었습니다! 이메일을 확인해주세요.');
        setTimeout(() => {
          setActiveTab('login');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setError(null);
        }, 2000);
      } else {
        setError('회원가입에 실패했습니다. 다시 시도해주세요.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        <div className={styles.content}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'login' ? styles.active : ''}`}
              onClick={() => {
                setActiveTab('login');
                setError(null);
              }}
            >
              로그인
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'signup' ? styles.active : ''}`}
              onClick={() => {
                setActiveTab('signup');
                setError(null);
              }}
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
                <div className={styles.field}>
                  <label htmlFor="login-email" className={styles.label}>
                    이메일
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={styles.input}
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="login-password" className={styles.label}>
                    비밀번호
                  </label>
                  <input
                    id="login-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={styles.input}
                    placeholder="비밀번호를 입력하세요"
                    autoComplete="current-password"
                  />
                </div>
                {error && <div className={styles.error}>{error}</div>}
                <button
                  type="submit"
                  disabled={loading}
                  className={styles.submitButton}
                >
                  {loading ? '로그인 중...' : '로그인'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className={styles.form}>
                <h2 id="auth-modal-title" className={styles.title}>
                  회원가입
                </h2>
                <div className={styles.field}>
                  <label htmlFor="signup-email" className={styles.label}>
                    이메일
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={styles.input}
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="signup-password" className={styles.label}>
                    비밀번호
                  </label>
                  <input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={styles.input}
                    placeholder="최소 6자 이상"
                    autoComplete="new-password"
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="signup-confirm" className={styles.label}>
                    비밀번호 확인
                  </label>
                  <input
                    id="signup-confirm"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={styles.input}
                    placeholder="비밀번호를 다시 입력하세요"
                    autoComplete="new-password"
                  />
                </div>
                {error && (
                  <div
                    className={`${styles.error} ${
                      error.includes('완료') ? styles.success : ''
                    }`}
                  >
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className={styles.submitButton}
                >
                  {loading ? '가입 중...' : '회원가입'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
