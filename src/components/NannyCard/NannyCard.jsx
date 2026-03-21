import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import css from './NannyCard.module.css';
import { selectIsLoggedIn, selectIsRefreshing, selectUser } from '../../redux/auth/selectors';
import Appointment from '../Appointment/Appointment';

export default function NannyCard({
  _id,
  name,
  avatar_url,
  birthday,
  experience,
  reviews = [],
  education,
  kids_age,
  price_per_hour,
  location,
  about,
  characters = [],
  rating,
  onFavoriteChange,
}) {
  const [isHidden, setIsHidden] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const isRefreshing = useSelector(selectIsRefreshing);

  // ✅ УНІВЕРСАЛЬНІ ФУНКЦІЇ ДЛЯ FAVORITES
  const getFavoritesKey = () => {
    return user?._id ? `favorites_${user._id}` : "favorites_guest";
  };

  const getFavorites = () => {
    const key = getFavoritesKey();
    const favorites = localStorage.getItem(key);
    return favorites ? JSON.parse(favorites) : [];
  };

  const saveFavorites = (favorites) => {
    const key = getFavoritesKey();
    localStorage.setItem(key, JSON.stringify(favorites));
  };

  // ✅ Синхронізуємо стан з localStorage
  useEffect(() => {
    const favorites = getFavorites();
    setIsFavorite(favorites.some(f => String(f) === String(_id)));
  }, [user, _id, isRefreshing]);

  const getAge = (birthday) => {
    if (!birthday) return '';
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
  const toggleHiddenInfo = () => setIsHidden(prev => !prev);
  const closeMoreModal = () => setIsModalOpen(false);

  // ✅ УНІВЕРСАЛЬНИЙ handleHeartClick
  const handleHeartClick = () => {
    if (isRefreshing) return;
    
    if (!isLoggedIn) {
      alert('Please login to use favorites 💛');
      return;
    }

    const favorites = getFavorites();
    let newFavorites;

    if (isFavorite) {
      newFavorites = favorites.filter(f => String(f) !== String(_id));
      onFavoriteChange?.(_id); // Для Favorites сторінки
    } else {
      newFavorites = [...favorites, String(_id)];
    }

    saveFavorites(newFavorites);
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <div className={css.cardContainer}>
        <div className={css.header}>
          <div className={css.avatar}>
            <div className={css.circle}></div>
            <img className={css.avatarImg} src={avatar_url} alt={`${name}'s avatar`} />
          </div>
          
          <div>
            <div className={css.nannysInfo}>
              <div className={css.nannysName}>
                <p className={css.nanny}>Nanny</p>
                <p className={css.name}>{name}</p>
              </div>
              
              <div className={css.infoItem}>
                <ul className={css.infolist}>
                  <li className={css.infoListItem}>
                    <svg><use href="/svg/icon.svg#icon-map-pin"></use></svg>
                    <p className={css.information}>{location}</p>
                  </li>
                  <li className={css.infoListItem}>
                    <svg><use href="/svg/icon.svg#icon-star"></use></svg>
                    <p className={css.information}>Rating:</p>
                    <p>{rating}</p>
                  </li>
                  <li className={css.infoListItem}>
                    <p className={css.information}>Price / 1 hour:</p>
                    <p className={`${css.information} ${css.infoGreen}`}>
                      {price_per_hour}$
                    </p>
                  </li>
                </ul>
                
                {/* ✅ СЕРЦЕ З ОБРОБНИКОМ */}
                <svg
                  className={`${css.heart} ${isFavorite ? css.favorite : ''}`}
                  onClick={handleHeartClick}
                  style={{ cursor: 'pointer' }}
                >
                  <use href="/svg/icon.svg#icon-heart-1"></use>
                </svg>
              </div>
            </div>

            {/* Решта JSX без змін */}
            <ul className={css.expList}>
              <li className={css.expListItem}>
                <p className={`${css.text} ${css.underline}`}>
                  <span className={css.label}>Age:</span> <span>{age}</span>
                </p>
              </li>
              <li className={css.expListItem}>
                <p className={`${css.text} ${css.underline}`}>
                  <span className={css.label}>Experience:</span> <span>{experience}</span>
                </p>
              </li>
              <li className={css.expListItem}>
                <p className={`${css.text} ${css.underline}`}>
                  <span className={css.label}>Kids Age:</span> <span>{kids_age}</span>
                </p>
              </li>
            </ul>

            <ul className={css.charactersText}>
              <li className={css.expListItem}>
                <p className={`${css.text} ${css.underline}`}>
                  <span className={css.label}>Characters:</span> 
                  <span>{(characters || []).join(', ')}</span>
                </p>
              </li>
              <li className={css.expListItem}>
                <p className={`${css.text} ${css.underline}`}>
                  <span className={css.label}>Education:</span> <span>{education}</span>
                </p>
              </li>
            </ul>

            <p className={css.reviews}>{about}</p>
            
            {isHidden && (
              <div>
                <div className={css.revievMainContainer}>
                  {reviews.map((review, index) => (
                    <div key={index} className={css.review}>
                      <div>
                        <div className={css.reviewContainer}>
                          <span className={css.reviewerInitial}>
                            {review.reviewer.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className={css.reviewInfo}>
                          <p className={css.reviewerName}>{review.reviewer}</p>
                          <p className={css.reviewerRating}>⭐ {review.rating}</p>
                        </div>
                      </div>
                      <p className={css.reviewComment}>{review.comment}</p>
                    </div>
                  ))}
                </div>
                <button 
                  className={css.moreBtn} 
                  onClick={() => setIsModalOpen(true)}
                >
                  Make an appointment
                </button>
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

      {/* Modal */}
      {isModalOpen && (
        <div className={css.modalBackdrop} onClick={closeMoreModal}>
          <div className={css.modalContent} onClick={e => e.stopPropagation()}>
            <button className={css.closeBtn} onClick={closeMoreModal}>✖</button>
            <Appointment nanny={{ avatar_url, name }} onClose={closeMoreModal} />
          </div>
        </div>
      )}
    </>
  );
}