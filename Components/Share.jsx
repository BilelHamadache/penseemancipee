import {React, useState} from 'react';
import { FaFacebookSquare, FaLinkedin, FaInstagram, FaTwitter, FaFacebookMessenger, FaPinterest, FaWhatsapp } from 'react-icons/fa';
import{FaFacebook, FaFacebookF} from 'react-icons/fa';

const Share = ({titrepost}) => {
    
    const [selectedNetwork, setSelectedNetwork] = useState('');

    //const shareUrl = window.location.href;
    const titre = 'Titre de mon article';
  
    //Fonction qui se déclenche lors en cliquant sur le bouton
    const handleClick = (selectedNetwork) => {
        setSelectedNetwork(selectedNetwork)
        if (typeof window !== 'undefined') 
        {        
            switch (selectedNetwork) 
        {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(titre)}`, '_blank');
                break;
            case 'twitter':
              window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(titre)}`, '_blank');
              break;
            case 'linkedin':
              window.open(`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(titre)}`, '_blank');
              break;
            case 'messenger':
              window.open(`fb-messenger://share/?link=${encodeURIComponent(window.location.href)}`, '_blank');
              break;

            case 'pinterest':
                window.open(`https://pinterest.com/pin/create/bookmarklet/?url=${encodeURIComponent(window.location.href)}&description=${encodeURIComponent(titre)}`, '_blank');
                break;
            
            case 'whatsapp':
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${titre} ${window.location.href}`)}`, '_blank');
                break;
            
            default:
                return;
        }
        }
    };

    //Le rendu de ce composant est un bouton icone 
    return (
    <div>
      <button onClick={() => handleClick('facebook')}>
        <FaFacebookSquare className="w-8 h-8" style={{ color: '#1877f2' }} />
      </button>

        <button onClick={() => handleClick('linkedin')}>
            <FaLinkedin className="w-8 h-8" style={{ color: '#0072b1' }} />
        </button>

        <button onClick={() => handleClick('twitter')}>
            <FaTwitter className="w-8 h-8" style={{ color: '#1DA1F2' }} />
        </button>

        <button onClick={() => handleClick('pinterest')}>
            <FaPinterest className="w-8 h-8" style={{ color: '#BD081C' }} />
        </button>

        <button onClick={() => handleClick('messenger')}>
            <FaFacebookMessenger className="w-8 h-8" style={{ color: '#0084FF' }} />
        </button>

        <button onClick={() => handleClick('whatsapp')}>
            <FaWhatsapp className="w-8 h-8" style={{ color: '#25D366' }} />
        </button>

     </div>

    
    );
  };

export default Share
