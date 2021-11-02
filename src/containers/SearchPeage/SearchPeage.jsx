import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import SearchPageInfo from '../../components/SearchPage/SearchPageInfo/SearchPageInfo';
import UiInput from '../../components/UI/UiInput/UiInput';
import { wthErrorApi } from '../../hoc-helpers/withErrorApi'
import { API_SEARCH } from '../../constants/api';
import { getApiResource } from '../../utils/network';
import { getPeopleId, getPeopleImg } from '../../services/getPeopleData';

import styles from './SearchPeage.module.css';

const SearchPeage = ({setErrorApi}) => {
    const [inputSearchValue, setInputSearchValue] = useState('');
    const [people, setPeople] = useState([]);

    const getResponse = async param => {
        const res = await getApiResource(API_SEARCH+param);

        if (res) {
            const peopleList = res.results.map(({ name, url }) => {
                const id = getPeopleId(url);
                const img = getPeopleImg(id);

                return {
                    id,
                    name,
                    img,
                }
            });

            setPeople(peopleList);
            setErrorApi(false);
        } else {
            setErrorApi(true);
        }
    }

    useEffect(() => {
        getResponse('');
    }, []);

    const debouncedGetResponse = useCallback(
        debounce(value => getResponse(value), 300),
        []
    );

    const handleInputChange = value => {
        setInputSearchValue(value);
        debouncedGetResponse(value);
    }

    return (
        <>
            <h1 className="header__text">Search</h1>

            <UiInput
                value={inputSearchValue}
                handleInputChange={handleInputChange}
                placeholder="Input characters's name"
                classes={styles.input__search}
            />

            <SearchPageInfo people={people} />
        
        </>
    )
}

SearchPeage.propTypes = {
    setErrorApi: PropTypes.func
}

export default wthErrorApi(SearchPeage);