import { useGlobalContext } from "../context"
import { useRef, useState } from "react";

export default function Sidebar() 
{
    const {gameList, handleSubmit, setCategoryList, setPlatform} = useGlobalContext()
    //had to hard code the values because not all categories that exist inside the gameList object are valid categories for the API call
    const categoriesSite = "MMORPG, shooter, strategy, MOBA, racing, sports, social, sandbox, open-world, survival, PVP, PVE, pixel, voxel, zombie, turn-based, first-person, third-Person, top-down, tank, space, sailing, side-scroller, superhero, permadeath, card, battle-royale, MMO, MMOFPS, MMOTPS, 3D, 2D, anime, fantasy, sci-fi, fighting, action-rpg, action, military, martial-arts, flight, low-spec, tower-defense, horror, MMORTS"
    const categories = categoriesSite.split(', ');
    const platforms = ['PC', 'Browser', 'All']
    const categoryRef = useRef()
    const platformRef = useRef()
    
    //iterate over categories and check which ones are checked
    const updateCheckedCategories = () => {
        let categoryArray = [];
        Array.from(categoryRef.current.children).map((item) => {
            if(item.children[0].checked){
                categoryArray.push(item.children[0].value.replace(' ', '-').toLowerCase())
            }
        })
         //we need a string of categories that looks like this: 'mmorpg.strategy.shooter' for the filter api
        setCategoryList(categoryArray.join('.'));
    }

    const updateCheckedPlatforms = () => {
        Array.from(platformRef.current.children).map((item) => {
            if(item.children[0].checked){
                setPlatform(item.children[0].value.toLowerCase())
            }
        })
    }

    const Capitalize = (item) => {
        return item.charAt(0).toUpperCase() + item.slice(1);
    }

    return <div className="sidebar">
        <h2>Categories</h2>
        
        <div className="category-wrapper" ref={categoryRef}>
        {categories.map((item) => {
            return <>
            <div className="sidebar-category">
                <input onChange={updateCheckedCategories} type="checkbox" value={item} id={item}/>
                <label htmlFor={item}>{Capitalize(item)}</label>
            </div>
            </>
        })}
        </div>

        <h2>Platforms</h2>
        <div className="platform-wrapper"  ref={platformRef}>
        {platforms.map((item) => {
            return <>
            <div className="sidebar-category">
                <input onChange={updateCheckedPlatforms} type="radio" value={item} id={item} name='platform'/>
                <label htmlFor={item}>{item}</label>
            </div>
            </>
        })}
        </div>
    </div>
}