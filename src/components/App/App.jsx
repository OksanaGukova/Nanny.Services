import ThemeToggle from "../ThemeToggle/ThemeToggle"
import { Layout } from '../Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

const Home = lazy(() => import ('../../pages/Home/Home'));
const RegistrationPage = lazy(() => import ('../../pages/RegistrationPage/RegistrationPage'));
const LoginPage = lazy(() => import ('../../pages/LoginPage/LoginPage'));
const Nannies = lazy(() => import ('../../pages/Nannies/Nannies'));
const Favorites = lazy(() => import ('../../pages/Favorites/Favorites'));
const NotFoundPage = lazy(() => import ('../../pages/NotFoundPage/NotFoundPage'));



function App() {


  return (
      <>
    <Layout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/nannies" element={<Nannies />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
   </Layout>
    </>
  )
}

export default App
