import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'

import PeopleList from '../../components/PeoplePage/PeopleList';

import styles from './FavouritesPage.module.css';

const FavouritesPage = () => {
    const [people, setPeople] = useState([]);

    const storeData = useSelector(state => state.favouriteReducer);

    useEffect(() => {
        const arr = Object.entries(storeData);
        if (arr.length) {
            const res = arr.map(item => {
                return {
                    id: item[0],
                    ...item[1]
                }
            })
            setPeople(res);
        }
    }, []);

    return (
        <>
            <h1 className="header__text">Favourites Page</h1>
            {people.length 
                ? <PeopleList people={people}/>
                : <h2 className={styles.comment}>No data</h2>
            }
            
        </>
    )
}

export default FavouritesPage;