import React from 'react';
import moment from 'moment';
//import Image from 'next/image';
import Link from 'next/link';


const CategoryCard = ({ category }) => (
  <div className="relative h-32 w-32">
    <div className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-32 w-32" style={{ backgroundImage: `url('${category.image.url}')` }} />
        <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-10 from-gray-400 via-gray-700 to-black w-full h-72" />
            <div className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full">
                <p className="text-white mb-4 text-shadow font-semibold text-l text-center">{category.nom}</p>
                <div className="flex items-center absolute bottom-5 w-full justify-center">
                </div>
            </div>
            <Link href={`/categorie/${category.lien}`}>
                <span className="cursor-pointer absolute w-full h-full"/>
            </Link>

        </div>
    
);

export default CategoryCard;