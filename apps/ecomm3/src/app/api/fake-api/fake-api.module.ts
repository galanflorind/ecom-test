import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountApi, CountriesApi, ShopApi } from '../base';
import { FakeAccountApi } from './fake-account.api';
import { FakeCountriesApi } from './fake-countries.api';
import { FakeShopApi } from './fake-shop.api';

@NgModule({
    imports: [
        CommonModule,
    ],
    providers: [
        { provide: AccountApi, useClass: FakeAccountApi },
        { provide: CountriesApi, useClass: FakeCountriesApi },
        { provide: ShopApi, useClass: FakeShopApi },
    ],
})
export class FakeApiModule { }
