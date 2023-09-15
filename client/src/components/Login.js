import { Form, Input } from "semantic-ui-react";
import { Card } from "semantic-ui-react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "./Context/user";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

    const starter = { username: '', password: '' }
    const [login, setLogin] = useState(starter)
    const { user, setUser } = useContext(UserContext)
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const updateForm = e => {
        setLogin(f => {
            return { ...f, [e.target.name]: e.target.value }
        })
    }

    const handleSumbit = async () => {
        try {
            const resp = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(login)
            });
            const data = await resp;
            if (resp.status === 200) {
                resp.json().then(resp_body => {
                    setUser(resp_body)
                    toast.success('Logged in successfully!', {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 2000,
                    });
                    navigate('/Home');
                })
            } else if (resp.status === 401) {
                setError('Incorrect password');
            } else if (resp.status === 404) {
                setError('User not found');
            } else {
                setError(data.error || 'Failed to Login');
            }
        } catch (error) {
            setError('Unexpected Error Logging in, try again');
        }
    }
    return (
        <div>
            <Card>
                <h1>Login</h1>
                <Form onSubmit={handleSumbit}>
                    <Form.Input>
                        <label>Username</label>
                        <Input
                            name='username'
                            onChange={e => updateForm(e)}
                            type='text'
                            placeholder='Username'
                            value={login.username} />
                    </Form.Input>
                    <Form.Input>
                        <label>Password</label>
                        <Input
                            name='password'
                            type='password'
                            onChange={e => updateForm(e)}
                            value={login.password}
                            placeholder='Password' />
                    </Form.Input>
                    <Form.Button>Pst Pst!</Form.Button>
                </Form>
                {error ? <div>{error}</div> : null }
                <ToastContainer />
            </Card>
        </div>
    )
}


export default Login;