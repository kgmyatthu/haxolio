
import React from 'react'
import styles from './footer.module.css';
import {FaGithub,FaFacebook,FaTwitter,FaLinkedin} from 'react-icons/fa';

const Footer = () => {
    return (
        <div className={["container", styles.white,styles.mono,styles.padding1].join(" ")}>
            <div className="row">
                <div className={["col", "text-center","mx-auto"].join(" ")}>
                    <p className="align-middle text-muted">
                         
                        <span style={{color:""}}>&nbsp;Designed&nbsp;</span>
                        and 
                        <span style={{color:""}}>&nbsp;Built&nbsp;</span>
                        by 
                        <span className="text-lead" style={{color:"white"}}>&nbsp;Kaung Myat Thu&nbsp;</span>
                        <br/>
                        <span className={styles.icons} style={{margin:"0.5rem"}}><a href="https://github.com/kgmyatthu" target="_blank" rel="noreferrer"><FaGithub size={20}/></a></span>
                        <span className={styles.icons} style={{margin:"0.5rem"}}><a href="https://www.facebook.com/kaungmyatthu29/" target="_blank" rel="noreferrer"><FaFacebook size={20}/></a></span>
                        <span className={styles.icons} style={{margin:"0.5rem"}}><a href="https://twitter.com/mgkaungmyatthu" target="_blank" rel="noreferrer"><FaTwitter size={20}/></a></span>
                        <span className={styles.icons} style={{margin:"0.5rem"}}><a href="https://www.linkedin.com/in/kaung-myat-thu-3925531b6/" target="_blank" rel="noreferrer"><FaLinkedin size={20}/></a></span>
                    </p>
                    <small className="text-muted">
                        This react template is open-source and contributions are welcome. <a  href="https://github.com/kmt29/haxolio" target="_blank" rel="noreferrer">Contribute here</a>.
                    </small>
                </div>
            </div>
        </div>
    )
}

export default Footer;