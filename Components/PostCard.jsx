import React from 'react';

import moment from 'moment'; //Pour afficher la date de création du Post
import Link from 'next/link';

//const post =[];
// post= post.node
const PostCard = ({post}) => {
  console.log(post);
  return (
    <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md pb-80 mb-6">
        <img
        src={post.image.url} 
        alt={post.titre}
        className="object-top absolute h-80 w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg"
        />
      </div>

      <h1 className="transition duration-200 text-center mb-8 cursor-pointer hover:text-red-500 text-3xl font-semibold">
        <Link href={`/post/${post.lien}`}>
          {post.titre}
        </Link>
      </h1>

      <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
        <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8 items-center">
          <img
          src={post.auteur.photo.url}
          height="30px"
          width="30px"
          className='align-middle rounded-full' 
          />
          <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
            {post.auteur.nom}
          </p>
        </div>

        <div className="font-medium text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>
              {moment(post.createdAt).format('DD MMM YYYY')}
            </span>
        </div>
      </div>

      
      
      <p className="text-center text-lg font-normal px-4 lg:px-20 mb-8">
          {post.extrait}
          <Link href={`/post/${post.lien}`}>
            <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-red-600 text-lg font-medium rounded-full text-white px-5 py-1 cursor-pointer"> 
            Lire plus
            </span>
          </Link>
      </p>

      

    </div>
  )
}

export default PostCard
