
export function parseFiltersFromQuery(query) {
    const filters = {
        category: [],
        brand: [],
        price: {
            min: null,
            max: null
        }
    };

    for (const key in query) {
        const value = query[key];

        if (key === 'category') {
            filters.category = Array.isArray(value) ? value : [value];
        } else if (key === 'brand') {
            filters.brand = Array.isArray(value) ? value : [value];
        }

        else if (key === 'price[min]') {
            filters.price.min = Number(value);
        } else if (key === 'price[max]') {
            filters.price.max = Number(value);
        }
    }

    return filters;
}
