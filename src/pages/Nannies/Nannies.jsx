import Links from '../../components/Links/Links';
import NannyList from '../../components/NannyList/NannyList';
import UserMenu from '../../components/UserMenu/UserMenu';
import css from './Nannies.module.css';

import {
  setSortFilter,
  setPriceFilter,
  setPopularityFilter,
  resetFilters,
} from '../../redux/filter/slice';
import { selectFilteredNannies } from '../../redux/filter/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';

export default function Nannies() {
  const dispatch = useDispatch();
  const nannies = useSelector(selectFilteredNannies);
  const [visibleCount, setVisibleCount] = useState(3);

  const [isOpen, setIsOpen] = useState(false);
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

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
      setVisibleCount(3); 

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

  // ref для контейнера кнопки + меню — використовується для визначення кліку поза компонентом
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      // якщо клік зроблено поза контейнером — закрити меню
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside); // для мобільних пристроїв
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Показуємо тільки обмежену кількість нянь
  const visibleNannies = nannies.slice(0, visibleCount);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 3);

  return (
    <div className={css.container}>
      <div className={css.header}>
        <p className={css.favicon}>Nanny.Services</p>
        <Links />
        <UserMenu />
      </div>

      {/* Фільтри */}
      <div className={css.filterContainer}>
        <p className={css.filterLabel}>Filters</p>

        {/* Обгортаємо кнопку + меню в контейнер з ref */}
        <div className={css.dropdown} ref={dropdownRef}>
          <button
            className={css.filterBtn}
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="filter-menu"
            type="button"
          >
            {selected}
            <svg className={css.btnSvg} aria-hidden="true" focusable="false">
              <use href={`/svg/icon.svg#${isOpen ? 'icon-chevron-up' : 'icon-chevron-down'}`} />
            </svg>
          </button>

          {isOpen && (
            <ul id="filter-menu" className={css.dropdownMenu}>
              {options.map((option) => (
                <li
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`${css.dropdownItem} ${
                    selected === option ? css.active : ''
                  }`}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Список нянь */}
      <div className={css.listContainer}>
        <NannyList nannys={visibleNannies} />
      </div>

      {/* Кнопка "Load more" */}
      {visibleCount < nannies.length && (
        <div className={css.loadContainer}>
          <button className={css.loadBtn} onClick={handleLoadMore}>
            Load more
          </button>
        </div>
      )}
    </div>
  );
}