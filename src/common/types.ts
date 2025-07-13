export interface ProductShortInfo {
	id: number;
	name: string;
	price: number;
	img?: string;
}

export interface Product extends ProductShortInfo {
	description: string;
	material: string;
	color: string;
}

export interface CheckoutFormData {
	name: string;
	phone: string;
	address: string;
}

export interface CartItem {
	name: string;
	price: number;
	count: number;
}

export type CartState = Record<number, CartItem>;

export interface Order {
	form: CheckoutFormData;
	cart: CartState;
}

export interface CheckoutResponse {
	id: number;
}
