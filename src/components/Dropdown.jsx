import React from 'react';

export const Dropdown = ({ options, onSelect }) => (
    <select onChange={({target}) => onSelect(target.value) }>
        <option value={null}>Select a Filter</option>
        {options.map((val) => <option value={val}>{val}</option>)}
    </select>
)