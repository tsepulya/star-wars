import { useLocation } from 'react-router';
import img from './img/not-found.jpg'
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
    let location = useLocation();

  return (
    <>
        <img className={styles.img} src={img} alt="not found"></img>
        <p className={styles.text}>No match for <u>{location.pathname}</u></p>
    </>
  )
}

export default NotFoundPage;