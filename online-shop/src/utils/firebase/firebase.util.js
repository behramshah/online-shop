import { initializeApp } from "firebase/app";
import { 
    getAuth,
    signInWithPopup,
    signInWithRedirect, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword
 } from "firebase/auth";
import { 
    getFirestore,
    doc,
    getDoc,
    setDoc
 } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDryUm0hXU8bMM_pAFSDVIc1NfYDcz2YcM",
  authDomain: "online-shop-study-project.firebaseapp.com",
  projectId: "online-shop-study-project",
  storageBucket: "online-shop-study-project.appspot.com",
  messagingSenderId: "773785845535",
  appId: "1:773785845535:web:6919daabea38ff636d7a2a"
};


const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {

    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc( userDocRef,
                {
                    email,
                    createdAt,
                    displayName,
                    ...additionalInformation,
                });
        } catch (error) {
            console.log('Error message:', error.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};
