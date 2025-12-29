self.addEventListener('push', function (event) {
  console.log('[Service Worker] Push Received.', event);

  let data = { title: '알림', body: '내용 없음' };

  if (event.data) {
    try {
      // 데이터가 JSON 형식이면 파싱
      data = event.data.json();
    } catch (e) {
      // JSON이 아니면 텍스트로 사용
      console.log('Push data is not JSON:', event.data.text());
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };

  event.waitUntil(
    self.registration.showNotification(data.title || '알림 도착', options)
  );
});

self.addEventListener('notificationclick', function (event) {
  console.log('Notification click received.');
  event.notification.close();
  event.waitUntil(clients.openWindow('/push-test'));
});
