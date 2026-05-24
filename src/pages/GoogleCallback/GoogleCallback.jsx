import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { confirmGoogleAuth } from '../../redux/auth/operations';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

export default function GoogleCallback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(confirmGoogleAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/nannies');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <p>🔄 Processing authentication...</p>
    </div>
  );
}