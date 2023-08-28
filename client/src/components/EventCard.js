import { Card } from "semantic-ui-react";

function EventCard({id, title, description, co_mingle, cult_id, byeEvent, handleAttendance, attendance}){

    return (
        <Card>
            <div>
                <h1>{title}</h1>
                <p>{description}</p>
                <p>{cult_id}</p>
                <p>{co_mingle}</p>
            </div>
            <button onClick = {() => handleAttendance(id)}>{attendance ? 'Attending' : 'Attend'}</button>
            <button onClick = {() => byeEvent(id)}>Cancel</button>
        </Card>
    )
}

export default EventCard;