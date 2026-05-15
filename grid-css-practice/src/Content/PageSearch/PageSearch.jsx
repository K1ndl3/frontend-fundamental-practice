import { useState } from 'react'
import './PageSearch.css'

const JIKAN_TOP_ANIME_URL = 'https://api.jikan.moe/v4/top/anime?page='

function PageSearch({setAnimeList}) {
  const [page, setPage] = useState(1)

  

  function pageUpSearch() {
    setPage((prev) => prev = Math.min((prev + 1), 1208))
    fetchSearch()
  }

  function pageDownSearch() {
    setPage((prev) => prev = Math.max((prev - 1), 1))
    fetchSearch()
  }

  return (
    <div className="page-search">
      <button
        type="button"
        className="page-search__btn"
        aria-label="Previous page"
        onClick={pageDownSearch}
      >
        ←
      </button>
      <input
        className='page-search_inp'
        type="number"
        min={1}
        value={page}
        onChange={(e) => setPage(Number(e.target.value) || 1)}
        aria-label="Page number"
      />
      <button
        type="button"
        className="page-search__btn"
        aria-label="Next page"
        onClick={pageUpSearch}
      >
        →
      </button>
    </div>
  )
}

export default PageSearch
