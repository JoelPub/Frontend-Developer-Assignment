import { ContentItem, PricingOption, SortOption } from "../types";

export const filterByPricingOptions = (
    items: ContentItem[],
    pricingOptions: PricingOption[]
): ContentItem[] => {
    if (pricingOptions.length === 0) {
        return items;
    }
    return items.filter((item) => pricingOptions.includes(item.pricingOption));
};

export const filterByKeyword = (items: ContentItem[], keyword: string): ContentItem[] => {
    if (!keyword.trim()) {
        return items;
    }
    const lowerKeyword = keyword.toLowerCase();
    return items.filter(
        (item) => 
            item.username.toLowerCase().includes(lowerKeyword) || 
            item.title.toLowerCase().includes(lowerKeyword)
    );
};

export const filterbyPriceRange = (
    items: ContentItem[],
    priceRange: [number, number],
    isPaidSelected: boolean
): ContentItem[] => {
    if (!isPaidSelected) {
        return items;
    }
    return items.filter((item) => {
        if (item.pricingOption !== PricingOption.PAID || item.price === undefined) {
            return true;
        }
        return item.price >= priceRange[0] && item.price <= priceRange[1];
    });
};

export const sortItems = (items: ContentItem[], sortBy: SortOption): ContentItem[] => {
    const sorted = [...items];

    switch (sortBy) {
        case SortOption.ITEM_NAME:
            return sorted.sort((a, b) => a.title.localeCompare(b.title));
        case SortOption.PRICE_HIGH:
            return sorted.sort((a, b) => {
                const priceA = a.price ?? 0;
                const priceB = b.price ?? 0;
                return priceB - priceA;
            });
        case SortOption.PRICE_LOW:
            return sorted.sort((a, b) => {
                const priceA = a.price ?? 0;
                const priceB = b.price ?? 0;
                return priceA - priceB;
            });
        default:
            return sorted;
    }
};

export const applyFiltersAndSort = (
    items: ContentItem[],
    pricingOptions: PricingOption[],
    keyword: string,
    sortBy: SortOption,
    priceRange: [number, number]
): ContentItem[] => {
    let filtered = items;


    //Apply pricing options filter
    filtered = filterByPricingOptions(filtered, pricingOptions);

    //Apply keyword search
    filtered = filterByKeyword(filtered, keyword);

    // Apply price range filter if PAID is selected
    const isPaidSelected = pricingOptions.includes(PricingOption.PAID);
    filtered = filterbyPriceRange(filtered, priceRange, isPaidSelected);

    // Apply sorting
    filtered = sortItems(filtered, sortBy);

    return filtered;
};