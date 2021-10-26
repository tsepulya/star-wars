import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { wthErrorApi } from '../../hoc-helpers/withErrorApi';
import PeopleList from '../../components/PeoplePage/PeopleList';
import PeopleNavigation from '../../components/PeoplePage/PeopleNavigation';
import { getApiResource, changeHTTP } from '../../utils/network';
import { getPeopleId, getPeopleImg, getPeoplePageId } from '../../services/getPeopleData';
import { API_PEOPLE } from '../../constants/api';
import { useQueryParams } from '../../hooks/useQueryParams';

// import styles from './PeoplePage.module.css';

const PeoplePage = ({setErrorApi}) => {
    const [people, setPeople] = useState(null);
    const [counterPage, setCounterPage] = useState(1);
    const [prevPage, setPrevPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);

    const query = useQueryParams();
    const queryPage = query.get('page');

    const getResourse = async (url) => {
    const res = await getApiResource(url);

    if(res) {
      const peopleList = res.results.map(({name, url}) => {
        const id = getPeopleId(url);
        const img = getPeopleImg(id);
        return {
            id,
            name, // если имя и значение совпадают - можно не писать дважды
            img
        }
    })
    
    setPeople(peopleList);
    setPrevPage(changeHTTP(res.previous));
    setNextPage(changeHTTP(res.next));
    setCounterPage(getPeoplePageId(url));
    setErrorApi(false);
    } else {
      setErrorApi(true);
    }

  }
  useEffect(() => {
    getResourse(API_PEOPLE+queryPage);
  }, []);

  return (
    <>
              <PeopleNavigation 
                getResourse={getResourse}
                prevPage={prevPage}
                nextPage={nextPage} 
                counterPage={counterPage} 
              />
              {people && (<PeopleList people={people}/>)}
    </>
  )
}

PeoplePage.propTypes = {
  setErrorApi: PropTypes.func
}

export default wthErrorApi(PeoplePage);
