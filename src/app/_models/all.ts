import { Order } from "./neworder";
import { NewOrder, DateTime, CartDetail, OrderDetail, Item, DestinationAddress, UserDetails } from "./neworderItem";

export interface OrderData extends Order, NewOrder, DateTime, CartDetail, OrderDetail, Item, DestinationAddress, UserDetails {}