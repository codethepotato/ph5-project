import React, { useContext, useEffect, useState } from "react";
import { Card, Form } from "semantic-ui-react";
import { UserContext } from "./Context/user.js";


function Home() {

    const { user, setUser } = useContext(UserContext)
    const [username, setUsername] = useState('')


    const updateUserName = e => {
        setUsername(f => {
            return { ...f, [e.target.name]: e.target.value }
        })
    }

    const handlePost = (e) => {
        e.preventDefault();
        fetch('http://localhost:5555/cats/${id}', {
            method: 'PATCH',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify({updateUserName}),
        })
            .then(r => r.json())
            .then((result) => setUsername(result))
    }

    return (
        <div>
            <h1>Welcome Back, {user?.name}!</h1>
            <Card>
                <h1>{user?.username}</h1>
                <img className="member-image" src = {user?.picture} size = 'small' wrapped></img>
            </Card>
            <Card>
                <Form onSubmit={handlePost}>
                    <Form.Input
                        onChange = {e => updateUserName(e)}
                        fluid label = 'Change Username'
                        placeholder = 'New username'/>
                    <Form.Button>Confirm</Form.Button>
                </Form>
            </Card>
        </div>
    )
}

export default Home;