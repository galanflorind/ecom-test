import {CategoryFilter, CheckFilter, RadioFilter, RangeFilter} from "../../../interfaces/filter";
import { nameToSlug } from "../../../../fake-server/utils";


/**
 * Prepare: categories filter
 */
function buildCategoriesFilter(): CategoryFilter {
    console.warn("buildCategoriesFilter")
    const items = [];

    // todo: match categories on levels
    // todo: cache the categories leveled


    return {
        type: 'category',
        slug: 'category',
        name: 'Categories',
        items: items,
        value: '',
    };
}

/**
 * Prepare manufactures filter
 */
function buildManufacturerFilter(vendors: Vendor[], values: string[]): CheckFilter {
    // todo: check shit
    console.warn("buildManufacturerFilter")
    // -->Init
    const items = [];

    // -->Iterate: over vendors
    vendors.map(vendor => {
        if (vendor) {
            items.push({
                _id: vendor._id,
                slug: nameToSlug(vendor.data?.name),
                name: vendor.data?.name
            })
        }
    })

    return  {
        type: 'check',
        slug: 'manufacturer',
        name: 'Manufacturer',
        items: items,
        value: values || []
    }
}

/**
 * Prepare price filter
 */
function buildPriceFilter(min: number, max: number, valueMin: number, valueMax: number): RangeFilter {
    // todo: checvk shit

    // todo: check if the current value is lower than min, than the valueMin is min
    // todo: same for max

    return  {
        type: 'range',
        slug: 'price',
        name: 'Price',
        min,
        max,
        value: [valueMin | min, valueMax | max]
    }
}

export {
    buildCategoriesFilter,
    buildManufacturerFilter,
    buildPriceFilter
}

// todo: move this interfaces somewhere
export interface Vendor {
    _id: string;
    data: {
        manufacturerId: string;
        name: string;
    }
}
