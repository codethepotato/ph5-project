import React from 'react';
import {Card} from 'semantic-ui-react';

function GroupCard({name, motto}){

    return (
        <Card>
            <div>
            <h1>{name}</h1>
            <p>{motto}</p>
            </div>
            <div>
                
            </div>
        </Card>
    )
}

export default GroupCard;