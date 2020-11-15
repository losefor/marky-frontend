import React from 'react'

export default function Text({
    Component='h1',
    children ,
    textAlign,
    color,
    fontSize
    }) {
    return (
        <Component style={{textAlign , color , fontSize : `${fontSize}rem`}}>
            {children}
        </Component>
    )
}
