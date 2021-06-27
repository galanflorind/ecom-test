import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { NaoSettingsInterface } from "@naologic/nao-interfaces";

@Injectable({
    providedIn: 'root',
})
export class AppService {
    public readonly settings = new BehaviorSubject<NaoSettingsInterface.Settings>({
        rating: false
    });
    constructor() { }

    // todo: cache the getInfo request

    // todo:

    /**
     * Refresh: info
     */
    public refresh(): void {

    }
}
