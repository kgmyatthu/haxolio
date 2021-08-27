import React, { useEffect, useState } from 'react'
import styles from './blog.module.css'
import axios from 'axios'
import {ArticleOverview, IntroFixedCol} from '../../components/card/card.component'
import { DataNotFound } from '../../components/handler/handler.component'


import { CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg'
import Loading from '../../components/animations/loading.component'

export const ArticleLists = () => {
    let [articles, setArticles] = useState(undefined)
    let [paginator, setPaginator] = useState(null)

    const pagination_handler = (url) =>{
        setArticles(undefined); // to trigger loading screen
        axios.get(url)
        .then((res) => {
            setArticles(res.data.results);
            const buffer = {
                next: res.data.next,
                previous: res.data.previous,
                entries: res.data.count
            }
            setPaginator(buffer);
        })
    }

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            axios.get("http://localhost/blog/")
            .then((res) => {
                setArticles(res.data.results);
                const buffer = {
                    next: res.data.next,
                    previous: res.data.previous,
                    entries: res.data.count
                }
                setPaginator(buffer);
            })
            .catch((err)=>{
                console.log(err);
                setArticles(null);
            })
        }
        return () => {
            mounted = false;
        }
    }, [])

    useEffect(()=>{
        window.scrollTo(0,0);
    },[articles])

    if(articles === undefined){
        return <Loading/>
    }

    return (
        <IntroFixedCol>

            <div style={{maxWidth:"80%", display:"grid"}}>
                {   articles ? 
                    articles.map((item, index) => {    
                        return <ArticleOverview key={index} article={item}/> //donest have stable id
                    })
                    :
                    <></>
                }
            </div>

            {
                paginator ? 
                <div style={{display:"flex"}}>
                    {paginator.previous ? <button className={styles.button} onClick={()=>{pagination_handler(paginator.previous);}}><CgPlayTrackPrev size={20}/>PREV</button> : <></>}
                    {paginator.next ? <button className={styles.button} onClick={()=>{pagination_handler(paginator.next);}}>NEXT<CgPlayTrackNext size={20}/></button> : <></>}
                </div>
                :
                <></>
            }
        </IntroFixedCol>
    )
}

export const ArticleSearchResult = ({keyword}) =>{
    let [article, setArticle] = useState(undefined);
    useEffect(() => {
        axios.get(`http://localhost/blog/search/${keyword}`)
        .then((res) => {
            setArticle(res.data);
        })
        .catch((err)=>{
            console.log(err);
            setArticle(null);
        })
        return () => {
            
        }
    }, [])
    

    if(article === undefined){
        return <Loading/>
    }

    return (
        <>
        <IntroFixedCol>
            {article === null ? <DataNotFound/>: <></>}
            <div style={{maxWidth:"80%", display:"grid"}}>
                {   article ? 
                    article.map((item,index) => {    
                        return <ArticleOverview key={index} article={item}/>
                    })
                    :
                    <></>
                }
            </div>

        </IntroFixedCol>
        </>
    )
}


