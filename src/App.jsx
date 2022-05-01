import './App.css'
import StoreProvider from './components/StoreProvider'
import ListOfToDo from './components/ListOfToDo'
import Form from './components/Form'

function App() {

  return (
    <StoreProvider>
        <h1>Hola</h1>
        <Form/>
        <ListOfToDo />
        
    </StoreProvider>
  )
}

export default App
