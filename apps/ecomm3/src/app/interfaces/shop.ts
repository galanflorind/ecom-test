export interface GetProductsListOptions {
    page?: number;
    limit?: number;
    sort?: string;
    filters?: { [slug: string]: string; };
    category?: number;
    searchTerm?: string;
}
