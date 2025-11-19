'use client';

import { useState, useMemo } from 'react';
import Chip from '@/components/ui/Chip';
import {
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  getTechStackByCategory,
  type TechStackCategory,
  type TechStackInfo,
} from '@/lib/tech-stack';
import styles from './TechStackField.module.scss';

interface TechStackFieldProps {
  selectedStack: string[];
  onChange: (newStack: string[]) => void;
}

export default function TechStackField({
  selectedStack,
  onChange,
}: TechStackFieldProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<
    Set<TechStackCategory>
  >(new Set());

  const groupedTechStack = useMemo(() => getTechStackByCategory(), []);

  const filteredTechStack = useMemo(() => {
    const filtered: Partial<Record<TechStackCategory, TechStackInfo[]>> = {};

    Object.entries(groupedTechStack).forEach(([category, techs]) => {
      const filteredTechs = techs.filter((tech) => {
        const matchesSearch =
          !searchQuery ||
          tech.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter =
          !showSelectedOnly || selectedStack.includes(tech.name);
        return matchesSearch && matchesFilter;
      });

      if (filteredTechs.length > 0) {
        filtered[category as TechStackCategory] = filteredTechs;
      }
    });

    return filtered as Record<TechStackCategory, TechStackInfo[]>;
  }, [groupedTechStack, searchQuery, showSelectedOnly, selectedStack]);

  const handleTechStackToggle = (techName: string) => {
    const isSelected = selectedStack.includes(techName);
    const newStack = isSelected
      ? selectedStack.filter((item) => item !== techName)
      : [...selectedStack, techName];
    onChange(newStack);
  };

  const toggleCategory = (category: TechStackCategory) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  return (
    <div>
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

          const isExpanded = expandedCategories.has(
            category as TechStackCategory
          );
          const categoryColor = CATEGORY_COLORS[category as TechStackCategory];
          const selectedCount = techs.filter((tech) =>
            selectedStack.includes(tech.name)
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
                      selected={selectedStack.includes(tech.name)}
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
        {selectedStack.length > 0 && `${selectedStack.length}개 기술 스택 선택됨`}
      </p>
    </div>
  );
}
