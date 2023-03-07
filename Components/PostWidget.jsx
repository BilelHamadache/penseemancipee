import React, {useState, useEffect} from 'react'

import moment from 'moment'; //Pour afficher la date de création du Post
import Link from 'next/link';

import { getRecentPost, getSimilarPosts} from '../services';


//PostWidget sera appellé à plusieurs fois: 1) dans home page: pour Recent Articles
//2) dans la page de l'artcile pour Related Articles

const PostWidget = ({lien, categories}) => {
  //Variable état relatedPost initialisée par [] et qui sera modifé par la fonction setrelatedPost
  const [relatedPosts, setRelatedPosts] = useState([]);
  

  //UseEffect pour mettre à jour le composant en fonction des changements de certaines variables d'état ou de props
  useEffect(() => {
    if (lien) { // Code à exécuter lorsque le composant est monté
      // Similar artical d'un article sépcéfique
      getSimilarPosts(categories,lien).then((result) =>{setRelatedPosts(result);});
    }
    //Simple recents articles
    else{getRecentPost().then((result) => {setRelatedPosts(result);});
    }
  }, [lien]);

  console.log(relatedPosts)
  
  return (
    <div className="bg-amber-500 shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {//s'il y a un lien ne paramètre 
        lien ? 'Related Posts' : 'Derniers articles'}  
      </h3>
      {
        relatedPosts.map((post) => 
        <div key={post.titre} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <img className="align-middle rounded-full"
            alt={post.titre}
            src={post.image.url}
            height="60px"
            width="60px"
            />
          </div> 
          <div className="flex-grow ml-4">
            <p className="text-black font-xs">{moment(post.createdAt).format('DD MMM, YYYY')}</p>
            <Link href={`/post/${post.lien}`} className="text-md font-semibold hover:text-red-600">{post.titre}</Link>
            
          </div> 
        </div>
        )
      }


    </div>

  )
}

export default PostWidget

