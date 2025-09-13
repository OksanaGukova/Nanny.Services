import { useSelector } from "react-redux";

import { selectIsLoggedIn } from "../../redux/auth/selectors";

import UserMenu from "../UserMenu/UserMenu";


export default function AppBar () {
     const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header >
      {isLoggedIn ? <UserMenu /> : ''}
     
    </header>
    
  );
}