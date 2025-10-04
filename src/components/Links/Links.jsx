import { NavLink } from 'react-router-dom'
import css from './Links.module.css'

export default function Links () {
    return (
        <div className={css.linksContainer}>
                           <NavLink 
      to="/" 
      end 
      className={({ isActive }) => 
        `${css.homeText} ${isActive ? css.active : ""}`
      }
    >
      Home
    </NavLink>
    
    <NavLink 
      to="/nannies" 
      className={({ isActive }) => 
        `${css.homeText} ${isActive ? css.active : ""}`
      }
    >
      Nannies
    </NavLink>
     <NavLink 
      to="/favorites" 
      className={({ isActive }) => 
        `${css.homeText} ${isActive ? css.active : ""}`
      }
    >
      Favorites
    </NavLink>
</div>
    )
}
