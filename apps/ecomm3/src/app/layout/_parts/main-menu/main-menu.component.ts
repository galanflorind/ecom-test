import { Component, HostBinding } from '@angular/core';
import { MainMenuLink } from '../../../interfaces/main-menu-link';
import { LayoutHeaderService } from '../../layout-header.service';
import { mainMenu } from './main-menu.static';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent {
    items: MainMenuLink[] = mainMenu;

    hoveredItem: MainMenuLink|null = null;

    @HostBinding('class.main-menu') classMainMenu = true;

    constructor(
        public header: LayoutHeaderService,
    ) {}

    onItemEnter(item: any): void {
        this.hoveredItem = item;
    }

    onItemLeave(item: any): void {
        if ( this.hoveredItem === item ) {
            this.hoveredItem = null;
        }
    }

    onItemClick(): void {
        this.hoveredItem = null;
    }
}
