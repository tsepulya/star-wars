import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { deletePersonFromFavourite, setPersonToFavourite } from '../../../store/actions';
import iconFavourite from './img/favourite.svg';
import iconFavouriteFill from './img/favourite-fill.svg';

import styles from './PersonPhoto.module.css';

const PersonPhoto = ({personId, personPhoto, personName, personFavourite, setPersonFavourite}) => {
const dispatch = useDispatch();

const dispatchFavouritePeople = () => {
  if (personFavourite) {
    dispatch(deletePersonFromFavourite(personId));
    setPersonFavourite(false);
  } else {
    dispatch(setPersonToFavourite({
      [personId]: {
        name: personName,
        img: personPhoto
      },
    }));
    setPersonFavourite(true);
  }
}

  return (
    <>
    <div className={styles.container}>
        <img className={styles.photo} src={personPhoto} alt={personName} />
        <img
          src={personFavourite ? iconFavouriteFill : iconFavourite}
          onClick={dispatchFavouritePeople}
          className={styles.favourite}
          alt="Add to favourite"
    />
    </div>

    </>
  )
}

PersonPhoto.propTypes = {
    personId: PropTypes.string,
    personPhoto: PropTypes.string,
    personName: PropTypes.string,
    personFavourite: PropTypes.bool,
    setPersonFavourite: PropTypes.func
}

export default PersonPhoto;