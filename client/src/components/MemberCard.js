import React, { useState } from 'react';
import { Card, Button  } from 'semantic-ui-react';

function MemberCard({ cat }) {

    const { name, picture } = cat

    return (
        <Card>
            <img className = 'member-image' src={picture} size = 'small' wrapped />
            <Card.Content>
                <Card.Header>{name}</Card.Header>
            </Card.Content>
        </Card>
    )
}

export default MemberCard;



    
