import { signInWithGooglePopup, createuserDocumentFromAuth } from '../../utils/firebase/firebase.util'

const SignIn = () => {

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createuserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={logGoogleUser}>Sign In with Google Popup</button>
        </div>
    );
};

export default SignIn;