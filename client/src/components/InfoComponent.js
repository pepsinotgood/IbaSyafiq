import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InfoComponent = () => {
    const [info, setInfo] = useState('');

    useEffect(() => {
        axios.get('/')
            .then(response => {
                setInfo(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <h1>{info}</h1>
        </div>
    );
};

export default InfoComponent;
