import React from "react";
import { useCallback, useContext, useEffect, useState} from "react";
    
const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [filteredGameList, setFilteredGameList] = useState([])
    const [isFiltered, setIsFiltered] = useState(false)
    const [categoryList, setCategoryList] = useState("")
    const [platform, setPlatform] = useState("all")
    const [isLoadingFilter, setIsLoadingFilter] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')

    const filterOptions = {
        method: 'GET',
    url: 'https://free-to-play-games-database.p.rapidapi.com/api/filter',
     params: {
        tag: categoryList,
        platform: platform
        },
     headers: {
        'X-RapidAPI-Key': '3b5d4c36b8mshd5546e81fd09131p150cfdjsn8a485f973c61',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }

    }

    const filterGames = useCallback(async () => {
        setIsFiltered(true)
        setIsLoadingFilter(true)
        try{
            let response
            if(categoryList.length > 0)
                response = await fetch(`${filterOptions.url}?tag=${filterOptions.params.tag}&platform=${filterOptions.params.platform}`, filterOptions)
            else 
                response = await fetch(`${filterOptions.url}?tag=mmorpg&platform=${filterOptions.params.platform}`, filterOptions)
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
        filterGames()
    }, [categoryList, platform])

    return <AppContext.Provider value={{filteredGameList,setFilteredGameList, isFiltered, setIsFiltered, categoryList, setCategoryList, platform, setPlatform, setIsLoadingFilter, isLoadingFilter, currentPage, setCurrentPage, lastPage, setLastPage, searchTerm, setSearchTerm}}>{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider}