import React, {useEffect, useRef } from 'react'
import shuffleLetters from "shuffle-letters";

const Shuffler = ({type, children}) => {
    let ref = useRef(null);

    const mouseEnterHandler = (e) =>{
        const element = e.target;
        shuffleLetters(element,{
            text: element.true_label,
            iteration:10,
            fps:25
        });
    }

    const scrollHandler = (e, el) =>{
        const element = el;
        if(isInViewport(element)){
            if(element.needAnimate){
                shuffleLetters(element,{
                    text: element.true_label,
                    iteration:20,
                    fps:15
                });
            }
            element.needAnimate = false;
        }
        if(!isInViewport(element)){
            element.textContent = "";
            element.needAnimate = true;
        }
    }

    const isInViewport =  (el) => {
        const bounding = el.getBoundingClientRect();
        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom < (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right < (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    useEffect(() => {

        ref.current.childNodes.forEach(element => {
            element.true_label = element.textContent;
            shuffleLetters(element,{
                text: element.true_label,
                iteration:20,
                fps:15
            });
            element.needAnimate = false;
            if(type === "hover"){
                element.addEventListener("mouseenter",mouseEnterHandler);
            }
            if(type === "scroll"){
                window.addEventListener("scroll",(e)=>{
                    setTimeout(()=>{
                        scrollHandler(e, element);
                    },800);
                });
            }

        });

        const trash = ref.current;

        return () => {

            trash.childNodes.forEach(element =>{
                element.removeEventListener("mouseenter",mouseEnterHandler);
            })    

        }
    }, [])

    return (
        <span ref={ref}>
            {children}
        </span>
    )
}

export default Shuffler;
