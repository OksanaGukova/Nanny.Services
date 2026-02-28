import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import NannyCard from "../NannyCard/NannyCard.jsx";
import css from "./NannyList.module.css";
import { fetchNannies } from "../../redux/nanny/operations";
import { selectFilteredNannies } from "../../redux/filter/selectors.js";
import { selectNanniesError, selectNanniesLoading } from "../../redux/nanny/selectors.js";

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


