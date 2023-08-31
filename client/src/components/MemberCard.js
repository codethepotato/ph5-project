import React from 'react';
import { Card, Message  } from 'semantic-ui-react';

function MemberCard({ cat }) {

    const { name, picture, id } = cat

    return (
        <Card>
            <img className = 'member-image' src={picture} size = 'small' wrapped ='true'/>
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Message>Member Id: {id}</Message>
            </Card.Content>
        </Card>
    )
}

export default MemberCard;



    
