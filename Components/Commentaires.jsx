import React, {useState, useEffect} from 'react';
import moment from 'moment';
import parse from 'html-react-parser'; //convertir une chaîne de caractères HTML en éléments React

import { getComments } from '../services';

const Commentaires = ({lien}) => {

  const [comments, setComments ] = useState([]); 


  useEffect(() => {
    getComments(lien).then((result) => {setComments(result)}); 
    // on stocke les commentaires dans le state comments avec la méthode seComments
  }, []); 
  /*Le tableau vide [] indique que l'effet sera exécuté qu'ne seule fois aprés le premier rendu.
   C'est à dire charger les commentaires une fois lors du premier affichage de la page.
  */
  
     // on affiche les commentaire sauf si'l y en a
  return (
    <>
      {comments.length > 0 && (
      <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
        <h3 className="text-xl mb-8 font-semibold border-b pb-4">
          {comments.length}
          {' '}
          Commentaires 
        </h3>
        {comments.map((comment, index) => (
            <div key={index} className="border-b border-gray-100 mb-4 pb-4">
              <p className="mb-4">
                <span className="font-semibold">{comment.nom}</span>
                {' '}
                à
                {' '}
                {moment(comment.createdAt).format('DD MMM YYYY')}
              </p>
              <p className="whitespace-pre-line text-gray-600 w-full">{parse(comment.contenu)}</p>
             </div>  
        ))}


      </div>
      )}
    </>
  );
};

export default Commentaires
