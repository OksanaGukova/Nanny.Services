import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Links from '../../components/Links/Links';
import NannyList from '../../components/NannyList/NannyList';
import UserMenu from '../../components/UserMenu/UserMenu';
import Filters from '../../components/Filters/Filters';
import css from './Nannies.module.css';

import {
  setSortFilter,
  setPriceFilter,
  setPopularityFilter,
  resetFilters,
} from '../../redux/filter/slice';

import { selectFilteredNannies } from '../../redux/filter/selectors';
import {  createNanny, fetchNannies } from '../../redux/nanny/operations';
import { selectIsNanny } from '../../redux/nanny/selectors';
import HandleAddNanny from '../../components/HandleAddNanny/HandleAddNanny';
import { setPage } from '../../redux/nanny/slice';

export default function Nannies() {
  const dispatch = useDispatch();

  const allNannies = useSelector(selectFilteredNannies);
  const { isLoading, error, page: currentPage, totalPages } = useSelector(
    (state) => state.nannies
  );

  const [visibleCount, setVisibleCount] = useState(3);
  const [selected, setSelected] = useState('A to Z');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isNanny = useSelector(selectIsNanny);

  // ✅ FETCH по сторінці
  useEffect(() => {
    dispatch(fetchNannies(currentPage));
  }, [dispatch, currentPage]);

  // ✅ RESET visibleCount при зміні сторінки
  useEffect(() => {
    setVisibleCount(3);
  }, [currentPage]);

  const handleAddNanny = async (nannyData) => {
    try {
      const result = await dispatch(createNanny(nannyData)).unwrap();
      console.log('✅ Nanny created:', result.name);
      alert('Nanny created successfully! 🎉');
    } catch (error) {
      dispatch(fetchNannies(currentPage));
      console.error('❌ Retry fetch:', error);
      alert('Error: ' + error);
    }
    setIsModalOpen(false);
  };

  

  const handleFilterSelect = (option) => {
    setSelected(option);
    setVisibleCount(3);
    // Reset to first page when filter changes
    dispatch(setPage(1));

    if (option === 'A to Z' || option === 'Z to A') {
      dispatch(setSortFilter(option));
      dispatch(setPriceFilter(''));
      dispatch(setPopularityFilter(''));
    } else if (option === 'Less than 10$' || option === 'Greater than 10$') {
      dispatch(setPriceFilter(option));
      dispatch(setSortFilter(''));
      dispatch(setPopularityFilter(''));
    } else if (option === 'Popular' || option === 'Not popular') {
      dispatch(setPopularityFilter(option));
      dispatch(setSortFilter(''));
      dispatch(setPriceFilter(''));
    } else if (option === 'Show all') {
      dispatch(resetFilters());
    }
  };

  const visibleNannies = allNannies.slice(0, visibleCount);
  
  // ✅ ЧИ ПОКАЗАНІ ВСІ НАНІ ПОТОЧНОЇ СТОРІНКИ?
  const areAllNanniesVisible = visibleCount >= allNannies.length;
  
  // ✅ ЧИ МОЖНА КЛІЦНУТИ "LOAD MORE"?
  const canLoadMore = !areAllNanniesVisible;
  
  // ✅ ЧИ МОЖНА КЛІЦНУТИ "NEXT PAGE"?
  const canGoNextPage = currentPage < totalPages && areAllNanniesVisible;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  console.log('🔍 DEBUG:', { 
    currentPage, 
    totalPages, 
    allNanniesLength: allNannies.length,
    visibleCount,
    areAllNanniesVisible,
    canLoadMore,
    canGoNextPage
  });

  return (
    <div className={css.container}>
      <div className={css.header}>
        <p className={css.favicon}>Nanny.Services</p>
        <Links />
        <UserMenu />
      </div>

      <div className={css.filterContainer}>
        <p className={css.filterLabel}>Filters</p>

        <div className={css.filterRow}>
          <Filters
            options={[
              'A to Z',
              'Z to A',
              'Less than 10$',
              'Greater than 10$',
              'Popular',
              'Not popular',
              'Show all',
            ]}
            defaultSelected={selected}
            onSelect={handleFilterSelect}
          />

          {isNanny && (
            <button
              className={css.addBtn}
              onClick={() => setIsModalOpen(true)}
            >
              Add Nanny
            </button>
          )}
        </div>
      </div>

      <div className={css.listContainer}>
        <NannyList nannys={visibleNannies} />
      </div>

      {/* ✅ LOAD MORE - показується, коли не всі нані видимі */}
      {canLoadMore && (
        <div className={css.loadContainer}>
          <button
            className={css.loadBtn}
            onClick={() =>
              setVisibleCount((prev) =>
                Math.min(prev + 3, allNannies.length)
              )
            }
          >
            Load more
          </button>
        </div>
      )}

      {/* ✅ NEXT PAGE - показується, коли показані ВСІ нані і є наступна сторінка */}
      {canGoNextPage && (
        <div className={css.loadContainer}>
          <button
            className={css.next}
            onClick={() => dispatch(setPage(currentPage + 1))}
          >
            Next page
          </button>
        </div>
      )}

      {isModalOpen && (
        <HandleAddNanny
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddNanny}
        />
      )}
    </div>
  );
}