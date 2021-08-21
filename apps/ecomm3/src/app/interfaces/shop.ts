import { ShopCategory } from "./category";
import { Product } from "./product";

export interface GetBrandsOptions {
    limit?: number;
}

export interface GetProductsListOptions {
    page?: number;
    limit?: number;
    sort?: string;
    filters?: { [slug: string]: string; };
    category?: number;
    searchTerm?: string;
}

export interface GetSearchSuggestionsOptions {
    limitProducts?: number;
    limitCategories?: number;
}

export interface CheckoutItemOptionData {
    name: string;
    value: string;
}
