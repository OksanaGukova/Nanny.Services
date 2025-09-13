import { NavLink } from 'react-router-dom'
import css from './Home.module.css'
import { selectIsLoggedIn } from '../../redux/auth/selectors'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../../components/Modal/Modal';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';


export default function Home({
    activeClass
}) {

      const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
   const isLoggedIn = useSelector(selectIsLoggedIn);
    return (
        <>
        <div className={css.container}>
            <div className={css.background}>
                <p>Nanny.Services</p>
                <h1>Make Life Easier for the Family:</h1>
                <p>Find Babysitters Online for All Occasions</p>
                <button>Get started</button>
            </div>
            <div className={css.picture}>
                <div>
                   <NavLink className={css.homeText} to='/'>Home</NavLink>
                        <NavLink className={css.homeText} to='/nannies'>Nannies</NavLink>
                </div>
                <div>
                     <div className={css.login}>
           {!isLoggedIn  && ( // Додаємо умову для відображення кнопок входу та реєстрації
                        <>
                            <div className={css.loginBox} onClick={() => setLoginOpen(true)}>
                                <button className={css.loginText}>Log in</button>
                            </div>
                            <button
                                className={`${css.button} ${activeClass || ""}`}
                                onClick={() => setRegisterOpen(true)}
                            >
                                Registration
                            </button>
                        </>
                    )}
        </div>
                    </div>
                     {isLoginOpen && (
  <Modal onClose={() => setLoginOpen(false)}>
    <LoginForm onClose={() => setLoginOpen(false)} />
  </Modal>
)}
{isRegisterOpen && (
  <Modal onClose={() => setRegisterOpen(false)}>
    <RegistrationForm onClose={() => setRegisterOpen(false)} />
  </Modal>
)}

            </div>
            <div>
                <div>
                    <svg></svg>
                </div>
                <p>Experienced nannies</p>
                <p>15,000</p>
            </div>
        </div>
        </>
    )
}