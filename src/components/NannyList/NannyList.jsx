
import NannyCard from "../NannyCard/NannyCard.jsx";
import css from "./NannyList.module.css";

export default function NannyList({ nannys }) {
  if (!nannys.length) return <p>Няньок не знайдено</p>;
  return (
    <ul className={css.list}>
     {nannys.map((nanny, index) => (
        <li key={nanny.id || index} className={css.listItem}>
          <NannyCard {...nanny} />
        </li>
      ))}
    </ul>
  );
}


