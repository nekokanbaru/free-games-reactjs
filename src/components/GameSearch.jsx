import React from "react";
import { useGlobalContext } from "../context";
import { useRef, useState, useCallback, useEffect } from "react";
import { FaSearch } from 'react-icons/fa'

export default function GameSearch() {

    const {setFilteredGameList, platform, categoryList, setIsFiltered, searchTerm, setSearchTerm} = useGlobalContext()
    const searchInput = useRef()
    
    
    const searchGame = () => {
        setSearchTerm(searchInput.current.value)
    }

    useEffect(() => {
        searchInput.current.value = searchTerm
    }, [])

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

    const platformOptions = {
        method: 'GET',
        url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
        params: {platform: 'pc'},
        headers: {
          'X-RapidAPI-Key': '3b5d4c36b8mshd5546e81fd09131p150cfdjsn8a485f973c61',
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
      };

    const filterGames = useCallback(async () => {
        setIsFiltered(true)
        try{
            let response
            if(categoryList.length > 0){
                response = await fetch(`${filterOptions.url}?tag=${filterOptions.params.tag}&platform=${filterOptions.params.platform}`, filterOptions)}
            else{
                response = await fetch(`${platformOptions.url}?platform=${filterOptions.params.platform}`, platformOptions)
            }
            const data = await response.json()
            if(data.length > 0) {
                const gamesList = data.map((item) => {
                    const {id, title, platform, genre, thumbnail, short_description} = item
                    return {id, title, platform, genre, thumbnail, shortDesc:short_description}
                })
                if(searchTerm != ""){
                const searchResult = gamesList.filter((item) => 
                    item.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
                setFilteredGameList(searchResult)     
                }
                else {
                    setFilteredGameList(gamesList)
                }
            }
            else {
                setFilteredGameList([])
            }
        }
        catch(error){
            console.log(error)
        }
    })

    useEffect(() => {
        filterGames()
    }, [searchTerm])

    return <div className="game-search-container">
        <input type="text" className="game-search" onChange={searchGame} ref={searchInput} placeholder="search by title..."></input>
        <FaSearch className="game-search-icon"></FaSearch>
    </div>

}