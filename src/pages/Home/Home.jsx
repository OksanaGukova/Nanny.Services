import { NavLink } from 'react-router-dom'
import css from './Home.module.css'
import { selectIsLoggedIn } from '../../redux/auth/selectors'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../../components/Modal/Modal';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import sprite from '/svg/icon.svg'


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
                <div className={css.favContainer}><p className={css.favicon}>Nanny.Services</p></div>
               <div className={css.headerContainer}>
                    <h1 className={css.header}>Make Life Easier for the Family:</h1>
                    <p className={css.text}>Find Babysitters Online for All Occasions</p>
                    <button className={css.start}>Get started
                        <svg className={css.arrow}>  <use href={`${sprite}#icon-Arrow-16`}></use></svg>
                    </button>
                    
               </div>
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
                             <ThemeToggle/>
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
  <div>
                <div>
                    <svg></svg>
                </div>
                <p>Experienced nannies</p>
                <p>15,000</p>
            </div>

            </div>
          
        </div>
        </>
    )
}