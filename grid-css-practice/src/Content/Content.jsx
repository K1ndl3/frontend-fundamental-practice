import './Content.css'
import ContentMain from './ContentMain/ContentMain.jsx'
import EmptyText from './EmptyText/EmptyText.jsx'
import PageSearch from './PageSearch/PageSearch.jsx'

function Content({ animeList, setAnimeList }) {
  return (
    <div className="content-container">
      {!(animeList?.data?.length) ? <EmptyText /> : <ContentMain animeList={animeList} />}
      <PageSearch setAnimeList={setAnimeList}/>
    </div>
  )
}

export default Content
