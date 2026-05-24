import { useEffect, useState } from 'react'; // 
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
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Nannies() {
  const dispatch = useDispatch();
const navigate = useNavigate();
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

  useEffect(() => {
  if (error === 'Please provide Authorization header') {

    toast.error('Please login first');

    navigate('/', { replace: true });
  }
}, [error, navigate]);

  // ✅ useEffect - завантаження з фільтрами
  useEffect(() => {
    dispatch(fetchNannies({ page: currentPage || 1 }));
  }, [dispatch, currentPage, sort, priceFilter, popularity]);

  // ✅ RESET при зміні сторінки
  useEffect(() => {
    setVisibleCount(3);
  }, [currentPage]);

  const visibleNannies = allNannies.slice(0, visibleCount);
  
  // ✅ Логіка кнопок для ФІЛЬТРОВАНИХ даних
  const areAllVisible = visibleCount >= allNannies.length;
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

  if (isLoading) return <p>Loading...</p>;
  if (error) return null;

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
            className={css.btn}
            onClick={() => setVisibleCount(prev => Math.min(prev + 3, allNannies.length))}
          >
            Load more
          </button>
        </div>
      )}

      {/* ✅ Next page */}
      {canGoNextPage && (
        <div className={css.loadContainer}>
          <button
            className={`${css.btn} ${css.nextBtn}`}
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