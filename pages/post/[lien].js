import React, {useEffect} from 'react';
import {getPostDetails, getPosts, SendUpdatedPostViews} from '../../services'; //pour les requetse

import {PostWidget, Categories, Auteur, PostDetail, FormulaireCommentaire, Commentaires, Loader} from '../../Components'; // Pour les composantes 
import { useRouter } from 'next/router';


const PageArticle = ({post}) => {
    console.log(post)
//Pour afficher les nouveau post meme aprés le déployement
    const  router = useRouter();
    if (router.isFallback) {
      return <Loader />;
    }
    


  return (
  
    <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="col-span-1 lg:col-span-8">
                <PostDetail post = {post} />
                <Auteur auteur = {post.auteur}/>
                <FormulaireCommentaire lien = {post.lien}/>
                <Commentaires lien = {post.lien}/>
            </div>
            <div className="col-span-1 lg:col-span-4">
                <div className="relative lg:sticky top-8">
                    <PostWidget lien={post.lien} categories = {post.categories.map((category)=> category.lien)}/>
                    <Categories />
                </div>
            </div>
        </div>
    </div>

  )
}

export default PageArticle


//cette fonction génère tous les chemins statiques lors du chargement de la page

export async function getStaticProps ({params})
{const data =  await getPostDetails(params.lien);
      //Récupérer le Post à afficher en détail 
  return {//Props utilisés par des frameworks basés sur React (Next.js) pour charger les données coté serveur dans un composant
    props:{post: data},
    revalidate: 1, 

  };
}

export async function getStaticPaths ()
{
    const posts = await getPosts();
    const paths = posts.map(({node:{lien}}) => ({params:{lien}}));
    return{paths,fallback:true,}; // true pour activer le rendu côté serveur pour les pages non générées statiquement
}




