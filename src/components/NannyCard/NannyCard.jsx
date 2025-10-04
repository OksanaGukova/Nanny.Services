import css from './NannyCard.module.css'


export default function NannyCard (
    {
  name,
  avatar_url,
  birthday,
  experience,
  reviews,
  education,
  kids_age,
  price_per_hour,
  location,
  about,
  characters,
  rating
}
) {
    return (
        <>
       <div className={css.cardContainer}>
          <div className={css.avatar}>
              <img
                className={css.avatarImg}
                src={avatar_url}
                alt={`${name}'s avatar`}
              />
            </div>
            <div>
              <p>Nanny</p>
            <p>{name}</p>
            </div>
            <div>
              <div>
                 <svg > 
                   <use href="/svg/icon.svg#icon-map-pin"></use>
                   </svg>
              </div>
              <div></div>
            </div>
            <div></div>
       </div>
        </>
    )
}