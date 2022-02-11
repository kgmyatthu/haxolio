import React from 'react'
import { useEffect } from 'react'
import { ScrollIndicator } from '../../components/animations/anime.component'
import { WEBGL } from '../../utils/WebGL.js'
import Footer from '../../components/footer/footer.component'
import Navigation from '../../components/nav/nav.component'
import Body from './body.component'
import { useState } from 'react'
import { NoWebGL } from '../../components/handler/handler.component.js';

function Home() {
    let [couldGFX, setCouldGFX] = useState(true);
    useEffect(()=>{
        if(!WEBGL.isWebGLAvailable()){
           setCouldGFX(false); 
        }
    },[])
    if(!couldGFX){
        return <NoWebGL/>
    }
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
