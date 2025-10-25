import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import css from './NannyCard.module.css';
import { selectIsLoggedIn, selectIsRefreshing, selectUser } from '../../redux/auth/selectors';
import Appointment from '../Appointment/Appointment';

// Import the selectors


export default function NannyCard({
  id,
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
}) {
  const [isHidden, setIsHidden] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use Redux selectors
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const isRefreshing = useSelector(selectIsRefreshing);
  const openMoreModal = () => setIsModalOpen(true);
const closeMoreModal = () => setIsModalOpen(false);

  // Get userId from user object (assuming user has an id property)
  const userId = user?.id || null;

  // Function to get favorites from localStorage
  const getFavorites = () => {
    if (!userId) return [];
    const favorites = localStorage.getItem(`favorites_${userId}`);
    return favorites ? JSON.parse(favorites) : [];
  };

  // Function to save favorites to localStorage
  const saveFavorites = (favorites) => {
    if (!userId) return;
    localStorage.setItem(`favorites_${userId}`, JSON.stringify(favorites));
  };

  // Check if this nanny is in favorites on component mount or when userId changes
  useEffect(() => {
    if (isLoggedIn && userId && !isRefreshing) {
      const favorites = getFavorites();
      setIsFavorite(favorites.includes(id));
    } else {
      setIsFavorite(false); // Reset if not logged in or refreshing
    }
  }, [id, isLoggedIn, userId, isRefreshing]);

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

  const handleHeartClick = () => {
    if (!isLoggedIn) {
      // For unauthorized users, show alert (or modal/push notification)
      alert('This feature is only available for authorized users.');
      return;
    }

    if (isRefreshing) {
      // Optionally, disable during refresh
      return;
    }

    // Toggle favorite status
    const favorites = getFavorites();
    let newFavorites;
    if (isFavorite) {
      // Remove from favorites
      newFavorites = favorites.filter((favId) => favId !== id);
    } else {
      // Add to favorites
      newFavorites = [...favorites, id];
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
            <img
              className={css.avatarImg}
              src={avatar_url}
              alt={`${name}'s avatar`}
            />
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
                    <svg>
                      <use href="/svg/icon.svg#icon-map-pin"></use>
                    </svg>
                    <p className={css.information}>{location}</p>
                  </li>
                  <li className={css.infoListItem}>
                    <svg>
                      <use href="/svg/icon.svg#icon-star"></use>
                    </svg>
                    <p className={css.information}>Rating:</p>
                    <p>{rating}</p>
                  </li>
                  <li className={css.infoListItem}>
                    <p className={css.information}>Price / 1 hour: </p>
                    <p className={`${css.information} ${css.infoGreen}`}>
                      {price_per_hour}$
                    </p>
                  </li>
                </ul>
                <svg
                  className={`${css.heart} ${isFavorite ? css.favorite : ''}`}
                  onClick={handleHeartClick}
                  style={{ cursor: 'pointer' }}
                >
                  <use href="/svg/icon.svg#icon-heart-1"></use>
                </svg>
              </div>
            </div>

            <ul className={css.expList}>
              <li className={css.expListItem}>
                <p className={`${css.text} ${css.underline}`}>
                  <span className={css.label}>Age:</span>{' '}
                  <span className={css.value}>{age}</span>
                </p>
              </li>
              <li className={css.expListItem}>
                <p className={`${css.text} ${css.underline}`}>
                  <span className={css.label}>Experience:</span>{' '}
                  <span className={css.value}>{experience}</span>
                </p>
              </li>
              <li className={css.expListItem}>
                <p className={`${css.text} ${css.underline}`}>
                  <span className={css.label}>Kids Age:</span>{' '}
                  <span className={css.value}>{kids_age}</span>
                </p>
              </li>
            </ul>
            <ul className={css.charactersText}>
              <li className={css.expListItem}>
                <p className={`${css.text} ${css.underline}`}>
                  <span className={css.label}>Characters:</span>{' '}
                  <span className={css.value}>{characters.join(', ')}</span>
                </p>
              </li>
              <li className={css.expListItem}>
                <p className={`${css.text} ${css.underline}`}>
                  <span className={css.label}>Education:</span>{' '}
                  <span className={css.value}>{education}</span>
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
                 <button className={css.moreBtn} onClick={openMoreModal}>Make an appointment</button>
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
      {isModalOpen && (
  <div className={css.modalBackdrop} onClick={closeMoreModal}>
    <div
      className={css.modalContent}
      onClick={(e) => e.stopPropagation()} // щоб не закривалося при кліку всередині
    >
      <button className={css.closeBtn} onClick={closeMoreModal}>
        ✖
      </button>
      <Appointment nanny={{ avatar_url, name}} onClose={closeMoreModal} />
    </div>
  </div>
)}
    </>
  );
}
