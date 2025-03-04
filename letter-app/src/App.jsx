import { useState } from 'react'
import Auth from "./Auth";
import LetterEditor from "./LetterEditor";
import './App.css'

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
    {!user ? <Auth onLogin={setUser} /> : <LetterEditor user={user} />}
  </div>
  )
}

export default App
