import './App.css'
import SearchBar from '../SearchBar/SearchBar.jsx'
import SideBar from '../SideBar/SideBar.jsx'
import Content from '../Content/Content.jsx'
import { useEffect, useState } from 'react'

function App() {
  const [animeList, setAnimelist] = useState([])
  useEffect(() => {
    console.log('list have been fetched')
  }, [animeList])

  return (
    <div className="main-container">
      <SearchBar animelist={animeList} setAnimelist={setAnimelist} />
      <span className="span-content">
        <SideBar />
        <Content animeList={animeList} setAnimelist={setAnimelist}/>
      </span>
    </div>
  )
}

export default App
