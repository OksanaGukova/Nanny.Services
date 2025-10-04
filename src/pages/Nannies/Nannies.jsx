import Links from '../../components/Links/Links'
import NannyList from '../../components/NannyList/NannyList';
import UserMenu from '../../components/UserMenu/UserMenu';
import css from './Nannies.module.css'
import NannysData from '../../babysitters.json'

export default function Nannies() {
    return (
        <>
        <div className={css.container}>
            <div className={css.header}>
                 <div><p className={css.favicon}>Nanny.Services</p></div>
                <div><Links/></div>
                <div><UserMenu/></div>
            </div>
           <div className={css.listContainer}> <NannyList nannys={NannysData}/></div>
        </div>
        </>
    ) 
}