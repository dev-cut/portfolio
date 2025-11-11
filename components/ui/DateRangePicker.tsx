'use client';

import { useState, useRef, useEffect } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import 'react-day-picker/dist/style.css';
import styles from './DateRangePicker.module.scss';

interface DateRangePickerProps {
  value?: string; // "2024-01-15 - 2024-03-20" 형식
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
}

export default function DateRangePicker({
  value,
  onChange,
  placeholder = '시작 날짜와 종료 날짜를 선택하세요',
  id,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const onChangeRef = useRef(onChange);
  const prevValueRef = useRef<string | undefined>(value);
  const tempRangeRef = useRef<DateRange | undefined>(undefined); // 임시 선택 상태

  // onChange ref 업데이트 (의존성 문제 방지)
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // 날짜 파싱 헬퍼 함수
  const parseDateRange = (
    dateValue: string | undefined
  ): DateRange | undefined => {
    if (!dateValue) return undefined;

    const parts = dateValue.split(' - ');
    if (parts.length === 2) {
      const startStr = parts[0].trim();
      const endStr = parts[1].trim();

      const parseDate = (dateStr: string): Date | undefined => {
        const normalized = dateStr.replace(/\./g, '-');
        const date = new Date(normalized);
        if (!isNaN(date.getTime())) {
          return date;
        }
        return undefined;
      };

      const startDate = parseDate(startStr);
      const endDate = parseDate(endStr);

      if (startDate && endDate) {
        return { from: startDate, to: endDate };
      } else if (startDate) {
        return { from: startDate, to: undefined };
      }
    }
    return undefined;
  };

  // value를 파싱하여 range 상태 초기화
  useEffect(() => {
    // value가 실제로 변경된 경우에만 파싱
    if (prevValueRef.current === value) {
      return;
    }
    prevValueRef.current = value;

    const parsedRange = parseDateRange(value);
    setRange(parsedRange);
    tempRangeRef.current = parsedRange;
  }, [value]);

  // 달력이 열릴 때 value를 기반으로 range 복원
  useEffect(() => {
    if (isOpen) {
      const parsedRange = parseDateRange(value);
      setRange(parsedRange);
      tempRangeRef.current = parsedRange;
    }
  }, [isOpen, value]);

  // range 변경 시 value 업데이트는 적용 버튼을 통해서만 수행
  // 자동 업데이트 제거 (적용 버튼으로만 업데이트)

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  // 표시용 날짜 포맷팅
  const getDisplayValue = () => {
    if (!value) return placeholder;

    const parts = value.split(' - ');
    if (parts.length === 2) {
      const startStr = parts[0].trim();
      const endStr = parts[1].trim();

      try {
        const startDate = new Date(startStr);
        const endDate = new Date(endStr);

        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
          return `${format(startDate, 'yyyy년 M월 d일', { locale: ko })} - ${format(endDate, 'yyyy년 M월 d일', { locale: ko })}`;
        }
      } catch (e) {
        // 파싱 실패 시 원본 값 반환
      }
    }

    return value;
  };

  const displayValue = getDisplayValue();
  const hasValue = !!value;
  const hasCompleteRange = !!(range?.from && range?.to);
  const pendingRange = range?.from && !range?.to;

  const handleApply = () => {
    if (range?.from && range?.to) {
      const formatted = `${format(range.from, 'yyyy-MM-dd', { locale: ko })} - ${format(range.to, 'yyyy-MM-dd', { locale: ko })}`;
      prevValueRef.current = formatted;
      onChangeRef.current(formatted);
      tempRangeRef.current = range;
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    // 취소 시 value를 기반으로 range 복원 (변경사항 취소)
    const parsedRange = parseDateRange(value);
    setRange(parsedRange);
    tempRangeRef.current = parsedRange;
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <div
        className={styles.inputWrapper}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <input
          id={id}
          type="text"
          readOnly
          value={displayValue}
          className={`${styles.input} ${hasValue ? styles.hasValue : ''}`}
          placeholder={placeholder}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        />
        <svg
          className={styles.calendarIcon}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        {hasValue && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={(e) => {
              e.stopPropagation();
              setRange(undefined);
              prevValueRef.current = '';
              onChangeRef.current('');
            }}
            aria-label="날짜 초기화"
          >
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {isOpen && (
        <div className={styles.calendarWrapper}>
          <DayPicker
            mode="range"
            selected={range}
            onSelect={setRange}
            locale={ko}
            numberOfMonths={2}
            className={styles.calendar}
          />
          {(hasCompleteRange || pendingRange) && (
            <div className={styles.actionButtons}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={handleCancel}
              >
                취소
              </button>
              <button
                type="button"
                className={styles.applyButton}
                onClick={handleApply}
                disabled={!hasCompleteRange}
              >
                적용
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
