import React, {useEffect, useState} from 'react'
import moment from 'moment'; //Pour afficher la date de création du Post
import Share from './Share';

import { NextSeo } from 'next-seo';

import { FaEye } from 'react-icons/fa';

//Traiter la mise à jour des vues
import { SendUpdatedPostViews, getVues } from '../services'; // Pour modifier le nbr de vues d'un Post
import { useRouter } from 'next/router';




const PostDetail = ({post}) => {

  const seo = {
    title: post.titre,
    description: post.extrait,
    openGraph: {
      title: post.titre,
      description:post.extrait,
      images: [
        {
          url: post.image.url,
        },
      ],
      site_name: 'pensée-émancipée',
    },
  };

  //Cette fonction pour afficher 'render' le contenu de l'article selon son propre format
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text; //variable pour stocker text

    //Si obj existe on transmet son format
    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }

      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>);
      }

      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>);
      }
    }

    switch (type) {
      case 'heading-three':
        return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'paragraph':
        return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
      case 'heading-four':
        return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case 'image':
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );

        case 'code-block': // Ajouter un cas pour le bloc de code
        return  ( <div className="bg-gray-300 p-4 rounded-md">
          <pre><code key={index}>{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</code></pre>
          </div>);

        case 'link':
        return (<a key={index} href={obj.data.uri}>
          {modifiedText}
          </a>);


  
        case 'ordered-list-item':
        return (<li key={index} className="list-decimal ml-8">
                {modifiedText.map((item, i) => (<React.Fragment key={i}>{item}</React.Fragment>))}
                </li>
              );
        
        case 'video':
        return (
          <div key={index} className="my-4">
            <iframe
              width="560"
              height="315"
              src={obj.src}
              title={obj.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        );

        default:
        return modifiedText;
    }
  };//Fin de la fonction


  //  le hook useEffect  pour appeler la fonction updatePostViews lorsque le composant PostDetail est monté
/*
  useEffect(() => {
  SendUpdatedPostViews(post.lien);
}), [];
*/

  const router = useRouter();
  const [isFetching, setIsFetching] = useState(false);
  const [updatedviews, setViews ] = useState(0); 


  const handlePostViewUpdate = async () => {
    console.log('La fonction handlePostViewUpdate--------')
    setIsFetching(true); // Mettre à jour l'état de récupération des données
    try {
      //const updatedviews = post.vues+1; 

      let currentViews = await getVues(post.lien);
      currentViews= currentViews+1;
      setViews(currentViews);

      await SendUpdatedPostViews(post.lien, currentViews); 
      await router.refresh(); // Actualiser la route pour récupérer les données mises à jour et les rendre côté serveur
    } catch (error) {
      console.log('erreur dans la fonction handlePostViewUpdate--------')
    } finally {
      setIsFetching(false); // Mettre à jour l'état de récupération des données à la fin de la requête
    }
  };


  useEffect(() => {
    // Appeler handlePostViewUpdate une seule fois au montage du composant
    handlePostViewUpdate();
  }, []);


  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
                              <NextSeo {...seo} />

      <div className="relative overflow-hidden shadow-md mb-6">
          <img 
          src={post.image.url} 
          alt={post.titre} 
          className="object-top h-full w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg" 
          />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8 w-full">
          <img
            src={post.auteur.photo.url}
            height="30px"
            width="30px"
            className='align-middle rounded-full' 
            />
          <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
            {post.auteur.nom}
          </p>

        
        <div className="font-medium text-gray-700 ml-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="align-middle">
              {moment(post.createdAt).format('DD MMM YYYY')}
            </span>
            <span className="ml-4 text-gray-800">
              <FaEye className="inline mr-2" />
               {updatedviews} Vues
           </span>
        </div>
        </div>
          <h1 className="mb-8 text-3xl font-semibold">{post.titre}</h1>
          <div style={{ 
            WebkitUserSelect: 'none', 
            MozUserSelect: 'none', 
            msUserSelect: 'none', 
            userSelect: 'none' 
            }}>
          {post.contenu.raw.children.map((typeObj, index) => { // c'est une fonction
            const children = typeObj.children.map((item, itemindex) => getContentFragment(itemindex, item.text, item));
            return getContentFragment(index, children, typeObj, typeObj.type);
          })}
          </div>
          <Share titrepost={post.titre}/>

        </div>
      </div>
  )
}

export default PostDetail
