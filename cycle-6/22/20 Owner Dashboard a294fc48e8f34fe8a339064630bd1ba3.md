# 20. Owner Dashboard

1. 레스토랑 생성
    
    ![스크린샷 2022-10-26 오전 8.56.16.png](20%20Owner%20Dashboard%20a294fc48e8f34fe8a339064630bd1ba3/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2022-10-26_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB_8.56.16.png)
    
2. 음식 생성(옵션까지)
    
    ![스크린샷 2022-10-26 오전 8.59.53.png](20%20Owner%20Dashboard%20a294fc48e8f34fe8a339064630bd1ba3/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2022-10-26_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB_8.59.53.png)
    

1. 레스토랑 상세화면  (음식들)
    
    ![스크린샷 2022-10-26 오전 8.58.32.png](20%20Owner%20Dashboard%20a294fc48e8f34fe8a339064630bd1ba3/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2022-10-26_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB_8.58.32.png)
    

### 요약

- 레스토랑 주인에 대한 라우터 추가 (레스토랑 리스트, 레스토랑 생성, 레스토랑 상세 조회)
- 파일업로드 (aws S3)
    - backend cors설정
- 레스토랑 생성 후 리스트 갱싱 (refetchQueries)
    - backend response에 id추가 (리스트 재조회 안하고 상세조회 가능하게)
    - readQuery, writeQuery등이 있음
- 상세화면에서 음식 메뉴 추가하는 form개발
    - 옵션생성에서 배열을 form으로 개발하는 방법 (유티크한 키값 : `${id}-name`)
- 기간별 매출 현황 그래프
    - Victory Charts

**20.0 Order Dashboard Routes**

1. owner가 자기가 가지고 있는 레스토랑을 볼수있는 페이지 생성
2. 각권한별 라우트 설정 (권한별 라우트 배열 처리 방식 수정)

```jsx
const clientRoutes = [
  {
    path: "/",
    component: <Restaurants />,
  },
  {
    path: "/search",
    component: <Search />,
  },
  {
    path: "/category/:slug",
    component: <Category />,
  },
  {
    path: "/restaurants/:id",
    component: <Restaurant />,
  },
]
const commonRoutes = [
  { path: "/confirm", component: <ConfirmEmail /> },
  { path: "/edit-profile", component: <EditProfile /> },
];

const restaurantRoutes = [{ path: "/", component: <MyRestaurants /> }];

{data.me.role === "Client" &&
  clientRoutes.map((route) => (
    <Route key={route.path} path={route.path}>
      {route.component}
    </Route>
))}

{data.me.role === "Owner" &&
  restaurantRoutes.map((route) => (
    <Route key={route.path} path={route.path}>
      {route.component}
    </Route>
))}

{commonRoutes.map((route) => (
  <Route key={route.path} path={route.path}>
    {route.component}
  </Route>
))}
```

****20.1 Create Restaurant part One (14:58)****

add-restaurants

![스크린샷 2022-10-14 오전 10.05.46.png](20%20Owner%20Dashboard%20a294fc48e8f34fe8a339064630bd1ba3/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2022-10-14_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB_10.05.46.png)

```jsx
import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import {
  createRestaurant,
  createRestaurantVariables,
} from "../../__generated__/createRestaurant";
import { CREATE_ACCOUNT_MUTATION } from "../create-account";

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      error
      ok
    }
  }
`;

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
}

