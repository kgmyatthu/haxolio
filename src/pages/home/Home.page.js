import React from 'react'
import { ScrollIndicator } from '../../components/animations/anime.component'
import Footer from '../../components/footer/footer.component'
import Navigation from '../../components/nav/nav.component'
import Body from './body.component'

function Home() {
    return (
        <>
            <Navigation/>
            <ScrollIndicator/>
            <Body/>
            <Footer/>
        </>
    )
}

export default Home;
