
import React from 'react';
import Head from './Header'

const MainContainer = (props) => {
    return (
        <div>
            <Head />
            <div>
            	{props.children}
	        </div>
        </div>
    )
}

export default MainContainer;