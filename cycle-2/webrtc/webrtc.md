# 성광님도 한번 보면 무릎을 탁칠 WebRTC 문서를 작성해 보자



### Why WebRTC

##### Web Real-Time Communication 

말그대로 웹을 통해서 실시간 커뮤니케이션을 하기 위해 생겨난 놈이다.

우리는 원격지의 사람과 소통할때 서로의 얼굴을 보며, 서로의 목소리를 들으며, 때론 채팅을 하고, 문서를 전달 하기를 원한다.

이 모든 것을 WebRTC가 해결해 준다

(두 사람이 영상통화를 한다는 개념으로 설명하기 위해 *성광님이 상훈님에게 영상통화를 하는 연출로 진행해 보겠다.*)



#### webRTC 3총사(대표 API)

1. getUserMedia(mediaStream)

   우선 얼굴과 목소리를 교환하려면 브라우져가 성광님의 얼굴과 목소리를 가져가야 한다.

   <details>
     <summary>펼치기</summary>
     <div markdown=1>
       <img src="./1.png" width="300"/>
     </div>
   </details>

   이를 위한 api이며 해당 api를 통해 생성되는 mediaStream에 성광님의 음성과 오디오가 담기게 된다.

   https://webrtc.github.io/samples/src/content/getusermedia/gum/

   

2. RTCPeerConnection

   성광님과 동훈님이 영상과 목소리를 주고 받으려면 서로 어디에 있고 어떤 규약으로 정보를 주고 받을지 알아야 한다.

   해당 api에서 자신의 주소와 환경을 알거나 상대방의 주소와 환경을 저장 할 수 있다.

   이 광활한 world wide web에서 서로를 찾아 connection을 맺을 수 있을지가 궁금할 수가 있다.

   아래 소개팅 예시로 좀 더 개념을 잡아 보겠다. 우선 영상통화 샘플을 살펴 보자.

   https://webrtc.github.io/samples/src/content/peerconnection/pc1/

   https://appr.tc/r/820642262

   

3. RTCDataChannel

   음성 및 영상이 아닌 json/text, file등을 주고 받는 채널을 추상화한 api



### Blind date 

>ICE : Interactive Connectivity Establishment(대화형 연결 설정) : 두단말 통신 할 수 있는 최적의 경로를 찾아주는 프레임워크
>
>SDP(Sesson Description Protocol): 본인의 코덱 통신상태등의 정보를 가지고 있다.
>
>Turn / Stun: 본인의 공인 ip를 알수 있는 서버

1. 각자 본인의 전화번호(ICE candidate) 및 프로필(sdp) 확인

2. 주선자(signaling server)에게 전화번호와 프로필을 전달

   <details>
     <summary>펼치기</summary>
     <div markdown=2><img src="./00.png" width=300 align=left>
     </div>
   </details>
   
   
3. 주선자는 서로의 전화번호와 프로필을 전달

   <details>
     <summary>펼치기</summary>
     <div markdown=2><img src="./22.png" width=400 align=left>
     </div>
   </details>

4. 서로 오케이(connection)를 하면 만남이 성사

   <details>
     <summary>펼치기</summary>
     <div markdown=4><img src="./ka.png" width=400 align=left>
     </div>
   </details>

5. 자유롭게 대화



- 통신 도식화

<img src="./turn.png" align="left" />

p2p통신을 하기 위해서는 공인 ip가 필요한데 공인ip를 획득하는 단계로 turn서버를 이용한다고 한다

https://brunch.co.kr/@linecard/156



#### 실제 연결 단계

1. getUserMedia로 본인의 영상 및 오디오 획특
2. RTCPeerConnection로 본인의 network정보 및 sdp전문 획득
3. signaling server에게 network정보와 sdp전문 전달
4. Signaling server에서 연결된 유저들에게 network 정보와 sdp전문 전달
5. 받은 network 정보와 sdp전문을 RTCPeerConnection를 통하여 로컬에 셋팅
6. 연결 성공하면 onaddStream 이벤트를 통해 상대 stream을 받아 video나 audio객체로 play



### I USED

제가 음성통화 기능을 구현하면서 사용했던 api들

https://github.com/yangSangHoon/webrtc-typescript



### Can i use

#### pc

대부분의 최신 브라우져 지원

<img src="./pc.png" alt="pc can i use" align="left" width="400px" />

#### mobile

<img src="./mobile.png" alt="mobile can i use" align="left" width="500px" />

실제 모바일에서는 문제가 많다고 한다

자세한 내용은 아래 링크 참고

https://bloggeek.me/webrtc-browser-support/



### It's not perfect, but it will be perfect

web으로 실시간(0.5초 미만) stream통신 가능

소규모 화상채팅 가능

chrome의 경우 동시 허용 peer 500회, 권장 50회

높은 해상도 지원 불가

https://bloggeek.me/webrtc-browser-support/



### How zoom use WebRTC?

https://bloggeek.me/when-will-zoom-use-webrtc/



### How Stove use WebRTC?





### With need a skill

- WebAssembly
- Web worker
- Turn / Stun
- https://github.com/webrtcHacks/adapter(브라우져마다 다른 미디어 기능에 대한 대응 라이브러리)



### codec

#### 음성코덱

- Opus codec

  - 특징

  - sdp 전문안에 opus 코덱을 컨트롤 하는 부분이 있음

    >- 기존: a=fmtp:111 minptime=10;useinbandfec=1 
    >
    >+ 수정: a=fmtp:111 maxplaybackrate=16000; sprop-maxcapturerate=16000; maxaveragebitrate=20000; stereo=0;



- 코덱별 Delay 비교

<p style="text-align:left"><img src="./codec1.png" align="left" alt="codec1" width="600px" /></p>



























- 코덱별 Quality비교

<img src="./codec2.png" alt="codec2" align="left" style="zoom:50%;" />



#### 비디오 코덱

