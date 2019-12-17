import React from 'react';

export const Card = ({ category, codes, count, name, synonyms, isMobile }) => (
    <div className={`card ${isMobile ? 'mobile': ""}`}>
        <h2>{name}</h2>
        <div>Category : {category}</div>
        <div>Codes : {codes}</div>
        <div>Count : {count}</div>
        <div>Synonyms : {synonyms}</div>
    </div>
)