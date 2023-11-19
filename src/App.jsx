import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import GameStore from './components/Gamestore'
import { AppProvider } from './context'
import GameDetails from './components/GameDetails'

function App() {

  return (
    <>
    <AppProvider>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<GameStore />}></Route>
          <Route path='/games/:id' element={<GameDetails/>}></Route>
        </Routes>
      </Router>
    </AppProvider>
    </>
  )
}

export default App
