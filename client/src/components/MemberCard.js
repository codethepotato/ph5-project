import React, {useState} from 'react';
import {Card} from 'semantic-ui-react';

function MemberCard({cat}){
    
    const {name, image} = cat

    return (
        <Card>
            <div>
                <h1>{cat.name}</h1>
                <img src = {cat.picture}/>
            </div>
        </Card>
    )
}

export default MemberCard;