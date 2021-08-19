import { Component, HostBinding } from '@angular/core';
import { MainMenuLink } from '../../../interfaces/main-menu-link';
import { mainMenu } from './main-menu.static';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent {
    public items: MainMenuLink[] = mainMenu;
    public hoveredItem: MainMenuLink|null = null;

    constructor() {}

    public onItemEnter(item: any): void {
        this.hoveredItem = item;
    }

    public onItemLeave(item: any): void {
        if ( this.hoveredItem === item ) {
            this.hoveredItem = null;
        }
    }

    public onItemClick(): void {
        this.hoveredItem = null;
    }
}
