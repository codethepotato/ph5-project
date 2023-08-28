import { Form, Input } from "semantic-ui-react";
import { Card } from "semantic-ui-react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "./Context/user";

function Login() {

    const [form, setForm] = useState({})
    const {user, setUser} = useContext(UserContext)

    const navigate = useNavigate()


    const updateForm = (e) => {
        setForm(form => {
            return { ...form, [e.target.name]: e.target.value }
        })
    }

    const handleSumbit = e => {
        e.preventDefault()
        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        })
            .then(r => {
                if (r.ok) {
                    r.json().then(r_body => {
                        setUser(r_body)
                        navigate('/')
                    })
                } else {
                    console.error('Error logging in')
                    console.error('POST /login status:', r.status)
                    r.text().then(console.warn)
                }
            })
    }

    return (
        <div>
            <Card>
                <h1>Login</h1>
                <Form>
                    <Form.Input>
                        <label>Username</label>
                        <Input
                            onChange={e => updateForm(e.target.value)}
                            type='text'
                            placeholder='Username'
                            name = 'username' />
                    </Form.Input>
                    <Form.Input>
                        <label>Password</label>
                        <Input
                            onChange={e => updateForm(e.target.value)}
                            type='text'
                            placeholder='Password'
                            name = 'password' />
                    </Form.Input>
                    <Form.Button onClick={handleSumbit}>Pst Pst!</Form.Button>
                </Form>
            </Card>
        </div>
    )
}


export default Login;