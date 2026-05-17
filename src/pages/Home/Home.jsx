
import css from './Home.module.css'
import { selectIsLoggedIn } from '../../redux/auth/selectors'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../components/Modal/Modal';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import UserMenu from '../../components/UserMenu/UserMenu';
import Links from '../../components/Links/Links';
import { useNavigate } from 'react-router-dom';
import { getGoogleOAuthUrl } from '../../redux/nanny/operations';



export default function Home({
    activeClass
}) {
const dispatch = useDispatch();
      const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
   const isLoggedIn = useSelector(selectIsLoggedIn);
     const navigate = useNavigate();

  const handleClick = () => {
    navigate("/nannies");
  };

    const handleGoogleLogin = async () => {
    try {
      const url = await dispatch(getGoogleOAuthUrl()).unwrap();
      window.location.href = url;
    } catch (error) {
      console.error('❌ Error:', error);
      alert('Failed to start Google login');
    }
  };

    return (
        <>
       
        <div className={css.container}>
            <div className={css.background}>
                <div className={css.favContainer}><p className={css.favicon}>Nanny.Services</p></div>
               <div className={css.headerContainer}>
                    <h1 className={css.header}>Make Life Easier for the Family:</h1>
                    <p className={css.text}>Find Babysitters Online for All Occasions</p>
                    <button className={css.start}
                    onClick={handleClick}
                         >Get started
                        <svg className={css.arrow}> 
                            <use href="/svg/icon.svg#icon-Arrow-16"></use>
                           </svg>
                    </button>
                    
               </div>
            </div>
            <div className={css.picture}>
           <div className={css.pictureContainer}>
                    <div className={css.homeNannies}>
                      <Links/>
                                                 {isLoggedIn && (
  <UserMenu/>
)}
                    </div>
{!isLoggedIn && (
  <div className={css.login}>
    <div className={css.loginBox} onClick={() => setLoginOpen(true)}>
      <button className={css.loginText}>Log in</button>
    </div>
    <button
      className={`${css.regButton} ${activeClass || ""}`}
      onClick={() => setRegisterOpen(true)}
    >
      Registration
    </button>
     {/* ✅ GOOGLE OAUTH КНОПКА */}
          <button 
  className={css.googleBtn}
  onClick={handleGoogleLogin}
>
  Sign in with Google
</button>
    <ThemeToggle />
  </div>
)}
                        
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
  <div className={css.experience}>
                <div className={css.checkContainer}>
                   <svg className={css.check}> 
                      <use href="/svg/icon.svg#icon-fe_check"></use>
                     </svg>
                </div>
                <div>
                    <p className={css.expText}>Experienced nannies</p>
                    <p className={css.expNumber}>15,000</p>
                </div>
            </div>

            </div>
          
        </div>
        </>
    )
}