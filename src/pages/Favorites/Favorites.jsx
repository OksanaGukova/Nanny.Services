import { useSelector } from "react-redux";
import { useMemo, useEffect, useState } from "react";
import NannyCard from "../../components/NannyCard/NannyCard";
import Filters from "../../components/Filters/Filters";
import { selectIsRefreshing, selectUser } from "../../redux/auth/selectors";
import { selectAllNannies } from "../../redux/filter/selectors";
import Links from "../../components/Links/Links";
import UserMenu from "../../components/UserMenu/UserMenu";
import css from "./Favorites.module.css";

export default function Favorites() {
  const allNannies = useSelector(selectAllNannies);
  const user = useSelector(selectUser);
  const isRefreshing = useSelector(selectIsRefreshing);
  
  const [favorites, setFavorites] = useState([]);
  const [filterOption, setFilterOption] = useState("A to Z");

  const options = [
    "A to Z",
    "Z to A",
    "Less than 10$",
    "Greater than 10$",
    "Popular",
    "Not popular",
    "Show all",
  ];

  // ✅ ПОВНА ЛОГІКА З ОБРОБКОЮ ВСІХ СТАНІВ
useEffect(() => {
  console.clear();
  
  if (isRefreshing || !allNannies?.length) {
    console.log("⏳ Loading...");
    return;
  }

  const currentUserId = user?._id || "guest";
  console.log("👤 Current:", currentUserId);

  // ✅ ОЧИЩАЄМО ТІЛЬКИ ЧУЖІ favorites
  const allKeys = Object.keys(localStorage);
  const oldFavoritesKeys = allKeys.filter(key => 
    key.startsWith('favorites_') && 
    key !== `favorites_${currentUserId}` &&
    key !== 'favorites_guest'
  );
  
  oldFavoritesKeys.forEach(key => {
    console.log("🗑️ Delete OLD:", key);
    localStorage.removeItem(key);
  });

  let finalFavorites = [];

  if (user?._id) {
    // 🔐 USER MODE
    const userFavorites = JSON.parse(localStorage.getItem(`favorites_${user._id}`)) || [];
    const guestFavorites = JSON.parse(localStorage.getItem('favorites_guest')) || [];
    
    if (userFavorites.length === 0 && guestFavorites.length > 0) {
      console.log("🎉 TRANSFER guest →", user._id);
      localStorage.setItem(`favorites_${user._id}`, JSON.stringify(guestFavorites));
      localStorage.removeItem('favorites_guest');  // ✅ ВИДАЛЯЄМО guest
      finalFavorites = guestFavorites;
    } else {
      finalFavorites = userFavorites;
      // ✅ ОЧИЩУЄМО guest якщо вже є user favorites
      localStorage.removeItem('favorites_guest');
    }
  } else {
    // 👻 GUEST MODE
    // ✅ ОЧИЩУЄМО ВСІ інші user favorites
    allKeys.forEach(key => {
      if (key.startsWith('favorites_') && key !== 'favorites_guest') {
        console.log("🗑️ Delete user favorites:", key);
        localStorage.removeItem(key);
      }
    });
    finalFavorites = JSON.parse(localStorage.getItem('favorites_guest')) || [];
  }

  console.log("✅ LOADED:", finalFavorites.length);
  setFavorites(finalFavorites.map(String));
}, [user, isRefreshing, allNannies]);

  // ✅ ФІЛЬТРАЦІЯ + СОРТУВАННЯ
  const favoriteNannies = useMemo(() => {
    if (!Array.isArray(allNannies)) return [];

    let filtered = allNannies.filter((nanny) =>
      favorites.includes(String(nanny._id))
    );

    switch (filterOption) {
      case "A to Z":
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z to A":
        filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Less than 10$":
        filtered = filtered.filter((n) => Number(n.price_per_hour) < 10);
        break;
      case "Greater than 10$":
        filtered = filtered.filter((n) => Number(n.price_per_hour) >= 10);
        break;
      case "Popular":
        filtered = filtered.filter((n) => Number(n.rating) >= 4);
        break;
      case "Not popular":
        filtered = filtered.filter((n) => Number(n.rating) < 4);
        break;
      default:
        break;
    }

    return filtered;
  }, [allNannies, favorites, filterOption]);

  // ✅ ОБРОБКА ЗМІН улюблених
  const handleFavoriteChange = (removedId) => {
    const updated = favorites.filter((f) => String(f) !== String(removedId));
    setFavorites(updated);
    
    if (user?._id) {
      localStorage.setItem(`favorites_${user._id}`, JSON.stringify(updated));
    } else {
      localStorage.setItem('favorites_guest', JSON.stringify(updated));
    }
    
    console.log("✨ Updated favorites:", updated.length);
  };

  if (isRefreshing) {
    return <p className={css.loading}>Loading your favorites...</p>;
  }

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
          {favoriteNannies.map((nanny) => (
            <NannyCard
              key={nanny._id}
              nannyKey={nanny._id}
              {...nanny}
              onFavoriteChange={handleFavoriteChange}
            />
          ))}
        </div>
      ) : (
        <p className={css.emptyText}>
          You don't have any favorite nannies yet 💛
        </p>
      )}
    </div>
  );
}