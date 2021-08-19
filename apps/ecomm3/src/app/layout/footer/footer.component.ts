import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { AppService } from "../../app.service";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
    private subs = new Subscription();

    public infoSupport = null;

    // Newsletter social links and bindings
    // socialLinks = [
    //     // { type: 'facebook',  url: theme.author.profile_url, icon: 'fab fa-facebook-f' },
    //     // { type: 'twitter',   url: theme.author.profile_url, icon: 'fab fa-twitter' },
    //     // { type: 'youtube',   url: theme.author.profile_url, icon: 'fab fa-youtube' },
    //     // { type: 'instagram', url: theme.author.profile_url, icon: 'fab fa-instagram' },
    //     // { type: 'rss',       url: theme.author.profile_url, icon: 'fas fa-rss' },
    // ];
    // @HostBinding('class.footer-newsletter') classFooterNewsletter = true;

    // Links binding
    @HostBinding('class.footer-links') classFooterLinks = true;

    constructor(public appService: AppService) { }

    public ngOnInit(): void {
        this.subs.add(
            this.appService.appInfo.subscribe(value => {
                // -->Set: info
                this.infoSupport = value?.support?.supportInfo;
            })
        )
    }

    public ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
