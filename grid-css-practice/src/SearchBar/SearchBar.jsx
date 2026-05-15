import { useState } from 'react'
import './SearchBar.css'

const JIKAN_TOP_ANIME_URL = 'https://api.jikan.moe/v4/top/anime'

async function fetchTopAnime() {
  const response = await fetch(JIKAN_TOP_ANIME_URL)
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }
  return response.json()
}

function SearchBar({ animelist, setAnimelist }) {
  const [query, setQuery] = useState('')
  const [filteredAnime, setFilteredAnime] = useState(null)
  const [fetchStatus, setFetchStatus] = useState('idle')

  async function handleFetch() {
    setFetchStatus('loading')
    try {
      const data = await fetchTopAnime()
      console.log('Jikan response:', data)
      setAnimelist(data)
      setFilteredAnime(null)
      setFetchStatus('success')
    } catch (err) {
      console.error(err)
      setFetchStatus('error')
    }
  }

  function handleLocalSearch(event) {
    event.preventDefault()
    if (!animelist?.data) {
      console.warn('No anime loaded yet. Click Fetch first.')
      setFilteredAnime([])
      return
    }

    const q = query.trim().toLowerCase()
    if (!q) {
      setFilteredAnime(animelist.data)
      console.log('Search (all from state):', animelist.data)
      return
    }

    const matches = animelist.data.filter((item) => {
      const titles = [item.title, item.title_english, item.title_japanese].filter(
        Boolean,
      )
      return titles.some((t) => String(t).toLowerCase().includes(q))
    })
    setFilteredAnime(matches)
    console.log('Search (filtered from state):', matches)
  }

  const hasData = Boolean(animelist?.data?.length)
  const isFetching = fetchStatus === 'loading'

  return (
    <div className="search-bar-container">
      <form className="search-bar-form" onSubmit={handleLocalSearch}>
        <input
          className="search-bar-input"
          type="search"
          placeholder="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search"
          autoComplete="off"
        />
        <div className="search-bar-actions">
          <button
            className="search-bar-btn search-bar-btn--primary"
            type="submit"
            disabled={!hasData}
          >
            Search
          </button>
          <button
            className="search-bar-btn"
            type="button"
            onClick={handleFetch}
            disabled={isFetching}
          >
            {isFetching ? '…' : 'Fetch'}
          </button>
        </div>
      </form>
      {filteredAnime !== null && (
        <p className="search-bar-meta" aria-live="polite">
          {filteredAnime.length} match{filteredAnime.length === 1 ? '' : 'es'}
        </p>
      )}
    </div>
  )
}

export default SearchBar
