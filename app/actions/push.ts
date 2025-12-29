'use server';

import webpush from 'web-push';

if (
  !process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ||
  !process.env.VAPID_PRIVATE_KEY
) {
  console.error('VAPID keys are missing in environment variables.');
}

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT || 'mailto:test@example.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '',
  process.env.VAPID_PRIVATE_KEY || ''
);

export async function sendPushNotification(
  subscription: webpush.PushSubscription,
  payload: string
) {
  try {
    // 3초 딜레이 추가
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await webpush.sendNotification(subscription, payload);
    return { success: true };
  } catch (error) {
    console.error('Error sending push notification:', error);
    // 에러 객체를 직렬화하여 반환 (Next.js Server Action 직렬화 문제 방지)
    return { success: false, error: String(error) };
  }
}
