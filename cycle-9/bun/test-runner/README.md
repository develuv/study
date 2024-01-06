# TEST RUNNER

bun은 jest와 호환되는(?) 빠른 빌트인 기능을 제공 합니다. 테스트는 bun 런타임으로 실행되며, 다음 기능들을 지원합니다.

- typescript,JSX
- 라이프사이클 훅스
- 스냅샷 테스팅
- UI & DOM 테스팅
- Watch 모드 (`--wathch`)
- Script pre-loading (`--preload`)

```
bun은 jest의 호환을 목표로 하지만, 모든 것이 구현된 것은 아닙니다.
```

## CLI 비교

- bun: https://bun.sh/docs/cli/test#timeouts
- jest: https://jestjs.io/docs/cli
- node.js: https://nodejs.org/api/cli.html#--test

먼가 두개가 짬뽕되어 있는 느낌...ㅎㅎ;;

### bunfig.toml에서 test

- https://bun.sh/docs/runtime/bunfig#test-root

## jest에서 bun으로 마이그레이션 하기

https://bun.sh/guides/test/migrate-from-jest

실제로는 안되는게 많다..;;

### bun 호환성표 라고 쓰고, 이슈 티켓이라 쓴다...

https://github.com/oven-sh/bun/issues/1825

# 성능

## 벤치마크 hyperfine

https://github.com/sharkdp/hyperfine

## bun 메모리 사용

https://x.com/jarredsumner/status/1743564059927327062?s=20

## --watch 모드 성능

https://x.com/jarredsumner/status/1640890850535436288?s=20

## jest를 bun으로 점진적으로 변환하는 방범.

- jest: `.test.`
- bun: `.spec.`

## bun 로드맵

https://github.com/oven-sh/bun/issues/159
