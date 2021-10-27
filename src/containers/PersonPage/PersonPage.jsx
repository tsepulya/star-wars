import PropTypes from 'prop-types';
import { useEffect } from 'react';
import PersonInfo from '../../components/PersonPage/PersonInfo/PersonInfo';
import PersonPhoto from '../../components/PersonPage/PersonPhoto/PersonPhoto';
import { API_PERSON } from '../../constants/api';
import { getApiResource } from '../../utils/network';
import { getPeopleImg } from '../../services/getPeopleData';
import { wthErrorApi } from '../../hoc-helpers/withErrorApi';

import styles from './PersonPage.module.css';
import { useState } from 'react';
import PersonLinkBack from '../../components/PersonPage/PersonLinkBack/PersonLinkBack';

const PersonPage = ({match, setErrorApi}) => {
  const [personInfo, setPersonInfo] = useState(null);
  const [personName, setPersonName] = useState(null);
  const [personPhoto, setPersonPhoto] = useState(null);


  useEffect(() => {
    (async () => {
        const id = match.params.id;
        const res = await getApiResource(`${API_PERSON}/${id}/`);

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
                    personPhoto={personPhoto}
                    personName={personName}
                />

                {personInfo && <PersonInfo personInfo={personInfo} />}
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