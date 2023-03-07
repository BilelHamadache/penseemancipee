import React, {useRef, useState, useEffect} from 'react';
import { envoyerCommentaire } from '../services';

const FormulaireCommentaire = ({lien}) => {

  const [error, seterror] = useState(false); // pour gérer les champs vides
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);


  const commentEL = useRef(); // pour le champ commentaire
  const nomEL = useRef(); // pour le champs nom
  const emailEL = useRef(); // pour le champs email
  const storeDataEL = useRef(); // pour le checkbox 
  //const [formData, setFormData] = useState({ name: null, email: null, comment: null, storeData: false });


  useEffect(() => {
    nomEL.current.value = window.localStorage.getItem('nom'),
    emailEL.current.value = window.localStorage.getItem('email')
  })

  //Fonction pour traiter le commentaire
  const TraiterCommentaire = () => {
    seterror(false);

    //récupérer les champs dans des variables
    const {value: comment} = commentEL.current;
    const {value: nom} = nomEL.current;
    const {value: email} = emailEL.current;
    const {checked: storeData} = storeDataEL.current;

    //if(!commentEL.current.value || !nomEL.current.value || !emailEL.current.value)
    if( !comment|| !nom|| !email)
    {
      seterror(true);
      return;
    }
    const commentObj = {nom, email, comment, lien};

    //window  est un objet JavaScript qui représente  la fenêtre du navigateur
    if(storeData)
    {
      window.localStorage.setItem('nom', nom);
      window.localStorage.setItem('email', email);
    }
    else
    {
      window.localStorage.removeItem('nom');
      window.localStorage.removeItem('email');
    }

    envoyerCommentaire(commentObj)
    .then((res) => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });



  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Je commente</h3>
      
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea ref={commentEL} className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-blue-100 text-gray-700" 
        name="comment" 
        placeholder="Commentaire" 
        />
      </div>
      
      <div className="grid grid-cols-1 gap-4 mb-4">
        <input type="text" ref={nomEL} className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-blue-100 text-gray-700" placeholder="Nom" name="Nom" />
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <input type="email" ref={emailEL} className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-blue-100 text-gray-700" placeholder="Email" name="Email" />
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input type="checkbox" ref={storeDataEL} id="storeData" name="storeData" value="true" />
          <label className="text-black cursor-pointer" htmlFor="storeData"> Je conserve mon nom et email pour mon prochain commentaire</label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500"> Vous devez remplir tous les champs</p>}


      <div className="mt-8">
        <button 
          type="button" 
          onClick={TraiterCommentaire} 
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-red-500 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">
          Envoyer
        </button>
        {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Commentaire envoyé et en cours de traitement</span>}
      </div>

    </div>
  )
}

export default FormulaireCommentaire
