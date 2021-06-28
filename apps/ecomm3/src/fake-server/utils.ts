import { Observable, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

/**
 * TODO: move this to utils when you delete fake-server
 * @param input
 * @param time
 */
export function delayResponse<T>(input: Observable<T>, time = 500): Observable<T> {
    return timer(time).pipe(mergeMap(() => input));
}

export function clone(data: any): any {
    return JSON.parse(JSON.stringify(data));
}

export function nameToSlug(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]/, '-').replace(/-+/, '-');
}
