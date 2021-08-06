import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { AppService } from "../../../app.service";
import { NaoSettingsInterface } from "@naologic/nao-interfaces";

export type BlockFeaturesLayout = 'top-strip' | 'bottom-strip';

@Component({
    selector: 'app-block-features',
    templateUrl: './block-features.component.html',
    styleUrls: ['./block-features.component.scss'],
})
export class BlockFeaturesComponent implements OnInit {
    @Input() layout: BlockFeaturesLayout = 'top-strip';
    public appSettings: NaoSettingsInterface.Settings;

    @HostBinding('class.block') classBlock = true;

    @HostBinding('class.block-features') classBlockFeatures = true;

    @HostBinding('class.block-features--layout--top-strip') get classBlockFeaturesLayoutTopStrip(): boolean {
        return this.layout === 'top-strip';
    }

    @HostBinding('class.block-features--layout--bottom-strip') get classBlockFeaturesLayoutBottomStrip(): boolean {
        return this.layout === 'bottom-strip';
    }

    constructor(private appService: AppService,) { }

    public ngOnInit(): void {
        // -->Set: app settings
        this.appSettings = this.appService.settings.getValue();
    }
}
