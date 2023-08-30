import { useEffect, useState } from 'react';
import { Form, Card, Input } from 'semantic-ui-react';

function SignUp() {

    const [cats, setCats] = useState([])
    const [name, setName] = useState('')
    const [picture, setPicture] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        handlePost(newCat)
    }

    const addCat = (newCat) => {
        setCats([...cats, newCat])
    }

    const newCat = {
        name: name,
        picture: picture,
        username: username,
        password: password
    }

    function handlePost(newCat) {
        fetch('/cats', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCat)
        })
            .then(r => r.json())
            .then(newCat => addCat(newCat))
    }

    return (
        <div>
            <Card>
                <Form>
                    <h1>Sign Up</h1>
                    <Form.Input>
                        <label>Name</label>
                        <Input
                            onChange={e => setName(e.target.value)}
                            type='text'
                            placeholder='Name'
                            name='name' />
                    </Form.Input>
                    <Form.Input>
                        <label>Picture</label>
                        <Input
                            onChange={e => setPicture(e.target.value)}
                            type='text'
                            placeholder='Picture'
                            name='picture' />
                    </Form.Input>
                    <Form.Input>
                        <label>Username</label>
                        <Input
                            onChange={e => setUsername(e.target.value)}
                            type='text'
                            placeholder='Username'
                            name='username' />
                    </Form.Input>
                    <Form.Input>
                        <label>Password</label>
                        <Input
                            onChange={e => setPassword(e.target.value)}
                            type='text'
                            placeholder='Password'
                            name='password' />
                    </Form.Input>
                    <Form.Button onClick={handleSubmit}>Join!</Form.Button>
                </Form>
            </Card>
        </div >
    )

}
export default SignUp;
