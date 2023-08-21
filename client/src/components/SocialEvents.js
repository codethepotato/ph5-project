import { useState, useEffect } from "react";
import { Form } from "semantic-ui-react";
import EventCard from './EventCard'


function SocialEvents() {

    const [events, setEvents] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [mingle, setMingle] = useState(false)

    useEffect(() => {
        fetch('http://localhost:5555/events')
            .then(r => r.json())
            .then(events => setEvents(events))
            .catch(error => {
                console.error('Error fetching event data:', error);
            })
    }, []);

    const allEvents = events.map(e => {
        return <EventCard
            key={e.id}
            title={e.title}
            description={e.description}
            co_mingle={e.co_mingle} />
    })

    const newEvent = {
        title: title,
        description: description,
        mingle: mingle
    }

    const handleSubmit = e => {
        e.preventDefault()
        handlePost(newEvent)
    }

    function handlePost(eventObj) {
        fetch('http://localhost:5555/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventObj)
        })
            .then(r => r.json())
            .then(newEvent => addEvent(newEvent))
    }

    const addEvent = (newEvent) => {
        setEvents([...allEvents, newEvent])
    }

    const toggle = (e) => {
        e.preventDefault()
        setMingle(!mingle)
    }

    return (
        <div id = 'event-container'>
            <h1>Cat-tastic Events!</h1>
            {allEvents}
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Input
                        onChange={e => setTitle(e.target.value)}
                        fluid label='Title'
                        placeholder='Title'
                        title='title' />
                    <Form.Input
                        onChange={e => setDescription(e.target.value)}
                        fluid label='Description'
                        placeholder='Description'
                        description='description' />
                    <Form.Input
                        onChange={toggle}
                        fluid label='Co-Mingle'
                        type = 'checkbox' />    
                </Form.Group>
                <Form.Button>Submit!</Form.Button>
            </Form>
        </div>
    )
}


export default SocialEvents;