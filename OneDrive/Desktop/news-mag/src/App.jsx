import { useState } from "react"
import Navbar from "./components/Navbar"
import Newboard from "./components/Newboard"




const App = () => {
  const[category,setCategory]=useState("general")
  return (
    <div>
      <Navbar setCategory={setCategory}/>
      <Newboard category={category}/>
    </div>
  )
}

export default App