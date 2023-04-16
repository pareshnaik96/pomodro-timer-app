import React, { useState, useEffect } from 'react';
import './Pomodoro.css'
import firebase from 'firebase/compat/app'
import { useNavigate } from 'react-router-dom';


const Pomodoro = () => {
    const [time, setTime] = useState(25 * 60);

    const [isActive, setIsActive] = useState(false);
    const [sessionType, setSessionType] = useState('work');
    const [isOnBreak, setIsOnBreak] = useState(false);

    const navigate = useNavigate()

    const handleLogout = async () => {
        await firebase.auth().signOut().then(() => {
            window.localStorage.removeItem("auth");
            navigate('/')
        })
    };

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setTime(25 * 60);
        setIsActive(false);
        setSessionType('work');
        setIsOnBreak(false);
    };

    const startBreak = () => {
        setTime(5 * 60);
        setIsActive(true);
        setSessionType('break');
        setIsOnBreak(true);
    };

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setTime(time => {
                    if (time === 0) {
                        setSessionType(sessionType => {
                            return sessionType === 'work' ? 'break' : 'work';
                        });
                        if (sessionType === 'work') {
                            setIsOnBreak(false);
                            return 25 * 60;
                        } else {
                            setIsOnBreak(true);
                            return 5 * 60;
                        }
                    } else {
                        return time - 1;
                    }
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, time, sessionType]);

    return (
        <div className="pomodoro-container">
            <nav>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            <h1>{sessionType === 'work' ? 'Work' : 'Break'} Time</h1>
            <h2>{Math.floor(time / 60)}:{('0' + (time % 60)).slice(-2)}</h2>
            {isOnBreak ? (
                <button onClick={resetTimer}>End Break</button>
            ) : (
                <>
                    <button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
                    <button onClick={resetTimer}>Reset</button>
                    <button onClick={startBreak}>Take a Break</button>
                </>
            )}
        </div>
    );
};

export default Pomodoro;