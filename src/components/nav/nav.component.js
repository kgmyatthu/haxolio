import React, { useEffect, useRef, useState } from 'react';
import style from './nav.module.css';
import { Link } from 'react-router-dom';
import shuffleLetters from "shuffle-letters";

const Navigation = ({pad}) => {
    let ref = useRef([]);
    let nav = useRef();
    let [gap, setGap] = useState();

    useEffect(() => {
        if (ref.current[0] !== undefined){
            ref.current.forEach((element) => {
                element.true_label = element.textContent;
                shuffleLetters(element, {
                    iterations: 20,
                    fps: 15,
                }); 
            });
        }

        setGap(nav.current.clientHeight);

        return () => {

        }
    },[])


    return (
        <>
            <div ref={nav} className={[style.custom_container].join(" ")}>
                <div className={[style.bannar].join(" ")}>
                    <Link to="#" ref={(el)=>{ref.current.push(el);}}>
                        0xk3t
                    </Link>
                </div>
                {/*<div className={[style.item].join(" ")}>
                    <Link to="/" ref={(el)=>{ref.current.push(el);}}>
                        Home
                    </Link>
                </div>
                <div className={[style.item].join(" ")}>
                    <Link to="/blog" ref={(el)=>{ref.current.push(el);}}>
                        Blog
                    </Link>
                </div>*/}
            </div>
            {pad ? <div style={{height: gap}}></div>: <></>}
        </>
    )
}

export default Navigation;
