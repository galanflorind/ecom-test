import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../../../interfaces/product';
import { ECommerceService } from "../../../../e-commerce.service";
import { QuickMongoQuery } from "@naologic/nao-utils";
import {AppService} from "../../../../app.service";
import {NaoSettingsInterface} from "../../../../../../../../libs/nao-interfaces/src";

interface ProductsCarouselData {
    products: Product[];
    loading: boolean;
}
//
// interface DeferredData<T> {
//     loading: boolean;
//     data$: Observable<T>;
// }

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    public featuredProducts: ProductsCarouselData = {
        loading: false,
        products: []
    };
    public dataSub = new Subscription();


    constructor(
        private ecommerceService: ECommerceService,
    ) { }

    public ngOnInit(): void {


        this.refreshFeaturedProducts();

        // this.featuredProducts = this.makeCarouselData([
        //     {
        //         label: 'All',
        //         products$: this.shopApi.getFeaturedProducts(null, 8),
        //     },
        //     {
        //         label: 'Power Tools',
        //         products$: this.shopApi.getFeaturedProducts('power-tools', 8),
        //     },
        //     {
        //         label: 'Hand Tools',
        //         products$: this.shopApi.getFeaturedProducts('hand-tools', 8),
        //     },
        //     {
        //         label: 'Plumbing',
        //         products$: this.shopApi.getFeaturedProducts('plumbing', 8),
        //     },
        // ]);

    }

    /**
     * Make carousel data
     */
    // private makeCarouselData(groups: ProductsCarouselGroup[]): ProductsCarouselData {
    //     const subject = new BehaviorSubject<ProductsCarouselGroup>(groups[0]);
    //     const carouselData: ProductsCarouselData = {
    //         subject$: subject,
    //         products$: subject.pipe(
    //             filter(x => x !== null),
    //             tap(() => carouselData.loading = true),
    //             switchMap(group => group.products$),
    //             tap(() => carouselData.loading = false),
    //         ),
    //         loading: true,
    //         groups,
    //     };
    //
    //     return carouselData;
    // }

    /**
     * Get products
     * @WIP
     * TODO: get featured products and let user pick up to 10 featured products
     */
    public refreshFeaturedProducts(): void{
        // // -->Prepare: query
        // const query = this.search.searchQuery$.getValue();
        // // -->Set: pagination options
        // query.options = {
        //     ...query.options,
        //     ...this.search.pageQuery$.getValue().options,
        //     sort: this.sort.sorts.getValue()
        // };
        // todo: add fetch
        const query = new QuickMongoQuery()
            .limit(10)
            .returnDataModel({ _id: 1, data: 1 })
            .done();
        // -->Start: loading
        this.featuredProducts.loading = true;
        this.ecommerceService.productsList(query).subscribe(res => {
            this.featuredProducts.products = res.data;
            this.featuredProducts.loading = false;
        }, err => err)

    }
}
