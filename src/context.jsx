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
    const [filteredGameList, setFilteredGameList] = useState([])
    const [isFiltered, setIsFiltered] = useState(false)
    const [categoryList, setCategoryList] = useState("mmorpg")
    const [platform, setPlatform] = useState("all")
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingFilter, setIsLoadingFilter] = useState(false)

    const filterOptions = {
        method: 'GET',
    url: 'https://free-to-play-games-database.p.rapidapi.com/api/filter',
     params: {
        tag: categoryList.length > 0 ? categoryList : 'mmorpg',
        platform: platform
        },
     headers: {
        'X-RapidAPI-Key': '3b5d4c36b8mshd5546e81fd09131p150cfdjsn8a485f973c61',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }

    }

    const fetchGames = useCallback(async () => {
        setIsLoading(true)
        try{
            const response = await fetch(url, options)
            const data = await response.json()
            if(data.length > 0) {
                const gamesList = data.map((item) => {
                    const {id, title, platform, genre, thumbnail, short_description} = item
                    return {id, title, platform, genre, thumbnail, shortDesc:short_description}
                })
                setGameList(gamesList)
                setIsLoading(false)    
            }
            else {
                setGameList([])
                setIsLoading(false)
            }
        }
        catch(error){
            console.log(error)
        }
    })

    const filterGames = useCallback(async () => {
        setIsFiltered(true)
        setIsLoadingFilter(true)
        try{
            const response = await fetch(`${filterOptions.url}?tag=${filterOptions.params.tag}&platform=${filterOptions.params.platform}`, filterOptions)
            const data = await response.json()
            if(data.length > 0) {
                const gamesList = data.map((item) => {
                    const {id, title, platform, genre, thumbnail, short_description} = item
                    return {id, title, platform, genre, thumbnail, shortDesc:short_description}
                }) 
                setFilteredGameList(gamesList)     
                setIsLoadingFilter(false)
            }
            else {
                setFilteredGameList([])
                setIsLoadingFilter(false)
            }
        }
        catch(error){
            console.log(error)
        }
    })

    useEffect(() => {
        fetchGames()
    }, [])

    useEffect(() => {
        filterGames()
    }, [categoryList, platform])

    return <AppContext.Provider value={{gameList, filteredGameList, isFiltered, setCategoryList, setPlatform, isLoading, isLoadingFilter}}>{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider}