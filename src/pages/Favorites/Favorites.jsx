import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import NannyCard from "../../components/NannyCard/NannyCard";
import Filters from '../../components/Filters/Filters';
import { selectUser } from "../../redux/auth/selectors";
import css from "./Favorites.module.css";
import { selectAllNannies } from "../../redux/filter/selectors";
import Links from "../../components/Links/Links";
import UserMenu from "../../components/UserMenu/UserMenu";

export default function Favorites() {
  const allNannies = useSelector(selectAllNannies);
  const user = useSelector(selectUser);
  const userId = user?.id || user?._id || user?.email || "guest";

  const [favorites, setFavorites] = useState([]);
  const [favoriteNannies, setFavoriteNannies] = useState([]);
  const [filterOption, setFilterOption] = useState('A to Z');

  const options = [
    'A to Z',
    'Z to A',
    'Less than 10$',
    'Greater than 10$',
    'Popular',
    'Not popular',
    'Show all',
  ];

  // load favorites keys from localStorage once when userId changes
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(`favorites_${userId}`)) || [];
    setFavorites(stored.map(String));
  }, [userId]);

  // Build augmented list with nannyKey (nanny-{index}) and apply favorites + local filterOption
  useEffect(() => {
    if (!Array.isArray(allNannies) || allNannies.length === 0) {
      setFavoriteNannies([]);
      return;
    }

    // create augmented list where nannyKey corresponds to how favorites are stored
    const augmented = allNannies.map((n, idx) => ({ ...n, nannyKey: `nanny-${idx}` }));

    // filter by favorites (localStorage keys)
    let filtered = augmented.filter(n => favorites.includes(String(n.nannyKey)));

    // apply local filterOption (sort / price / popularity)
    if (filterOption === 'A to Z') {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filterOption === 'Z to A') {
      filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (filterOption === 'Less than 10$') {
      filtered = filtered.filter(n => Number(n.price_per_hour) < 10);
    } else if (filterOption === 'Greater than 10$') {
      filtered = filtered.filter(n => Number(n.price_per_hour) >= 10);
    } else if (filterOption === 'Popular') {
      filtered = filtered.filter(n => Number(n.rating) >= 4);
    } else if (filterOption === 'Not popular') {
      filtered = filtered.filter(n => Number(n.rating) < 4);
    } else if (filterOption === 'Show all') {
      // no-op
    }

    setFavoriteNannies(prev => {
      const same =
        prev.length === filtered.length &&
        prev.every((p, i) => (p.nannyKey === filtered[i].nannyKey));
      return same ? prev : filtered;
    });
  }, [favorites, allNannies, filterOption]);

  // when child notifies removal, update favorites & localStorage
  const handleFavoriteChange = (removedKey) => {
    const updated = (favorites || []).filter(f => String(f) !== String(removedKey));
    setFavorites(updated);
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(updated));
  };

  return (
   <div className={css.container}>
        <div className={css.header}>
          <p className={css.favicon}>Nanny.Services</p>
          <Links />
          <UserMenu />
        </div>

      <div className={css.filterRow}>
        <p className={css.filterLabel}>Filters</p>
        <Filters
          options={options}
          defaultSelected={filterOption}
          onSelect={(opt) => setFilterOption(opt)}
        />
      </div>

      {favoriteNannies.length > 0 ? (
        <div className={css.cardsGrid}>
          {favoriteNannies.map(nanny => (
            <NannyCard
              key={nanny.nannyKey}
              nannyKey={nanny.nannyKey}
              {...nanny}
              onFavoriteChange={handleFavoriteChange}
            />
          ))}
        </div>
      ) : (
        <p className={css.emptyText}>You don't have any favorite nannies yet 💛</p>
      )}
    </div>
    
  );
}