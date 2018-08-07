import React from 'react';
import PropTypes from 'prop-types';


const Filter = props => (
    <div className='filter-bar__filter-element'
        onClick={props.onClick}>{props.title}
        <span className="filter-bar__remove">x</span>
    </div>
);

Filter.proptypes = {
    onClick: PropTypes.func.isRequired,
    title  : PropTypes.string.isRequired,
    show   : PropTypes.bool.isRequired,
};

export default Filter;