import React, { useState } from "react";

const Notification = (props) => {
    const [exit, setExit] = useState(false);
    const [width, setWidth] = useState(0);
    const [intervalID, setIntervalID] = useState(null);

    //handles notification timer bar
    const handleStartTimer = () => {
        const id = setInterval(() => {
            setWidth((prev)=>{
                if (prev < 100) {
                    return prev + 0.5
                }
                clearInterval(id);
                return prev;
            })
        }, 20);
        setIntervalID(id)
    };

    // handles pause when notification is hovered over
    const handlePauseTimer = () => {
        clearInterval(intervalID)
    };

    // removes notifications at 4 seconds
    const handleCloseNotification = () => {
        handlePauseTimer();
        setExit(true);
        setTimeout(()=> {
            props.dispatch({
                type: "REMOVE_NOTIFICATION",
                id: props.id
            })
        }, 400)
    }

    // handles close effect
    React.useEffect(()=>{
        if (width === 100) {
            handleCloseNotification()
        }
    }, [width])

    // handles start effect
    React.useEffect(()=>{
        handleStartTimer()
    }, []);

    return (
        <div onMouseEnter={handlePauseTimer} onMouseLeave={handleStartTimer} className={`notification-item ${props.type === "SUCCESS" ? "success" : "error"} ${exit ? "exit" : ""}`}>
            <p>{props.message}</p>
            <div className={"bar"} style={{ width: `${width}%` }}></div>
        </div>
    )
}

export default Notification;