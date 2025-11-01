import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectIsLoggedIn } from "../../redux/auth/selectors";
import css from './UserMenu.module.css'
import { logoutUser } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../Modal/Modal";
import LoginForm from "../LoginForm/LoginForm";

export default function UserMenu () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const name = user?.name ?? user?.email ?? '';

  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  return (
    <div className={css.container}>
      {isLoggedIn ? (
        <>
          <p className={css.text}>Welcome, {name}</p>
          <button className={css.LogBtn} type="button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <p className={css.text}>Welcome, guest</p>
          <button className={css.LogBtn} type="button" onClick={handleOpenLogin}>
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