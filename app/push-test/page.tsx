'use client';

import React, { useState, useEffect } from 'react';
import { sendPushNotification } from '../actions/push';
import styles from './push-test.module.scss';

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function PushTestPage() {
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );
  const [status, setStatus] = useState<string>('초기화 중...');
  const [isSupported, setIsSupported] = useState<boolean>(false);

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      registerServiceWorker();
    } else {
      setStatus('이 브라우저는 웹 푸시를 지원하지 않습니다.');
      setIsSupported(false);
    }
  }, []);

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      setStatus('서비스 워커 등록 완료.');

      const sub = await registration.pushManager.getSubscription();
      if (sub) {
        setSubscription(sub);
        setStatus('이미 푸시 알림을 구독 중입니다.');
      } else {
        setStatus('푸시 알림 구독 대기 중...');
      }
    } catch (error) {
      console.error(error);
      setStatus(`서비스 워커 등록 실패: ${error}`);
    }
  }

  async function subscribeToPush() {
    if (!VAPID_PUBLIC_KEY) {
      setStatus(
        'VAPID Public Key가 설정되지 않았습니다. (.env.local 확인 필요)'
      );
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });
      setSubscription(sub);
      setStatus('푸시 알림 구독 성공!');
    } catch (error) {
      console.error(error);
      setStatus(`구독 실패: ${error}`);
    }
  }

  async function sendTestNotification() {
    if (!subscription) {
      setStatus('먼저 구독을 진행해주세요.');
      return;
    }

    setStatus('3초 후에 알림이 전송됩니다...');
    try {
      // 구독 정보를 JSON으로 직렬화하여 서버 액션에 전달
      const result = await sendPushNotification(
        JSON.parse(JSON.stringify(subscription)),
        JSON.stringify({
          title: '테스트 알림 👋',
          body: '이것은 Safari 및 브라우저 푸시 알림 테스트입니다! 🚀',
        })
      );

      if (result.success) {
        setStatus(
          `알림 전송 성공! (${new Date().toLocaleTimeString()})\n잠시 후 알림이 도착해야 합니다.`
        );
      } else {
        setStatus(`알림 전송 실패: ${result.error}`);
      }
    } catch (error) {
      setStatus(`알림 전송 오류: ${error}`);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>웹 푸시 테스트</h1>
      <p className={styles.description}>
        아래 버튼을 눌러 푸시 알림 권한을 요청하고
        <br />
        테스트 알림을 보내보세요.
      </p>

      {isSupported ? (
        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
          {!subscription ? (
            <button className={styles.button} onClick={subscribeToPush}>
              🔔 알림 구독하기
            </button>
          ) : (
            <button className={styles.button} onClick={sendTestNotification}>
              🚀 테스트 알림 발송
            </button>
          )}
        </div>
      ) : (
        <div className={styles.status} style={{ color: 'red' }}>
          {status}
        </div>
      )}

      {isSupported && <div className={styles.status}>{status}</div>}
    </div>
  );
}
