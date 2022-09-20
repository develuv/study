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

1. form 작업
   1. input search style 작업
   2. 카테고리 노출 작업
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

      1. 음식점 리스트 만들기
      2.
