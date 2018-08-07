import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';

import Validator from '../../helpers/fieldValidator';
import {signUserIn} from '../../actions/userData';

class SignIn extends React.Component {

    componentDidUpdate() {
        if(this.props.authenticated) {
            this.props.history.push('/');
        }
    }


    render (){
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <div className="signin-page container-fluid">
                <form onSubmit={handleSubmit} className="signin-page__form">
                    <Field
                        className="form-control signin-page__input"
                        name="email"
                        type="text"
                        placeholder="Email"
                        component={renderField}
                    />
                    <Field
                        className="form-control signin-page__input"
                        name="password"
                        type="password"
                        placeholder="Password"
                        component={renderField}
                    />
                    <button type="submit" disabled={submitting} className="btn btn-danger signin__button ">SignIN</button>
                    {this.props.authErrors && <p>{this.props.authErrors}</p>}
                </form>
            </div>
        )
    }
}

const handleFormSubmit = (e, dispatch) => {
    dispatch(signUserIn(e.email, e.password))
};

const validate = values => {
    const errors = {};
    if (!Validator.isRequired(values.email)) errors.email = 'Please enter your email';
    if (!Validator.isValidEmail(values.email)) errors.email = 'Please enter a valid email';
    if (!Validator.isRequired(values.password)) errors.password = 'Please enter your password';
    return errors;
};

const renderField = ({
    input,
    label,
    type,
    className,
    placeholder,
    meta: { touched, error, warning }
}) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={placeholder} type={type} className={className}/>
            {touched &&
            ((error && <span className="error">{error}</span>) ||
            (warning && <span>{warning}</span>))}
        </div>
    </div>
);

const mapStateToProps = state =>({
    authenticated : state.userData.authenticated,
    authErrors    : state.userData.authErrors
});

const connectedForm = connect(mapStateToProps, undefined)(SignIn);

export default reduxForm({
    form: 'signIn',
    validate,
    onSubmit : (e, dispatch) => handleFormSubmit(e, dispatch),
})(connectedForm)