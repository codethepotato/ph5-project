import { Form, Input } from "semantic-ui-react";
import { Card } from "semantic-ui-react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "./Context/user";

function Login() {

    const starter = {username: '', password: ''}
    const [login, setLogin] = useState(starter)
    const {user, setUser} = useContext(UserContext)

    const navigate = useNavigate()

    // console.log(login)
    const updateForm = e => {
        // console.log(e)
        setLogin(f => {
            return { ...f, [e.target.name]: e.target.value }
        })
    }

    const handleSumbit = e => {
        e.preventDefault()
        console.log(login)
        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(login)
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
                <Form onSubmit={handleSumbit}>
                    <Form.Input>
                        <label>Username</label>
                        <Input
                            name = 'username'
                            onChange={e => updateForm(e)}
                            type='text'
                            placeholder='Username'
                            value = {login.username} />
                    </Form.Input>
                    <Form.Input>
                        <label>Password</label>
                        <Input
                            name = 'password'
                            type='password'
                            onChange={e => updateForm(e)}
                            value = {login.password}
                            placeholder='Password' />
                    </Form.Input>
                    <Form.Button>Pst Pst!</Form.Button>
                </Form>
            </Card>
        </div>
    )
}


export default Login;