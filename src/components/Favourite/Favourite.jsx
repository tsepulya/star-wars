import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import icon from './img/bookmark.svg';

import styles from './Favourite.module.css';

const Favourite = () => {
    const [count, setCount] = useState();

    const storeData = useSelector(state => state.favouriteReducer);

    useEffect(() => {
        const len = Object.keys(storeData).length;
        setCount(len);
    })

    return (
        <div className={styles.container}>
            <Link to="/favourites">
                <span className={styles.counter}>{count}</span>
                <img className={styles.icon} src={icon} alt="Favourites" />
            </Link>
        </div>
    )
}

export default Favourite;