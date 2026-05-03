

export const selectAllNannies = (state) => state.nannies?.items ?? [];

export const selectSortFilter = (state) => state.nanniesFilters?.sort || '';
export const selectPriceFilter = (state) => state.nanniesFilters?.priceFilter || '';
export const selectPopularityFilter = (state) => state.nanniesFilters?.popularity || '';

export const currentPage = (state => state.nannies.page);

export const selectFilteredNannies = (state) => state.nannies?.items ?? [];


