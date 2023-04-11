# 파이어베이스를 활용한 웹푸시 적용

## 웹푸시 알림이란

웹푸시 알림은 웹 사이트나 웹 애플리케이션에서 발송되는 실시간 알림 메시지로, 사용자가 해당 웹사이트를 열지 

않아도 브라우저를 통해 수신할 수 있습니다. 

웹푸시 알림은 웹사이트의 새로운 정보, 이벤트, 업데이트 등에 대한 알림을 사용자에게 전달하는 데 사용됩니다.

## 웹푸시 알림의 장점

1. **사용자 재참여 유도**: 웹푸시 알림을 사용하면 사용자에게 새로운 컨텐츠, 이벤트, 할인 및 업데이트 등에 대해 즉시 알릴 수 있어 사용자 관심 유지와 재방문을 유도할 수 있습니다.
2. **실시간 정보 전달**: 웹푸시 알림을 통해 실시간으로 중요한 정보나 긴급한 알림을 사용자에게 전달할 수 있습니다.
3. **타겟팅 및 개인화**: 웹푸시 알림을 사용하면 사용자의 관심사나 이전 활동에 기반한 개인화된 알림을 전송할 수 있어 맞춤형 경험을 제공할 수 있습니다.
4. **브라우저 및 플랫폼 독립성**: 웹푸시 알림은 대부분의 최신 웹 브라우저에서 지원되어 애플리케이션에 플랫폼에 구애받지 않고 알림 기능을 구현할 수 있습니다.
5. **설치 없이 사용 가능**: 웹푸시 알림은 웹 애플리케이션에서 직접 사용할 수 있어, 별도의 앱 설치 없이 사용자에게 알림을 제공할 수 있습니다.
6. **비용 효율성**: 웹푸시 알림은 기존의 SMS나 이메일 알림에 비해 상대적으로 저렴한 비용으로 전송할 수 있습니다. 이를 통해 서비스 제공자는 마케팅 및 고객 소통에 대한 비용을 절감할 수 있습니다.

## 웹푸시 알림 도입시 고려해야할 점

1. **과도한 알림**: 너무 많은 알림이 사용자에게 발송되면, 알림을 무시하거나 차단할 수 있습니다.
2. **스팸 및 광고**: 웹푸시 알림은 스팸 또는 광고 목적으로 사용될 수 있어 브랜드의 신뢰도가 저하될 수 있습니다.
3. **권한 및 설정**: 웹푸시 알림을 수신하려면 사용자가 알림 권한을 허용해야 합니다. 일부 사용자는 개인 정보 보호 또는 선호도에 따라 알림을 차단하거나 거부할 수 있습니다.
4. 4. **브라우저 호환성**: 웹푸시 알림은 대부분의 최신 웹 브라우저에서 지원되지만, 일부 브라우저에서는 지원되지 않거나 제한된 기능만 제공될 수 있습니다. 이로 인해 일부 사용자는 웹푸시 알림을 경험하지 못할 수 있습니다.
5. **인터넷 연결**: 웹푸시 알림은 인터넷 연결이 필요하며, 연결이 끊긴 상태에서는 알림이 전송되지 않습니다. 이로 인해 일부 사용자는 중요한 알림을 놓칠 수 있습니다.
6. **개인정보 보호**: 웹푸시 알림을 통해 전송되는 데이터는 사용자의 개인 정보를 포함할 수 있으며, 이는 개인정보 보호에 영향을 미칠 수 있습니다. 따라서 개인 정보를 안전하게 보호하고 처리하는 방법을 고려해야 합니다.

## 개요

웹푸시 알림 기능을 구현하기 위해, 브라우저의 내장 웹푸시 기능과 서비스 워커(Service Worker)를 활용합니다. 이러한 과정을 간소화하고 효율적으로 구현하기 위해, 파이어베이스(Firebase)를 사용합니다.

