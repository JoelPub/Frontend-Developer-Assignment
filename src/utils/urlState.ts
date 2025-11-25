import { PricingOption, SortOption } from '../types';
interface UrlState {
    pricingOptions?: string[];
    keyword?: string;
    sortBy?: SortOption;
    priceRange?: [number, number];
}

export const serializeStateToUrl = (state: UrlState) => {
    const params = new URLSearchParams();

    if (state.pricingOptions && state.pricingOptions.length > 0) {
        params.set('pricing', state.pricingOptions.join(','));
    }

    if (state.keyword) {
        params.set('keyword', state.keyword);
    }
    
    if (state.sortBy && state.sortBy !== SortOption.ITEM_NAME) {
        params.set('sort', state.sortBy);
    }

    if (state.priceRange && (state.priceRange[0] !== 0 || state.priceRange[1] !== 999)) {
        params.set('priceRange', `${state.priceRange[0]}-${state.priceRange[1]}`);
    }

    return params.toString();
}

export const deserialzeStateFromUrl = (search: string): UrlState => {
    const params = new URLSearchParams(search);
    const state: UrlState = {};

    const pricingParam = params.get('pricing');
    if (pricingParam) {
        state.pricingOptions = pricingParam.split(',') as PricingOption[];
    }

    const keywordParam = params.get('keyword');
    if (keywordParam) {
        state.keyword = keywordParam;
    }

    const sortParam = params.get('sort');
    if (sortParam) {
        state.sortBy = sortParam as SortOption;
    }

    const priceRangeParam = params.get('priceRange');
    if (priceRangeParam) {
        const [min, max] = priceRangeParam.split('-').map(Number);
        state.priceRange = [min, max];
    }

    return state;
}