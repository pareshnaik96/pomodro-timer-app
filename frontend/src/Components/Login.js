import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { useEffect, useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import Pomodoro from './Pomodoro'


function Login() {
    const [auth, setAuth] = useState(false || window.localStorage.getItem("auth") === "true")
    const [token, setToken] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userCred) => {
            if (userCred) {
                setAuth(true)
                window.localStorage.setItem("auth", "true")
                userCred.getIdToken().then((token) => {
                    setToken(token)
                })
            }
        })
    }, [])

    const verifyToken = async (token) => {
        const response = await fetch(`http://localhost:4000/verifyToken?token=${token}`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Unauthorized');
        }
    };

    verifyToken(token)
        .then((decodedToken) => {
            console.log(decodedToken, "decodedtoken");
            navigate('/pomodoro')
        })
        .catch((error) => {
            console.error(error);
        })


    const loginWithGoogle = () => {
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
            (userCred) => {
                console.log(userCred)
                if (userCred) {
                    setAuth(true)
                    window.localStorage.setItem("auth", "true")
                }
            }
        )
    }

    return (
        <div className='container'>
            {auth ? <Pomodoro token={token} /> : <button className='btn' onClick={loginWithGoogle}>Login with Google</button>}
        </div>
    );
}



export default Login;