export const AddRestaurant = () => {
  const [createRestaurantMutation, { loading, data }] = useMutation<
    createRestaurant,
    createRestaurantVariables
  >(CREATE_RESTAURANT_MUTATION);
  const {
    register,
    getValues,
    formState,
    errors,
    handleSubmit,
  } = useForm<IFormProps>({
    mode: "onChange",
  });
  const onSubmit = () => {
    console.log(getValues());
  };
  return (
    <div className="container">
      <Helmet>
        <title>Add Restaurant | Nuber Eats</title>
      </Helmet>
      <h1>Add Restaurant</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input"
          type="text"
          name="name"
          placeholder="Name"
          ref={register({ required: "Name is required." })}
        />
        <input
          className="input"
          type="text"
          name="address"
          placeholder="Address"
          ref={register({ required: "Address is required." })}
        />
        <input
          className="input"
          type="text"
          name="categoryName"
          placeholder="Category Name"
          ref={register({ required: "Category Name is required." })}
        />
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="Create Restaurant"
        />
      </form>
    </div>
  );
};
```

****20.1&2 File Upload part One (04:56)****

파일 업로드를 처리하기 위해 Nest는 Express용 multer 라이브러리 사용

특징

- form 의 type을 `enctype="multipart/form-data"` 로 설정해야 사용자가 전송한 파일을 서버로 전송할 수 있다.
- file.buffer란
    - 버퍼는 바이트 배열일 뿐입니다(여기서 00에서 ff 또는 0에서 255로 16진수로 인쇄됨)
    - 모든 파일은 바이트 배열로 나타낼수 있음
    - 용향이 큰 데이터를 전송할 때 한 번에 전송하지 않고 특정 단위 만큼 자르고 묶어서 전송을 하기 위해 사용되는 개념이다.
    - 버퍼의 크기만큼 데이터를 순차적으로 버퍼에 담아서 전송한다.
    - 버퍼는 숫자의 배열이고 메모리의 데이터를 가리키며 데이터의 바이트 그 자체이다.

uploads 모듈 생성

```jsx
import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';

@Module({
  controllers: [UploadsController],
})
export class UploadsModule {}
```

upload controller 생성

```jsx
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';

const BUCKET_NAME = 'kimchinubereats123';

@Controller('uploads')
export class UploadsController {
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    AWS.config.update({
      credentials: {
        accessKeyId: 'AKIAQT377QAT3QJHP2RK',
        secretAccessKey: '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',
      },
    });
    try {
      const objectName = `${Date.now() + file.originalname}`;
      await new AWS.S3()
				.createBucket({ //버킷 생성후 해당 코드 삭제 함
				    Bucket: BUCKET_NAME, // 전세계에서 하나뿐인 유니크네임이어야 함
				});
        .putObject({
          Body: file.buffer,
          Bucket: BUCKET_NAME,
          Key: objectName,
          ACL: 'public-read', //S3 권한 설정
        })
        .promise();
      const url = `https://${BUCKET_NAME}.s3.amazonaws.com/${objectName}`;
      return { url };
    } catch (e) {
      return null;
    }
  }
}
```

****22.4 Create Restaurant part Two****

upload api 사용

- 파일 upload는 fetch를 사용하여 업로드 후에 url만 graph ql로 전달

```jsx

  const onSubmit = async () => {
    try {
      setUploading(true);
      const { file, name, categoryName, address } = getValues();
      const actualFile = file[0];
      const formBody = new FormData();
      formBody.append("file", actualFile);
      const { url: coverImg } = await (
        await fetch("http://localhost:4000/uploads/", {
          method: "POST",
          body: formBody,
        })
      ).json();
      createRestaurantMutation({
        variables: {
          input: {
            name,
            categoryName,
            address,
            coverImg,
          },
        },
      });
    } catch (e) {}
  };
```

backend cors설정

main.ts

```jsx
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(); // 간단 cors설정
  await app.listen(process.env.PORT || 4000);
}

//whiteList 버전
var whitelist = ['example.com', 'api.example.com'];
app.enableCors({
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
});
```

****#22.5,6 Cache Optimization part One
레스토랑 생성 후 리스트 갱신****

1. graph ql 캐쉬 갱신
- useMutation의 refetchQueries 옵션 사용
- 레스토랑 생성 → 레스토랑 리스트 재호출

```jsx
refetchQueries: [{query: MY_RESAUTRANTS_QUERY}]
```

1. 캐쉬 fake 하기
- 입력 정보로 로컬 캐쉬 갱신 + 레스토랑 생성 api에서 id리턴

backend코드 추가

create-restaurant.dto.ts. 

restaurantId field생성

```jsx
@ObjectType()
export class CreateRestaurantOutput extends CoreOutput {
  @Field(type => Int)
  restaurantId?: number;
}
```

restaurants.service.ts

```jsx
async createRestaurant(
    owner: User,
    createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    try {
      const newRestaurant = this.restaurants.create(createRestaurantInput);
      newRestaurant.owner = owner;
      const category = await this.categories.getOrCreate(
        createRestaurantInput.categoryName,
      );
      newRestaurant.category = category;
      await this.restaurants.save(newRestaurant);
      return {
        ok: true,
        restaurantId: newRestaurant.id, //id 리턴
      };
    } catch {
      return {
        ok: false,
        error: 'Could not create restaurant',
      };
    }
  }
```

graph ql 프론트 cache다루는 함수

- readQuery

```jsx
const queryResult = client.readQuery({ query: MY_RESTAURANTS_QUERY });
```

- writeQuery

```jsx
client.writeQuery({
        query: MY_RESTAURANTS_QUERY,
        data: {
          myRestaurants: {
            ...queryResult.myRestaurants,
            restaurants: [
              {
                address,
                category: {
                  name: categoryName,
                  __typename: "Category",
                },
                coverImg: imageUrl,
                id: restaurantId,
                isPromoted: false,
                name,
                __typename: "Restaurant",
              },
              ...queryResult.myRestaurants.restaurants,
            ],
          },
        },
      });
```

****#22.7 Restaurant Dashboard part One****

- 레스토랑 상세화면 조회
- 메뉴리스트 노출

```jsx
const MY_RESTAURANT_QUERY = gql`
  query myRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

interface IParams {
  id: string;
}

export const MyRestaurant = () => {
  const { id } = useParams<IParams>();
  const { data } = useQuery<myRestaurant, myRestaurantVariables>(
    MY_RESTAURANT_QUERY,
    {
      variables: {
        input: {
          id: +id,
        },
      },
    }
  );
  console.log(data);
  return (
		<div>
      <div
        className="  bg-gray-700  py-28 bg-center bg-cover"
        style={{
          backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImg})`,
        }}
      ></div>
      <div className="container mt-10">
        <h2 className="text-4xl font-medium mb-10">
          {data?.myRestaurant.restaurant?.name || "Loading..."}
        </h2>
        <Link to={``} className=" mr-8 text-white bg-gray-800 py-3 px-10">
          Add Dish &rarr;
        </Link>
        <Link to={``} className=" text-white bg-lime-700 py-3 px-10">
          Buy Promotion &rarr;
        </Link>
        <div className="mt-10">
          {data?.myRestaurant.restaurant?.menu.length === 0 ? (
            <h4 className="text-xl mb-5">Please upload a dish!</h4>
          ) : null}
        </div>
      </div>
    </div>);
};
```

****22.8,9 Create Dish part One (09:55)****

- 음식 추가
- react-hook-form

add-dish

```jsx
import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";

const CREATE_DISH_MUTATION = gql`
  mutation createDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;

interface IParams {
  restaurantId: string;
}

export const AddDish = () => {
  const { restaurantId } = useParams<IParams>();
	const history = useHistory();
  const [createDishMutation, { loading }] = useMutation<
    createDish,
    createDishVariables
  >(CREATE_DISH_MUTATION, {
    refetchQueries: [ 
      {
        query: MY_RESTAURANT_QUERY,
        variables: { //refetch 시 variables없으면 error
          input: {
            id: +restaurantId,
          },
        },
      },
    ],
  });
  const { register, handleSubmit, formState, getValues } = useForm<IForm>({
    mode: "onChange",
  });
  const onSubmit = () => {
    const { name, price, description } = getValues();
    createDishMutation({
      variables: {
        input: {
          name,
          price: +price,
          description,
          restaurantId: +restaurantId,
        },
      },
    });
    history.goBack();
  };
  return (
    <div className="container flex flex-col items-center mt-52">
      <Helmet>
        <title>Add Dish | Nuber Eats</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Add Dish</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
        <input
          className="input"
          type="text"
          name="name"
          placeholder="Name"
          ref={register({ required: "Name is required." })}
        />
        <input
          className="input"
          type="number"
          name="price"
          min={0}
          placeholder="Price"
          ref={register({ required: "Price is required." })}
        />
        <input
          className="input"
          type="text"
          name="description"
          placeholder="Description"
          ref={register({ required: "Description is required." })}
        />
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="Create Dish"
        />
      </form>
    </div>
  );};
```

****#22.10, 11 DishOptions part One****

- 옵션 선택하는 화면 개발
- 옵셕 갯수만큼 입력창 생성
- name은 index를 활용하여 유니크하게 생성

```jsx
const {
  register,
  handleSubmit,
  formState,
  getValues,
  setValue,
} = useForm<IForm>({
  mode: "onChange",
});

const onSubmit = () => {
    const { name, price, description, ...rest } = getValues();
    const optionObjects = optionsNumber.map((theId) => ({
      name: rest[`${theId}-optionName`],
      extra: +rest[`${theId}-optionExtra`],
    }));
    createDishMutation({
      variables: {
        input: {
          name,
          price: +price,
          description,
          restaurantId: +restaurantId,
          options: optionObjects,
        },
      },
    });
    history.goBack();
  };
  const [optionsNumber, setOptionsNumber] = useState<number[]>([]);
  const onAddOptionClick = () => {
    setOptionsNumber((current) => [Date.now(), ...current]);
  };
  const onDeleteClick = (idToDelete: number) => {
    setOptionsNumber((current) => current.filter((id) => id !== idToDelete));
    setValue(`${idToDelete}-optionName`, "");
    setValue(`${idToDelete}-optionExtra`, "");
  };
  return (
    <div className="container flex flex-col items-center mt-52">
      <Helmet>
        <title>Add Dish | Nuber Eats</title>
      </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Add Dish</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
        <input
          className="input"
          type="text"
          name="name"
          placeholder="Name"
          ref={register({ required: "Name is required." })}
        />
        <input
          className="input"
          type="number"
          name="price"
          min={0}
          placeholder="Price"
          ref={register({ required: "Price is required." })}
        />
        <input
          className="input"
          type="text"
          name="description"
          placeholder="Description"
          ref={register({ required: "Description is required." })}
        />
        <div className="my-10">
          <h4 className="font-medium  mb-3 text-lg">Dish Options</h4>
          <span
            onClick={onAddOptionClick}
            className="cursor-pointer text-white bg-gray-900 py-1 px-2 mt-5 bg-"
          >
            Add Dish Option
          </span>
          {optionsNumber.length !== 0 &&
            optionsNumber.map((id) => (
              <div key={id} className="mt-5">
                <input
                  ref={register}
                  name={`${id}-optionName`}
                  className="py-2 px-4 focus:outline-none mr-3 focus:border-gray-600 border-2"
                  type="text"
                  placeholder="Option Name"
                />
                <input
                  ref={register}
                  name={`${id}-optionExtra`}
                  className="py-2 px-4 focus:outline-none focus:border-gray-600 border-2"
                  type="number"
                  min={0}
                  placeholder="Option Extra"
                />
                <span
                  className="cursor-pointer text-white bg-red-500 ml-3 py-3 px-4 mt-5 bg-"
                  onClick={() => onDeleteClick(id)}
                >
                  Delete Option
                </span>
              </div>
            ))}
        </div>
        <Button
          loading={loading}
          canClick={formState.isValid}
          actionText="Create Dish"
        />
      </form>
    </div>
  );
```

****22.12 Dish Component****

- 등록한 음식 리스트 화면 개발

```jsx
<div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
  {data?.myRestaurant.restaurant?.menu.map((dish) => (
    <Dish
      name={dish.name}
      description={dish.description}
      price={dish.price}
    />
  ))}
</div>
```

****22.13 Victory Charts part One****

- 차트 (victory)[https://formidable.com/open-source/victory/docs/victory-chart/](https://formidable.com/open-source/victory/docs/victory-chart/)
- 시간에 따른 주문량

```jsx
<div className=" max-w-lg w-full mx-auto">
  <VictoryPie
    data={chartData}
    colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
  />
<div className="  mt-10">
  <VictoryChart
    height={500}
    theme={VictoryTheme.material}
    width={window.innerWidth}
    domainPadding={50}
    containerComponent={<VictoryVoronoiContainer />}
  >
    <VictoryLine
      labels={({ datum }) => `$${datum.y}`}
      labelComponent={
        <VictoryTooltip
          style={{ fontSize: 18 } as any}
          renderInPortal
          dy={-20}
        />
      }
      data={data?.myRestaurant.restaurant?.orders.map((order) => ({
        x: order.createdAt,
        y: order.total,
      }))}
      interpolation="natural"
      style={{
        data: {
          strokeWidth: 5,
        },
      }}
    />
    <VictoryAxis
      tickLabelComponent={<VictoryLabel renderInPortal />}
      style={{
        tickLabels: {
          fontSize: 20,
        } as any,
      }}
      tickFormat={(tick) => new Date(tick).toLocaleDateString("ko")}
    />
  </VictoryChart>
</div>
```