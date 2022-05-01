import React, {useState, useContext, useRef} from 'react'
import {Store} from './StoreProvider'

const Form = () => {

    const onAdd = (event) => {
        event.preventDefault();

        
        if(title && message){
            dispatch({
                type: 'add-note',
                payload:{
                    title,
                    message
                }
                
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
