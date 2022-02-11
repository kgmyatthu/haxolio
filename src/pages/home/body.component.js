import React, { useRef, useEffect, useState } from 'react'
import gfx from './gfx.js';
import styles from './home.module.css';
import {Shuffler} from '../../components/animations/anime.component.js';
import {FaFacebook, FaPhone} from 'react-icons/fa';
import {CgMail} from 'react-icons/cg';
import imagesLoaded from 'imagesloaded';
//load images
import profile_img from '../../assets/img/profile.jpg';
import profile_img2 from '../../assets/img/profile2.jpeg';
import django from '../../assets/img/logos/django.png';
import nodejs from '../../assets/img/logos/nodejs.png';
import linux from '../../assets/img/logos/archlinux.png';
import reactjs from '../../assets/img/logos/reactjs.png';
import Loading from '../../components/animations/loading.component.js';

const Body = () => {
    let canvas = useRef(null);
    let contact = useRef(null);
    let imgs = useRef([]);
    let [loading, setLoading] = useState(true);


    
    useEffect(() => {
        let gfx_effects;

        if(canvas.current){
            gfx_effects = new gfx({
                dom: canvas.current,
                img: imgs.current,
                contact: contact.current,
            })

            imagesLoaded(imgs.current , ()=>{
                setLoading(false);
            });

        }
    
        return () => {
            gfx_effects.destroy();
            gfx_effects = {};
            console.log("cleaned up");
        }
    }, [])


    return (
        <>
            {loading ? <Loading/> : <></>}
            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className={[styles.fullvh, styles.intro_left, "col-sm-6",styles.intro].join(" ")}>
                            <div className={styles.intro_childs}>
                                <img ref={(el) => {
                                    imgs.current = [...imgs.current, el];
                                }} 
                                src={profile_img} 
                                alt="generic"
                                data-shader = "generic"
                                style={{width: "80%"}}
                                className={styles.img}/>
                                <Shuffler type="scroll">
                                    <span className={styles.meta}>December 28th, 2019</span>
                                </Shuffler>
                            </div>
                        </div>
                        <div className={[styles.fullvh, styles.intro_right, "col-sm-6",styles.intro].join(" ")}>
                            <div className={styles.intro_childs}>
                                <Shuffler type="hover">
                                    <small>My name is</small>
                                    <h1>Kaung Myat Thu</h1>
                                    <div>I'm a Software Engineer</div>    
                                    <div>and a Computer Science Ethusiast</div>
                                </Shuffler>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className={[styles.fullvh, styles.intro_left, "col-sm-6",styles.intro].join(" ")}>
                            <div className={styles.intro_childs}>
                                    <small>I do</small>
                                
                                    <h1>BUILD THINGS FOR <Shuffler type="hover"><span>WEB</span></Shuffler></h1>
                                
                                    <p>
                                        
                                        I entered the world of computer science in 2016.
                                        Hi my name's Kaung Myat Thu.
                                            
                                        I'm a <span className={styles.highlight}>software engineer</span> , web developer, ctf player, and a gamer. 
                                        I'm espcially interested in 

                                            <span> Web Engineering, System Programming, and Cyber security</span>

                                    </p>
                            </div>
                        </div>
                        <div className={[styles.fullvh, styles.intro_right, "col-sm-6",styles.intro].join(" ")}>
                            <div className={[styles.align_right, styles.intro_childs].join(" ")}>
                                <img ref={(el) => {
                                    imgs.current = [...imgs.current, el];
                                }} 
                                src={profile_img2} 
                                alt="glitch"
                                data-shader = "glitch"
                                style={{width: "65%"}}
                                className={styles.img}>
                                </img>
                                <Shuffler type="scroll">
                                    <span className={styles.meta}>June 29th, 2020</span>
                                </Shuffler>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className={[styles.fullvh, styles.col_left, "col-md-6 col-lg-4",styles.col].join(" ")}>
                        <div className={styles.col_childs}>
                            <h3 className={styles.border_bottom}>Primary Tech Stack</h3>
                               Node.js, Django, React, Express, AWS, Linux, THREE.js, Postgresql, JS, Python
                            <h3 className={styles.border_bottom}>Education</h3>
                            <div className={styles.onhover}>University Of Computer Studies (Kyaing Tong)</div>
                            <div className={styles.onhover}>Diploma in Cyber Security (current) </div>
                        </div>
                    </div>
                    <div className={[styles.fullvh, styles.col_right, "col-md-6 col-lg-8",styles.col].join(" ")}>
                        <div className={[styles.col_childs].join(" ")}>
                            <div className={["row",styles.logo_margins].join(" ")}>
                                <div className="col-md-6 col-lg-6">
                                    <img ref={(el) => {
                                        imgs.current = [...imgs.current, el];
                                    }} 
                                    src={nodejs} 
                                    alt="glitch"
                                    data-shader = "glitch"
                                    style={{width: "85%"}}
                                    className={styles.img}/>
                                    <Shuffler type="scroll">
                                        <small className={styles.meta}>node.js</small>
                                    </Shuffler>
                                </div>

                                <div className="col-md-6 col-lg-6">
                                    <img ref={(el) => {
                                        imgs.current = [...imgs.current, el];
                                    }} 
                                    src={linux} 
                                    alt="glitch"
                                    data-shader = "ascii"
                                    style={{width: "85%"}}
                                    className={styles.img}/>
                                    <Shuffler type="scroll">
                                        <small className={styles.meta}>linux</small>
                                    </Shuffler>
                                </div>
                            </div>
                            <div className={["row",styles.logo_margins].join(" ")}>
                                <div className="col-md-6 col-lg-6">
                                    <img ref={(el) => {
                                        imgs.current = [...imgs.current, el];
                                    }} 
                                    src={django} 
                                    alt="glitch"
                                    data-shader = "ascii"
                                    style={{width: "85%"}}
                                    className={styles.img}/>
                                    <Shuffler type="scroll">
                                        <small className={styles.meta}>django</small>
                                    </Shuffler>
                                </div>

                                <div className="col-md-6 col-lg-6">
                                    <img ref={(el) => {
                                        imgs.current = [...imgs.current, el];
                                    }} 
                                    src={reactjs} 
                                    alt="glitch"
                                    data-shader = "glitch"
                                    style={{width: "85%"}}
                                    className={styles.img}/>
                                    <Shuffler type="scroll">
                                        <small className={styles.meta}>react.js</small>
                                    </Shuffler>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                            <div className={[styles.vh40, styles.col_left, "col-12",styles.col].join(" ")}>
                                <div className={styles.col_childs}>
                                    <small>In any case feel free to</small>
                                    <h1 className={styles.highlight}>Reach Me</h1>
                                    <p>On these platforms</p>
                                </div>
                            </div>

                            <div ref={contact} className={[styles.col_right, "col-12",styles.contacts].join(" ")}>
                          
                                    
                                    <div className={["row", styles.vh40].join(" ")}>
                                        <div className="col-sm-6 col-md-4">
                                            <FaFacebook className={styles.contact_icons}/><br/>
                                            <h5>Facebook</h5>
                                            <Shuffler type="scroll">
                                                <a className={styles.contact_links} href="https://www.facebook.com/kaungmyatthu29">@kaungmyatthu29</a>
                                            </Shuffler>
                                        </div>
                                        <div className="col-sm-6 col-md-4">
                                            <FaPhone className={styles.contact_icons}/><br/>
                                            <h5>Phone</h5>
                                            <Shuffler type="scroll">
                                                <a className={styles.contact_links} href="tel:+959770368230">+959770368230</a>
                                            </Shuffler>
                                        </div>
                                        <div className="col-sm-12 col-md-4">
                                            <CgMail className={styles.contact_icons}/><br/>
                                            <h5>Gmail</h5>
                                            <Shuffler type="scroll">
                                                <a className={styles.contact_links} href="mailto:2962000kaungmyatthu@gmail.com">2962000kaungmyatthu@gmail.com</a>
                                            </Shuffler>
                                        </div>
                                    </div>

                            </div>

                    </div>
                </div>
            </div>
            <div ref={canvas} className={styles.canvas}>
                {/* web gl renderer will attach here */}
            </div>
        </>
    )
}

export default Body
