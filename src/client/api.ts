import axios from "axios";
import { CartState, CheckoutFormData, CheckoutResponse, Product, ProductShortInfo } from "../common/types";

export class ExampleApi {
	constructor(private readonly basename: string) {}

	async getProducts() {
		const products = await axios.get<ProductShortInfo[]>(`${this.basename}/api/products`);
		const { data: cats } = await axios.get<{ id: string; url: string }[]>(
			`https://api.thecatapi.com/v1/images/search?limit=${Math.min(
				products.data.length,
				100
			)}&api_key=live_GHAG29n7Vgfyh3cT5hdzclPjBPzUMkKaYkaKiakQvVvsoXufUs7ls3K2ZrHDOXsM`
		);

		products.data.forEach((product, index) => {
			product.img = cats[index].url;
		});

		return products;
	}

	async getProductById(id: number) {
		return await axios.get<Product>(`${this.basename}/api/products/${id}`);
	}

	async checkout(form: CheckoutFormData, cart: CartState) {
		return await axios.post<CheckoutResponse>(`${this.basename}/api/checkout`, { form, cart });
	}
}

export const LOCAL_STORAGE_CART_KEY = "example-store-cart";

export class CartApi {
	getState(): CartState {
		try {
			const json = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
			return (JSON.parse(json) as CartState) || {};
		} catch {
			return {};
		}
	}

	setState(cart: CartState) {
		localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
	}
}
