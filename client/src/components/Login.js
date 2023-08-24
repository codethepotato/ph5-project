import { Form, Input } from "semantic-ui-react";
import { Card } from "semantic-ui-react";
import { useState } from "react";

function Login() {

    const [form, setForm] = useState({})

    const updateForm = (e) => {
        setForm(form => {
            return {...form, [e.target.name]: e.target.value}
        })
    }

    return (
        <div>
            <Card>
                <h1>Login</h1>
                <Form>
                    <Form.Input>
                        <label>Username</label>
                        <Input type='text' placeholder='Username' />
                    </Form.Input>
                    <Form.Input>
                        <label>Password</label>
                        <Input type='text' placeholder='Password' />
                    </Form.Input>
                    <Form.Button>Pst Pst!</Form.Button>
                </Form>
            </Card>
        </div>
    )
}


export default Login;