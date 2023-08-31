import React, { useContext, useState } from 'react';
import {Card} from 'semantic-ui-react';
import { UserContext } from './Context/user';

function GroupCard({name, motto, cult_id}){

    const {user, setUser} = useContext(UserContext)
    const [cultists, setCultists] = useState([])

    const addCultist = (newCultist) => {
        setCultists([...cultists, newCultist])
    }


    function handlePost() {
        const newCatCult = {
            cat_id: user.id,
            cult_id: cult_id,
        }
        console.log(newCatCult)
        fetch('/catcults', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newCatCult)
        }) 
            .then( r => r.json())
            .then(newCultist => addCultist(newCultist))
    }

    return (
        <Card>
            <div>
            <h1>{name}</h1>
            <p>{motto}</p>
            </div>
            <div>
                {user ? (
                    <button onClick={handlePost}>Join Group!</button>
                ) : <div></div>}
            </div>
        </Card>
    )
}

export default GroupCard;