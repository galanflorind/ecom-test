import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Product, Variant } from '../interfaces/product';
import { BehaviorSubject, EMPTY, Observable, of, Subject, timer } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface CartItem {
    product: Product;
    variant: Variant;
    // options: {
    //     name: string;
    //     value: string;
    // }[];
    quantity: number;
}

interface CartTotal {
    title: string;
    price: number;
    type: 'shipping' | 'fee' | 'tax' | 'other';
}

interface CartData {
    items: CartItem[];
    quantity: number;
    subtotal: number;
    totals: CartTotal[];
    total: number;
}

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private data: CartData = {
        items: [],
        quantity: 0,
        subtotal: 0,
        totals: [],
        total: 0,
    };

    private itemsSubject$: BehaviorSubject<CartItem[]> = new BehaviorSubject(this.data.items);
    private quantitySubject$: BehaviorSubject<number> = new BehaviorSubject(this.data.quantity);
    private subtotalSubject$: BehaviorSubject<number> = new BehaviorSubject(this.data.subtotal);
    private totalsSubject$: BehaviorSubject<CartTotal[]> = new BehaviorSubject(this.data.totals);
    private totalSubject$: BehaviorSubject<number> = new BehaviorSubject(this.data.total);
    private onAddingSubject$: Subject<Product> = new Subject();

    public get items(): ReadonlyArray<CartItem> {
        return this.data.items;
    }

    public get subtotal(): number {
        return this.data.subtotal;
    }

    public get totals(): ReadonlyArray<CartTotal> {
        return this.data.totals;
    }

    public get quantity(): number {
        return this.data.quantity;
    }

    public get total(): number {
        return this.data.total;
    }

    public readonly items$: Observable<CartItem[]> = this.itemsSubject$.asObservable();
    public readonly quantity$: Observable<number> = this.quantitySubject$.asObservable();
    public readonly subtotal$: Observable<number> = this.subtotalSubject$.asObservable();
    public readonly totals$: Observable<CartTotal[]> = this.totalsSubject$.asObservable();
    public readonly total$: Observable<number> = this.totalSubject$.asObservable();
    public readonly onAdding$: Observable<Product> = this.onAddingSubject$.asObservable();

    constructor(
        @Inject(PLATFORM_ID) private platformId: any
    ) {
        if (isPlatformBrowser(this.platformId)) {
            this.load();
            this.calc();
        }
    }

    /**
     * Adds item to the cart
     */
    public add(product: Product, variant: Variant, quantity: number): Observable<CartItem> {
        // -->Check: if variant has a price key
        if (!variant.hasOwnProperty('price')) {
            return;
        }

        this.onAddingSubject$.next(product);

        let item = this.items.find((eachItem) => {
            if (eachItem.product._id === product._id && eachItem.variant.id === variant.id) {
                return true;
            }

            // if (eachItem.options.length) {
            //     for (const option of options) {
            //         if (!eachItem.options.find(itemOption => itemOption.name === option.name && itemOption.value === option.value)) {
            //             return false;
            //         }
            //     }
            // }

            return false;
        });

        if (item) {
            item.quantity += quantity;
        } else {
            item = { product, quantity, variant };

            this.data.items.push(item);
        }

        // -->Save and calculate
        this.save();
        this.calc();

        return of(item);
    }

    /**
     * Updates cart item quantity and total
     */
    public update(updates: { item: CartItem; quantity: number }[]): Observable<void> {
        updates.forEach((update) => {
            // -->Find: item to update
            const item = this.items.find((eachItem) => eachItem === update.item);

            // -->Check: item and update its quantity
            if (item) {
                item.quantity = update.quantity;
            }
        });

        // -->Save and calculate
        this.save();
        this.calc();

        return EMPTY;
    }

    /**
     * Removes item from cart
     */
    public remove(item: CartItem): Observable<void> {
        // -->Removes: item
        this.data.items = this.data.items.filter((eachItem) => eachItem !== item);

        // -->Save and calculate
        this.save();
        this.calc();

        return EMPTY;
    }

    /**
     * Reset: cart
     */
    public clearCart(): void {
        this.data.items = [];

        // -->Save and calculate
        this.save();
        this.calc();
    }

    /**
     * Function to calculate the total
     * todo: taxes and shipping if you are not logged in
     */
    private calc(): void {
        let quantity = 0;
        let subtotal = 0;

        this.data.items.forEach(item => {
            quantity += item.quantity;
            subtotal += item.variant.price * item.quantity;
        });

        const totals: CartTotal[] = [];

        // totals.push({
        //     title: 'SHIPPING',
        //     price: 25,
        //     type: 'shipping',
        // });
        // totals.push({
        //     title: 'TAX',
        //     price: subtotal * 0.20,
        //     type: 'tax',
        // });

        const total = subtotal;

        this.data.quantity = quantity;
        this.data.subtotal = subtotal;
        this.data.totals = totals;
        this.data.total = total;

        this.itemsSubject$.next(this.data.items);
        this.quantitySubject$.next(this.data.quantity);
        this.subtotalSubject$.next(this.data.subtotal);
        this.totalsSubject$.next(this.data.totals);
        this.totalSubject$.next(this.data.total);
    }

    private save(): void {
        localStorage.setItem('cartItems', JSON.stringify(this.data.items));
    }

    private load(): void {
        const items = localStorage.getItem('cartItems');

        if (items) {
            this.data.items = JSON.parse(items);
        }
    }
}
