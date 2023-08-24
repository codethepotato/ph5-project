import { useState, useEffect } from "react";
import { Form } from "semantic-ui-react";
import EventCard from './EventCard'


function SocialEvents() {

    const [events, setEvents] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [mingle, setMingle] = useState(false)
    const [cult_id, setCult_id] = useState('')


    useEffect(() => {
        fetch('http://localhost:5555/events')
            .then(r => r.json())
            .then(events => setEvents(events))
            .catch(error => {
                console.error('Error fetching event data:', error);
            })
    }, []);

    const newEvent = {
        title: title,
        description: description,
        cult_id: cult_id,
        co_mingle: mingle
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
        setEvents([...events, newEvent])
    }

    const toggle = () => {
        setMingle(!mingle)
    }

    const byeEvent = (id) => {
        const newList = events.filter((event) => event.id !== id);
        setEvents(newList)
        fetch(`http://localhost:5555/events/${id}`, {
            method: 'DELETE',
        })
    }

    const allEvents = events.map(e => {
        return <EventCard
            key={e.id}
            id={e.id}
            title={e.title}
            description={e.description}
            cult_id={e.cult_id}
            co_mingle={e.co_mingle}
            byeEvent = {byeEvent} />
    })

    return (
        <div className='event-container'>
            <h1>Cat-tastic Events!</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="new-event">
                    <Form.Input
                        onChange={e => setTitle(e.target.value)}
                        fluid label='Title'
                        placeholder='Event Title'
                        title='title' />
                    <Form.Input
                        onChange={e => setDescription(e.target.value)}
                        fluid label='Description'
                        placeholder='Event Description'
                        description='description' />
                    <Form.Input
                        onChange={e => setCult_id(e.target.value)}
                        fluid label='Cult Id'
                        placeholder="Event's Cult Id (ex. 1-6)" />
                    <Form.Input
                        onClick={toggle}
                        fluid label='Co-Mingle'
                        type='checkbox' />
                </Form.Group>
                <Form.Button>Submit!</Form.Button>
            </Form>
            {allEvents}
        </div>
    )
}


export default SocialEvents;