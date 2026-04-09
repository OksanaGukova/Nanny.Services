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

export default function Nannies() {
  const dispatch = useDispatch();

  const allNannies = useSelector(selectFilteredNannies);
  const { isLoading, error } = useSelector((state) => state.nannies);

  const [visibleCount, setVisibleCount] = useState(3);
  const [selected, setSelected] = useState('A to Z');

  const options = [
    'A to Z',
    'Z to A',
    'Less than 10$',
    'Greater than 10$',
    'Popular',
    'Not popular',
    'Show all',
  ];

  const isNanny = useSelector(selectIsNanny);
  const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddNanny = async (nannyData) => {
      
    try {
      await dispatch(createNanny(nannyData)).unwrap();
     
      alert('Nanny created successfully! 🎉');
    } catch (error) {
      console.error('❌ Create error:', error);
      alert('Error: ' + error);
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(fetchNannies());
  }, [dispatch]);

  const handleFilterSelect = (option) => {
    setSelected(option);
    setVisibleCount(3); // при зміні фільтра знову показуємо 3

    if (option === 'A to Z' || option === 'Z to A') {
      dispatch(setSortFilter(option));
      dispatch(setPriceFilter(''));
      dispatch(setPopularityFilter(''));
    } 
    else if (option === 'Less than 10$' || option === 'Greater than 10$') {
      dispatch(setPriceFilter(option));
      dispatch(setSortFilter(''));
      dispatch(setPopularityFilter(''));
    } 
    else if (option === 'Popular' || option === 'Not popular') {
      dispatch(setPopularityFilter(option));
      dispatch(setSortFilter(''));
      dispatch(setPriceFilter(''));
    } 
    else if (option === 'Show all') {
      dispatch(resetFilters());
    }
  };

  const visibleNannies = allNannies.slice(0, visibleCount);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;



  return (
    <div className={css.container}>
      <div className={css.header}>
        <p className={css.favicon}>Nanny.Services</p>
        <Links />
        <UserMenu />
      </div>

      <div className={css.filterContainer}>
      <div>
          <p className={css.filterLabel}>Filters</p>
  
         <div className={css.filterRow}>
            <Filters
              options={options}
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
{isModalOpen && (
  <HandleAddNanny
    onClose={() => setIsModalOpen(false)}
     onSubmit={handleAddNanny}
  />
)}
        </div>
        
         </div>
 
      </div>


      <div className={css.listContainer}>
        <NannyList nannys={visibleNannies} />
      </div>

      {visibleCount < allNannies.length && (
        <div className={css.loadContainer}>
          <button
            className={css.loadBtn}
            onClick={() => setVisibleCount((prev) => prev + 3)}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}


