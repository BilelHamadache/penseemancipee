import {React, useState, useEffect} from 'react';
import Link from 'next/link';
import Categories from './Categories';

import { getCategories } from '../services';

import { HorizontalScrollingCategories } from '../sections';

import {AiFillFacebook, AiFillLinkedin} from 'react-icons/ai';

import{FaFacebook, FaLinkedin} from 'react-icons/fa';
import {FiMenu} from 'react-icons/fi'


//const list_categories = [{name: 'React', slug: 'react'}, {name:'Sport', slug: 'sport'}]; 

//Barre de navigation : Nom du blog, liste des catégories
const Header = ({setShowFeaturedPosts}) => {

    // Un State pour afficher ou non Le nav 
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);



    const handleNavToggle = () => {
        setIsNavOpen(!isNavOpen);
      };

      useEffect(() => {
        const handleResize = () => {
          setIsSmallScreen(window.innerWidth <= 768);
          setIsNavOpen(false);
        };
        window.addEventListener('resize', handleResize);
    
        // nettoyage du listener lorsqu'on démonte le composant
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);





    //Les catégories
    /*
    const [list_categories, setCategories] = useState([]);
    useEffect(()=> {
      getCategories().then((result) => setCategories(result));
    }, [])
    */

  return (
    //mx-auto: Centrer le container, horizontal padding px-10 
    <div className='container mx-auto px-10 mb-8'>
        <div className='border-b w-full inline-block border-blue-400 py-10 mt-1'>
        {/*border-b = bottom, w-full = width à 100, Border-blue = couleur de la bordure %*/}

            {/* <div className='mf: float-left block'>
                {/*Component link qui porte le nom du blog psoitionné à gauche
                </div> */}
            {/*
            <div className='hidden md:float-left md:contents'>
                {list_categories.map((categorie) => (
                <Link key={categorie.lien} href= {`/categorie/${categorie.lien}`}>
                    <span className='md: float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer'>
                        {categorie.nom}
                    </span>
                </Link>)
                )}       
            </div>
            */}


            <nav className="bg-blue-700 bg-opacity-70 shadow-md py-4 rounded-lg flex flex-col md:flex-row md:items-center">
                <div className="container mx-auto px-4 flex justify-between items-center ">
                    <div className="flex items-center">
                        <Link href="/" onClick={() => setShowFeaturedPosts(true)}>
                            <img class="h-30 w-40" src="/logo6.png" alt="Logo" />
                        </Link>
                    </div>

                    {/* Icone pour cacher le menu de navigation*/}
                    <div className='md:hidden'>
                    <button className='text-gray-300 hover:text-white focus:outline-none'onClick={handleNavToggle}>
                        <FiMenu className='block w-6 h-6'/>
                    </button>
                    </div>



                    {/* Menu de navigation*/}
                    <div className={`md:flex items-center ${isNavOpen && isSmallScreen ? 'block' : 'hidden'}`}>

                        <ul className="md:flex md:items-center">
                            <li>
                            <Link href="/" onClick={() => setShowFeaturedPosts(true)}>
                                <span className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-l font-medium">Accueil</span>
                            </Link>
                            </li>
                            
                            <li>
                            <Link href="/" onClick={() => setShowFeaturedPosts(false)}>
                                <span className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-l font-medium">Articles</span>
                            </Link>
                            </li>
                        
                            <li>
                            <Link href="/about">
                                <span className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-l font-medium">À propos</span>
                            </Link>
                            </li>
                        </ul>
                    </div>

                    {/*<div className="hidden md:block">*/}
                    <div className={`md:flex items-center ${isNavOpen && isSmallScreen ? 'block' : 'hidden'}`}>                     
                        <a href="https://www.linkedin.com/in/bilel-hamadache-96984973/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="w-6 h-6 mr-4" style={{ color: '#fff' }} />
                        </a>    
                        <a href="https://fr-fr.facebook.com/bilel.hamadache" target="_blank" rel="noopener noreferrer" >
                            <FaFacebook className="w-6 h-6 mr-4" style={{ color: '#fff' }} />
                        </a> 
                    </div>

                    

                        {/*Contact us
                            <Link href="/a-propos">
                            <span className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-l font-medium">Contact Us</span>
                        </Link>
                        */
                        }
                        {/* bouton Se connecter
                        <div className="hidden md:block">
                        <a href="#" className="inline-block py-2 px-4 text-gray-300 hover:text-white border border-gray-300 hover:border-white rounded transition duration-300 ease-in-out text-sm font-medium">Se connecter</a>
                        </div>
                            */}
                </div>
            </nav>
        </div>
        <HorizontalScrollingCategories/>

    </div>
  )
}

export default Header
