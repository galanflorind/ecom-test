import { Injectable } from '@angular/core';
import { Category, ShopCategory } from '../interfaces/category';
import { Address } from '../interfaces/address';
import { Order } from '../interfaces/order';
import { Product } from '../interfaces/product';
import { Brand } from '../interfaces/brand';

@Injectable({
    providedIn: 'root',
})
export class UrlService {
    constructor() { }

    public home(): string {
        return '/';
    }

    public shop(): string {
        return '/shop';
    }

    public category(category: Category): string {
        if (category.type === 'shop') {
            return this.shopCategory(category);
        }

        return '/';
    }

    public shopCategory(category: ShopCategory): string {
        return `/shop/category/${category.slug}` + (category.layout === 'products' ? '/products' : '');
    }

    public allProducts(): string {
        return '/shop/category/products';
    }

    public product(product: Product): string {
        return `/shop/products/${product.slug}`;
    }

    public brand(brand: Brand): string {
        return '/';
    }

    public address(address: Address): string {
        return `/account/addresses/${address.id}`;
    }

    public order(order: Order): string {
        return `/account/orders/${order.id}`;
    }

    public cart(): string {
        return '/shop/cart';
    }

    public checkout(): string {
        return '/shop/checkout';
    }

    public login(): string {
        return '/account/login';
    }

    public contacts(): string {
        return '/site/contact-us-v1';
    }
}
