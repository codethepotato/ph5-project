import React, { useContext, useEffect, useState } from "react";
import { Card, Form } from "semantic-ui-react";
import { UserContext } from "./Context/user.js";


function Home() {

    const { user, setUser } = useContext(UserContext)
    const [username, setUsername] = useState([])


    const updateUserName = e => {
        setUsername(f => {
            return { ...f, [e.target.name]: e.target.value }
        })
    }

    const handlePatch = (e) => {
        e.preventDefault();
        fetch(`/cats/${user.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify(username),
        })
            .then(r => r.json())
            .then((user) => setUser(user))
    }

    return (
        <div>
            <h1>Welcome Back, {user?.name}!</h1>
            <Card>
                <h1>{user?.username}</h1>
                <img className="member-image" src = {user?.picture} size = 'small' wrapped></img>
            </Card>
            <Card>
                <Form onSubmit={handlePatch}>
                    <Form.Input
                        onChange = {e => updateUserName(e)}
                        fluid label = 'Change Username'
                        placeholder = 'New username'
                        name = 'username'/>
                    <Form.Button>Confirm</Form.Button>
                </Form>
            </Card>
        </div>
    )
}

export default Home;