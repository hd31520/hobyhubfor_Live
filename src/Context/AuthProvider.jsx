import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
// import { auth } from '../firebase/firebase.init';


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const CreateUser = async (email, password, displayName, photoURL) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

           
            await updateProfile(user, {
                displayName: displayName,
                photoURL: photoURL
            });

            console.log("User created and profile updated:", user);
            return user;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const singInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signOutUser = () => {
        setLoading(true)
        return signOut(auth);
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log("insideUseEffect on Auth State Change,", currentUser);
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unSubscribe();
        }
    }, [])
const forgetUser = (email) => {
   return sendPasswordResetEmail(auth, email);

}
const provider = new GithubAuthProvider();

const signInWithGitHub = () => {
 return signInWithPopup(auth, provider)
    
}


const googleprovider = new GoogleAuthProvider();

const signInWithGoogle = () => {
 return signInWithPopup(auth, googleprovider)
    
}


    const userInfo = {
        CreateUser,
        singInUser,
        user,
        signOutUser,
        loading,
        forgetUser,
        signInWithGitHub,
        signInWithGoogle
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {
                children
            }
        </AuthContext.Provider>
    );
};

export default AuthProvider;