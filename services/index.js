import { request, gql } from 'graphql-request'; //graph-request is graphql client 

//Créer un API
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT; 

//Une fonction pour afficher les PostCard
//une fonction anonyme, asynchrone pour  effectuer une requête réseau ou pour lire un fichier :
export const getPosts = async () =>
{
    const query = gql`
    query MyQuery {
        postsConnection(orderBy:createdAt_DESC) {
          edges {
            node {
              auteur {
                biographie
                nom
                id
                photo {
                  url
                }
              }
              createdAt
              vues
              lien
              titre
              extrait
              image {
                url
              }
              categories {
                nom
                lien
              }
            }
          }
        }
      }
    `;
    //await await attend que la promesse  ou request soit résolue avant de continuer à exécuter le code.
    const result = await request(graphqlAPI, query);

    return result.postsConnection.edges;

};

// Une requete pour récupérer des Posts mis en avant à afficher dans le carrousel
export const getFeaturedPosts = async () => {
  const query = gql`
    query QueryForFeaturedPosts() {
      posts(where: {featuredPost: true}) {
        auteur {
          nom
          photo {
            url
          }
        }
        image {
          url
        }
        titre
        lien
        createdAt
      }
    }   
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
};

//Une requete pour récupérer les Posts d'une catégorie
export const getPostsFromCategory = async (lien) => {
  const query = gql`
    query GetPostsFromCategory($lien: String!) {
      postsConnection(
        where: {categories_some: {lien: $lien}}
        orderBy: createdAt_DESC
        ) {
        edges {
          cursor
          node {
            auteur {
              biographie
              nom
              id
              photo {
                url
              }
            }
            createdAt
            vues
            lien
            titre
            extrait
            image {
              url
            }
            categories {
              nom
              lien
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { lien });

  return result.postsConnection.edges;
};


//Une requete pour la page PostDetail
export const getPostDetails = async (lien) =>{
    const query = gql`
    query queryPostDetails($lien: String!) {
      post(where: {lien: $lien}){
              auteur {
                biographie
                nom
                id
                photo {
                  url
                }
              }
              createdAt
              vues
              lien
              titre
              extrait
              image {
                url
              }
              categories {
                nom
                lien
              }
              contenu{
              raw  
              }
            }
          }
    `;
    //await await attend que la promesse  ou request soit résolue avant de continuer à exécuter le code.
    const result = await request(graphqlAPI, query, {lien});

    return result.post;
};




//Une fonction pour afficher les infos sur les PostWidget (dans l'accueil)
export const getRecentPost = async () =>
{
  //Request from GraphCMS
  const query = gql`
  query getPostDetails() 
  {
    posts(
      orderBy:createdAt_ASC
      last:3
    ) {
      titre
      image{url}
      createdAt
      lien
    }
  }
  `
   const result = await request(graphqlAPI, query);
   return result.posts;

};


//Une requete pour afficher les  Posts similaire dans le PostWidget (Dans PostDetail)
export const getSimilarPosts = async (categories, lien) =>
{
  //Request from GraphCMS
  const query = gql`
  query getPostDetails($lien: String!, $categories: [String!]) {
    posts(
      where: {lien_not: $lien, AND: {categories_some: {lien_in: $categories}}}
      last: 3
    ){
      titre
      image{url}
      createdAt
      lien
    }
  }
  `
   const result = await request(graphqlAPI, query, {categories, lien});
   return result.posts;
};

//Les catégories
export const getCategories = async() =>
{
  const query = gql`
    query get_list_of_categories {
      categories{
        nom
        lien
        image{url}
      }
    }
    `
    const result = await request(graphqlAPI, query);
    return result.categories;
};


export const envoyerCommentaire = async(commentOBJ) =>
{
  const result = await fetch('/api/Comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentOBJ),
  });

  return result.json();

};



export const getComments = async(lien) =>{
  const query = gql`
    query get_related_comments($lien: String!) {
      commentaires(where:{post: {lien:$lien}}) {
        nom
        createdAt
        contenu
      }
    }`;
    const result = await request(graphqlAPI, query, {lien});
    return result.commentaires;
};

//Une fonction pour modifier le nbr de vues d'un article
export const SendUpdatedPostViews = async(lien, updatedvues) =>{
console.log('Debut de fonction SendUpdatedPostViews');
  const result = await fetch('/api/Views', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({lien, updatedvues}),
  });
  console.log('Fin de fonction SendUpdatedPostViews');

  return result.json();
};