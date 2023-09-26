import { useState } from 'react'
import './App.css'
import UploadImage from './pages/uploadImage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <UploadImage />
    </>
  )
}

export default App
