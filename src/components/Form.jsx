import React, {useState, useContext, useRef} from 'react'
import {Store} from './StoreProvider'

const Form = () => {

    const onAdd = async (event) => {
        event.preventDefault();        
        if(title && message){
            //here we create the note from the form with their structure
            //this is the object that we are going to be sending to our API
            const noteFromForm = {
                title,
                message,
                done: false
            }

            //here we save the note because here is the scenario
            //storing the response of the backend, first parameter the path of the http request
            //the object with the method (POST) is the second parameter, and we notify that the content
            //is a json
            let noteSavedPromise = await fetch(`http://localhost:8081/api/save/note`,
            {method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(noteFromForm) //we send the note from our form 
            })

            let noteSaved = await noteSavedPromise.json(); //we send the noteSaved as the payload for the recuder

            dispatch({
                type: 'add-note',
                payload: noteSaved
                
            })

            
            formRef.current.reset() 
        }
    }
    
    const [title, setTitle] = useState('') 
    const [message, setMessage] = useState('') 


    const addTitle = (e) => {
        setTitle(e.target.value);
        
    }

    const addMessage = (e) => {
        setMessage(e.target.value);
    }

    const formRef = useRef(null) 

    const{state,dispatch} = useContext(Store)
    return (
        <form ref = {formRef}> 
            <label >Title: </label>
            <input onChange={addTitle} type="text" name="title" />

            <label >Message: </label>
            <input onChange={addMessage} type="text" name="message" />

            <button onClick={onAdd}>Add Note</button>
        </form>
    )
}

export default Form
