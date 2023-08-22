import { Card } from "semantic-ui-react";

function EventCard({title, description, co_mingle, cult_id}){
    
    return (
        <Card>
            <div>
                <h1>{title}</h1>
                <p>{description}</p>
                <p>{cult_id}</p>
                <p>{co_mingle}</p>
            </div>
        </Card>
    )
}

export default EventCard;