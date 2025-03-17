import './App.css'
import Footer from './components/Footer'
import Manager from './components/Manager'
import Navbar from './components/Navbar'
import { createContext,useState } from 'react'

export const StateContext = createContext();

function App() {
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  return (
    <>
      <StateContext.Provider value={{ passwordArray, form, setPasswordArray, setform }}>
        <Navbar />
        <Manager />
        <Footer />
      </StateContext.Provider>
    </>
  )
}

export default App
