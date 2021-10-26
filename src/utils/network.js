import { HTTP, HTTPS } from "../constants/api";

/**
 * изменяет URL с HTTP на HTTPS
 * @param {String} url - url для изменения
 * @returns {String} url с HTTPS
 */
export const changeHTTP = (url) => {
    const result = url ? url.replace(HTTP, HTTPS) : url;

    return result;
}

// export const getApiResource = (url) => {
//     fetch(url)
//       .then(res => res.json())
//       .then(body => console.log(body))
//       .catch(error => console.log(error.message))
// }


/**
 * Отправляет запрос fetch
 * @param {String} url - для запроса
 * @returns {Promise} - Promise с результатом запроса
 */
export const getApiResource = async (url) => {
    try {
        const res = await fetch(url);
        if(!res.ok) { // для ошибки 404
            console.error('Couldn`t fetch', res.status);
            return false;
        }
        return await res.json();
    }
    catch (error) {
        console.error('Couldn`t fetch', error.message);
        return false;
    }
}

// getApiResource(SWAPI_ROOT+SWAPI_PEOPLE)
//     .then(body => console.log(body));

    //асинхронная самовызывающася ф-я

// (async () => {
//     const body = await getApiResource(SWAPI_ROOT+SWAPI_PEOPLE);
//     console.log(body);
// })();