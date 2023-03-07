import React, { useState, useEffect } from 'react';

//Requete
import { getCategories } from '../services';


//un carrousel d'éléments qui se défilent horizontalement. 
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { CategoryCard } from '../Components';


// Définir le nbr d'élements à afficher sur le carroussel selon le type de l'écran
const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 640 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  };


const HorizontalScrollingCategories = () => {
    const [CategoriesTable, setCategoriesTable] = useState([])
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        getCategories().then((result) => {
            setCategoriesTable(result);
          setDataLoaded(true); // une variable pour tester s'il y a des catégoires
        });
      }, []);




    //Fleche vers la gauche
    const customLeftArrow = (
      <div className="absolute arrow-btn left-0 text-center py-1 cursor-pointer bg-red-500 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </div>
      );

    //Fleche vers la droite
    const customRightArrow = (
        <div className="absolute arrow-btn right-0 text-center py-1 cursor-pointer bg-red-500 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      );
    

  return (
    <div className="mb-0.5">
        <Carousel infinite customLeftArrow={customLeftArrow} customRightArrow={customRightArrow} responsive={responsive} itemClass="px-4">
            {dataLoaded && CategoriesTable.map((category, index) => (
            <CategoryCard key={index} category={category} />
            ))}
        </Carousel>
    </div>
  )
}

export default HorizontalScrollingCategories