파이어베이스는 브라우저에서 사용할 수 있는 다양한 기능을 포함한 JavaScript SDK를 제공하며, 이를 통해 웹 애플리케이션 개발을 더욱 용이하게 할 수 있습니다. 파이어베이스의 FCM(Firebase Cloud Messaging) 기능을 이용하면, Push API를 지원하는 브라우저에서 웹 알림 메시지를 손쉽게 전송하고 수신할 수 있습니다.

## 심플 플로우

![Untitled](%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%A5%E1%84%87%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%89%E1%85%B3%E1%84%85%E1%85%B3%E1%86%AF%20%E1%84%92%E1%85%AA%E1%86%AF%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%86%AB%20%E1%84%8B%E1%85%B0%E1%86%B8%E1%84%91%E1%85%AE%E1%84%89%E1%85%B5%20%E1%84%8C%E1%85%A5%E1%86%A8%E1%84%8B%E1%85%AD%E1%86%BC%2092e9d97d68b44d72b8f99842284bbb5e/Untitled.png)

## 디테일 플로우

![Untitled](%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%A5%E1%84%87%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%89%E1%85%B3%E1%84%85%E1%85%B3%E1%86%AF%20%E1%84%92%E1%85%AA%E1%86%AF%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%86%AB%20%E1%84%8B%E1%85%B0%E1%86%B8%E1%84%91%E1%85%AE%E1%84%89%E1%85%B5%20%E1%84%8C%E1%85%A5%E1%86%A8%E1%84%8B%E1%85%AD%E1%86%BC%2092e9d97d68b44d72b8f99842284bbb5e/Untitled%201.png)

****1) 서비스 워커 등록****

****2) 푸시 알림을 보낼 수 있는 사용자 권한을 얻습니다.****

****3) Firebase에서 토큰 받기****

****4) 등록 토큰 데이터를 백엔드로 전송****

****5) 트리거 푸시 알림 요청****

****6) Firebase에서 푸시 요청 보내기****

****7) 서비스 워커에서 푸시 서비스로부터 푸시 이벤트 수신****

****8) 사용자에게 푸시 알림 표시****

## 파이어베이스 환경구성

