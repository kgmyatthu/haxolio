import React, { useState, useEffect } from 'react'
import styles from './card.module.css'
import  {IoPricetagsSharp}  from "react-icons/io5"
import {CgCalendarDates} from "react-icons/cg"
import {AiOutlineCaretRight} from "react-icons/ai"
import { Shuffler } from '../animations/anime.component'
import { Link } from 'react-router-dom'
import {FaGithub,FaFacebook,FaTwitter,FaLinkedin} from 'react-icons/fa';
import profile from '../../assets/img/profile3.jpg'
import axios from 'axios'
import Loading from '../animations/loading.component'
import Notfound from '../handler/handler.component'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const Tags = ({tag}) =>{
    return (
        <Link to={`/blog/search/${tag}`}>
            <Shuffler type="scroll">
                <small className={styles.hl}>{tag}</small> 
            </Shuffler>
        </Link>
    )
}



export const ArticleOverview = ({article}) => {
    const [obj, setObj] = useState(article)
    

    return (
        <div className={styles.post_sum}>
            <h3 className={styles.overview_title}>
                    <Link to={`/blog/${obj.unique_slug}`}>
                        {obj.title}
                    </Link>
                   
            </h3>
            <small className="text-muted">click on the title to read more about it</small>
            <div>
                <AiOutlineCaretRight/>
                &nbsp;
                <Shuffler type="scroll">
                    <Link to={`/blog/search/${obj.category}`}>
                        {obj.category}
                    </Link>
                </Shuffler>
            </div>

            {
                obj.tag[0] ? 
                    <div>
                        <IoPricetagsSharp/> 
                        &nbsp;
                        {obj.tag.map((tag, index)=>{
                            return <Tags key={index} tag={tag}/>
                        })}
                    </div>
                    :
                    <></>
            }
            <div>
                <CgCalendarDates/> 
                &nbsp;
                    <small className="text-muted">
                        <Shuffler type="scroll">
                            <span>{new Date(obj.updated_at).toDateString()}</span>
                        </Shuffler>
                    </small>

            </div>
        </div>
    )
}

export const IntroFixedCol = ({children}) =>{
    return (
        <>
            <div className={`container-fluid`}>
                <div className="row">
                    <div className={`col-md-12 col-lg-4`}>
                        
                    </div>
                    <div className={`col-md-12 col-lg-4 ${styles.min_height100} ${styles.flex_centers} ${styles.intro}`}>
                        <h1>BLOG</h1>
                        <div>
                            <img className="rounded" src={profile} alt="profile" style={{width:"40%"}}></img>
                            <Shuffler>
                                <div>_</div>
                                <h4>Thura Moe Myint</h4>
                                <span>Cyber Security Researcher</span>
                            </Shuffler>
                        </div>

                            <span className={styles.icons} style={{margin:"0.5rem"}}>
                                <a href="https://github.com/mgthuramoemyint" target="_blank" rel="noreferrer">
                                        <FaGithub size={20}/> @mgthuramoemyint
                                </a>
                            </span>
                            <span className={styles.icons} style={{margin:"0.5rem"}}>
                                <a href="https://www.facebook.com/mgthuraisgod/" target="_blank" rel="noreferrer">
                                        <FaFacebook size={20}/> @mgthuraisgod
                                </a>
                            </span>
                            <span className={styles.icons} style={{margin:"0.5rem"}}>
                                <a href="https://twitter.com/mgthuramoemyint" target="_blank" rel="noreferrer">
                                        <FaTwitter size={20}/> @mgthuramoemyint
                                </a>
                            </span>
                            <span className={styles.icons} style={{margin:"0.5rem"}}>
                                <a href="https://www.linkedin.com/in/mgthuramoemyint/" target="_blank" rel="noreferrer">
                                        <FaLinkedin size={20}/> @mgthuramoemyint
                                </a>
                            </span>

                    </div>
                    <div className={`col-md-12 col-lg-8 ${styles.min_height100}`}>
                        <div style={{height:"15vh"}}></div>
                        {children}
                    </div>
                        <div style={{height:"15vh"}}></div>
                </div>
            </div>
        </>
    )
}

export const ArticleDetail = ({slug}) =>{
    const [article,setArticle] = useState(undefined);

    useEffect(()=>{

        axios.get(`http://localhost/blog/${slug}`)
            .then((res)=>{
                console.log(res.data.title);
                setArticle(res.data);
            })
            .catch((err)=>{
                console.log(err);
                setArticle(null);
            })

    },[])

    useEffect(()=>{
        window.scrollTo(0,0);
    },[article])

    if(article === undefined){
        return (
            <Loading/>
        )
    }
    if(article === null){
        return (
            <Notfound/>
        )
    }

    return (
        <>
            <div className={`${styles.robotomono} white`}>
                <div className="text-center">
                    <h1 className={`${styles.underline} ${styles.oswald}`}>{article.title}</h1>
                    <div>
                        <AiOutlineCaretRight/>
                        &nbsp;
                        <Shuffler type="scroll">
                            <Link to={`/blog/category/${article.category}`} className={styles.green_link}>
                                {article.category}
                            </Link>
                        </Shuffler>
                    </div>

                    {
                        article.tag[0] ? 
                        <div>
                                <IoPricetagsSharp/> 
                                &nbsp;
                                {article.tag.map((tag,index)=>{
                                    return <Tags key={index} tag={tag}/>
                                })}
                            </div>
                            :
                            <></>
                        }
                    <div>
                        <CgCalendarDates/> 
                        &nbsp;
                            <small className="text-muted">
                                <Shuffler type="scroll">
                                    <span>{new Date(article.updated_at).toDateString()}</span>
                                </Shuffler>
                            </small>

                    </div>
                </div>
                <div style={{height:"15vh"}}></div>
                <ReactMarkdown  className={styles.markdown}
                                children={article.markdown}
                                remarkPlugins={[remarkGfm]}
                />

            </div>
        </>
    )
}


