import { Props } from 'html-react-parser/lib/attributes-to-props';
import type { NextPage } from 'next';

import Head from 'next/head';
import {HorizontalScrollingPosts, HorizontalScrollingCategories} from '../sections';
import {PostWidget, PostCard, Categories} from '../Components';

//Requete qui récupère des posts
import {getPosts} from '../services';
import { getRecentPost } from '../services';



//Home: Une composante Next.js
//function Home ({posts}) {


// defining the shape of the props object that we expect to receive. It is an array of Posts with any type.
const Home: NextPage <{ posts: any[]; showFeaturedPosts: boolean }> = ({posts, showFeaturedPosts}) => {
  return (
    //className vient du Tailwind css
    <div className="container mx-auto px-10 mb-8">  
      <Head>
        <title> Pensée émancipée </title>
        <link rel="icon" href="/icone2.png" />
      </Head>

      
      {showFeaturedPosts && ( <HorizontalScrollingPosts/>)}


      {/*div pour le contenu*/}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>

        {/*div pour liste vertivale des PostCards*/}
        <div className='lg:col-span-8 col-span-1'>
          {posts.map((post) => <PostCard post={post.node} key={post.titre}/> )}
        </div>

        {/*div pour la liste verticale ( à droite) + PostWidget et Catégories (à droite) */}
        <div className='lg: col-span-4 col-span-1'>

          {/*div pour la liste PostWidget à droite */}
          <div className='lg:sticky relatve top-8'>
            <PostWidget lien={''} categories={''}/>
            <Categories/>
          </div> 

        </div>

      </div>

     
    </div>
    
  )

}

// Reécupérer des données sur Next.js avce la fonction getStaticProps
//La fonction getStaticProps renvoie un objet qui contient une propriété props
// Elle permet de charger les données à partir d'une API lors du chargement d'unepage coté serveur
export async function getStaticProps ()
{
  //Récupérer les Posts sinon rien
  const posts =  (await getPosts())|| [];
  return { 
        //Props utilisés par des frameworks basés sur React (Next.js) pour charger les données coté serveur dans un composant
    props:{posts},
    revalidate: 10
  };
}

export default Home
