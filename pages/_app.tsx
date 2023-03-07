
//notre importation ---------------
import React, {useEffect, useState} from 'react'; // des Hooks
//UseEffetc: pour effectuer une action à un moment donné du cycle de vie des composants


import { Layout } from '../Components';

import '../styles/globals.scss';

//importation par default
import type { AppProps } from 'next/app';

// pageProps affiche index.tsx
function MyApp({ Component, pageProps }: AppProps) {
  const [showFeaturedPosts, setShowFeaturedPosts] = useState(true);
  return (
    // ça représente le children de Layout
    <Layout setShowFeaturedPosts ={setShowFeaturedPosts}>
      <Component {...pageProps} showFeaturedPosts ={showFeaturedPosts}  /> 
    </Layout>
        

    )
}

export default MyApp
