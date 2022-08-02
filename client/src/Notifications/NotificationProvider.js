import React, { createContext, useReducer, useState } from "react";
import Notification from "./Notification"

export const NotificationContext = createContext();

const NotificationProvider = (props) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "ADD_NOTIFICATION":
                return [...state, {...action.payload}];
            case "REMOVE_NOTIFICATION":
                return state.filter(el => el.id !== action.id);
            default:
                return state
        }
    }, []);

    return (
        <NotificationContext.Provider value={dispatch}>
            <div className={"notification-wrapper"}>
                {state.map(note => {
                    return <Notification dispatch={dispatch} key={note.id} {...note} />
                })}
            </div>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationProvider