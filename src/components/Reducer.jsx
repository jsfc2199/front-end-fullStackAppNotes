function reducer(state, action) {

    switch (action.type) {
        //create the escenario get-notes
        case 'get-notes':
            //we grab the payload c
            const stateWithAllTheNotes = {
                ...state, //we get the previous state the we had
                listOfNotes: action.payload //replacing the listOfNotes for the one in the payload
                //which mean it is going to use the list the we get from the http request
            }
            return stateWithAllTheNotes

        case 'add-note':
            const newNote = action.payload; //the note is equals to the payload in form
            const newListOfNotesAddedOne = [...state.listOfNotes, newNote]
            const newStateAddNote = {
                ...state, listOfNotes: newListOfNotesAddedOne
            }
            return newStateAddNote

        case 'remove-note':
            const newlistOfNotesWithOutPayloadNote =
                state.listOfNotes.filter(note => note.id !== action.payload.id)
            const newStateWithoutNoteDeleted = { ...state, listOfNotes: newlistOfNotesWithOutPayloadNote }
            return newStateWithoutNoteDeleted

        case 'update-note':
            const newlistOfNotes = state.listOfNotes.map(note => {
                if (note.id == action.payload.id) {
                    //if the note.id that we are extracting for the list of notes is the same note that we
                    //have sent in the payload we are going to return the action.payload
                    return action.payload
                }
                return note
            })       
            //in this way the note is not moving because the check, is in the same place    
            const newStateModifiedCheckBox = {
                ...state, listOfNotes: newlistOfNotes
            }
            return newStateModifiedCheckBox
    }
}

export default reducer;