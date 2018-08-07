import React from 'react';
import {connect} from 'react-redux';
import {CSSTransitionGroup} from 'react-transition-group';

import {setUserLocation} from '../../actions/userData';
import {setError} from '../../actions/events';

export default (AnimatedPage) => {
    class Animation extends React.Component {

        componentDidMount() {
            const getLocation = () => {
                const geolocation = navigator.geolocation;

                return  new Promise((resolve, reject) => {
                    if (!geolocation) {
                        reject(new Error('Not Supported'));
                    }

                    geolocation.getCurrentPosition((position) => {
                        //console.log(position.coords);
                        resolve(position);
                    }, () => {
                        reject(new Error('Permission denied'));
                    });
                });
            };

            getLocation()
                .then(resp => this.props.setLocation(resp.coords))
                .catch(setError('Location wasn\'t obtained'))

        }

        render() {
            return (
                <CSSTransitionGroup
                    transitionName="mount-animation"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <AnimatedPage {...this.props}/>
                </CSSTransitionGroup>
            )
        }
    }

    const mapDispatchToProps = dispatch => ({
        setLocation : (location) => dispatch(setUserLocation(location))
    });



    return connect(undefined, mapDispatchToProps)(Animation);
}
