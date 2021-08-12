import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../../interfaces/product';
import { ShopCategory } from '../../../../interfaces/category';

@Component({
    selector: 'app-product-sidebar',
    templateUrl: './product-sidebar.component.html',
    styleUrls: ['./product-sidebar.component.scss'],
})
export class ProductSidebarComponent implements OnInit {
    public categories$!: Observable<ShopCategory[]>;
    public latestProducts$!: Observable<Product[]>;

    constructor() {}

    public ngOnInit(): void {
        // this.categories$ = this.shop.getCategories({ depth: 1 });
        // this.latestProducts$ = this.shop.getLatestProducts(5);
    }
}
