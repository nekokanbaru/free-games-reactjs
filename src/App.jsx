
import './App.css'
import Navbar from './components/Navbar'
import GameStore from './components/Gamestore'
import { AppProvider } from './context'

function App() {

  return (
    <>
    <AppProvider>
      <Navbar></Navbar>
      <GameStore></GameStore>
    </AppProvider>
    </>
  )
}

export default App
