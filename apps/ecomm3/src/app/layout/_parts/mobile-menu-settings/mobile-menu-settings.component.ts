import { Component, OnInit } from '@angular/core';
import { LayoutMobileMenuService } from '../../layout-mobile-menu.service';
import { CurrencyService } from '../../../shared/currency/services/currency.service';
import { MobileMenuLink } from '../../../interfaces/mobile-menu-link';
import { LanguageService } from '../../../shared/language/services/language.service';

@Component({
    selector: 'app-mobile-menu-settings',
    templateUrl: './mobile-menu-settings.component.html',
    styleUrls: ['./mobile-menu-settings.component.scss'],
})
export class MobileMenuSettingsComponent implements OnInit {
    public languages: MobileMenuLink[] = [];
    public currencies: MobileMenuLink[] = [];

    constructor(
        public menu: LayoutMobileMenuService,
        public language: LanguageService,
        public currency: CurrencyService,
    ) { }

    public ngOnInit(): void {
        this.languages = this.language.all.map(x => ({
            title: x.name,
            image: x.image,
            customFields: {
                code: x.code,
            },
        }));
        this.currencies = this.currency.all.map(x => ({
            title: `${x.symbol} ${x.name}`,
            customFields: {
                code: x.code,
            },
        }));
    }

    public setLanguage(item: MobileMenuLink): void {
        if (!item.customFields?.code) {
            return;
        }

        this.language.set(item.customFields.code);
        this.menu.close();
    }

    public setCurrency(item: MobileMenuLink): void {
        if (!item.customFields?.code) {
            return;
        }

        this.currency.set(item.customFields.code);
        this.menu.close();
    }
}
