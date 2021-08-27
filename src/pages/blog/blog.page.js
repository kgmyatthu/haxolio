import React, { useEffect } from 'react'
import Navigation from "../../components/nav/nav.component";
import {ArticleLists, ArticleSearchResult} from "./body.component.js";
import {ArticleDetail, IntroFixedCol} from '../../components/card/card.component';
import styles from './blog.module.css';
import { useParams } from 'react-router';
import { ScrollIndicator } from '../../components/animations/anime.component';
import Footer from '../../components/footer/footer.component';


const Blog = () => {
    
    return (
        <>
            <div className={`${styles.bgblack}`}>
                <Navigation/>
                <ScrollIndicator/>
                <ArticleLists/>
                <Footer/>
            </div>
        </>
    )
}
export default Blog;



export const Article = () => {
    const { slug } = useParams();
    useEffect(()=>{ 
        console.log(slug);
    },[])
    return (
        <>
            <div className={`${styles.bgblack}`}>
                <Navigation/>
                <ScrollIndicator/>
                <IntroFixedCol>
                    <ArticleDetail slug={slug}/>
                </IntroFixedCol>
                <Footer/>
            </div>
        </>
    )
}

export const BlogResult = () =>{
    const {keyword} = useParams();
    return (
        <>
            <div className={`${styles.bgblack}`}>
                <Navigation/>
                <ScrollIndicator/>
                <ArticleSearchResult keyword={keyword}/>
                <Footer/>
            </div>
        </>
    )
}

