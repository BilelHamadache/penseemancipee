// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/**
 * Lorsque vous voulez envoyer des informations à GraphCMS, par exemple pour créer, mettre à jour
 *  ou supprimer des données, vous devez disposer des autorisations nécessaires pour accéder à l'API
 *  GraphCMS. Cela peut inclure l'identification en tant qu'utilisateur autorisé et la vérification 
 * des autorisations d'accès aux données spécifiques.
 * 
 * Pour effectuer ces opérations, vous devez inclure un jeton d'accès (access token) dans votre requête
 *  d'API. Le jeton d'accès est un jeton de sécurité qui contient des informations d'authentification 
 * pour identifier et autoriser un utilisateur ou une application à accéder à une API sécurisée. 
 * Le jeton doit être généré et fourni par GraphCMS pour l'utilisateur ou l'application en question.
 * 
 * D'un autre côté, lors de la récupération de données avec GraphQL, vous ne modifiez pas les données, 
 * vous ne pouvez donc pas accéder aux données protégées par le biais des requêtes GraphQL. 
 * Par conséquent, il n'est généralement pas nécessaire de fournir un jeton d'accès pour les requêtes 
 * GraphQL de lecture (à moins que les données soient restreintes à certains utilisateurs ou rôles). 
 * Cependant, vous devrez peut-être fournir des informations d'identification pour accéder aux données 
 * protégées dans votre base de données ou votre API en amont.

 */



/** *************************************************************
* Any file inside the folder pages/api is mapped to /api/* and  *
* will be treated as an API endpoint instead of a page.         *

* Un endpoint API dans Next.js est un point de terminaison qui permet de recevoir ou d'envoyer 
des données depuis ou vers une API (Application Programming Interface). 
Il est utilisé pour interagir avec une API externe et récupérer des données pour les afficher
dans l'application Next.js. 

Le processus de définition d'un endpoint API peut inclure la création de requêtes HTTP 
pour envoyer et recevoir des données, ainsi que la configuration de l'URL de l'endpoint API 
pour déterminer où les données sont envoyées et comment elles sont reçues.


dans ages/api/ on crée le backend de l'application pour interagir avec graphCMS
*************************************************************** */

//import type { NextApiRequest, NextApiResponse } from 'next'

import { GraphQLClient, gql } from 'graphql-request';
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphcmsToken = process.env.GRAPHCMS_TOKEN;


// créer un client 
export default async function Views (req, res){

  //console.log(graphcmsToken);

  const graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
      authorization: `Bearer ${graphcmsToken}`, //GRAPHCMS_TOKEN a été crée sur GRAPHCMS
    },
  });

  console.log('Mutation Request');

  //Créer la requete 'mutation' pour modifier le champs vue dans le modèle POST dans graphCMS dashboard
const UPDATE_POST_VIEWS_MUTATION = gql`
    mutation updatePostVues($lien: String!, $updatedvues: Int!) {
    updatePost(
      where: { lien: $lien }
      data: { vues: $updatedvues}
    ) {lien} 
    publishPost(where : {lien:$lien}) {
            titre
        }
    }`

  //Exécuter la requete en paramètre avce un autre paramètre = data
  try
  {
    console.log('Run API');
  const result = await graphQLClient.request(UPDATE_POST_VIEWS_MUTATION, req.body);
  return res.status(200).send(result);
  }
  catch(error)
  {console.log('error API');
  return res.status(200).send(500);
  }

}


