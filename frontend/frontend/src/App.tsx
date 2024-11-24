
import { Routes, Route } from 'react-router-dom'
import Sender from './pages/sender'
import Reciever from './pages/reciever'

function App() {
  

  

  return (
    <>
<Routes>
  <Route path='/sender' element={<Sender/>}></Route>
  <Route path='/reciever' element={<Reciever/>}></Route>
</Routes>

    </>
  )
}

export default App
