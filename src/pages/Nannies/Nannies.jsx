import { useEffect, useState, useMemo } from 'react'; // ✅ useMemo!
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

// ✅ Правильний!
import { createNanny, fetchNannies } from '../../redux/nanny/operations';
import { selectIsNanny } from '../../redux/nanny/selectors';
import HandleAddNanny from '../../components/HandleAddNanny/HandleAddNanny';
import { setPage } from '../../redux/nanny/slice';
import { 
  selectSortFilter, 
  selectPriceFilter, 
  selectPopularityFilter, 
  selectAllNannies
} from '../../redux/filter/selectors';

export default function Nannies() {
  const dispatch = useDispatch();

  // ✅ ВСІ селектори
  const allNannies = useSelector(selectAllNannies);
  const { isLoading, error } = useSelector((state) => state.nannies);
  const currentPage = useSelector((state) => state.nannies.page);
  const totalPages = useSelector((state) => state.nannies.totalPages);
  
  const sort = useSelector(selectSortFilter);
  const priceFilter = useSelector(selectPriceFilter);
  const popularity = useSelector(selectPopularityFilter);
  
  const isNanny = useSelector(selectIsNanny);

  const [visibleCount, setVisibleCount] = useState(3);
  const [selected, setSelected] = useState('A to Z');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ useEffect - завантаження з фільтрами
  useEffect(() => {
    dispatch(fetchNannies({ page: currentPage || 1 }));
  }, [dispatch, currentPage, sort, priceFilter, popularity]);

  // ✅ RESET при зміні сторінки
  useEffect(() => {
    setVisibleCount(3);
  }, [currentPage]);

  // ✅ 🔥 ЛОКАЛЬНА ФІЛЬТРАЦІЯ (основне!)
  const filteredNannies = useMemo(() => {
    let result = [...allNannies];
    
    console.log('🔄 Фільтруємо:', { sort, priceFilter, popularity });
    
    // Сортування
    if (sort === 'A to Z') {
      result.sort((a, b) => a.name?.localeCompare(b.name) || 0);
    } else if (sort === 'Z to A') {
      result.sort((a, b) => b.name?.localeCompare(a.name) || 0);
    }
    
    // Ціна (ЗМІНІТЬ ПОЛЕ НА ВАШЕ!)
    if (priceFilter === 'Less than 10$') {
      result = result.filter(nanny => 
        Number(nanny.hourlyRate || nanny.price || 0) < 10
      );
    } else if (priceFilter === 'Greater than 10$') {
      result = result.filter(nanny => 
        Number(nanny.hourlyRate || nanny.price || 0) >= 10
      );
    }
    
    // Популярність (ЗМІНІТЬ ПОЛЕ НА ВАШЕ!)
    if (popularity === 'Popular') {
      result = result.filter(nanny => Number(nanny.rating || 0) >= 4);
    } else if (popularity === 'Not popular') {
      result = result.filter(nanny => Number(nanny.rating || 0) < 3);
    }
    
    console.log('✅ Результат:', result.length, 'з', allNannies.length);
    return result;
  }, [allNannies, sort, priceFilter, popularity]);

  const visibleNannies = filteredNannies.slice(0, visibleCount);
  
  // ✅ Логіка кнопок для ФІЛЬТРОВАНИХ даних
  const areAllVisible = visibleCount >= filteredNannies.length;
  const canLoadMore = !areAllVisible;
  const canGoNextPage = currentPage < totalPages && areAllVisible;

  const handleAddNanny = async (nannyData) => {
    try {
      await dispatch(createNanny(nannyData)).unwrap();
      alert('Nanny created successfully! 🎉');
    } catch (error) {
      dispatch(fetchNannies({ page: currentPage }));
      alert('Error: ' + error);
    }
    setIsModalOpen(false);
  };

  const handleFilterSelect = (option) => {
    console.log('🎯 Фільтр:', option);
    setSelected(option);
    setVisibleCount(3);
    dispatch(setPage(1)); // Reset сторінки

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

  // DEBUG
  console.log('🔍 СТАНИ:', {
    all: allNannies.length,
    filtered: filteredNannies.length,
    visible: visibleNannies.length,
    page: `${currentPage}/${totalPages}`
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
              'A to Z', 'Z to A',
              'Less than 10$', 'Greater than 10$',
              'Popular', 'Not popular',
              'Show all'
            ]}
            defaultSelected={selected}
            onSelect={handleFilterSelect}
          />
          {isNanny && (
            <button className={css.addBtn} onClick={() => setIsModalOpen(true)}>
              Add Nanny
            </button>
          )}
        </div>
      </div>

      <div className={css.listContainer}>
        <NannyList nannys={visibleNannies} />
      </div>

      {/* ✅ Load more */}
      {canLoadMore && (
        <div className={css.loadContainer}>
          <button
            className={css.loadBtn}
            onClick={() => setVisibleCount(prev => Math.min(prev + 3, filteredNannies.length))}
          >
            Load more
          </button>
        </div>
      )}

      {/* ✅ Next page */}
      {canGoNextPage && (
        <div className={css.loadContainer}>
          <button
            className={css.next}
            onClick={() => dispatch(setPage(currentPage + 1))}
          >
            Next page ({currentPage + 1}/{totalPages})
          </button>
        </div>
      )}

      {isModalOpen && (
        <HandleAddNanny onClose={() => setIsModalOpen(false)} onSubmit={handleAddNanny} />
      )}
    </div>
  );
}