[https://console.firebase.google.com](https://console.firebase.google.com/)

### 프로젝트 추가

![KakaoTalk_Photo_2023-03-24-18-25-10 003.png](%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%A5%E1%84%87%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%89%E1%85%B3%E1%84%85%E1%85%B3%E1%86%AF%20%E1%84%92%E1%85%AA%E1%86%AF%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%86%AB%20%E1%84%8B%E1%85%B0%E1%86%B8%E1%84%91%E1%85%AE%E1%84%89%E1%85%B5%20%E1%84%8C%E1%85%A5%E1%86%A8%E1%84%8B%E1%85%AD%E1%86%BC%2092e9d97d68b44d72b8f99842284bbb5e/KakaoTalk_Photo_2023-03-24-18-25-10_003.png)

### 앱추가 후 SDK 연동 코드 복사하여 코드에 적용 및 테스트 전송 기능

![KakaoTalk_Photo_2023-03-24-18-25-10 002.png](%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%A5%E1%84%87%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%89%E1%85%B3%E1%84%85%E1%85%B3%E1%86%AF%20%E1%84%92%E1%85%AA%E1%86%AF%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%86%AB%20%E1%84%8B%E1%85%B0%E1%86%B8%E1%84%91%E1%85%AE%E1%84%89%E1%85%B5%20%E1%84%8C%E1%85%A5%E1%86%A8%E1%84%8B%E1%85%AD%E1%86%BC%2092e9d97d68b44d72b8f99842284bbb5e/KakaoTalk_Photo_2023-03-24-18-25-10_002.png)

![KakaoTalk_Photo_2023-03-24-18-25-09 001.png](%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%A5%E1%84%87%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%89%E1%85%B3%E1%84%85%E1%85%B3%E1%86%AF%20%E1%84%92%E1%85%AA%E1%86%AF%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%86%AB%20%E1%84%8B%E1%85%B0%E1%86%B8%E1%84%91%E1%85%AE%E1%84%89%E1%85%B5%20%E1%84%8C%E1%85%A5%E1%86%A8%E1%84%8B%E1%85%AD%E1%86%BC%2092e9d97d68b44d72b8f99842284bbb5e/KakaoTalk_Photo_2023-03-24-18-25-09_001.png)

## 구현

1. 파이어베이스 sdk 설치: `npm install firebase`
2. 서비스워커 등록
    - `await navigator.serviceWorker.register(서비스워커 파일네임)` [(1)](https://www.notion.so/92e9d97d68b44d72b8f99842284bbb5e)
3. 파이어베이스 앱 초기화 (`firebase/app` 의 *`initializeApp*(...)` 파이어베이스 초기화 설정코드) [(2)](https://www.notion.so/92e9d97d68b44d72b8f99842284bbb5e)
4. 파이어베이스 메시징 초기화(`firebase/messaging` 의 `getMessaging(앱 인스턴스)`)
5. 메시징 핸들러 등록(`firebase/messaging` 의 *`onMessage*(FCM 인스턴스, 메시징 페이로드)`) [(3)](https://www.notion.so/92e9d97d68b44d72b8f99842284bbb5e)
6. 알림 권한 사용 여부 체크
7. 알림 권한 현재 상태 체크
    - prompt - 미설정
    - denied - 거부
    - granted - 허용
8. 미설정일때 알림 커스텀 다이얼로그 등으로 사용자에게 알림 권한 요청 안내 (없어도 되지만 있으면 좋음) [(5)](https://www.notion.so/92e9d97d68b44d72b8f99842284bbb5e)
9. 사용자에게 알림권한요청 (`firebase/messaging`의 `getToken(...)`을 통해 자동으로 요청) [(4)](https://www.notion.so/92e9d97d68b44d72b8f99842284bbb5e)
    - 내부에서 `Notification` api를 통해 요청
        - 알림권한요청 [(6)](https://www.notion.so/92e9d97d68b44d72b8f99842284bbb5e)
        - 알림권한요청후 토큰 받아옴
            - 이 토큰은 클라이언트 측에서 생성되어 서버 측에 전달되어 알림을 전송할 때 사용됩니다.
        - 받아온 토큰 브라우저 저장
        - 로그인한 회원과 토큰 매핑 (커스텀)
            - 브라우저에 토큰을 저장하는 이유는 새로 받아온 토큰이 브라우저에 저장된 토큰과 다를경우 회원매핑토큰 테이블에 업데이트 시켜주기 위함
            - 파이어베이스의 토큰은 기본적으로 클라이언트에서 만료시점을 정확히 알수 없음
            - getToken은 항상 호출하기 때문에 받아온 토큰과 브라우저 토큰을 비교해서 다를경우 만료되었다고 판단

- (1) 서비스워커 등록 예시 코드
    
    ```jsx
    import { IS_APP, isDevelopment } from 'consts'
    
    export abstract class ServiceWorkerRegister {
      public static registration?: ServiceWorkerRegistration
    
      // 파일명: /sw.js (로컬확인: /sw-local.js)
      // 같은 이름일 경우 로컬 확인시 배포된 sw.js를 바라보게 되어 로컬에서는 sw-local.js라는 파일명을 바라보도록 설정되어 있습니다.
      private static filename = `/sw${isDevelopment() ? '-local' : ''}.js`
    
      public static async register(): Promise<ServiceWorkerRegistration | undefined> {
        if (!ServiceWorkerRegister.registration) {
          if ('serviceWorker' in navigator && !IS_APP) {
            try {
              ServiceWorkerRegister.registration = await navigator.serviceWorker.register(ServiceWorkerRegister.filename)
            } catch (error) {
              console.error('서비스워커 등록', error)
            }
          }
        }
        return ServiceWorkerRegister.registration
      }
    }
    ```
    
- (2) 파이어 베이스 앱 초기화 예시 코드
    
    ```jsx
    const firebaseApp = initializeApp({
            apiKey: 'AIzaSyA2tgIPHvYNKdUhGrtwmY6A4j4TkSa_3u4',
            authDomain: 'ceo-beta-bb257.firebaseapp.com',
            projectId: 'ceo-beta-bb257',
            storageBucket: 'ceo-beta-bb257.appspot.com',
            messagingSenderId: '88487066310',
            appId: '1:88487066310:web:236af93f905000a95e75c7',
            measurementId: 'G-E0FDBBKYT5',
          })
    ```
    
- (3) 메시징 핸들러(foreground) 예시 코드
    
    ```jsx
    // - foreground 메시지는 윈도우가 활성화된 상태에서 받는 메시지입니다.(애플리케이션단에서 받음)
    // - 등록한 서비스워커 registration의 showNotification를 실행하여 서비스워커 내에 있는 로직과 동일하게 알림 박스를 노출합니다.
    onMessage(this.messaging, ({ data = {} }: MessagePayload) => {
        const { title, body, image, link, alarmId } = data
        if (!title) {
            return
        }
        this.serviceworkerRegistration?.showNotification(title, {
            body,
            image,
            icon: image,
            badge: 'https://ceo-cdn.baemin.com/cdn/ceo-square/src/images/logo/webpush-badge.png',
            data: { link, alarmId },
        })
        sendEventLog({
            screenName: LogScreenName.Push,
            group: LogGroup.Content,
            event: 'Content',
            params: {
                Position: null,
                ContentId: String(alarmId),
                MainTitle: title,
                SubTitle: body,
                Type: 'web',
            },
        })
    })
    ```
    
- (4) 알림권한요청 코드 예시
    
    ```jsx
    // 파이어베이스를 통한 알림권한요청
    await getToken(this.messaging, {
    	vapiKey: 'VAPI_KEY',
    	serviceWorkerRegistration: 생성한 서비스워커 인스턴스
    })
    
    // 실제 내부 처리 로직
    function requestNotificationPermission() {
      if ("Notification" in window) {
        // 브라우저에서 알림 기능을 지원하는지 확인
        Notification.requestPermission()
          .then(function (permission) {
            if (permission === "granted") {
              console.log("알림 권한이 허용되었습니다.");
            } else {
              console.log("알림 권한이 거부되었습니다.");
            }
          })
          .catch(function (error) {
            console.error("알림 권한 요청 중 오류가 발생했습니다:", error);
          });
      } else {
        console.warn("이 브라우저는 알림 기능을 지원하지 않습니다.");
      }
    }
    requestNotificationPermission();
    ```
    
- 메시징 페이로드 타입
    
    ```jsx
    export declare interface NotificationPayload {
        /**
         * The notification's title.
         */
        title?: string;
        /**
         * The notification's body text.
         */
        body?: string;
        /**
         * The URL of an image that is downloaded on the device and displayed in the notification.
         */
        image?: string;
    }
    
    export declare interface FcmOptions {
        /**
         * The link to open when the user clicks on the notification.
         */
        link?: string;
        /**
         * The label associated with the message's analytics data.
         */
        analyticsLabel?: string;
    }
    
    export declare interface MessagePayload {
        /**
         * {@inheritdoc NotificationPayload}
         */
        notification?: NotificationPayload;
        /**
         * Arbitrary key/value payload.
         */
        data?: {
            [key: string]: string;
        };
        /**
         * {@inheritdoc FcmOptions}
         */
        fcmOptions?: FcmOptions;
        /**
         * The sender of this message.
         */
        from: string;
        /**
         * The collapse key of the message. See
         * {@link https://firebase.google.com/docs/cloud-messaging/concept-options#collapsible_and_non-collapsible_messages | Non-collapsible and collapsible messages}
         */
        collapseKey: string;
        /**
         * The message id of a message.
         */
        messageId: string;
    }
    ```
    

### 서비스워커

- 코드
    
    ```jsx
    // Firebase 라이브러리를 가져옵니다.
    importScripts('https://www.gstatic.com/firebasejs/9.6.9/firebase-app-compat.js');
    importScripts('https://www.gstatic.com/firebasejs/9.6.9/firebase-messaging-compat.js');
    
    // Firebase 앱을 초기화하고 메시징 인스턴스를 만듭니다.
    firebase.initializeApp({
      apiKey: 'AIzaSyA2tgIPHvYNKdUhGrtwmY6A4j4TkSa_3u4',
      authDomain: 'ceo-beta-bb257.firebaseapp.com',
      projectId: 'ceo-beta-bb257',
      storageBucket: 'ceo-beta-bb257.appspot.com',
      messagingSenderId: '88487066310',
      appId: '1:88487066310:web:236af93f905000a95e75c7',
      measurementId: 'G-E0FDBBKYT5',
    });
    
    const messaging = firebase.messaging();
    
    // 백그라운드 메시지를 받아 웹푸시 알림을 표시해줍니다.
    messaging.onBackgroundMessage(async ({ data }) => {
      const { title, body, image, link, alarmId } = data;
      if (!title) return;
    
      self.registration.showNotification(title, {
        body,
        image,
        icon: image,
        badge: 'https://ceo-cdn.baemin.com/cdn/ceo-square/src/images/logo/webpush-badge.png',
        data: { link, alarmId },
      });
    });
    
    // 서비스 워커 설치 완료후 즉시 활성화 시킵니다.
    self.addEventListener('install', () => self.skipWaiting());
    
    // 사용자가 알림을 클릭했을 때의 처리를 설정합니다.
    self.addEventListener('notificationclick', async (event) => {
      const clickedNotification = event.notification;
      const { link, alarmId } = clickedNotification.data;
      const url = new URL(link).href;
    
      clickedNotification.close();
      event.waitUntil(handleNotificationClick(url, alarmId));
    });
    
    // 새 창을 열거나 기존 창을 포커싱하고, 알림 읽음 처리를 수행하는 함수를 정의합니다.
    const handleNotificationClick = async (url, alarmId) => {
      const urlToOpen = new URL(url).href;
      const windowClients = await clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });
    
      const matchedClient = windowClients.find((windowClient) => windowClient.url === urlToOpen);
      matchedClient ? matchedClient.focus() : clients.openWindow(urlToOpen);
    
      try {
        await (await fetch(`/v1/alarm/${alarmId}`, { method: 'put' })).json();
      } catch (error) {
        console.error('Notification read error::', error);
      }
    };
    ```
    
- background 메시지는 윈도우가 활성화 되어있지 않은 상태에서 받는 메시지입니다.(서비스워커단에서 받음)
- **importScripts:** version 8 방식으로 firebase sdk 를 불러옵니다([https://firebase.google.com/docs/web/learn-more?authuser=2&hl=ko#modular-version](https://firebase.google.com/docs/web/learn-more?authuser=2&hl=ko#modular-version))
- **firebase.initializeApp:** 으로 파이어베이스 SDK를 초기화 합니다.(가이드: [https://console.firebase.google.com/u/2/project/ceo-beta-bb257/settings/general/web:NWUzNjdmODYtODljYS00YjJjLWI4MWQtZDZhMDBjMzI3OTU4?hl=ko](https://console.firebase.google.com/u/2/project/ceo-beta-bb257/settings/general/web:NWUzNjdmODYtODljYS00YjJjLWI4MWQtZDZhMDBjMzI3OTU4?hl=ko))
- **messaging.onBackgroundMessage:** 백그라운드 메시지 핸들러를 등록합니다
- **self.registration.showNotification:** 전달받는 data정보에서 title, body, image, link, alarmId를 사용하여 알림박스 노출을 실행하면서 인자로 넘겨줍니다.(showNotification: [https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification))
    - title: 알림 제목
    - body: 알림 추가 문자열
    - icon: 글과 함께 노출할 이미지의 URL 문자열
    - badge: 안드로이드 크롬용 흑백 알람 뱃지 이미지 URL 문자열(크기는 24px의 배수, 3배수 이상을 권장하며 최대 4배수)
    - data: 알림에 전달하려는 데이터, 모든 유형이 될 수 있습니다
- **notificationclick:** 이벤트 핸들러 등록 ([https://developer.mozilla.org/ko/docs/Web/API/ServiceWorkerGlobalScope/notificationclick_event](https://developer.mozilla.org/ko/docs/Web/API/ServiceWorkerGlobalScope/notificationclick_event))
- **handleNotificationClick:** data에서 link 정보를 받은 뒤 해당 url로 브라우저 열린 탭중에 해당 url과 같은 url이 있다면 활성화 시키고 없다면 새탭을 엽니다.
    - alarmId를 통해 api를 호출하여 알림의 읽음 처리를 해줍니다.
    - clients.matchAll은 Client 객체의 배열에 대한 Promise를 반환합니다
    - includeUncontrolled(기본:false): true일 경우 현재 서비스 워커에 의해 제어되지 않는 창 클라이언트도 포함하여 반환하도록 지시하는 것입니다.
    - type(기본:window): 'window', 'worker', 'sharedworker', 'all'이 있습니다
    - client.focus(): 윈도우 활성화
    - window.openWindow: 새로운 브라우징 컨텐스트를 생성하고 주어진 url을 로드합니다

## (5) 권한요청모달

![1-pc.png](%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%A5%E1%84%87%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%89%E1%85%B3%E1%84%85%E1%85%B3%E1%86%AF%20%E1%84%92%E1%85%AA%E1%86%AF%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%86%AB%20%E1%84%8B%E1%85%B0%E1%86%B8%E1%84%91%E1%85%AE%E1%84%89%E1%85%B5%20%E1%84%8C%E1%85%A5%E1%86%A8%E1%84%8B%E1%85%AD%E1%86%BC%2092e9d97d68b44d72b8f99842284bbb5e/1-pc.png)

![1-m.png](%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%A5%E1%84%87%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%89%E1%85%B3%E1%84%85%E1%85%B3%E1%86%AF%20%E1%84%92%E1%85%AA%E1%86%AF%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%86%AB%20%E1%84%8B%E1%85%B0%E1%86%B8%E1%84%91%E1%85%AE%E1%84%89%E1%85%B5%20%E1%84%8C%E1%85%A5%E1%86%A8%E1%84%8B%E1%85%AD%E1%86%BC%2092e9d97d68b44d72b8f99842284bbb5e/1-m.png)

## (6) 브라우저 권한 요청

![스크린샷 2023-03-24 오후 5.33.03.png](%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%A5%E1%84%87%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%89%E1%85%B3%E1%84%85%E1%85%B3%E1%86%AF%20%E1%84%92%E1%85%AA%E1%86%AF%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%86%AB%20%E1%84%8B%E1%85%B0%E1%86%B8%E1%84%91%E1%85%AE%E1%84%89%E1%85%B5%20%E1%84%8C%E1%85%A5%E1%86%A8%E1%84%8B%E1%85%AD%E1%86%BC%2092e9d97d68b44d72b8f99842284bbb5e/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-03-24_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_5.33.03.png)

![스크린샷 2023-03-24 오후 5.33.16.png](%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%A5%E1%84%87%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%89%E1%85%B3%E1%84%85%E1%85%B3%E1%86%AF%20%E1%84%92%E1%85%AA%E1%86%AF%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%86%AB%20%E1%84%8B%E1%85%B0%E1%86%B8%E1%84%91%E1%85%AE%E1%84%89%E1%85%B5%20%E1%84%8C%E1%85%A5%E1%86%A8%E1%84%8B%E1%85%AD%E1%86%BC%2092e9d97d68b44d72b8f99842284bbb5e/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-03-24_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_5.33.16.png)

- 브라우저가 자동으로 띄워주는 네이티브 권한 요청 입니다
    - 실제로 바로 띄우는 사이트들도 많지만 유저가 갑작스럽게 권한요청을 띄우게 되면 UX관점에서도 좋지 않고 유저가 거부감에 차단을 누를수 있습니다.
    - 한번 차단을 하게되면 강제로 알림상태를 바꿀수 있는 방법이 없기 때문에 미리 사용자에게 권한요청이 뜨는걸 인지 시켜주는 UI를 보여주어 UX를 높힐수 있습니다

## 권한요청 완료 모달

![3-pc.png](%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%A5%E1%84%87%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%89%E1%85%B3%E1%84%85%E1%85%B3%E1%86%AF%20%E1%84%92%E1%85%AA%E1%86%AF%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%86%AB%20%E1%84%8B%E1%85%B0%E1%86%B8%E1%84%91%E1%85%AE%E1%84%89%E1%85%B5%20%E1%84%8C%E1%85%A5%E1%86%A8%E1%84%8B%E1%85%AD%E1%86%BC%2092e9d97d68b44d72b8f99842284bbb5e/3-pc.png)

![3-m.png](%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%A5%E1%84%87%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%89%E1%85%B3%E1%84%85%E1%85%B3%E1%86%AF%20%E1%84%92%E1%85%AA%E1%86%AF%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%86%AB%20%E1%84%8B%E1%85%B0%E1%86%B8%E1%84%91%E1%85%AE%E1%84%89%E1%85%B5%20%E1%84%8C%E1%85%A5%E1%86%A8%E1%84%8B%E1%85%AD%E1%86%BC%2092e9d97d68b44d72b8f99842284bbb5e/3-m.png)

- 권한요청 완료시 파이어베이스 토큰 promise에서 토큰이 내려오고 그 시점에 권한요청 완료 모달을 띄웁니다.

## 테스트 메시지 보내기

```
curl --location --request POST 'https://fcm.googleapis.com/fcm/send' \
--header 'Authorization: key=AAAAFJo9esY:APA91bHd6l3fXpQiie1RYMP3RHLdplilrWt5J5G2-jctSJJ3hOqrA5pGNAMKprzVLIT9jQGn1MFlM8je2SBvUmy3v4H7AGKZbbQ5OTOj22jRDXNd7_zyjMvwn1FdHxsrSjp5gNlwCk9J' \
--header 'Content-Type: application/json' \
--data-raw '{
    "to": "e6qreH7-6ecEXDQFnDgXjZ:APA91bG762XGUSUENdwBI2MoVJrh5sBGk-QiMOGsVBc-dDyksnx1XiUUG83h_scoBL86sX7Gn7ZcC_faCI8Q7EOThMbusxGE2h3V0Kktn4VQXD4e2ot2NCrugLd3SbEeiYL4Jx_eNl3f",
    "data": {
        "alarmId": 1588,
        "link": "https://ceo3.dev.baemin.com/",
        "title": "A회원33",
        "body": "postman 바디 테스트\n개행이되나\n몇줄까지되지?아~최대3줄이구나",
        "image": "https://content.surfit.io/thumbs/image/Kr9Zw/RvVJ7/87186918062b981271e485.png/cover-center-2x.webp"
    }
}'
```

---

- to: 발급받은 토큰
- alarmId: 알림 Id(읽음처리에 활용)
- link: 클릭 링크 주소
- title: 제목
- body: 추가 정보 문자열
- image: 썸네일

## 기타 정보

### 토큰

- FCM 인증 토큰은 언제 만료될지 알수 없기 때문에 로그인 후 초기 진입시에 항상 파이어베이스 토큰을 가져와야 한다.
    - 알림 권한 설정을 바꾸게되면 다시 허용 시 새로운 토큰을 받는다
    - service worker가 등록 취소후 다시 등록되면 등록절차를 새로 거치게 되면서 새로운 토큰을 받는다

## 권한요청

### 나쁜 UX

최악의 시나리오는 사용자가 웹사이트에 방문하는 즉시 권한 요청 대화 상자가 나타나 원래 수행하려던 작업이 방해받고, 알림의 필요성이나 사용자에게 어떤 이점이 있는지에 대한 맥락을 제공하지 않는 것입니다.

이 상황에서 사용자가 좌절감을 느끼고 권한 요청을 거부하는 것은 흔한 일입니다. 사용자가 권한 요청을 거부하면 웹에서 다시 권한을 요청하는 것은 불가능합니다.

거부된 후에 권한을 되찾으려면 사용자가 직접 브라우저 UI에서 권한 설정을 변경해야 합니다. 하지만 이 과정은 사용자에게 쉽지 않으며, 명확하지도 않고 재미있지도 않습니다.

### 좋은 UX

### 가치제안

- 특정 품목의 재고가 없습니다. 다음에 재고가 있을 때 알림을 받으시겠습니까?
- 이 속보 스토리는 정기적으로 업데이트됩니다. 스토리가 진행되는 대로 알림을 받으시겠습니까?
- 당신은 최고 입찰자입니다. 당신이 입찰가보다 높은 경우 알림을 받으시겠습니까?

### 이중권한

- 커스텀 권한 UI를 표시하여 웹이 이 권한으로 수행할 작업에 대한 컨텍스트와 함께 알림을 활성화하도록 사용자에게 요청합니다.
- 커스텀 권한 UI에서 활성화를 선택하면 실제 권한 프롬프트를 표시하고 그렇지 않으면 커스텀 권한 UI을 숨기고 추후에 다시 요청합니다.

## Notification 항목

- ServiceWorker showNotification (MDN): [https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification)
- displaying a Notification [https://web-push-book.gauntface.com/display-a-notification/](https://web-push-book.gauntface.com/display-a-notification/)

```jsx
interface NotificationOptions {
    actions?: NotificationAction[];
    badge?: string;
    body?: string;
    data?: any;
    dir?: NotificationDirection;
    icon?: string;
    image?: string;
    lang?: string;
    renotify?: boolean;
    requireInteraction?: boolean;
    silent?: boolean;
    tag?: string;
    timestamp?: EpochTimeStamp;
    vibrate?: VibratePattern;
}
```

---

- title: 제목 문구
- body: 콘텐츠 문구, 크롬에서는 최대 3자 까지 노출되고 그 이상은 말줄임표시된다, 개행처리는 "\n" 문자로 처리 가능
- icon: 텍스트와 같이 보여주는 섬네일 딱히 이미지 사이즈 지침은 없다 (안드로이드에서는 64px 배수 사용을 권장, 3배율 해상도에서는 192px)
- badge: 상단바 알림 아이콘 노출용 이미지 주소 (안드로이드용 크롬에서만 사용됨, 권장사이즈는 24px 배수)
- image: icon보다 더 큰 미리보기 이미지 제공됨 (window pc, 1350px 이상 사용 권장)
- tag: 알림 그룹화 문자열
- action: 버튼 목록 (서비스워커에서만 지원)
- dir: 방향 (기본 auto, ltr, rtl 설정가능)
- lang: 제공언어
- renotify: 다시 알림
- silent: 알리지 않고 조용히 표시
- vibrate: serviceworker에서만 제공(바이브레이션 시간간격 지정)
- data: 커스텀 옵션

# Reference

- [Service Worker API](https://developer.mozilla.org/ko/docs/Web/API/Service_Worker_API)
- [ServiceWorkerRegistration](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration)
- [ServiceWorkerRegistration: showNotification() method](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification)
- [ServiceWorkerGlobalScope: notificationclick event](https://developer.mozilla.org/ko/docs/Web/API/ServiceWorkerGlobalScope/notificationclick_event)
- [Push API](https://developer.mozilla.org/ko/docs/Web/API/Push_API)
- [Push API 지원 범위](https://caniuse.com/push-api)
- [Firebaes FCM 가이드](https://firebase.google.com/docs/cloud-messaging/js/client?hl=ko&authuser=2#web-version-8)
- [Firebaes 퀵스타트](https://github.com/firebase/quickstart-js)
- [Web Push Book](https://web-push-book.gauntface.com/)
- [Web push notifications using Firebase Cloud Messaging](https://blogs.halodoc.io/web-push-notification-using-firebase-cloud-messaging/)
- [Add push notifications to a web app](https://developers.google.com/web/fundamentals/codelabs/push-notifications/?hl=ko)
- [알림표시](https://web.dev/push-notifications-display-a-notification/)
- [일반적 알림 패턴](https://web.dev/push-notifications-common-notification-patterns/#precise)
