import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NaoHttp2ApiService } from '@naologic/nao-http2';
import { NaoDocumentInterface } from "@naologic/nao-interfaces";

@Injectable({
    providedIn: 'root'
})
export class ECommerceService<T = any> {
    public readonly api = { path: 'ecommerce-api-public' };
    public readonly subs = new Subscription();

    constructor(
        private readonly naoHttp2ApiService: NaoHttp2ApiService,
    ) {
    }

    /**
     * Get info that contains categories, vendors, FAQ and stuff like that
     */
    public getInfo(data?: any, naoQueryOptions = NaoDocumentInterface.naoQueryOptionsDefault()): Observable<T> {
        return this.naoHttp2ApiService.postJson<T>(`${this.api.path}/info/get/${naoQueryOptions.docName}/data`, { data: { m: 12 }, naoQueryOptions });
    }

    /**
     * Get a document by Id
     */
    public productsGet(docId: string, naoQueryOptions = NaoDocumentInterface.naoQueryOptionsDefault()): Observable<T> {
        return this.naoHttp2ApiService.postJson<T>(`${this.api.path}/products/get/${naoQueryOptions.docName}/data`, { data: { docId }, naoQueryOptions });
    }

    /**
     * Get multiple documents by Id
     */
    public productsGetBulk(docIds: string[], naoQueryOptions = NaoDocumentInterface.naoQueryOptionsDefault()): Observable<T> {
        return this.naoHttp2ApiService.postJson<T>(`${this.api.path}/products/get/${naoQueryOptions.docName}/bulk`, { data: { docIds }, naoQueryOptions });
    }
    /**
     * List the data with filter
     */
    public productsList(data, naoQueryOptions = NaoDocumentInterface.naoQueryOptionsDefault()): Observable<T> {
        return this.naoHttp2ApiService.postJson<T>(`${this.api.path}/products/list/${naoQueryOptions.docName}/filter`, { data, naoQueryOptions });
    }

    /**
     * List the data with filter
     * @wip
     */
    public productsFilter(data, naoQueryOptions = NaoDocumentInterface.naoQueryOptionsDefault()): Observable<T> {
        return this.naoHttp2ApiService.postJson<T>(`${this.api.path}/products/filter/${naoQueryOptions.docName}/data`, { data, naoQueryOptions });
    }
    /**
     * Get the invoice data
     * todo: gabi will do
     */
    public getInvoice(docId: string, naoQueryOptions = NaoDocumentInterface.naoQueryOptionsDefault()): Observable<T> {
        return this.naoHttp2ApiService.postJson<T>(`${this.api.path}/invoices/get/${naoQueryOptions.docName}/data`, { data: { docId }, naoQueryOptions });
    }

    /**
     * Download an invoice
     */
    public downloadInvoicePdf(docId: string, naoQueryOptions = NaoDocumentInterface.naoQueryOptionsDefault()): Observable<any> {
        return this.naoHttp2ApiService.filePostDownloadAsArrayBuffer(`${this.api.path}/invoices/download/${naoQueryOptions.docName}/pdf`, { data: { docId }, naoQueryOptions });
    }

    /**
     * List orders with pagination
     */
    public listOrders(data?, naoQueryOptions = NaoDocumentInterface.naoQueryOptionsDefault()): Observable<T> {
        return this.naoHttp2ApiService.postJson<T>(`${this.api.path}/orders/list/${naoQueryOptions.docName}/filter`, { data, naoQueryOptions });
    }

    /**
     * List invoices with pagination
     */
    public listInvoices(data?, naoQueryOptions = NaoDocumentInterface.naoQueryOptionsDefault()): Observable<T> {
        return this.naoHttp2ApiService.postJson<T>(`${this.api.path}/invoices/list/${naoQueryOptions.docName}/filter`, { data, naoQueryOptions });
    }

    /**
     * List vendors
     */
    public listVendors(data?, naoQueryOptions = NaoDocumentInterface.naoQueryOptionsDefault()): Observable<T> {
        return this.naoHttp2ApiService.postJson<T>(`${this.api.path}/vendors/list/${naoQueryOptions.docName}/filter`, { data, naoQueryOptions });
    }

    /**
     * Get order
     * todo: @experimental. must test
     * todo: @experimental. must test
     * todo: @experimental. must test
     */
    public getOrder(docId: string, naoQueryOptions = NaoDocumentInterface.naoQueryOptionsDefault()): Observable<T> {
        return this.naoHttp2ApiService.postJson<T>(`${this.api.path}/orders/get/${naoQueryOptions.docName}/data`, { data: { docId }, naoQueryOptions });
    }

    /**
     *  Verify if a checkout can be made with the current cart items
     *  todo: gabi will do
     *  todo: gabi will do
     *  todo: gabi will do
     */
    public verifyCheckout(data: T, naoQueryOptions = NaoDocumentInterface.naoQueryOptionsDefault()): Observable<T> {
        return this.naoHttp2ApiService.postJson<T>(`${this.api.path}/checkout/${naoQueryOptions.docName}/verify`, { data: { data }, naoQueryOptions });
    }

    /**
     *  Execute a checkout
     *  todo: gabi will do
     *  todo: gabi will do
     *  todo: gabi will do
     */
    public completeCheckout(data: T, naoQueryOptions = NaoDocumentInterface.naoQueryOptionsDefault()): Observable<T> {
        return this.naoHttp2ApiService.postJson<T>(`${this.api.path}/checkout/${naoQueryOptions.docName}/execute`, { data: { data }, naoQueryOptions });
    }
}
