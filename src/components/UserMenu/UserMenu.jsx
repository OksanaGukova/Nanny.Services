import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import css from './UserMenu.module.css'
import { logoutUser } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";

export default function UserMenu () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name } = useSelector(selectUser);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className={css.container}>
      <p className={css.text}>Welcome, {name}</p>
      <button
        className={css.LogoutBtn}
        type="button"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}