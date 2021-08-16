import React, { useEffect, useRef} from 'react';
import style from './nav.module.css';
import { Link } from 'react-router-dom';
import shuffleLetters from "shuffle-letters";


const Navigation = () => {
    const ref = useRef([]);

    const handleMouseEnter = (e) =>{
        const el = e.target;
        if(e.target.e_witness === undefined || e.target.e_witness === false){
            
            shuffleLetters(el,{
                text: el.true_label,
                iterations: 20,
                fps: 30,
            })
            
            e.target.e_witness = true;
        }
        // console.log(e.target.e_witness);
    }
    const handleMouseLeave = (e) =>{
        e.target.e_witness = false;
        // console.log(e.target.e_witness);
    }

    const clickHandler = (e) =>{
        e.preventDefault();
        const link = e.target.href;
        window.location = link;
    }

    useEffect(() => {
        if (ref.current[0] !== undefined){
            ref.current.forEach((element) => {
                element.true_label = element.textContent;
                shuffleLetters(element, {
                    iterations: 20,
                    fps: 15,
                }); 
                // element.addEventListener('mouseenter',handleMouseEnter);
                // element.addEventListener('mouseleave',handleMouseLeave);
                // element.addEventListener('click',clickHandler);
            });
        }
        return () => {
            // window.removeEventListener('mouseenter', handleMouseEnter);
            // window.removeEventListener('mouseleave',handleMouseLeave);
            // window.removeEventListener('click',clickHandler);
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
