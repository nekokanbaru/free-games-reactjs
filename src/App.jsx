import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import GameStore from './components/Gamestore'
import { AppProvider } from './context'
import GameDetails from './components/GameDetails'
import Error from './components/Error'

function App() {

  return (
    <>
    <AppProvider>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<GameStore />}></Route>
          <Route path='/games/:id' element={<GameDetails/>}></Route>
          <Route path='*' element={<Error />}></Route>
        </Routes>
      </Router>
    </AppProvider>
    </>
  )
}

export default App
