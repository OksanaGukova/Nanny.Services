import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import App from './components/App/App'
import { store } from './redux/store'
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
  <BrowserRouter>
      <App />
       <ToastContainer position="top-center" autoClose={3000} />
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
