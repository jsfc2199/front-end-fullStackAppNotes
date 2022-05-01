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

    //here is the get notes function
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

    //here is the update notes function
    const onCheckBox = async (event, note) => {
        const checked = event.currentTarget.checked;

        //updating the checkbox
        let noteWithCheckboxInformation = {...note,done: checked} 
        //we have the note tha we had bur re writing the donde property base on the info that checked is
        //bringing to us

        //Similar to the POST method in the form
        let noteUpdatedPromise = await fetch(`http://localhost:8081/api/update/note`,
        {method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(noteWithCheckboxInformation) //send the body the note with the info check
            })

            let noteUpdated = await noteUpdatedPromise.json()//making the note into a json structure

        dispatch({
            type: 'update-note',
            payload: noteUpdated  
        })
    }

    const onDelete = async (note) => {
        let response = await fetch(`http://localhost:8081/api/delete/note/${note.id}`, //we have the id from the note
        {
            method: 'DELETE'//we don't send info because we are deleting
        }) 

        //if the status is ok we send the action to delete
        //we do this because we don't want to affect the global state        
        if(response.status ===200){
            dispatch({
                type: 'remove-note',
                payload: note
            })
        }
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
