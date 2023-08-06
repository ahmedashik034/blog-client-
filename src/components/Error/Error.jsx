import React from 'react';
import Lottie from "lottie-react";
import error from '../../images/error.json'

const Error = () => {
    return (
        <div className='d-flex align-items-center justify-content-center'>
            <Lottie className="w-75"
                animationData={error}
            // interactivity={interactivity}
            />
        </div>
    );
};

export default Error;