import { useEffect, useState, useRef, useCallback } from 'react'
import {useParams, Link} from 'react-router-dom'
import '../styles/game-details.css'
import Loading from './Loading'
import { FaArrowDown, FaArrowLeft, FaArrowUp, FaArrowRight } from 'react-icons/fa'
import { func } from 'prop-types'

export default function GameDetails()
{
    const {id} = useParams()
    const [loading, setLoading] = useState(false)
    const [game, setGame] = useState([])
    const [descriptionText, setDescriptionText] = useState('');
    const [descriptionTextToggle, setDescriptionTextToggle] = useState(false)
    const [screenshotNumber, setScreenshotNumber] = useState(3)
    const readMoreRef = useRef()
    const carouselRef = useRef()
    const btnNext = useRef()
    const btnPrev = useRef()
    const carouselIndicators = useRef()

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

    useEffect(() => {
      if(game.description){
            if(game.description.length > 900){
                setDescriptionText(game.description.slice(0, 900))
            }
            else {
                setDescriptionText(game.description)
            }  
        }    
        setDescriptionTextToggle(false)
        if(game.screenshots)
        setScreenshotNumber(game.screenshots.length)

        if(carouselIndicators.current)
            carouselIndicators.current.children[0].classList.add("active")

        if(carouselRef.current){
            Array.from(carouselRef.current.children).forEach((item, index) => {
                if(item.className == "slide"){
                    item.style.transform = `translateX(${index * 100}%)`
                }
            })

            let currSlide = 0
            btnNext.current.addEventListener("click", () => {
                changeNext()
            })

            const changeNext = () => {
                if(currSlide === screenshotNumber-1){
                    return
                }
                else {
                    currSlide++
                    changeActiveCarousel(currSlide)
                }
                Array.from(carouselRef.current.children).forEach((item, index) => {
                    if(item.className == "slide"){
                        item.style.transform = `translateX(${(index - currSlide) * 100}%)`
                    }
                })
            }

            btnPrev.current.addEventListener("click", () => {
                changePrev()
            })

            const changePrev = () => {
                if(currSlide === 0){
                    return
                }
                else {
                    currSlide--
                    changeActiveCarousel(currSlide)
                }
                Array.from(carouselRef.current.children).forEach((item, index) => {
                    if(item.className == "slide"){
                        item.style.transform = `translateX(${(index - currSlide) * 100}%)`
                    }
                })
            }

            const changeCarousel = (e) => {            
                    if(e.key === "ArrowLeft"){
                        changePrev()
                    }
                    else if(e.key === "ArrowRight"){
                        changeNext()
                    }         
            }

            document.addEventListener("keydown", changeCarousel)
            return function cleanup() {
                document.removeEventListener("keydown", changeCarousel)
            }
        }

        
    }, [game])

    const changeActiveCarousel = (currentIndex) => {
        if(carouselIndicators.current){
            Array.from(carouselIndicators.current.children).forEach((item, index) => {
                if(index === currentIndex){
                    item.className = 'active'
                }
                else {
                    item.className = ''
                }
            })
        }
    }

    

    const toggleDescription = () => {
        setDescriptionTextToggle(!descriptionTextToggle)
        !descriptionTextToggle ? setDescriptionText(game.description) : setDescriptionText(descriptionText.slice(0, 900))
    }

    const fadeOutText = () => {
        if(readMoreRef.current)
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
        description} = game;

    if(game.screenshots)
    return <div>

            <div className="game-details-container" onScroll={fadeOutText} style={{
            backgroundImage: `linear-gradient(to right, #161a1e 30%, #161a1e80), url(${screenshots[0].image})`
            }}>
                <div className="game-details-wrapper">
                    <Link to={`/`} className='back-to-home'><FaArrowLeft></FaArrowLeft>Back to home</Link>
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
                        <p>
                            {/* the ... would appear even though there was no show less/show more button so check both descriptionTextToggle state AND description text length*/}
                            {!descriptionTextToggle ? description.length > 900 ? descriptionText + "..." : descriptionText: descriptionText}
                            {description.length > 900 && <button className='description-show-more-btn' onClick={toggleDescription}>
                                {descriptionTextToggle ? 
                                 <span><FaArrowUp></FaArrowUp>show less</span>:
                                 <span><FaArrowDown></FaArrowDown>show more</span>}
                            </button>}
                        </p>
                    </div>
                    <p className="description-details bottom-description-details">
                        <span><b>Publisher:</b> {publisher}</span>
                        <span><b>Developer:</b> {developer}</span>
                    </p>
                </div>
                
                {screenshots.length > 0 &&
                <div className="carousel">
                    <h3>Screenshots:</h3>
                        <div className="slider" ref={carouselRef}>
                            {screenshots.toReversed().map((item) => {
                                return <div className="slide" key={item.id}>
                                    <img src={item.image} alt="screenshot" />
                                </div>
                            })}
                            <button className="carousel-btn btn-next" ref={btnNext}><FaArrowRight/></button>
                            <button className="carousel-btn btn-prev" ref={btnPrev}><FaArrowLeft/></button>
                        </div>
                        <div ref={carouselIndicators} className="carousel-indicators">
                            {screenshots.map((index) => {
                                return <span key={index.id}></span>
                            })}
                        </div>
                </div>}
                
                {sys_req &&
                <div className="system-requirements">
                    <h3>System requirements:</h3>
                    <ul>
                        <li><span>OS: </span>{sys_req.os}</li>
                        <li><span>Processor: </span>{sys_req.processor}</li>
                        <li><span>Memory: </span>{sys_req.memory} RAM</li>
                        <li><span>Graphics: </span>{sys_req.graphics}</li>
                        <li><span>Storage: </span>{sys_req.storage}</li>
                    </ul>
                </div>}
            </div>
        </div>
    
    }
}