import { useState } from 'react'
import './PageSearch.css'

const JIKAN_TOP_ANIME_URL = 'https://api.jikan.moe/v4/top/anime?page='


function PageSearch({setAnimelist}) {
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  
  async function fetchSearch(pageNum) {
    setIsLoading(true)
    try {
      const response = await fetch(JIKAN_TOP_ANIME_URL + pageNum)
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
      }
      const data = await response.json()
      setAnimelist(data)
      console.log('fetched new page. curr page:', pageNum)
    } catch (err) {
      console.error(err)
      // optional: show error to user
    } finally {
      setIsLoading(false)
    }
  }


  function pageUpSearch() {
    const nextPage = Math.min(page + 1, 1208); // Calculate it first
    setPage(nextPage);
    fetchSearch(nextPage)
  }

  function pageDownSearch() {
    const nextPage = Math.max((page - 1), 1)
    setPage(nextPage)
    fetchSearch(nextPage)
  }

  return (
    <div className="page-search">
      <button
        type="button"
        className="page-search__btn"
        aria-label="Previous page"
        onClick={pageDownSearch}
        disabled={isLoading}
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
        disabled={isLoading}
      >
        →
      </button>
    </div>
  )
}

export default PageSearch
