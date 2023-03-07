import React from 'react'
import { Header, Footer } from './'


const Layout = ({children, setShowFeaturedPosts}) => {
  return (
    
    <>
        <Header setShowFeaturedPosts= {setShowFeaturedPosts}/>
        {children}
        <Footer/>
    </>

  )
}

export default Layout
