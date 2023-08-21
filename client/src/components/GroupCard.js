import React from 'react';
import {Card} from 'semantic-ui-react';

function GroupCard({name, motto}){

    return (
        <Card>
            <div>{name}</div>
            <p>{motto}</p>
        </Card>
    )
}

export default GroupCard;