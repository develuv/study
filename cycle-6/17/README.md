# 17장 Restaurants 스크린 만들기

구현내용

- 카테고리
- 음식점 리스트
- 음식점 상세
  - 요리 리스트

`<helmet>` 작업을 한다.

## 1. gql `restaurantsPageQuery` 작성

1.  allCategories
2.  restaurants

> 내 생각에,, 우리만의 반복적인 작업방식이 생긴건 정말 좋은거야!!
>
> - 니코쌤

## 2. tailwind style

### form 작업

1.  input search style 작업
2.  카테고리 노출 작업
    1. hover 작업
       1. `group-hover`

```html
<div className="flex justify-around max-w-sm mx-auto ">
    {data?.allCategories.categories?.map((category) => (
        <div className="flex flex-col group items-center cursor-pointer">
            <div
            className=" w-16 h-16 bg-cover group-hover:bg-gray-100 rounded-full"
            style={{ backgroundImage: `url(${category.coverImg})` }}>
            </div>
            <span className="mt-1 text-sm text-center font-medium">
                {category.name}
            </span>
        </div>
    ))}
</div>
```

### 음식점 리스트 만들기 (Restaurants Pagination)

      1.  grid 사용 (`grid grid-cols-3 gap-7 gap-x-5 gap-y-7`)
      2.  bg-cover, bg-center 이런거 사용하기 넘 편함.

### 카테고리 백엔드를 고쳐야함 (Restaurants Pagination)

1. restaurant 컴포넌트화
   1. 코드를 작성하기 전에 코드를 어떻게 구성할지 생각하지 않음
      1. 못생긴 코드를 작성하고 동작하면, 이후에 정리하는 방법
      2. 5분 코드를 작성하고, 5분 코드를 정리하는 방법 (창작모드 off)
   2. `&rarr`, `&larr`
2. NestJS 수정 (Pagination 처리)

### 검색 (Search part One)

1. 반응형 처리 `md:grid-cols-3`, `md:w-3/12`
2. useForm 적용
   1. 검색어를 querystring vs history state
      1. history에 state 넣기 (https://developer.mozilla.org/ko/docs/Web/API/Window/popstate_event)
   2.

### 검색 (Search part two)

- searchTerm (queryString)이 없으면 replace('/');
  - 간단하지만 굉장히 유용해 보임!

#### fragment

1. fragment (src/fragments.ts) 1. 같은 Query를 여러 곳에서 사용할 때

   ```javascript
   export const RESTAURANT_FRAGMENT = gql`
     fragment RestaurantParts on Restaurant {
       id
       name
       coverImg
       category {
         name
       }
       address
       isPromoted
     }
   `;
   ```

   `search.tsx`

```javascript
import { RESTAURANT_FRAGMENT } from "../../fragments";

export const SEARCH_RESTAURANT = gql`
  query searchRestaurant($input: SearchRestaurantInput!) {
    searchRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResults
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;
```

apollo.config.js에

```javascript
module.exports = {
 client: {
     includes: ["./src/**/*.{tsx,ts}"]
     ...
 }
}
```

#### Lazy Query

조건에 따라 Query를 실행하는 방법
