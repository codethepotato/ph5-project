import React, { useContext, useEffect, useState } from 'react';
import { Card, Button } from 'semantic-ui-react';
import { UserContext } from './Context/user';


function GroupCard({ name, motto, cult_id, catcult}) {

    const { user, setUser } = useContext(UserContext)
    const [cultists, setCultists] = useState([])
    const [joining, setJoining] = useState(true)

    const addCultist = (newCultist) => {
        setCultists([...cultists, newCultist])
    }

    const handleJoining = () => {
        setJoining(!joining)
    }

    function handlePost() {
        const newCatCult = {
            cat_id: user.id,
            cult_id: cult_id,
        }

        fetch('/catcults', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCatCult)
        })
            .then(r => r.json())
            .then(newCultist =>{ addCultist(newCultist)})
    }

    const memberList = () => {
        return cultists.map(cc => <li key = {cc.id}>{cc.cat_id}</li>)
    }

    useEffect(() => {
        setCultists(catcult)
    },[catcult])

    return (
        <Card>
            <div>
                <h1>{name}</h1>
                <p>{motto}</p>
                <ol>Member Id's:
                    {memberList()}
                </ol>
            </div>
            <div>
                {user ?
                    <div>
                        {joining ? (
                            <Button onClick={() => { handlePost(); handleJoining(); }}>Join Group!</Button>
                        ) : (
                            <Button>Member</Button>
                        )}
                    </div> :
                    <div></div>}
            </div>
        </Card>
    )
}

export default GroupCard;