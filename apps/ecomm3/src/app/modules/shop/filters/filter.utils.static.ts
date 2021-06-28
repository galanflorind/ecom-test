import {CategoryFilter, CheckFilter} from "../../../interfaces/filter";
import {nameToSlug} from "../../../../fake-server/utils";


/**
 * Prepare: categories for filter
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
 * Prepare manufactures for filter
 */
function buildManufacturerFilter(vendors: Vendor[]): CheckFilter {
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
        value: ['606b2d52b1c8e17e4ab4fb31']
    }
}

export {
    buildCategoriesFilter,
    buildManufacturerFilter
}

// todo: move this interfaces somewhere
export interface Vendor {
    _id: string;
    data: {
        manufacturerId: string;
        name: string;
    }
}
