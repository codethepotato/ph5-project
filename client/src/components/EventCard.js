import { Card } from "semantic-ui-react";

function EventCard({id, title, description, co_mingle, cult_id, byeEvent}){

    return (
        <Card>
            <div>
                <h1>{title}</h1>
                <p>{description}</p>
                <p>{cult_id}</p>
                <p>{co_mingle}</p>
            </div>
            <button onClick = {() => byeEvent(id)}>Cancel</button>
        </Card>
    )
}

export default EventCard;