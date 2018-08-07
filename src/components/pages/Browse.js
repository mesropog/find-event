import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'


import FiltersForm from '../FiltersForm';
import FiltersBar from '../FiltersBar';
import Event from '../Event';
import {getFilteredEvents} from '../../actions/events';
import {getUsersLocality} from '../../actions/userData';
import {filtersAreSame} from '../../helpers/compareFilters';
import LoadingOrElements from '../LoadingOrElements';


export class Browse extends React.Component {

    componentDidMount() {
        if(this.props.events.length === 0)this.props.getFilteredEvents(this.props);
    }

    componentDidUpdate(nextProps){
        this.props.getUsersLocality(nextProps.userData.location);
        if (!filtersAreSame(nextProps.filters, this.props.filters)) {
            this.props.getFilteredEvents(this.props);
        }
    }

    static shouldDisplayFilterBar({categoryName,typeOfE,textFilter, dateRangeText, price}) {
        return categoryName || typeOfE || textFilter || dateRangeText || price;
    }



    render(){
        const events = this.props.events.map(ev => <Event key={ev.id}  event={ev}  />);

        return(
            <div className="container-fluid browse-page">
                <div className="browse-page__filter-form">
                    <FiltersForm/>
                </div>
                <div className="browse-page__events">
                    {Browse.shouldDisplayFilterBar(this.props.filters)
                    ?
                        <FiltersBar/>
                    :
                        <div className="filter-fix"></div>
                    }
                    <div className="browse--page__events-container">
                        {LoadingOrElements(events, this.props.events.length)}
                    </div>
                </div>
            </div>
        )
    }
}

Browse.propTypes = {
    userData : PropTypes.object.isRequired,
    filters  : PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    filters      : state.filters,
    userData     : state.userData,
    events       : state.events.filteredEvents
});

const mapDispatchToProps = dispatch => ({
    getFilteredEvents : args => dispatch(getFilteredEvents(args)),
    getUsersLocality  : args => dispatch(getUsersLocality(args))
});

export default connect(mapStateToProps, mapDispatchToProps)(Browse);


