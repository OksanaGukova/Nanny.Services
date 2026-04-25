import { createSelector } from "@reduxjs/toolkit";

export const selectAllNannies = (state) => state.nannies?.items ?? [];
export const selectSortFilter = (state) => state.filter?.sort || '';        // ✅ state.filter!
export const selectPriceFilter = (state) => state.filter?.priceFilter || ''; // ✅ state.filter!
export const selectPopularityFilter = (state) => state.filter?.popularity || ''; // ✅ state.filter!
export const currentPage = (state => state.nannies.page);

export const selectFilteredNannies = createSelector(
  [selectAllNannies, selectSortFilter, selectPriceFilter, selectPopularityFilter],
  (nannies, sort, priceFilter, popularity) => {
    console.log("🔍 FILTER DEBUG:", { 
      total: nannies.length, 
      sort, 
      priceFilter, 
      popularity 
    });
    
    let filtered = Array.isArray(nannies) ? [...nannies] : [];

    if (sort === "A to Z") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "Z to A") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    if (priceFilter === "Less than 10$") {
      filtered = filtered.filter(n => Number(n.price_per_hour) < 10);
    } else if (priceFilter === "Greater than 10$") {
      filtered = filtered.filter(n => Number(n.price_per_hour) >= 10);
    }

    if (popularity === "Popular") {
      filtered.sort((a, b) => Number(b.rating) - Number(a.rating));
    } else if (popularity === "Not popular") {
      filtered.sort((a, b) => Number(a.rating) - Number(b.rating));
    }

    console.log("📊 FILTERED:", filtered.length);
    return filtered;
  }
);