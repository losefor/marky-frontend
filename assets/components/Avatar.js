import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser , faUserTie } from "@fortawesome/free-solid-svg-icons";
export default function Avatar({icon , radius , image}) {
    return (
        <div className='avatar' style={{width:`${radius}rem` , height:`${radius}rem` }}>
            { icon && <FontAwesomeIcon style={{fontSize:`${radius/2}rem` }} icon={icon} />}
            {image && <img className='avatar__img' src={image} />}
        </div>
    )
}
