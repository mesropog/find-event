import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';



import {removeFilter} from '../actions/filters';
import Filter from './Filter';
import { CSSTransitionGroup } from 'react-transition-group';

export const FiltersBar = props => (
    <div className="filter-bar">
        <CSSTransitionGroup
            transitionName="filter"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
            {filters({...props.filters}, props.removeFilter)}
        </CSSTransitionGroup>
    </div>
);

const filters = (list, dispatch) => {
    delete list.allCategories;
    delete list.category;
    delete list.startRange;
    delete list.endRange;
    const filters = [];
    for (const filter in list){
        if (list[filter]){
            filters.push(
                <Filter
                    show={list[filter]}
                    key={filter}
                    title={list[filter]}
                    onClick={() => dispatch(removeFilter(filter))}/>
                    )
        }
    }
    return filters;
};

FiltersBar.propType = {
    filters : PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    filters : state.filters,
});

const mapDispatchToProps = dispatch => ({
    removeFilter : filter => dispatch(removeFilter(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(FiltersBar);