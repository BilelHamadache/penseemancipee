import React from 'react';
import Head from 'next/head';
import { AiOutlineMail } from 'react-icons/ai';

const about = () => {
    const email = "bilelhamadache@gmail.com";
  return (
    <div>
        <Head>
        <title> à propos </title>
        </Head>

        <section className="text-gray-600 body-font">
            <div className="container px-5 py-12 mx-auto flex flex-col">
                <div className="lg:w-4/6 mx-auto">
                    {/*
                    <div className="rounded-lg h-64 overflow-hidden">
                        <img alt="content" className="object-cover object-top h-full w-full" src="hero.jpg" />
                    </div>
                    */}
                    <div className="flex flex-col sm:flex-row mt-1">
                        <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                            <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                                <img className='rounded-full' src="about.jpg" alt="about" />
                                    <circle cx="12" cy="7" r="4"></circle>
                            </div>
                            <div className="flex flex-col items-center text-center justify-center">
                                <h2 className="font-medium title-font mt-4 text-white text-lg">Bilel Hamadache</h2>
                                <div className="w-20 h-1 bg-teal-600 rounded mt-2 mb-4"></div>
                                <p className="text-base text-white">Enseignant chercheur au département d'informatique de l'université Badji Mokhtar d'Annaba- Algérie.</p>
                            
                                <h1 className="font-medium title-font mt-10 text-amber-500 text-sm">
                                <a href={`mailto:${email}`}>
                                    <AiOutlineMail />{email}
                                </a>
                                </h1>
                            </div>
                        </div>
                        <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                            <h2 className="font-medium title-font mt-4 text-white text-sm bg-teal-600 rounded inline-block">Intérêts de recherche </h2>
                            <div className="w-20 h-1 bg-amber-500 rounded mt-2 mb-4"/>
                            <p className="leading-relaxed text-teal-50 text-sm mb-4">
                            Data Mining
                            - Complex Networks
                            - Social Network Analysis & Mining
                            - Computational Social Networks, Collaboration Networks, social e-learning
                            - Web Based Communities, Learning Communities & Communities of Interest
                            - Machine Learning
                            - Community Detection
                            - Dynamic Social Networks
                            - Group Dynamics
                            - Underlying structures and pattern detection
                            - Semantic Communities
                            - Semantic Web
                            - Deep Learning: Graph Neural Network, Graph Convolutional Networks
                            - Recommender Systems
                            
                            </p>

                            <h2 className="font-medium title-font mt-4 text-white text-sm bg-teal-600 rounded inline-block">Aptitudes, qualités et développement </h2>
                            <div className="w-20 h-1 bg-amber-500 rounded mt-2 mb-4"/>
                            <p className="leading-relaxed text-teal-50 text-sm mb-4">

                            - Capacité à transmettre et partager le savoir. <br/>
                            - Aptitude à chercher de l'information, l'analyser et la synthéser, identifier pertinement et établir des liens entre différentes idées et concepts.<br/>
                            - Très bon sens d’organisation. Gestion rigoureuse et capacité d’adaptation. Respect des délais et capacité d’atteindre les objectifs dans le temps imparti. Autonmie et  capacité de travailler en équipe. <br/>
                            - Je suis admiratif de toute approche de travail méthodique, structurée et cohérentes alimentée par le sens d'honnêteté et de transparence. <br/>
                            - Solides connaissances en systèmes informatiques et gestion des bases de données. je m'intéresse aussi au 'content management system' (CMS). <br/>
                            - Je suis intéressé par les aspects de programmation en Java et notamment Python, par le développement d'application web avec HTML, PHP, Javascript, JSX, React et Next JS, Tailwind CSS, des application crossplatform (Flutter/Dart).<br/>
                            </p>


                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default about