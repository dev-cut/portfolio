/**
 * 날짜 포맷팅 유틸리티
 */

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export function formatDate(
  dateString: string,
  options: {
    includeTime?: boolean;
  } = {}
): string {
  const date = new Date(dateString);
  const formatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...(options.includeTime && {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };

  return date.toLocaleDateString('ko-KR', formatOptions);
}

/**
 * 날짜 범위 문자열을 한글 형식으로 포맷팅
 * "2024-01-15 - 2024-03-20" -> "2024년 1월 15일 - 2024년 3월 20일"
 */
export function formatDateRange(dateRange: string): string {
  const parts = dateRange.split(' - ');
  if (parts.length !== 2) return dateRange;

  try {
    const startDate = new Date(parts[0].trim());
    const endDate = new Date(parts[1].trim());

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return dateRange;
    }

    // date-fns 포맷 사용
    const startStr = format(startDate, 'yyyy년 M월 d일', { locale: ko });
    const endStr = format(endDate, 'yyyy년 M월 d일', { locale: ko });

    return `${startStr} - ${endStr}`;
  } catch {
    return dateRange;
  }
}

/**
 * 근무 기간 계산
 * "2022.06 - 재직중" -> "1년 4개월"
 * "2021.02 - 2021.09" -> "8개월"
 */
export function calculateDuration(period: string): string {
  const [startStr, endStr] = period.split(' - ').map((s) => s.trim());
  if (!startStr) return '';

  const startDate = new Date(startStr.replace('.', '-'));
  const endDate =
    endStr === '재직중' ? new Date() : new Date(endStr.replace('.', '-'));

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return '';

  let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
  months -= startDate.getMonth();
  months += endDate.getMonth();

  // 시작월 포함 계산 (예: 2월~9월은 8개월)
  months += 1;

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years > 0) {
    return remainingMonths > 0
      ? `${years}년 ${remainingMonths}개월`
      : `${years}년`;
  }
  return `${remainingMonths}개월`;
}
