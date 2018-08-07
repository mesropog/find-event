import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Event = props => {
    const {is_free, start, name, logo, description, end, id} = props.event;

    return (
        <div className="event card mb-3">
            <Link className="event__link" to={`/event/${id}`}>
                <div className="event__picture-container card-body">
                    <img src={logo && logo.url} className="event__picture"/>
                    {is_free && <div className="event__price-type">FREE</div>}
                </div>
                <div className="event__info-container card-body">
                    <div className="event__date">{start && start.local}</div>
                    <div className="event__title">{name && name.text}</div>
                    <div className="event__description">{description.text ? description.text.substring(0, 100) + '..' : ''}</div>
                </div>
                <div className="event__footer card-footer">
                    <div className="event__tags">{end && end.timezone}</div>
                    <div className="event__save"></div>
                </div>
            </Link>
        </div>
    )
};

Event.propTypes = {
    event : PropTypes.object.isRequired,
};


export default Event;