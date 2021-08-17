import React, { useEffect, useRef} from 'react';
import style from './nav.module.css';
import { Link } from 'react-router-dom';
import shuffleLetters from "shuffle-letters";
import { Shuffler } from '../animations/anime.component';


const Navigation = () => {
    const ref = useRef([]);

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
        return () => {

        }
    })

    return (
        <div className={[style.custom_container].join(" ")}>
            <div className={[style.bannar].join(" ")}>
                <Link to="#" ref={(el)=>{ref.current.push(el);}}>
                    0xthura
                </Link>
            </div>
            <div className={[style.item].join(" ")}>
                <Link to="/" ref={(el)=>{ref.current.push(el);}}>
                    Home
                </Link>
            </div>
            <div className={[style.item].join(" ")}>
                <Link to="/blog" ref={(el)=>{ref.current.push(el);}}>
                    Blog
                </Link>
            </div>
  
        </div>
    )
}

export default Navigation;
