import { ImageResponse } from 'next/og';

// 라우트 세그먼트 설정
export const runtime = 'edge';

// 메타데이터 설정
export const alt = 'CUT - 프론트엔드 개발자 포트폴리오';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// 이미지 생성 함수
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1E293B', // 다크 배경 (Slate-800)
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        {/* CUT 로고 텍스트 */}
        <div
          style={{
            display: 'flex',
            fontSize: 130,
            fontWeight: 900,
            marginBottom: 20,
            letterSpacing: '-0.05em',
          }}
        >
          <span style={{ color: '#2F73FF' }}>C</span>
          <span style={{ color: '#52C77A' }}>U</span>
          <span style={{ color: '#FFB400' }}>T</span>
        </div>

        {/* 메인 타이틀 */}
        <div
          style={{
            color: '#F8FAFC', // Slate-50
            fontSize: 48,
            fontWeight: 700,
            letterSpacing: '-0.025em',
            marginBottom: 10,
          }}
        >
          프론트엔드 개발자 포트폴리오
        </div>

        {/* 서브 타이틀 (슬로건) */}
        <div
          style={{
            color: '#94A3B8', // Slate-400
            fontSize: 28,
            fontWeight: 500,
          }}
        >
          Code · User · Team
        </div>
      </div>
    ),
    // ImageResponse 옵션
    {
      ...size,
    }
  );
}
