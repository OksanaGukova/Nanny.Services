import { createSelector } from "@reduxjs/toolkit";

export const selectAllNannies = (state) => state.nannies?.items ?? []; // всі няні
export const selectSortFilter = (state) => state.nanniesFilters.sort;
export const selectPriceFilter = (state) => state.nanniesFilters.priceFilter;
export const selectPopularityFilter = (state) => state.nanniesFilters.popularity;

export const selectFilteredNannies = createSelector(
  [selectAllNannies, selectSortFilter, selectPriceFilter, selectPopularityFilter],
  (nannies, sort, priceFilter, popularity) => {
 let filtered = Array.isArray(nannies) ? [...nannies] : [];

    // 🔤 Сортування за алфавітом
    if (sort === "A to Z") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "Z to A") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    // 💰 Фільтр за ціною
    if (priceFilter === "Less than 10$") {
      filtered = filtered.filter((n) => n.price_per_hour < 10);
    } else if (priceFilter === "Greater than 10$") {
      filtered = filtered.filter((n) => n.price_per_hour > 10);
    }

    // ⭐ Сортування за рейтингом
    if (popularity === "Popular") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (popularity === "Not popular") {
      filtered.sort((a, b) => a.rating - b.rating);
    }

    return filtered;
  }
);
