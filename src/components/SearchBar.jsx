import React from 'react'
export const SearchBar = ({ onChange }) => (
    <input onChange={({ target }) => onChange(target.value)} placeholder="Search Here..." />
);