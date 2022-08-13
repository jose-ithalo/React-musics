
import './songs.css';

export default function ShowMusics({ img, title, text }) {

    return (
        <div className='musicCards'>
            <img className='music__img' src={img} alt='card music' />
            <h3 className='musicCards__title'>{title}</h3>
            <p className='musicCards__text'>{text}</p>

        </div>
    )


}

