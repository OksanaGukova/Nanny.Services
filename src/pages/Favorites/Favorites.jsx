import { useSelector } from "react-redux";
import { useMemo, useEffect, useState, useCallback } from "react";
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
  const [isInitialized, setIsInitialized] = useState(false);

  const options = [
    "A to Z", "Z to A", "Less than 10$", "Greater than 10$", 
    "Popular", "Not popular", "Show all"
  ];

  // ✅ НАЙБІЛЬШ НАДІЙНА ЛОГІКА ЗАВАНТАЖЕННЯ
 const loadFavorites = useCallback(() => {

  // ✅ БЕЗПЕЧНИЙ userId
const userId = user?._id || 'guest';
  const isGuest = !userId;
  
  let key, loadedFavorites = [];
  
  if (isGuest) {
    key = "favorites_guest";
    loadedFavorites = JSON.parse(localStorage.getItem(key)) || [];
  } else {
    key = `favorites_${userId}`;
    loadedFavorites = JSON.parse(localStorage.getItem(key)) || [];
    
    // ✅ Переносимо guest якщо потрібно
    const guestFavorites = JSON.parse(localStorage.getItem("favorites_guest")) || [];
    if (guestFavorites.length > 0 && loadedFavorites.length === 0) {
      console.log("🎉 TRANSFER:", guestFavorites.length);
      localStorage.setItem(key, JSON.stringify(guestFavorites));
      localStorage.removeItem("favorites_guest");
      loadedFavorites = guestFavorites;
    }
  }
  
  console.log("✅ FINAL:", { key, count: loadedFavorites.length });
  setFavorites(loadedFavorites.map(String));
  setIsInitialized(true);
}, [user]);

  // ✅ Завантажуємо після завершення refresh
  useEffect(() => {
    if (!isRefreshing && !isInitialized) {
      loadFavorites();
    }
  }, [isRefreshing, isInitialized, loadFavorites]);

  // ✅ Перезавантажуємо при зміні користувача
  useEffect(() => {
    if (isInitialized) {
      loadFavorites();
    }
  }, [user, loadFavorites, isInitialized]);

  const favoriteNannies = useMemo(() => {
    if (!Array.isArray(allNannies) || favorites.length === 0) return [];

    return allNannies
      .filter(nanny => favorites.includes(String(nanny._id)))
      .sort((a, b) => {
        switch (filterOption) {
          case "A to Z":
            return a.name.localeCompare(b.name);
          case "Z to A":
            return b.name.localeCompare(a.name);
          case "Less than 10$":
            return Number(a.price_per_hour) - Number(b.price_per_hour);
          case "Greater than 10$":
            return Number(b.price_per_hour) - Number(a.price_per_hour);
          case "Popular":
            return Number(b.rating) - Number(a.rating);
          case "Not popular":
            return Number(a.rating) - Number(b.rating);
          default:
            return 0;
        }
      });
  }, [allNannies, favorites, filterOption]);

  // ✅ Синхронізуємо видалення
  const handleFavoriteChange = useCallback((removedId) => {
    const updated = favorites.filter(id => id !== String(removedId));
    setFavorites(updated);
    
    const userId = user?._id || "guest";
    const key = userId === "guest" ? "favorites_guest" : `favorites_${userId}`;
    localStorage.setItem(key, JSON.stringify(updated));
    
    console.log("❌ REMOVED:", removedId, "Remaining:", updated.length);
  }, [favorites, user?._id]);

  if (isRefreshing || !isInitialized) {
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
        <p className={css.filterLabel}>Filters:</p>
        <Filters
          options={options}
          defaultSelected={filterOption}
          onSelect={setFilterOption}
        />
      </div>

      {favoriteNannies.length > 0 ? (
        <div className={css.cardsGrid}>
          {favoriteNannies.map(nanny => (
            <NannyCard
              key={nanny._id}
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