import React from 'react';
import {connect} from 'react-redux'
import {signUserOut} from '../../actions/userData';

class SignOut extends React.Component {

    componentDidMount() {
        if (!this.props.authenticated) this.props.history.push('/');
        this.props.signOut();
        setTimeout(() => {
            this.props.history.push('/');
        }, 3000)
    }

    render() {
        return (
            <div className="signout">
                <h1 className="signout__heading">Sory to see you go</h1>
                <p>We hope to see you again soon!</p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    authenticated : state.userData.authenticated,
});

const mapDispatchToProps = dispatch => ({
    signOut : () => dispatch(signUserOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignOut);