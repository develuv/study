# 24. MAKING AN ORDER

**24.0 Extending the Dish Component** 

- DishComponent 추가

```tsx
interface IDishProps {
  description: string;
  name: string;
  price: number;
  isCustomer?: boolean;
  options?: restaurant_restaurant_restaurant_menu_options[] | null;
}

export const Dish: React.FC<IDishProps> = ({
  description,
  name,
  price,
  isCustomer = false,
  options,
}) => {
  return (
    <div className=" px-8 py-4 border cursor-pointer hover:border-gray-800 transition-all ">
      <div className="mb-5">
        <h3 className="text-lg font-medium ">{name}</h3>
        <h4 className="font-medium">{description}</h4>
      </div>
      <span>${price}</span>
      {isCustomer && options && options?.length !== 0 && (
        <div>
          <h5 className="mt-8 mb-3 font-medium">Dish Options:</h5>
          {options?.map((option, index) => (
            <span className="flex items-center" key={index}>
              <h6 className="mr-2">{option.name}</h6>
              <h6 className="text-sm opacity-75">(${option.extra})</h6>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
```

- 메뉴 목록을 호출하는 UI를 구성한다.
```tsx
const RESTAURANT_QUERY = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

<div className="container grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
  {data?.restaurant.restaurant?.menu.map((dish, index) => (
    <Dish
      key={index}
      name={dish.name}
      description={dish.description}
      price={dish.price}
      isCustomer={true}
      options={dish.options}
    />
  ))}
</div>
```

**24.1 Extending the Dish Component**
- Dish Component를 확장해서 주문에 추가하는 기능을 구현한다.

```tsx
const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error
    }
  }
`;

const [orderStarted, setOrderStarted] = useState(false);
const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);
const triggerStartOrder = () => {
  setOrderStarted(true);
};

const addItemToOrder = (dishId: number) => {
  setOrderItems((current) => [{ dishId }]);
};

<div className="container pb-32 flex flex-col items-end mt-20">
  <button onClick={triggerStartOrder} className="btn px-10">
    Start Order
  </button>
  <div className="w-full grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
    {data?.restaurant.restaurant?.menu.map((dish, index) => (
      <Dish
        id={dish.id}
        orderStarted={orderStarted}
        key={index}
        name={dish.name}
        description={dish.description}
        price={dish.price}
        isCustomer={true}
        options={dish.options}
        addItemToOrder={addItemToOrder}
      />
    ))}
  </div>
