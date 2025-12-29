# 🔔 웹 푸시 알림 구현 (Safari 지원)

## 🎯 목표

사용자가 사파리(iOS/macOS) 및 기타 브라우저에서 푸시 알림을 테스트할 수 있도록 기능을 구현한다.

## 📋 세부 작업

### 1. 환경 설정

- [x] `web-push` 라이브러리 설치
- [x] VAPID 키 생성 및 `.env` 설정

### 2. PWA 구성 (필수)

- [x] `public/manifest.json` 작성 (앱 이름, 아이콘 등)
- [x] `public/sw.js` 작성 (서비스 워커, 푸시 이벤트 수신)

### 3. 백엔드 로직

- [x] 푸시 발송용 Server Action 구현 (`app/actions/push.ts`)
  - 구독 정보(Subscription)를 받아 즉시 푸시 전송

### 4. 프론트엔드 UI

- [x] 테스트 페이지 구현 (`app/push-test/page.tsx`)
  - 서비스 워커 등록 로직
  - "알림 허용 및 테스트 발송" 버튼
  - 상태 메시지 표시
