import { Card } from "semantic-ui-react";
import { useState } from "react";
import { UserContext } from "./Context/user";
import { useContext } from "react";

function EventCard({ id, title, description, co_mingle, cult_id, byeEvent }) {

    const [attendance, setAttendance] = useState(true)
    const { user, setUser } = useContext(UserContext)

    const handleAttendance = () => {
        setAttendance(!attendance)
    }

    return (
        <Card>
            <div>
                <h1>{title}</h1>
                <p>{description}</p>
                <p>{cult_id}</p>
                <p>{co_mingle}</p>
            </div>
            <div>
                {user ?
                    <div>
                        {attendance ? (
                            <button onClick={handleAttendance} className="primary">Attend</button>
                        ) : (
                            <button onClick={handleAttendance}>Attending</button>
                        )}
                        <button onClick={() => byeEvent(id)}>Cancel</button>
                    </div> :
                    <div></div>}
            </div>
        </Card>
    )
}

export default EventCard;