</div>
```

- 주문 시작 가능한 상태일 때만 메뉴를 추가하도록 구성한다.
```tsx
export const Dish: React.FC<IDishProps> = ({
  id = 0,
  description,
  name,
  price,
  isCustomer = false,
  orderStarted = false,
  options,
  addItemToOrder,
}) => {
  return (
    <div
      onClick={() => (orderStarted ? addItemToOrder(id) : null)}
      className=" px-8 py-4 border cursor-pointer hover:border-gray-800 transition-all "
    >
      <div className="mb-5">
        <h3 className="text-lg font-medium ">{name}</h3>
        <h4 className="font-medium">{description}</h4>
```

**22.2 Making Order part Two**
- 별도 onclick 함수로 분리하고 메뉴가 선택이 토글되도록 추가

```tsx
export const Dish: React.FC<IDishProps> = ({
  id = 0,
  description,
  name,
  price,
  isCustomer = false,
  orderStarted = false,
  options,
  addItemToOrder,
  isSelected,
  removeFromOrder,
}) => {
  const onClick = () => {
    if (orderStarted) {
      if (!isSelected && addItemToOrder) {
        return addItemToOrder(id);
      }
      if (isSelected && removeFromOrder) {
        return removeFromOrder(id);
      }
    }
  };
  return (
    <div
      onClick={onClick}
      className={` px-8 py-4 border cursor-pointer  transition-all ${
        isSelected ? "border-gray-800" : " hover:border-gray-800"
      }`}
    >
```

-  주문 추가, 삭제 함수 변경하고 멀티 선택이 가능하도록 변경

```tsx
  const isSelected = (dishId: number) => {
    return Boolean(orderItems.find((order) => order.dishId === dishId));
  };

  const addItemToOrder = (dishId: number) => {
    if (isSelected(dishId)) {
      return;
    }
    setOrderItems((current) => [{ dishId }, ...current]);
  };

  const removeFromOrder = (dishId: number) => {
    setOrderItems((current) =>
      current.filter((dish) => dish.dishId !== dishId)
    );

    <div className="container pb-32 flex flex-col items-end mt-20">
      <button onClick={triggerStartOrder} className="btn px-10">
        {orderStarted ? "Ordering" : "Start Order"}
      </button>
      <div className="w-full grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
        {data?.restaurant.restaurant?.menu.map((dish, index) => (
          <Dish
            isSelected={isSelected(dish.id)}
            id={dish.id}
            orderStarted={orderStarted}
            key={index}
            name={dish.name}
            description={dish.description}
            price={dish.price}
            isCustomer={true}
            options={dish.options}
            addItemToOrder={addItemToOrder}
            removeFromOrder={removeFromOrder}
          />
        ))}
      </div>
```

**22.3 Making Order part Three**

- 메뉴 옵션을 주문에 추가시킨다.

```tsx
const addOptionToItem = (dishId: number, option: any) => {
  if (!isSelected(dishId)) {
    return;
  }
  
  const oldItem = getItem(dishId);
  
  if (oldItem) {
    removeFromOrder(dishId);
    setOrderItems((current) => [
      { dishId, options: [option, ...oldItem.options!] },
      ...current,
    ]);
  }
};

<span
  onClick={() =>
    addOptionToItem
      ? addOptionToItem(id, {
        name: option.name,
      })
      : null
  }
  className="flex border items-center"
  key={index}
>
```

**22.4 Making Order part Four**

- 추가하려는 옵션이 없는 경우에만 추가하도록 변경

```tsx
  const addOptionToItem = (dishId: number, option: any) => {
    if (!isSelected(dishId)) {
      return;
    }
    const oldItem = getItem(dishId);
    
    if (oldItem) {
      const hasOption = Boolean(
        oldItem.options?.find((aOption) => aOption.name == option.name)
      );
      
      if (!hasOption) {
        removeFromOrder(dishId);
        setOrderItems((current) => [
          { dishId, options: [option, ...oldItem.options!] },
          ...current,
        ]);
      }
    }
  };

  const getOptionFromItem = (
    item: CreateOrderItemInput,
    optionName: string
  ) => {
    return item.options?.find((option) => option.name === optionName);
  };
  
  const isOptionSelected = (dishId: number, optionName: string) => {
    const item = getItem(dishId);
    if (item) {
      return Boolean(getOptionFromItem(item, optionName));
    }
  };

<div className="w-full grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
  {data?.restaurant.restaurant?.menu.map((dish, index) => (
    <Dish
      isSelected={isSelected(dish.id)}
      id={dish.id}
      orderStarted={orderStarted}
      key={index}
      name={dish.name}
      description={dish.description}
      price={dish.price}
      isCustomer={true}
      options={dish.options}
      addItemToOrder={addItemToOrder}
      removeFromOrder={removeFromOrder}
    >
    {dish.options?.map((option, index) => (
        <span
          onClick={() =>
            addOptionToItem
              ? addOptionToItem(dish.id, {
                name: option.name,
              })
              : null
          }
          className={`flex border items-center ${
            isOptionSelected(dish.id, option.name)
              ? "border-gray-800"
              : ""
          }`}
          key={index}
        >
          <h6 className="mr-2">{option.name}</h6>
          <h6 className="text-sm opacity-75">(${option.extra})</h6>
        </span>
      ))}
    </Dish>
    ))}
</div>
```

***22.5 Making Order part Five***
- DishOption 컴포넌트 생성
```tsx
import React from "react";

interface IDishOptionProps {
  isSelected: boolean;
  name: string;
  extra?: number | null;
  dishId: number;
  addOptionToItem: (dishId: number, optionName: string) => void;
  removeOptionFromItem: (dishId: number, optionName: string) => void;
}

export const DishOption: React.FC<IDishOptionProps> = ({
  isSelected,
  name,
  extra,
  addOptionToItem,
  removeOptionFromItem,
  dishId,
}) => {
  const onClick = () => {
    if (isSelected) {
      removeOptionFromItem(dishId, name);
    } else {
      addOptionToItem(dishId, name);
    }
  };
  return (
    <span
      onClick={onClick}
      className={`flex border items-center ${
        isSelected ? "border-gray-800" : ""
      }`}
    >
      <h6 className="mr-2">{name}</h6>
      {extra && <h6 className="text-sm opacity-75">(${extra})</h6>}
    </span>
  );
};
```
- 옵션 추가 및 삭제하는 함수를 분리

```tsx
  const addOptionToItem = (dishId: number, optionName: string) => {
    if (!isSelected(dishId)) {
      return;
    }
    const oldItem = getItem(dishId);
    if (oldItem) {
      const hasOption = Boolean(
        oldItem.options?.find((aOption) => aOption.name == optionName)
      );
      if (!hasOption) {
        removeFromOrder(dishId);
        setOrderItems((current) => [
          { dishId, options: [{ name: optionName }, ...oldItem.options!] },
          ...current,
        ]);
      }
    }
  };

  const removeOptionFromItem = (dishId: number, optionName: string) => {
    if (!isSelected(dishId)) {
      return;
    }
    const oldItem = getItem(dishId);
    if (oldItem) {
      removeFromOrder(dishId);
      setOrderItems((current) => [
        {
          dishId,
          options: oldItem.options?.filter(
            (option) => option.name !== optionName
          ),
        },
        ...current,
      ]);
      return;
    }
  };

<DishOption
  key={index}
  dishId={dish.id}
  isSelected={isOptionSelected(dish.id, option.name)}
  name={option.name}
  extra={option.extra}
  addOptionToItem={addOptionToItem}
  removeOptionFromItem={removeOptionFromItem}
/>
```

***22.6 Making Order part Six***
주문 취소, 주문 완료 후처리 완료 이후 해당 주문 페이지로 이동

```tsx
const triggerCancelOrder = () => {
  setOrderStarted(false);
  setOrderItems([]);
};
const history = useHistory();
const onCompleted = (data: createOrder) => {
  const {
    createOrder: { ok, orderId },
  } = data;
  if (data.createOrder.ok) {
    history.push(`/orders/${orderId}`);
  }
};
const [createOrderMutation, { loading: placingOrder }] = useMutation<
  createOrder,
  createOrderVariables
  >(CREATE_ORDER_MUTATION, {
  onCompleted,
});
const triggerConfirmOrder = () => {
  if (orderItems.length === 0) {
    alert("Can't place empty order");
    return;
  }
  const ok = window.confirm("You are about to place an order");
  if (ok) {
    createOrderMutation({
      variables: {
        input: {
          restaurantId: +params.id,
          items: orderItems,
        },
      },
    });
  }
};

{!orderStarted && (
  <button onClick={triggerStartOrder} className="btn px-10">
    Start Order
  </button>
)}
{orderStarted && (
  <div className="flex items-center">
    <button onClick={triggerConfirmOrder} className="btn px-10 mr-3">
      Confirm Order
    </button>
    <button
      onClick={triggerCancelOrder}
      className="btn px-10 bg-black hover:bg-black"
    >
      Cancel Order
    </button>
  </div>
)}
```