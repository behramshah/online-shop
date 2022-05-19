import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.util';



const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => setFormFields(defaultFormFields);

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value})

    }; 
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password != confirmPassword) {
            alert('passwords doesnt match');
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();    
        } catch (error) {
            if(error.code == 'auth/email-already-in-use'){
                alert('already used email choose another')
            } else {
                console.log('failed to create user', error.message)
            }
        }
    
    };

    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label> Display name
                    <input type='text' required onChange={handleChange} name='displayName' value={displayName}/>
                </label>
                <label> Email
                    <input type='email' required onChange={handleChange} name='email' value={email}/>
                </label>
                <label> Password
                    <input type='password' required onChange={handleChange} name='password' value={password}/>
                </label>

                <label> Confirm password
                    <input type='password' required onChange={handleChange} name='confirmPassword' value={confirmPassword}/>
                </label>
                <button type='submit'>Sign Up</button>
            </form>
        </div>

    );
};

export default SignUpForm;