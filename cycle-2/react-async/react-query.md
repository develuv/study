#React Query

##개요
####React 에서 비동기를 쉽게 다루게 해주는 라이브러리이자 동시에 서버 상태를 관리해 주는 라이브러리

##필요성
####캐싱
####서버 데이터 중복 호출 제거



##왜 React Query 인가?
####글로벌 상태 관리 라이브러리없이 서버에서 데이터를 주고 받을 수 있음

##주요 특징


##Basic
###Lifecycle
![img_3.png](img_3.png)
####fetching: 요청 중인 쿼리
####fresh: 만료되지 않은 쿼리, 인스턴스의 데이터가 최신화된 데이터라고 간주하며 refetching 대상
####stale: 만료된 쿼리, 인스턴스를 데이터가 최신화 되지 않았다고 간주하며 refetching 대상
####inactive: 사용하지 않는 쿼리, 인스턴스를 observe하는 컴포넌트가 없는 상태로 일정 시간이 지나면 가비지 컬렉터가 캐시에서 제거
####delete: 가비지 컬렉터에 의해 캐시에서 제거된 쿼리

###Option
####staleTime: fresh 상태에서 stale 상태가 되는데 걸리는 시간, fresh 상태 지속시간 (default: 0)
####cachedTime: inactive 상태에서 cachedTime만큼의 시간이 지나면 GC됨 (default: 1000 * 60 * 5)
####select: fetcher가 리턴한 데이터를 가공
####enabled: false이면 fetch를 안함
####retry: fetch 실패시 재시도 횟수 (default: 3)
####retryDelay: 실패시 재시도 할 때까지 기다리는 시간

