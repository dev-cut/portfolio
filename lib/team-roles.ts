// 경력 수준 타입
export type ExperienceLevel =
  | 'senior'
  | 'mid'
  | 'junior'
  | 'designer'
  | 'planner';

// 경력 수준 한글 라벨
export const EXPERIENCE_LABELS: Record<ExperienceLevel, string> = {
  senior: '고급 개발자',
  mid: '중급 개발자',
  junior: '초급 개발자',
  designer: '디자이너',
  planner: '기획자',
};

// 팀 구성 인터페이스
export interface TeamMember {
  level: ExperienceLevel;
  count: number;
}

// 팀 구성 배열을 문자열 배열로 변환
export function formatTeamComposition(members: TeamMember[]): string[] {
  return members
    .filter((member) => member.count > 0)
    .map((member) => `${EXPERIENCE_LABELS[member.level]} ${member.count}명`);
}

// 문자열 배열을 팀 구성 배열로 변환
export function parseTeamComposition(
  composition: string[] | null | undefined
): TeamMember[] {
  // 배열이 아닌 경우 빈 배열 반환
  if (!Array.isArray(composition)) {
    return [];
  }

  const members: TeamMember[] = [];

  // 라벨과 레벨 매핑
  const labelToLevel: Record<string, ExperienceLevel> = {
    '고급 개발자': 'senior',
    '중급 개발자': 'mid',
    '초급 개발자': 'junior',
    디자이너: 'designer',
    기획자: 'planner',
  };

  composition.forEach((item) => {
    if (typeof item !== 'string') return;

    const match = item.match(/(\d+)명/);
    if (!match) return;

    const count = parseInt(match[1], 10);
    if (count <= 0) return;

    // 라벨 매칭
    const matchedLevel = Object.keys(labelToLevel).find((label) =>
      item.includes(label)
    );

    if (matchedLevel) {
      members.push({ level: labelToLevel[matchedLevel], count });
    }
  });

  return members;
}
