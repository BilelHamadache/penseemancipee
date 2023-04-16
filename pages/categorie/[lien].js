import React from 'react';
import { useState, useEffect} from 'react';


import { PostCard, Categories, Loader } from '../../Components';

//les requetes
import { getCategories, getPostsFromCategory } from '../../services';

//Pour acceder aux infos de routage
import { useRouter } from 'next/router';


const PageCategorie  = ({posts}) => {

    const  router = useRouter();
    //Si la page est en cours de chargement
    if (router.isFallback) {
      return <Loader/>; // renvoyer la page Loader à l'utilisateur 
    }

    // Déclarer un état local pour les données des posts
const [postsdata, setPostsData] = useState(posts);
// Utiliser useEffect pour appeler getPosts lorsque les données des posts sont mises à jour
const fetchPosts = async () => {
  try {
    const response = await getPostsFromCategory(router.query.lien);
    setPostsData(response); // Mettre à jour les données des posts dans l'état local
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  }
};
useEffect(() => {
  fetchPosts();
}, []); // Utiliser un tableau vide en tant que dépendances pour s'assurer que cela ne se produit qu'une seule fois au montage


  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {postsdata.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageCategorie


//cette fonction génère tous les chemins statiques lors du chargement de la page
export async function getStaticProps({ params }) {
    const posts = await getPostsFromCategory(params.lien);
    return {
      props: { posts }, // posts c'est le parametre dans PageCategorie
      revalidate :1,

    };
  }
  
  // Récupérer les catégories et envoyer leur lien vers paths sous form params {lien}
  export async function getStaticPaths() {
    const categories = await getCategories();
    return {
      paths: categories.map(({ lien }) => ({ params: { lien } })),
      fallback: true,
    };
  }
