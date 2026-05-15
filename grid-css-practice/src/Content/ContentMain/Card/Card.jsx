import './Card.css'

function Card({ title, image, score, episodes }) {
  return (
    <article className="card">
      {image ? (
        <img className="card__image" src={image} alt={title} />
      ) : null}
      <div className="card__body">
        <h3 className="card__title">{title}</h3>
        <p className="card__meta">Score: {score ?? '—'}</p>
        <p className="card__meta">Episodes: {episodes ?? '—'}</p>
      </div>
    </article>
  )
}

export default Card
