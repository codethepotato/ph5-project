import React, {useState} from 'react';
import {Form} from 'semantic-ui-react';

import Login from './Login'
import SignUp from './SignUp'

function Initiation() {
    return (
        <div>
            <SignUp />
            <Login />
        </div>
    )
}


export default Initiation;