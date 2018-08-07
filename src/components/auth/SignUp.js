import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';

import Validator from '../../helpers/fieldValidator';
import {signUserUp} from '../../actions/userData';

class SignUp extends React.Component {

    componentDidUpdate() {
        if(this.props.authenticated) {
            this.props.history.push('/');
        }
    }


    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <div className="signup-page">
                <form onSubmit={handleSubmit} className="signup-page__form">
                    <Field
                        name="email"
                        type="text"
                        component={renderField}
                        placeholder="Email"
                        className="form-control"
                    />
                    <Field
                        name="password"
                        type="password"
                        component={renderField}
                        placeholder="Password"
                        className="form-control"
                    />
                    <Field
                        name="passwordConfirm"
                        type="password"
                        component={renderField}
                        placeholder="Password Confirmation"
                        className="form-control"
                    />
                    <button type="submit" disabled={submitting} className="btn btn-danger signup_button">SignUp</button>
                    {this.props.authErrors && <p>{this.props.authErrors}</p>}
                </form>
            </div>
        )
    }
}

const handleFormSubmit = (e, dispatch) => {
    dispatch(signUserUp(e));
};

const validate = values => {
    const errors = {};
    if (!Validator.isRequired(values.email)) errors.email = 'Please enter your email';
    if (!Validator.isValidEmail(values.email)) errors.email = 'Please enter a valid email';
    if (!Validator.isRequired(values.password)) errors.password = 'Please enter your password';
    if (!Validator.passwordsAreEqual(values.password, values.passwordConfirm)) errors.passwordConfirm = 'Passwords don\'t match';
    if (!Validator.isStrongPassword(values.password)) errors.password = 'Your password should contain at least' +
        ' one uppercase, one lowercase, one digit and to be at least 8 characters long';
    return errors;
};

const renderField = ({
    input,
    label,
    type,
    placeholder,
    className,
    meta: { touched, error, warning }
}) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={placeholder} className={className} type={type} />
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


const connectedFrom = connect(mapStateToProps, undefined)(SignUp);


export default reduxForm({
    form: 'signUp',
    validate,
    onSubmit : (e, dispatch) => handleFormSubmit(e, dispatch),
})(connectedFrom);