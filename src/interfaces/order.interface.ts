import Product from "./product";

export interface order {
    orderId :number | string,
    shippingAddress : string,
    totalPrice : number,
    orderedItem : Product[]
}