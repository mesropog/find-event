import React from 'react';
import moment from 'moment';
import { Input } from 'antd';
import {connect} from 'react-redux';
import {saveEvent} from '../../actions/events';

import DateTimeSet from '../DateTimeSet';
import FileUpload from '../FileUpload';
import Validator from '../../helpers/fieldValidator';

export class CreateForm extends React.Component{
    state = {
        touched : false,
        title : {
            value : '',
            error : ''
        },
        location : {
            value : '',
            error : ''
        },
        startDate : {
            value : '',
            error : ''
        },
        endDate   : {
            value : '',
            error : ''
        },
        picture : {
            value : '',
            error : ''
        },
        description : {
            value : '',
            error : ''
        },
        organizerName : {
            value : '',
            error : ''
        }

    };

    handleSubmit = e => {
        e.preventDefault();
        const newState = Validator.validate(this.state);
        this.setState({...newState, touched : true});
        if(!newState.hasErrors) this.props.saveEvent(newState);
    };


    componentWillReceiveProps(nextProps) {
        if(nextProps.newEventSaved != this.props.newEventSaved) this.props.history.push('/');
    }


    render(){
        const { TextArea } = Input;
        return (
            <div className="create-event-container">
                <form className="create-event__form" onSubmit={this.handleSubmit}>
                    <div className="create-event__fieldset">
                        <label htmlFor="title">Event Title</label>
                        <Input id="title" name="title" type="text" onChange={(e) => this.setState({title:{value:e.target.value}})}/>
                        {this.state.touched && this.state.title.error && <p className="error">{this.state.title.error}</p>}
                    </div>
                    <div className="create-event__fieldset">
                        <label htmlFor="location">Location</label>
                        <Input name="location" id="location" type="text" onChange={e => {this.setState({location:{value:e.target.value}})}}/>
                        {this.state.touched && this.state.location.error && <p className="error">{this.state.location.error}</p>}
                    </div>
                    <div className="create-event__fieldset create-event__fieldset--pickers">
                        <div className="create-event__picker">
                            <label htmlFor="start-date">Start Date</label>
                            <DateTimeSet
                                onChange={e => {this.setState({startDate:{value:e.format('DD:MM:YYYY')}})}}
                                id="startDate"
                                name="start-date"
                                context="today"
                                defaultDate={moment()}
                                defaultTime={moment()}
                                type="text"
                            />
                            {this.state.touched && this.state.startDate.error && <p className="error">{this.state.startDate.error}</p>}
                        </div>
                        <div className="create-event__picker">
                            <label htmlFor="start-date">End Date</label>
                            <DateTimeSet
                                onChange={e => {this.setState({endDate:{value:e.format('DD:MM:YYYY')}})}}
                                name="end-date"
                                context="today"
                                defaultDate={moment()}
                                defaultTime={moment()}
                                type="text"
                            />
                            {this.state.touched && this.state.endDate.error && <p className="error">{this.state.endDate.error}</p>}
                        </div>
                    </div>
                    <div className="create-event__fieldset">
                        <FileUpload name="picture" id="picture"  onChange={e => {this.setState({picture : {value: e}})}}/>
                        {this.state.touched && this.state.picture.error && <p className="error">{this.state.picture.error}</p>}
                    </div>
                    <div className="create-event__fieldset">
                        <TextArea
                            id="description"
                            onChange={e => {this.setState({description:{value:e.target.value}})}}
                            name="description"/>
                        {this.state.touched && this.state.description.error && <p className="error">{this.state.description.error}</p>}
                    </div>
                    <div className="create-event__fieldset">
                        <label htmlFor="title">Organizer Name</label>
                        <Input
                            id="organizerName"
                            name="organizer_name"
                            type="text"
                            onChange={e => {this.setState({organizerName : {value:e.target.value}})}} />
                        {this.state.touched && this.state.organizerName.error &&
                        <p className="error">{this.state.organizerName.error}</p>}
                    </div>
                    {this.props.submissionErrors.length > 0 && this.props.submissionErrors.map((err, i) => {
                        return <div className="error" key={i}>{err}</div>
                    })}
                    <div className="create-event__fieldset">
                        <button type="submit" className="btn btn-default create-event__button">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    submissionErrors : state.events.errors,
    newEventSaved : state.events.newEventSaved
});

const mapDispatchToProps = dispatch => ({
    saveEvent : event => dispatch(saveEvent(event))
});


export default connect(mapStateToProps, mapDispatchToProps)(CreateForm);