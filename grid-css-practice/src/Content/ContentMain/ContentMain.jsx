import './ContentMain.css'
import Card from './Card/Card.jsx'

function ContentMain({ animeList }) {
  const items = animeList?.data ?? []

  return (
    <div className="content-main">
      {items.map((element) => (
        <Card
          key={element.mal_id}
          title={element.titles?.[0]?.title ?? element.title}
          image={element.images?.jpg?.image_url}
          score={element.score}
          episodes={element.episodes}
        />
      ))}
    </div>
  )
}

export default ContentMain
