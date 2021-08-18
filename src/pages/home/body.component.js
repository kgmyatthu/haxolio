import React, { useRef, useEffect, useState } from 'react'
import gfx from './gfx.js';
import styles from './home.module.css';
import {Shuffler} from '../../components/animations/anime.component.js';
import {FaFacebook, FaPhone} from 'react-icons/fa';
import {CgMail} from 'react-icons/cg';
import { scrollTo } from './gfx.js';

//load images
import profile_img from '../../assets/img/profile.jpg';
import profile_img2 from '../../assets/img/profile2.jpg';
import vivo from '../../assets/img/logos/vivo.svg';
import apple from '../../assets/img/logos/apple.png';
import ford from '../../assets/img/logos/ford.png';
import tiktok from '../../assets/img/logos/tiktok.png';
import torn from '../../assets/img/logos/torn.jpg';
import capitalone from '../../assets/img/logos/capitalone.jpg';
import Loading from '../../components/animations/loading.component.js';

const Body = () => {
    const canvas = useRef(null);
    const contact = useRef(null);
    const imgs = useRef([]);

    
    useEffect(() => {
        let graphicFX;

        if(canvas.current){
            graphicFX = new gfx({
                dom: canvas.current,
                img: imgs.current,
                contact: contact.current,
            })
        }
    

        return () => {
            
            graphicFX.destroy();
            graphicFX = {};
            console.log("cleaned up");
        }
    }, [])



    return (
        <>
            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className={[styles.fullvh, styles.intro_left, "col-sm-6",styles.intro].join(" ")}>
                            <div className={styles.intro_childs}>
                                <img ref={(el) => {
                                    imgs.current = [...imgs.current, el];
                                }} 
                                src={profile_img} 
                                alt="ascii"
                                data-shader = "ascii"
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
                                    <h1>Thura Moe Myint</h1>
                                    <div>I'm a cyber security researcher</div>    
                                    <div>and a bug bounty hunter</div>
                                </Shuffler>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className={[styles.fullvh, styles.intro_left, "col-sm-6",styles.intro].join(" ")}>
                            <div className={styles.intro_childs}>
                                    <small>I do</small>
                                
                                    <h1>HACK <Shuffler type="hover"><span>ETHICALLY</span></Shuffler></h1>
                                
                                    <p>
                                        
                                        I entered the world of hacking in 2016 through CTF(s) and been in the game ever since. 
                                        Hi my name's Thura Moe Myint.
                                            
                                        I'm a <span className={styles.highlight}>cyber security researcher</span> , bug bounty hunter, ctf player, and a gamer. 
                                        I'm espcially interested in 

                                            <span> red teaming, binary exploitation, and web hacking.</span>

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
                                    <span className={styles.meta}>November 9th, 2019</span>
                                </Shuffler>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className={[styles.fullvh, styles.col_left, "col-md-6 col-lg-4",styles.col].join(" ")}>
                        <div className={styles.col_childs}>
                            <h3 className={styles.border_bottom}>Bug Bounty Huntings</h3>
                            <p>I've hunted several <span className={styles.highlight}>vulnerabilities</span> of various threat level on major bug bounty hunting platforms since 2019.</p>
                            <p>
                                <span className={styles.highlight}>HALL OF FAMED</span> by Apple, CaptialOne, Ford, Vivo, Tiktok, etc..</p>
                            <h3 className={styles.border_bottom}>Vulnerability Findings</h3>
                            <div className={styles.onhover}>CVE-2020-22809</div>
                            <div className={styles.onhover}>CVE-2021-24293</div>
                            <div className={styles.onhover}>CVE-2021-24291</div>
                            <div className={styles.onhover}>CVE-2019-15889</div>
                        </div>
                    </div>
                    <div className={[styles.fullvh, styles.col_right, "col-md-6 col-lg-8",styles.col].join(" ")}>
                        <div className={[styles.col_childs].join(" ")}>
                            <div className={["row",styles.logo_margins].join(" ")}>
                                <div className="col-md-6 col-lg-4">
                                    <img ref={(el) => {
                                        imgs.current = [...imgs.current, el];
                                    }} 
                                    src={apple} 
                                    alt="glitch"
                                    data-shader = "ascii"
                                    style={{width: "85%"}}
                                    className={styles.img}/>
                                    <Shuffler type="scroll">
                                        <small className={styles.meta}>Apple inc</small>
                                    </Shuffler>
                                </div>

                                <div className="col-md-6 col-lg-4">
                                    <img ref={(el) => {
                                        imgs.current = [...imgs.current, el];
                                    }} 
                                    src={tiktok} 
                                    alt="glitch"
                                    data-shader = "ascii"
                                    style={{width: "85%"}}
                                    className={styles.img}/>
                                    <Shuffler type="scroll">
                                        <small className={styles.meta}>Tiktok</small>
                                    </Shuffler>
                                </div>

                                <div className="col-md-12 col-lg-4">
                                    <img ref={(el) => {
                                        imgs.current = [...imgs.current, el];
                                    }} 
                                    src={ford} 
                                    alt="glitch"
                                    data-shader = "ascii"
                                    style={{width: "85%"}}
                                    className={styles.img}/>
                                    <Shuffler type="scroll">
                                        <small className={styles.meta}>Ford</small>
                                    </Shuffler>
                                </div>
                            </div>
                            <div className={["row",styles.logo_margins].join(" ")}>
                                <div className="col-md-6 col-lg-4">
                                    <img ref={(el) => {
                                        imgs.current = [...imgs.current, el];
                                    }} 
                                    src={vivo} 
                                    alt="glitch"
                                    data-shader = "ascii"
                                    style={{width: "85%"}}
                                    className={styles.img}/>
                                    <Shuffler type="scroll">
                                        <small className={styles.meta}>vivo inc</small>
                                    </Shuffler>
                                </div>

                                <div className="col-md-6 col-lg-4">
                                    <img ref={(el) => {
                                        imgs.current = [...imgs.current, el];
                                    }} 
                                    src={torn} 
                                    alt="glitch"
                                    data-shader = "ascii"
                                    style={{width: "85%"}}
                                    className={styles.img}/>
                                    <Shuffler type="scroll">
                                        <small className={styles.meta}>torn LTD</small>
                                    </Shuffler>
                                </div>

                                <div className="col-md-12 col-lg-4">
                                    <img ref={(el) => {
                                        imgs.current = [...imgs.current, el];
                                    }} 
                                    src={capitalone} 
                                    alt="glitch"
                                    data-shader = "ascii"
                                    style={{width: "85%"}}
                                    className={styles.img}/>
                                    <Shuffler type="scroll">
                                        <small className={styles.meta}>capitalone</small>
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
                                                <a className={styles.contact_links} href="https://www.facebook.com/mgthuraisgod">@mgthuraisgod</a>
                                            </Shuffler>
                                        </div>
                                        <div className="col-sm-6 col-md-4">
                                            <FaPhone className={styles.contact_icons}/><br/>
                                            <h5>Phone</h5>
                                            <Shuffler type="scroll">
                                                <a className={styles.contact_links} href="tel:+959783692962">+959-783-692-962</a>
                                            </Shuffler>
                                        </div>
                                        <div className="col-sm-12 col-md-4">
                                            <CgMail className={styles.contact_icons}/><br/>
                                            <h5>Gmail</h5>
                                            <Shuffler type="scroll">
                                                <a className={styles.contact_links} href="mailto:mgthuramoemyint@gmail.com">mgthuramoemyint@gmail.com</a>
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
