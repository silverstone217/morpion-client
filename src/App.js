import React, { useEffect, useState, createContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/Main';
import Game from './pages/Game';
import { v4 as uuidv4 } from 'uuid'

export const userIn = createContext();

const App = () => {

  const [ user, setUser ] = useState(null);
  const [ room, setRoom ] = useState(null);
  

    useEffect(() => {
        setUser(uuidv4());
    }, [])
  
  return (
    <userIn.Provider value={{user, setUser, room, setRoom}}>
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<Main/>} />
              <Route path={ room !== null ? "/game": "/"} element={ room !== null ? <Game/> : <Main/>}/>
              <Route path='/*' element={<Main/>} />
          </Routes>
      </BrowserRouter>
    </userIn.Provider>
  )
}
/*const NoUser = ({children}) => {
  const navigate = useNavigate();
  const { room } = useContext(userIn)

  if(room){
    return <>{children}</>
  }
  else{
    return navigate("/")
  }
}*/

export default App