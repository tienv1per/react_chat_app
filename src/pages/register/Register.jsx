import React, { useState } from 'react';
import "./register.scss";
import { createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import Add from "../../img/addAvatar.png";
import {auth, storage, db} from "../../firebase";
import {ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import {doc, setDoc} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            // create user
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log(res.user);
            
            // create image name
            const storageRef = ref(storage, displayName); // nhan vao 2 tham so: storage va url file
            await uploadBytesResumable(storageRef, file);

            getDownloadURL(storageRef).then(async(downloadURL) => {
                try {
                    // upload profile
                    await updateProfile(res.user, {
                        displayName: displayName,
                        photoURL: downloadURL
                    });

                    // create user on firestore database
                    await setDoc(doc(db, "users", res.user.uid), {
                        uid: res.user.uid,
                        displayName: displayName,
                        email: email,
                        photoURL: downloadURL,
                    });

                    // create empty user chats on firestore database
                    await setDoc(doc(db, "userChats", res.user.uid), {});

                    navigate("/");

                } catch (error) {
                    console.log(error);
                    setErr(true);
                }



            });

        } catch (error) {
            console.log(error.message);
            setErr(true);
        }

    }

    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className='logo'>TheShy Chat App</span>
                <span className='title'>Register</span>
                <form ></form>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='display name'/>
                    <input type='email' placeholder='email'/>
                    <input type='password' placeholder='password'/>
                    <input style={{display: 'none'}} type='file' id='file'/>
                    <label htmlFor='file'>
                        <img src={Add} alt=''/>
                        <span>Add an avatar</span>
                    </label>
                    <button type='submit'>Sign Up</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>You do have an account? Login</p>
            </div>
        </div>
    )
}

export default Register