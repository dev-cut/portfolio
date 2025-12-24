import { ImageResponse } from 'next/og';

// 아이콘 이미지 메타데이터
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// 런타임 설정 (Edge Runtime 사용)
export const runtime = 'edge';

// 브랜드 색상 팔레트
const COLORS = [
  '#3d8bff', // Brand Blue
  '#48bb78', // Brand Green
  '#eb6f3d', // Brand Orange (Terracotta)
];

export default function Icon() {
  // 매 요청마다 랜덤 색상 선택
  // 참고: 브라우저 캐싱으로 인해 새로고침 시 즉각 반영되지 않을 수 있음
  const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="100" height="100" rx="24" fill="#1a2e23" />
          <path
            d="M 25 35 L 75 35 L 50 35 L 25 75 L 50 35 L 75 75"
            stroke={randomColor}
            strokeWidth="28"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
