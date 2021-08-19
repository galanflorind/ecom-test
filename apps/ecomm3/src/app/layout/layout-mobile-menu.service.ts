import { EventEmitter, Inject, Injectable, PLATFORM_ID, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface OpenPanelEvent {
    label: string;
    content: TemplateRef<any>;
}

@Injectable({
    providedIn: 'root',
})
export class LayoutMobileMenuService {
    private isOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public onOpenPanel: EventEmitter<OpenPanelEvent> = new EventEmitter<OpenPanelEvent>();
    public onCloseCurrentPanel: EventEmitter<void> = new EventEmitter<void>();

    public get isOpen(): boolean {
        return this.isOpenSubject.value;
    }

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
    ) { }

    public open(): void {
        this.toggle(true);
    }

    public close(): void {
        this.toggle(false);
    }

    public toggle(force?: boolean): void {
        const isOpen = force !== undefined ? force : !this.isOpenSubject.value;

        if (isOpen === this.isOpenSubject.value) {
            return;
        }

        if (isPlatformBrowser(this.platformId)) {
            if (isOpen) {
                const bodyWidth = document.body.offsetWidth;

                document.body.style.overflow = 'hidden';
                document.body.style.paddingRight = (document.body.offsetWidth - bodyWidth) + 'px';
            } else {
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';

                this.isOpenSubject.next(false);
            }
        }

        this.isOpenSubject.next(isOpen);
    }

    public openPanel(label: string, panelContent: TemplateRef<any>): void {
        this.onOpenPanel.emit({ label, content: panelContent });
    }

    public closeCurrentPanel(): void {
        this.onCloseCurrentPanel.next();
    }
}
