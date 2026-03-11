'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { m, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import type { TrendingKeyword } from '@/app/actions/trending';
import styles from './TrendingKeywords.module.scss';

interface TrendingTickerProps {
  keywords: TrendingKeyword[];
  updatedAt: string;
}

const TICKER_INTERVAL = 3000; // 3초마다 롤링

export default function TrendingTicker({
  keywords,
  updatedAt,
}: TrendingTickerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const formattedTime = updatedAt
    ? new Intl.DateTimeFormat('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Seoul',
      }).format(new Date(updatedAt))
    : '';

  // 롤링 타이머
  const startRolling = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % keywords.length);
    }, TICKER_INTERVAL);
  }, [keywords.length]);

  const stopRolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isExpanded && keywords.length > 0) {
      startRolling();
    } else {
      stopRolling();
    }
    return () => stopRolling();
  }, [isExpanded, keywords.length, startRolling, stopRolling]);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  if (keywords.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>
          현재 실시간 트렌드를 불러올 수 없습니다.
        </p>
      </div>
    );
  }

  const currentKeyword = keywords[currentIndex];

  return (
    <LazyMotion features={domAnimation}>
      <section
        className={styles.section}
        id="trending"
        aria-label="실시간 트렌드"
      >
        <div className={styles.container}>
          {/* 접힌 상태: 한 줄 티커 */}
          {!isExpanded && (
            <div className={styles.tickerWrapper}>
              <div className={styles.tickerLeft}>
                <div className={styles.liveIndicator}>
                  <span className={styles.liveDot} />
                  Live
                </div>
                <h2 className={styles.sectionTitle}>실시간 트렌드</h2>
              </div>

              <div className={styles.tickerCenter}>
                <AnimatePresence mode="popLayout">
                  <m.a
                    key={currentKeyword.rank}
                    href={currentKeyword.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.tickerItem}
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    aria-label={`${currentKeyword.rank}위: ${currentKeyword.keyword}`}
                  >
                    <span
                      className={`${styles.tickerRank} ${currentKeyword.rank <= 3 ? styles.rankTop : ''}`}
                    >
                      {currentKeyword.rank}
                    </span>
                    <span className={styles.tickerKeyword}>
                      {currentKeyword.keyword}
                    </span>
                    <StatusBadge status={currentKeyword.status} />
                  </m.a>
                </AnimatePresence>
              </div>

              <div className={styles.tickerRight}>
                {formattedTime && (
                  <time className={styles.timestamp} dateTime={updatedAt}>
                    {formattedTime}
                  </time>
                )}
                <button
                  className={styles.expandBtn}
                  onClick={toggleExpand}
                  aria-expanded={false}
                  aria-label="실시간 트렌드 전체보기"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* 펼친 상태: 전체 목록 */}
          {isExpanded && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className={styles.header}>
                <div className={styles.titleArea}>
                  <div className={styles.liveIndicator}>
                    <span className={styles.liveDot} />
                    Live
                  </div>
                  <h2 className={styles.sectionTitle}>실시간 트렌드</h2>
                </div>
                <div className={styles.headerRight}>
                  {formattedTime && (
                    <time className={styles.timestamp} dateTime={updatedAt}>
                      {formattedTime} 기준
                    </time>
                  )}
                  <button
                    className={`${styles.expandBtn} ${styles.expandBtnActive}`}
                    onClick={toggleExpand}
                    aria-expanded={true}
                    aria-label="실시간 트렌드 접기"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 10L8 6L12 10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className={styles.grid}>
                {keywords.map((item, index) => (
                  <m.a
                    key={item.rank}
                    href={item.url}
                    className={styles.keywordRow}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.rank}위: ${item.keyword}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.04,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <span
                      className={`${styles.rank} ${item.rank <= 3 ? styles.rankTop : ''}`}
                    >
                      {item.rank}
                    </span>
                    <span className={styles.keyword}>{item.keyword}</span>
                    <StatusBadge status={item.status} />
                    <span className={styles.arrow} aria-hidden="true">
                      →
                    </span>
                  </m.a>
                ))}
              </div>

              <div className={styles.source}>
                <span className={styles.sourceText}>powered by</span>
                <a
                  href="https://www.daum.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.sourceLink}
                >
                  Daum
                </a>
              </div>
            </m.div>
          )}
        </div>
      </section>
    </LazyMotion>
  );
}

/** 순위 변동 상태 배지 */
function StatusBadge({ status }: { status: string }) {
  if (status === 'new') {
    return <span className={styles.statusNew}>NEW</span>;
  }

  const num = parseInt(status, 10);
  if (isNaN(num) || num === 0) return null;

  if (num > 0) {
    return (
      <span className={styles.statusUp} aria-label={`${num}단계 상승`}>
        ▲ {num}
      </span>
    );
  }

  return (
    <span
      className={styles.statusDown}
      aria-label={`${Math.abs(num)}단계 하락`}
    >
      ▼ {Math.abs(num)}
    </span>
  );
}
