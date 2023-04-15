import {React, useState, useEffect} from 'react';
import Link from 'next/link';
import { getCategories } from '../services';

const Categories = () => {

  const [categories, setCategories] = useState([]);

  useEffect(()=> {
    //getCategories().then((result) => setCategories(result));

    const fetchCategories = async () => {
      try {
        const result = await getCategories();
        setCategories(result);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, [])

  return (
    <div className="bg-teal-500 shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
      Catégories
      </h3>
      
      {
        categories.map((category) => 
        <div key={category.nom} className="flex items-center w-full mb-4">

          <div className="w-16 flex-none">
            <img className="align-middle rounded-full"
            alt={category.nom}
            src={category.image.url}
            height="60px"
            width="60px"
            />
          </div> 

          <Link key={category.lien} href={`/categorie/${category.lien}`} className="text-md">
            <span className={`cursor-pointer block  pb-3 mb-3 hover:text-red-500`}>
              {category.nom}
            </span>
          </Link>
        </div>
        )
      }

    </div>
  )
}

export default Categories
