import React from 'react';
import {AiFillFacebook, AiFillLinkedin} from 'react-icons/ai'

const Footer = () => {
  return (
    <footer className='bg-gray-200 py-4 flex flex-wrap justify-center items-center mt-10'>
        <div className='text-gray-900'> 
          <span className='font-bold'> Pensée émancipée </span> | Copyright Ⓒ 2023
        </div>


          <a href="https://fr-fr.facebook.com/bilel.hamadache" target="_blank" rel="noopener noreferrer" >
            <AiFillFacebook className="w-6 h-6 mr-4" />
          </a>  

          <a href="https://www.linkedin.com/in/bilel-hamadache-96984973/" target="_blank" rel="noopener noreferrer">
            <AiFillLinkedin className="w-6 h-6 mr-4" />
          </a>    

            
    </footer>
  )
}

export default Footer