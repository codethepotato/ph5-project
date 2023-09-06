import GroupCard from "./GroupCard";
import { useState, useEffect } from "react";
import { Card } from "semantic-ui-react";

function Groups() {

    const [cults, setCults] = useState([])
    const [catcults, setCatcults] = useState([])

    useEffect(() => {
        fetch('/cults')
            .then(r => r.json())
            .then(cults => setCults(cults))
            .catch(error => {
                console.error('Error fetching group data:', error);
            })
    }, []);

    useEffect(() => {
        fetch('/catcults')
            .then(r => r.json())
            .then(catcults => setCatcults(catcults))
            .catch(error => {
                console.error('Error fatching catcults:', error);
            })
    }, []);

    function members(cult_id){
        return catcults.filter(cc => cc.cult_id == cult_id)
    }

    const allCults = cults.map(cult => {
        return <GroupCard
            key={cult.id}
            name={cult.name}
            cult_id={cult.id}
            motto={cult.motto}
            catcult={members(cult.id)} />
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