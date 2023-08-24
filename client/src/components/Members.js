import { useEffect, useState } from "react";
import { Card } from 'semantic-ui-react';
import MemberCard from "./MemberCard";

function Members() {

    const [cats, setCats] = useState([])

    useEffect(() => {
        fetch('http://localhost:5555/cats')
            .then(r => r.json())
            .then(cats => setCats(cats))
            .catch(error => {
                console.error('Error fetching member data:', error);
            })
    }, []);

    const allCats = cats.map(catObj => {
        return <MemberCard key={catObj.id} cat={catObj} />
    })

    return (
        <div className='member-container'>
            <h1>Active Members</h1>
            <Card.Group itemsPerRow={6}>
                {allCats}
            </Card.Group>
        </div>
    )
}


export default Members;