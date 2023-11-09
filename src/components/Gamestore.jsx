import { useEffect, useState } from "react"
import Sidebar from "./Sidebar"
import Game from "./Game";

export default function Gamestore()
{
    const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3b5d4c36b8mshd5546e81fd09131p150cfdjsn8a485f973c61',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

    const [gameList, setGameList] = useState([])

    const fetchGames = async (url) => {
        try{
            const response = await fetch(url, options)
            const data = await response.json()
            if(data) {
                console.log(data)
                const gamesList = data.map((item) => {
                    const {id, title, platform, genre, thumbnail, short_description} = item
                    return {id, title, platform, genre, thumbnail, shortDesc:short_description}
                })
                setGameList(gamesList)     
            }
            else {
                setGameList([])
            }
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        fetchGames(url)
    }, [])

    return <div className="games-container">
        <Sidebar></Sidebar>

        <div className="games">
            <Game gameList={gameList}></Game>
        </div>
    </div>
}