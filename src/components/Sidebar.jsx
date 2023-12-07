import { useGlobalContext } from "../context"
import { useEffect, useRef, useState } from "react"
import { FaAngleDown, FaAngleUp, FaTimes } from 'react-icons/fa'
import '../styles/sidebar.css'

export default function Sidebar() 
{
    const {setCategoryList, setPlatform, isLoading, setSearchTerm, isCategoriesMenuVisible, setIsCategoriesMenuVisible} = useGlobalContext()
    //had to hard code the values because not all categories that exist inside the gameList object are valid categories for the API call
    const categoriesSite = "MMORPG, shooter, strategy, MOBA, racing, sports, sandbox, survival, turn-based, card, fighting, horror, action, tower-defense,social, open-world, PVP, PVE, pixel, voxel, zombie, first-person, third-Person, top-down, tank, space, sailing, side-scroller, superhero, permadeath, battle-royale, MMO, MMOFPS, MMOTPS, 3D, 2D, anime, fantasy, sci-fi, action-rpg,  military, martial-arts, flight, low-spec, MMORTS"
    const [isShortened, setIsShortened] = useState(false)
    const [categories, setCategories] = useState(categoriesSite.split(', ').slice(0, 13))
    const platforms = ['PC', 'Browser', 'All']
    const categoryRef = useRef()
    const platformRef = useRef()
    const sidebarCategoryRef = useRef()
    const sidebarRef = useRef()

    useEffect(() => {
        if(platformRef.current)
        platformRef.current.children[2].children[0].checked = true //make the platforms:"All" checked by default
    }, [isLoading])

    useEffect(() => {
        sidebarRef.current.classList.toggle('sidebar-visible')
    }, [isCategoriesMenuVisible])
    
    if(!isLoading){
    //iterate over categories and check which ones are checked
    const updateCheckedCategories = () => {
        let categoryArray = [];
        Array.from(categoryRef.current.children).map((item, index) => {
            if(item.children[0].checked){
                categoryArray.push(item.children[0].value.replace(' ', '-').toLowerCase())
            }
        })
         //we need a string of categories that looks like this: 'mmorpg.strategy.shooter' for the filter api
        setCategoryList(categoryArray.join('.'));
    }

    const toggleCategoryVisible = () => {
        setIsCategoriesMenuVisible(!isCategoriesMenuVisible)
    }

    const updateCheckedPlatforms = () => {
        Array.from(platformRef.current.children).map((item) => {
            if(item.children[0].checked){
                setPlatform(item.children[0].value.toLowerCase())
            }
        })
    }

    const clearFilters = () => {
        Array.from(categoryRef.current.children).map((item) => {
            if(item.children[0].checked){
                item.children[0].checked = false;
            }
        })
        Array.from(platformRef.current.children).map((item) => {
            if(item.children[0].value == "All"){
                item.children[0].checked = true
            }
        })
        setCategoryList("")
        setPlatform("all")
        setSearchTerm("")
    }

    const Capitalize = (item) => {
        return item.charAt(0).toUpperCase() + item.slice(1);
    }

    const toggleShowMore = () => {
        setIsShortened(!isShortened)
        isShortened ? setCategories(categories.slice(0, 13)) : setCategories(categoriesSite.split(', '))
        categoryRef.current.classList.toggle('show-more-animation')
    }

    
    return <div className="sidebar" ref={sidebarRef}>
        <div className="category-title">
            <h2>Categories</h2>
            <button className="btn" onClick={clearFilters}>Clear filters</button>
            <FaTimes className="close-category-menu" onClick={toggleCategoryVisible}></FaTimes>
        </div>
        
        <div className="category-wrapper" >
        <div className="category-animation-wrapper" ref={categoryRef}>
        {categories.map((item, index) => {
            return (
            <div className="sidebar-category" key={index}>
                <input onChange={updateCheckedCategories} type="checkbox" value={item} id={index}/>
                <label htmlFor={index}>{Capitalize(item)}</label>
            </div>
            )
        })}  
        </div>     
        </div>
        <a className="toggleCategories-btn" onClick={toggleShowMore}>
            {isShortened ? 
            <span><FaAngleUp/>show less</span> : 
            <span><FaAngleDown/>show more</span>}
        </a>

        <h2>Platforms</h2>
        <div className="platform-wrapper"  ref={platformRef}>
        {platforms.map((item, index) => {
            return <div className="sidebar-category" key={index}>
                <input onChange={updateCheckedPlatforms} type="radio" value={item} id={item} name='platform'/>
                <label htmlFor={item}>{item}</label>
            </div>
            
        })}
        </div>
    </div>
    }
}