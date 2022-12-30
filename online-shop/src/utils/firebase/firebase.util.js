import { initializeApp } from "firebase/app";
import { 
    getAuth,
    signOut,
    signInWithPopup,
    signInWithRedirect, 
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
 } from "firebase/auth";
import { 
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
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

export const addCollectionAnDocumets = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done')
};

export const getCategoriesAndDocuments = async () => {

    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);    

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data());    
};

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

export const signInAuthUserWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = callback => onAuthStateChanged(auth, callback)
