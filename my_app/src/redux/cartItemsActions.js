import { BUY_ITEM } from "./cartItemsTypes";
import {DELETE_ITEM}from "./cartItemsTypes"
import { SALE_ITEMS } from "./cartItemsTypes";

export const buyItem = () => {
    return {
        type:BUY_ITEM
    }
}

export const deleteItem=()=>{
    return {
        type:DELETE_ITEM
    }
}

export const saleItem=()=>{
    return {
        type:SALE_ITEMS
    }
}