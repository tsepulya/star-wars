import { useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';

export const wthErrorApi = View => {

    return props => {
        const [errorApi, setErrorApi] = useState(false);
        return (
            <>
                {errorApi 
                    ? <ErrorMessage />
                    : (
                        <View setErrorApi={setErrorApi}
                        {...props} />
                    )
                }
            </>
        )
    }
}