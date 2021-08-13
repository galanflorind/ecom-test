import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BlocksModule } from './blocks/blocks.module';
import { CheckboxModule } from './checkbox/checkbox.module';
import { CollapseModule } from './collapse/collapse.module';
import { CurrencyModule } from './currency/currency.module';
import { RadioModule } from './radio/radio.module';

@NgModule({
    imports: [
        CommonModule,
        BlocksModule,
        CheckboxModule,
        CollapseModule,
        CurrencyModule,
        RadioModule
    ],
    exports: []
})
export class SharedPartsModule { }
