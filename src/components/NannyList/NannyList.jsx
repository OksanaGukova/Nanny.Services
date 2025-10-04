import { useMemo } from "react";
import css from './NannyList.module.css'
import NannyCard from "../NannyCard/NannyCard";

export default function NannyList ({nannys}) {
  const normalizedNannys = useMemo(() => {
    return nannys.map((nanny, index) => ({
      ...nanny,
      id: nanny.id || `nanny-${index}`
    }));
  }, [nannys]);
    return   <ul className={css.list}>
      {normalizedNannys.map((nanny) => (
        <li key={nanny.id} className={css.listItem}>
          <NannyCard {...nanny} />
        </li>
      ))}
    </ul>
}