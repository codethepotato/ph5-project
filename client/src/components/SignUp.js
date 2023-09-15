import { useContext, useState } from 'react';
import { Form, Card, Input } from 'semantic-ui-react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './Context/user';

function SignUp() {

    const [cats, setCats] = useState([])
    const [name, setName] = useState('')
    const [picture, setPicture] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {user, setUser} = useContext(UserContext)
    const [error, setError] = useState('')

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
            .then(r => {
                if (r.ok){
                    r.json().then(r_body => {
                        setError('')
                        setUser(r_body)
                        toast.success('Joined successfully!', {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 2000,
                        });  
                    })
                } else {
                    r.json().then(message => setError(message.error))
                    // toast.error('Username must be 20 characters or less!', {
                    //     position: toast.POSITION.TOP_CENTER,
                    //     autoClose: 2000,
                    // });
                }
            })
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
                            type='password'
                            placeholder='Password'
                            name='password' />
                    </Form.Input>
                    <Form.Button onClick={handleSubmit}>Join!</Form.Button>
                </Form>
                {error ? <div>{error}</div> : null}
                <ToastContainer/>
            </Card>
        </div >
    )

}
export default SignUp;
