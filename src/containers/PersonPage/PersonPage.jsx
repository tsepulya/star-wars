import PropTypes from 'prop-types';
import React, { useState, useEffect, Suspense } from 'react';
import { useSelector } from 'react-redux';
import PersonInfo from '../../components/PersonPage/PersonInfo/PersonInfo';
import PersonPhoto from '../../components/PersonPage/PersonPhoto/PersonPhoto';
import UiLoading from '../../components/UI/UiLoading/UiLoading';

// import PersonFilms from '../../components/PersonPage/PersonFilms/PersonFilms';

import { API_PERSON } from '../../constants/api';
import { getApiResource } from '../../utils/network';
import { getPeopleImg } from '../../services/getPeopleData';
import { wthErrorApi } from '../../hoc-helpers/withErrorApi';

import styles from './PersonPage.module.css';
import PersonLinkBack from '../../components/PersonPage/PersonLinkBack/PersonLinkBack';

const PersonFilms = React.lazy(() => import ('../../components/PersonPage/PersonFilms/PersonFilms'));

const PersonPage = ({match, setErrorApi}) => {
  const [personInfo, setPersonInfo] = useState(null);
  const [personName, setPersonName] = useState(null);
  const [personPhoto, setPersonPhoto] = useState(null);
  const [personFilms, setPersonFilms] = useState(null);
  const [personId, setPersonId] = useState(null);
  const [personFavourite, setPersonFavourite] = useState(false);
  
  const storeData = useSelector(state => state.favouriteReducer);


  useEffect(() => {
    (async () => {
        const id = match.params.id;
        const res = await getApiResource(`${API_PERSON}/${id}/`);

        storeData[id] ? setPersonFavourite(true) : setPersonFavourite(false);

        setPersonId(id);

        if (res) {
            setPersonInfo([
                { title: 'Height', data: res.height },
                { title: 'Mass', data: res.mass },
                { title: 'Hair Color', data: res.hair_color },
                { title: 'Skin Color', data: res.skin_color },
                { title: 'Eye Color', data: res.eye_color },
                { title: 'Birth Year', data: res.birth_year },
                { title: 'Gender', data: res.gender },
            ]);
            setPersonName(res.name);
            setPersonPhoto(getPeopleImg(id));
            res.films.length && setPersonFilms(res.films);
            setErrorApi(false);
        } else {
            setErrorApi(true);
        }
    })();
  }, []);


  return (
    <>
        <PersonLinkBack />

        <div className={styles.wrapper}>
            <span className={styles.person__name}>{personName}</span>
            
            <div className={styles.container}>
                <PersonPhoto
                    personId={personId}
                    personPhoto={personPhoto}
                    personName={personName}
                    personFavourite={personFavourite}
                    setPersonFavourite={setPersonFavourite}
                />

                {personInfo && <PersonInfo personInfo={personInfo} />}

                {personFilms && (
                    <Suspense fallback={<UiLoading />}>
                        <PersonFilms personFilms={personFilms} />
                    </Suspense>
                )}
            </div>
        </div>
    </>
    )
}

PersonPage.propTypes = {
    match: PropTypes.object,
    setErrorApi: PropTypes.func
}

export default wthErrorApi(PersonPage);