import { useEffect, useState, useRef } from 'react'
import {useParams, Link} from 'react-router-dom'
import '../styles/game-details.css'
import Loading from './Loading'
import { FaArrowDown } from 'react-icons/fa'

export default function GameDetails()
{
    const {id} = useParams()
    const [loading, setLoading] = useState(false)
    const [game, setGame] = useState([])
    const readMoreRef = useRef()

    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3b5d4c36b8mshd5546e81fd09131p150cfdjsn8a485f973c61',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	    }
    };

    useEffect(() => {
        setLoading(true)
        async function getGame() {
            try {
                const response = await fetch(url, options)
                const data = await response.json()
                if(data){
                    console.log(data)
                    const {
                        title, 
                        thumbnail,
                        short_description: shortDesc,
                        screenshots,
                        release_date,
                        publisher,
                        platform,
                        minimum_system_requirements:sys_req,
                        genre,
                        game_url,
                        developer,
                        description
                    } = data
                    const newGame = {
                        title,
                        thumbnail,
                        shortDesc,
                        screenshots,
                        release_date,
                        publisher,
                        platform,
                        sys_req,
                        genre,
                        game_url,
                        developer,
                        description
                    } 
                    setGame(newGame)
                }
                else {
                    setGame([])
                }
            }
            catch(error) {
                console.log(error)
            }
            setLoading(false)
        }
        getGame()
    }, [id])

    useEffect(() => {
        window.addEventListener("scroll", fadeOutText)
    }, [])

    const fadeOutText = () => {
        if(readMoreRef)
        readMoreRef.current.style.opacity = 1 - (window.scrollY*0.005);
    }
    
    if(loading){
        return <Loading></Loading>
    }

    else{
    const {title,
        thumbnail,
        shortDesc,
        screenshots,
        release_date,
        publisher,
        platform,
        sys_req,
        genre,
        game_url,
        developer,
        description} = game
    
    if(game.screenshots)
    return <div >
            <div className="game-details-container" onScroll={fadeOutText} style={{
            backgroundImage: `linear-gradient(to right, #161a1e 30%, #161a1e80), url(${screenshots[0].image})`
            }}>
                <div className="game-details-wrapper">
                    <h1>{title}</h1>
                    <p className='game-details-desc'>{shortDesc}</p>
                    <button className='btn'><a href={game_url}>Visit game site</a></button>
                    <p className='game-details-platform'>Available on: <span>{platform}</span></p>
                </div>
                <p className='read-more' ref={readMoreRef}>read more<FaArrowDown></FaArrowDown></p>
            </div>

            <div className="game-more-details-wrapper">
                <div className="description-wrapper">
                    <p className="description-details">
                        <span><b>Genre: </b>{genre}</span>
                        <span><b>Release date: </b>{release_date}</span>
                    </p>
                    <div className="description">
                        <p>{description}</p>
                    </div>
                    <p className="description-details bottom-description-details">
                        <span><b>Publisher:</b> {publisher}</span>
                        <span><b>Developer:</b> {developer}</span>
                    </p>
                </div>

                <div className="carousel">
                    <img src={screenshots[2].image} alt={title} />
                </div>
            </div>
        </div>
   
    }
}