import {Route, Routes} from "react-router-dom"
import { Landing, Home, Detail, Form } from "./views/index"

function App() {

  return (
  
    

      <Routes>

        <Route path="/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/home/:id" element={<Detail/>}/>
        <Route path="/form" element={<Form/>}/>
      
      </Routes>    
  
  )
}

export default App
