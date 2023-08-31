import GroupCard from "./GroupCard";
import { useState, useEffect } from "react";
import { Card } from "semantic-ui-react";

function Groups() {

    const [cults, setCults] = useState([])

    useEffect(() => {
        fetch('/cults')
            .then(r => r.json())
            .then(cults => setCults(cults))
            .catch(error => {
                console.error('Error fetching group data:', error);
            })
    }, []);

    const allCults = cults.map(cult => {
        return <GroupCard 
        key = {cult.id}
        name = {cult.name}
        cult_id = {cult.id}
        motto = {cult.motto} />
    })

    return (
        <div id='group-container'>
            <h1>Current Groups</h1>
            <Card.Group >
                {allCults}
            </Card.Group>
        </div>
    )
}


export default Groups;