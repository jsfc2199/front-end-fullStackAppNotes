function reducer(state, action) {

    switch(action.type){
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
            const newNote = {
                id : Math.floor(Math.random()*10000), 
                message: action.payload.message, 
                title: action.payload.title,
                done: false
            }           
            const newListOfNotesAddedOne = [...state.listOfNotes, newNote]            
            const newStateAddNote = {
                ...state, listOfNotes: newListOfNotesAddedOne
            }
            return newStateAddNote

        case 'remove-note':            
             const newlistOfNotesWithOutPayloadNote = 
             state.listOfNotes.filter(note => note.id !== action.payload.id)
             const newStateWithoutNoteDeleted = {...state, listOfNotes: newlistOfNotesWithOutPayloadNote}
            return newStateWithoutNoteDeleted

        case 'update-note': 
            const newlistOfNotes = state.listOfNotes.filter(note => note.id !== action.payload.id)
            const newListOfNotesWithModification = [...newlistOfNotes, action.payload] 
            const newStateModifiedCheckBox = {
                ...state,listOfNotes: newListOfNotesWithModification
            }
            return newStateModifiedCheckBox
    }
}

export default reducer;