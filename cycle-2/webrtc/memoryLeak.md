# 연서님이 궁금해 한 Memory leak 잡아 보자



### What the Memory leak?

Memory leak은 해석하면 메모리 누수이다. 물이 센다..? 라고 해석되지만 

실제 발견되는 현상은 heap 메모리 영역에 메모리가 쌓이기만 하고 Garbage Collection(쓰레기 수거)에 의해 쌓인 메모리가 없어지지 않는 현상이다.

Website에 접속하면 javascript가 동작 하면서 당연히 "변수, 함수, DOM Element"등이 생성되어 메모리에 쌓이게 되는데 V8엔진이 해당 참조값들이 계속 사용된다고 판단하게 되면 Garbage Collection에 넘기지 않아 메모리 해소가 안될 수 있다.

관련 이유로는 

1. 이벤트 해제가 안되었거나 
2. 전역변수로 설정되어 window객체에 할당된 변수이거나 
3. 변수에 dom할당후 dom만 지우고 변수초기화를 안해주는 경우나 
4. timer를 해제 하지 않았거나

등 여러 케이스가 있을 것이다

### How to Memory Release

