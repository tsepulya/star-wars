import { NavLink } from 'react-router-dom';
import Favourite from '../Favourite/Favourite';

import styles from './Header.module.css';

const Header = () => {
    return (
        <div className={styles.container}>
            <ul className={styles.list__container}>
                <li><NavLink to="/" exact>Home</NavLink></li>
                <li><NavLink to="/people/?page=1">People</NavLink></li>
                <li><NavLink to="/not-found" exact>Not Found</NavLink></li>
            </ul>
            <Favourite />
        </div>
    )
}

export default Header;
