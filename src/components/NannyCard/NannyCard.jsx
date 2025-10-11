import { useState } from 'react';
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
  rating,
}
) {

 const [isHidden, setIsHidden] = useState(false);

    

    const getAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = getAge(birthday);

  const toggleHiddenInfo = () => {
    setIsHidden((prev) => !prev);
  };

    return (
        <>
       <div className={css.cardContainer}>
     
      <div className={css.header}>
              <div className={css.avatar}>
                 <div className={css.circle}> 
                       </div>
                  <img
                    className={css.avatarImg}
                    src={avatar_url}
                    alt={`${name}'s avatar`}
                  />
                </div> 
            <div >
                    <div className={css.nannysInfo}>
                  <div className={css.nannysName}>
                    <p className={css.nanny}>Nanny</p>
                  <p className={css.name}>{name}</p>
                  </div>
                 <div className={css.infoItem}>
                    <ul className={css.infolist}>
                      <li className={css.infoListItem}>
                         <svg > 
                           <use href="/svg/icon.svg#icon-map-pin"></use>
                           </svg>
                           <p>{location}</p>
                      </li>
                      <li className={css.infoListItem}>
                        <svg > 
                           <use href="/svg/icon.svg#icon-star"></use>
                           </svg>
                           <p>{rating}</p>
                           </li>
                   
                    <li className={css.infoListItem}>
                      <p>Price / 1 hour: </p>
                      <p>{price_per_hour}</p>
                    </li> 
                    </ul>
           <svg className={css.heart}> 
                           <use href="/svg/icon.svg#icon-heart-1"></use>
                           </svg>
                 </div>
            </div>
          
        <ul className={css.expList}>
  <li className={css.expListItem}>
    <p className={`${css.text} ${css.underline}`}>
      <span className={css.label}>Age:</span>{" "}
      <span className={css.value}>{age}</span>
    </p>
  </li>
  <li className={css.expListItem}>
    <p className={`${css.text} ${css.underline}`}>
      <span className={css.label}>Experience:</span>{" "}
      <span className={css.value}>{experience}</span>
    </p>
  </li>
  <li className={css.expListItem}>
    <p className={`${css.text} ${css.underline}`}>
      <span className={css.label}>Kids Age:</span>{" "}
      <span className={css.value}>{kids_age}</span>
    </p>
  </li>
</ul>
       <ul className={css.charactersText}>
  <li className={css.expListItem}>
    <p className={`${css.text} ${css.underline}`}>
      <span className={css.label}>Characters:</span>{" "}
      <span className={css.value}>{characters.join(', ')}</span>
    </p>
  </li>
  <li className={css.expListItem}>
    <p className={`${css.text} ${css.underline}`}>
      <span className={css.label}>Education:</span>{" "}
      <span className={css.value}>{education}</span>
    </p>
  </li>
</ul>

      
 <p className={css.reviews}>
             {about}
            </p>
    {isHidden && (
           <div>
            {reviews.map((reviews, index) => (
<div>
  <div>
  </div>
  <div key={index}>
    <p>{reviews.reviewer}</p>
    <p>{reviews.rating}</p>
  </div>
  <p>{reviews.comment}</p>
</div>
  ))}
           </div>
         
          )}

          <p
            className={css.more}
            onClick={toggleHiddenInfo}
            style={{ cursor: 'pointer' }}
          >
            {isHidden ? 'Read less' : 'Read more'}
          </p>


            </div>
      </div>
     
       </div>
        </>
    )
}