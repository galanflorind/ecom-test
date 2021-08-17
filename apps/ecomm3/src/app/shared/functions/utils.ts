import { Observable, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { BaseCategory } from '../../interfaces/category';
import { Params } from '@angular/router';
import { GetProductsListOptions } from '../../interfaces/shop';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function getCategoryPath<T extends BaseCategory>(category: T): T[] {
    return category ? [...getCategoryPath(category.parent as T), category] : [];
}

export function parseProductsListParams(params: Params): GetProductsListOptions {
    const options: GetProductsListOptions = {};

    if (params.page) {
        options.page = parseFloat(params.page);
    }
    if (params.limit) {
        options.limit = parseFloat(params.limit);
    }
    if (params.sort) {
        options.sort = params.sort;
    }

    for (const param of Object.keys(params)) {
        const mr = param.match(/^filter_([-_A-Za-z0-9]+)$/);

        if (!mr) {
            continue;
        }

        const filterSlug = mr[1];

        if (options.filters === undefined) {
            options.filters = {};
        }

        options.filters[filterSlug] = params[param];
    }

    return options;
}

function delayResponse<T>(input: Observable<T>, time = 500): Observable<T> {
    return timer(time).pipe(mergeMap(() => input));
}

function clone(data: any): any {
    return JSON.parse(JSON.stringify(data));
}

/**
 * Convert name to slug
 */
function nameToSlug(name: string): string {
    if (!name) {
        return ""
    }
    name = name.replace(/^\s+|\s+$/g, ''); // trim
    name = name.toLowerCase();

    // -->Remove accents, swap ñ for n, etc
    const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    const to   = "aaaaeeeeiiiioooouuuunc------";
    for (let i=0, l=from.length ; i<l ; i++) {
        name = name.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    name = name.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

    return name;
}

/**
 * Get: breadcrumbs for a category
 */
function getBreadcrumbs(categories: any[], categoryId: number): any[] {
    const categories$ = [];

    if (isNaN(categoryId)) {
        return []
    }
    // -->Get: current category
    const currentCategory = categories.find(c => c.id === categoryId)
    if (currentCategory) {
        categories$.push(currentCategory)
    }
    // -->Get: parent category
    const parent = categories.find(c => c?.id === currentCategory?.parentId)
    if (parent) {
        categories$.push(...buildArrayOfSelectedCategories(categories, parent));
    }


    return categories$.sort((a, b) => a.level - b.level);
}

/**
 * Create array with all the parents of a category
 */
function buildArrayOfSelectedCategories(items: any[], parentCategory: any): any[] {
    // -->Check: if the parent is root or not
    if (parentCategory.level > 0) {
        const parent = items.find(c => c?.id === parentCategory?.parentId)
        // -->Return: and start the search again
        return [...buildArrayOfSelectedCategories(items, parent), parentCategory]

    }
    return [parentCategory];
}

/**
 * Check password strength
 *  > Checks if you have at least one lowercase character
 *                                one uppercase character
 *                                one number
 */
function checkPasswordStrength(options = { lowerCase: 1, upperCase: 1, numeric: 1 }): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        // -->Check:
        if (control.pristine || control.value === null) {
            return null;
        }

        // -->Test: string
        const lowercaseCount = control.value.match(/[a-z]/g)?.length ?? 0;
        const uppercaseCount = control.value.match(/[A-Z]/g)?.length ?? 0;
        const numericCount = control.value.match(/[0-9]/g)?.length ?? 0;

        // -->Check: if the options are meet
        if (lowercaseCount < options.lowerCase ||
            uppercaseCount < options.upperCase ||
            numericCount < options.numeric) {
            // -->Mark: as touched
            control.markAsTouched();
            // -->Return
            return { passwordNotStrongEnough: true }
        }

        return null;
    };
}

export {
    delayResponse,
    clone,
    nameToSlug,
    getBreadcrumbs,
    checkPasswordStrength
}
