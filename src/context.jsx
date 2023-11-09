import React from "react";
import { useCallback, useContext, useEffect, useState} from "react";

const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
    const options = {
	    method: 'GET',
	    headers: {
		    'X-RapidAPI-Key': '3b5d4c36b8mshd5546e81fd09131p150cfdjsn8a485f973c61',
		    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	    }
    };
const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [gameList, setGameList] = useState([])

    const fetchGames = useCallback(async () => {
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
    })

    useEffect(() => {
        fetchGames()
    }, [])

    return <AppContext.Provider value={{gameList}}>{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider}