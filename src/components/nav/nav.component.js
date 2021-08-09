import React, { useEffect, useRef} from 'react';
import style from './nav.module.css';
import { Link } from 'react-router-dom';
import shuffleLetters from "shuffle-letters";


const Navigation = () => {
    const ref = useRef([]);

    const handleMouseDown = (e) =>{
        e.preventDefault();
        const el = e.target;
        shuffleLetters(el,{
            text: el.true_label,
            iterations: 6,
            fps: 15,
        })
    }

    useEffect(() => {
        if (ref.current != null){
            ref.current.forEach((element,i,arr) => {
                element.true_label = element.textContent;
                shuffleLetters(element, {
                    iterations: 12,
                    fps: 15,
                }); 
                console.log(element.onMouseEnter);
                element.addEventListener('mousedown',handleMouseDown);
            });
        }
        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
        }
    })

    return (
        <div className={[style.custom_container].join(" ")}>
            <div className={[style.item].join(" ")}>
                <Link to="/share" ref={(el)=>{ref.current.push(el);}}>
                    Share
                </Link>
            </div>
            <div className={[style.item].join(" ")}>
                <Link to="/contact" ref={(el)=>{ref.current.push(el);}}>
                    Contact
                </Link>
            </div>
            <div className={[style.item].join(" ")}>
                <Link to="/blog" ref={(el)=>{ref.current.push(el);}}>
                    Blog
                </Link>
            </div>
            <div className={[style.item].join(" ")}>
                <Link to="/" ref={(el)=>{ref.current.push(el);}}>
                    Home
                </Link>
            </div>
  
        </div>
    )
}

export default Navigation;
