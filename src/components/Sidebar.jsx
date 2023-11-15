import { useGlobalContext } from "../context"
import { useRef, useState } from "react";

export default function Sidebar() 
{
    const {gameList, handleSubmit, setCategoryList} = useGlobalContext()
    //had to hard code the values because not all categories that exist inside the gameList object are valid categories for the API call
    const categoriesSite = "mmorpg, shooter, strategy, moba, racing, sports, social, sandbox, open-world, survival, pvp, pve, pixel, voxel, zombie, turn-based, first-person, third-Person, top-down, tank, space, sailing, side-scroller, superhero, permadeath, card, battle-royale, mmo, mmofps, mmotps, 3d, 2d, anime, fantasy, sci-fi, fighting, action-rpg, action, military, martial-arts, flight, low-spec, tower-defense, horror, mmorts"
    const categories = categoriesSite.split(', ');
    const platforms = [...new Set(gameList.map((item) => item.platform.trim()))];
    const categoryRef = useRef()
    
    //iterate over categories and check which ones are checked
    const updateCheckedCategories = () => {
        let categoryArray = [];
        Array.from(categoryRef.current.children).map((item) => {
            if(item.children[0].checked){
                categoryArray.push(item.children[0].value.replace(' ', '-').toLowerCase())
                console.log(categoryArray)
            }
        })
         //we need a string of categories that looks like this: 'mmorpg.strategy.shooter' for the filter api
        setCategoryList(categoryArray.join('.'));
    }

    return <div className="sidebar">
        <h2>Categories</h2>
        
        <div className="category-wrapper" ref={categoryRef}>
        {categories.map((item) => {
            return <>
            <div className="sidebar-category">
                <input onChange={updateCheckedCategories} type="checkbox" value={item} id={item}/>
                <label htmlFor={item}>{item}</label>
            </div>
            </>
        })}
        </div>

        <h2>Platforms</h2>
        {platforms.map((item) => {
            return <>
            <div className="sidebar-category">
                <input type="checkbox" value={item} id={item} />
                <label htmlFor={item}>{item}</label>
            </div>
            </>
        })}
    </div>
}