import { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {

    const initialValues = {
        name: '',
    }

    const validate = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = 'Name is required!';
        }
        return errors;
    }

    const [form, setForm] = useState({})

    const updateForm = e => {
        setForm(f => {
            return { ...f, [e.target.name]: e.target.value }
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        fetch('/members', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        })
            .then(r => {
                if (r.ok) {
                    r.json().then(console.log)
                } else {
                    console.error()
                    console.error('POST /members status', r.status)
                    r.text().then(console.warn)
                }
            })
    }

    return 
}

export default SignUp;
     // <h1>Sign up</h1>
        // <form onSumbit = {handleSubmit}>
        //     <div>
        //         <label> username :
        //             <input name = 'name' onChange = {updateForm}/>
        //         </label>
        //     </div>
        //     <div>
        //         <label>
        //             password:
        //             <input name = 'password'
        //             type = 'password'
        //             onChange={updateForm} />
        //         </label>
        //     </div>
        // </form>