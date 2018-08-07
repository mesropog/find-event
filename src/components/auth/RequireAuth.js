import React from 'react';
import {connect} from 'react-redux';


export default (ComposedComponent) => {
    class Authentication extends React.Component {

        componentWillMount() {
            if(!this.props.authenticated) {
                this.props.history.push('/signin');
            }
        }

        componentWillUpdate(nextProps) {
            if(!nextProps.authenticated) {
                this.props.history.push('/signin');
            }
        }

        render() {
            return <ComposedComponent {...this.props}/>
        }
    }

    const mapStateToProps = state => ({
        authenticated : state.userData.authenticated
    });


    return connect(mapStateToProps, undefined)(Authentication);
}