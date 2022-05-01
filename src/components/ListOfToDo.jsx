import React, { useContext, useEffect } from 'react'
import { Store } from './StoreProvider'

const ListOfToDo = () => {

    const { state, dispatch } = useContext(Store)

    //Hook that is going to give us all the notes making the request
    /**
     * when the component renders with an empty list it executes the useEffect function
     * if is not empty (we put something like the state) if the state changes the useEffect will execute
     * again
     * 
     * has two paramenters, the first one a function and the second one is a list that the useEffect is
     * paying attention in order to execute the function
     */
    useEffect(() => {
        //function that will create listOfNotes, and it is going to await for the answer of that function
        //'cause is a promise
        let listOfNotes = fetchAllNotes().then(
            (notes) => {
                //console.log(notes); //we can se the notes
                let action = {
                    type: 'get-notes', //the new scenario for the reducer
                    payload: notes //we are sending the notes throw the payload
                }
                dispatch(action) //the trigger that is going to send the action to the reducer       
            })
    }, [])

    //we create the fetchAllNotes that is in the useEffect
    const fetchAllNotes = async()=>{
        let response = await fetch(`http://localhost:8081/api/get/notes`) //we wait for the response of the
        //url that we have in our local pc
        let data = await response.json() //we wait again for the response of the notes in order to be a json
        //to have only the body, like in postman
        return data
    }

    const onCheckBox = (event, note) => {
        const checked = event.currentTarget.checked;

        dispatch({
            type: 'update-note',
            payload: {
                ...note,
                done: checked
            }
        })
    }

    const onDelete = (note) => {
        dispatch({
            type: 'remove-note',
            payload: note
        })
    }

    return (
        <div>
            <h1>Actions pending to be done</h1>
            <ul>
                {
                    state.listOfNotes.map(note => {

                        return <li style={note.done ? { textDecoration: 'line-through' } : {}} key={note.id}>
                            {note.title} <br />
                            {note.message} <br />
                            <input onChange={(event) => onCheckBox(event, note)} type="checkbox" checked={note.done} />
                            <button onClick={() => onDelete(note)}>Delete</button>
                        </li>
                    })
                }
            </ul>
        </div>
    )
}

export default ListOfToDo
