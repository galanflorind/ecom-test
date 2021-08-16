import { ShopCategory } from "./category";
import { Product } from "./product";

export interface GetCategoryBySlugOptions {
    depth?: number;
}

export interface GetCategoriesOptions {
    parent?: Partial<ShopCategory>;
    slugs?: string[];
    depth?: number;
}

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

export interface GetProductReviewsOptions {
    page?: number;
    limit?: number;
    sort?: string;
    filters?: { [slug: string]: string };
}

export interface AddProductReviewData {
    rating: number;
    author: string;
    email: string;
    content: string;
}

export interface GetSearchSuggestionsOptions {
    limitProducts?: number;
    limitCategories?: number;
}

export interface GetSearchSuggestionsResult {
    products: Product[];
    categories: ShopCategory[];
}

export interface CheckoutItemOptionData {
    name: string;
    value: string;
}
