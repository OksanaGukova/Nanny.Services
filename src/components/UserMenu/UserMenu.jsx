import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectIsLoggedIn } from "../../redux/auth/selectors";
import css from './UserMenu.module.css';
import { logoutUser } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import LoginForm from "../LoginForm/LoginForm";

export default function UserMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  
  const [displayName, setDisplayName] = useState('');
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // ✅ ОНОВЛЮЄМО ім'я при зміні user
  useEffect(() => {
    if (user?.name) {
      setDisplayName(user.name);
    } else if (user?.email) {
      setDisplayName(user.email);
    } else {
      setDisplayName('User');
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleOpenLogin = () => setIsLoginOpen(true);
  const handleCloseLogin = () => setIsLoginOpen(false);

  return (
    <div className={css.container}>
      {isLoggedIn ? (
        <>
          <p className={css.text}>Welcome, {displayName} 👋</p>
          <button className={css.LogBtn} onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <p className={css.text}>Welcome, guest</p>
          <button className={css.LogBtn} onClick={handleOpenLogin}>
            Login
          </button>

          {isLoginOpen && (
            <Modal onClose={handleCloseLogin}>
              <LoginForm onClose={handleCloseLogin} />
            </Modal>
          )}
        </>
      )}
    </div>
  );
}