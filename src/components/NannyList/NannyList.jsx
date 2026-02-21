import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import NannyCard from "../NannyCard/NannyCard.jsx";
import css from "./NannyList.module.css";
import { fetchNannies } from "../../redux/nanny/operations";

export default function NannyList() {
  const dispatch = useDispatch();
  const { items: nannys, isLoading, error } = useSelector((state) => state.nannies);
  // Завантажте няньок при завантаженні компонента
  useEffect(() => {
    dispatch(fetchNannies());
  }, [dispatch]);

  const normalizedNannys = useMemo(() => {
    return nannys.map((nanny, index) => ({
      ...nanny,
      id: nanny.id || `nanny-${index}`
    }));
  }, [nannys]);

  if (isLoading) return <p>Завантаження няньок...</p>;
  if (error) return <p>Помилка: {error}</p>;
  if (!nannys || nannys.length === 0) return <p>Няньок не знайдено</p>;

  return (
    <ul className={css.list}>
      {normalizedNannys.map((nanny) => (
        <li key={nanny.id} className={css.listItem}>
          <NannyCard {...nanny} />
        </li>
      ))}
    </ul>
  );
}