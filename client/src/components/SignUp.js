import { Form, Card, Input } from 'semantic-ui-react';

function SignUp() {

    return (
        <div>
            <Card>
                <Form>
                    <h1>Sign Up</h1>
                    <Form.Input>
                        <label>Name</label>
                        <Input type = 'text' placeholder = 'Name' />
                    </Form.Input>
                    <Form.Input>
                        <label>Username</label>
                        <Input type = 'text' placeholder = 'Username' />
                    </Form.Input>
                    <Form.Input>
                        <label>Password</label>
                        <Input type = 'text' placeholder = 'Password' />
                    </Form.Input>
                    <Form.Button>Join!</Form.Button>
                </Form>    
            </Card>
        </div >
    )

}
export default SignUp;
