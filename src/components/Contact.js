import React from 'react';

import '../css/Contact.css';

class Contact extends React.Component {

    state = {
        message: '',
        isError: false,
    }

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let formElement =  document.getElementById('contact-form');
        let formData = {
            email: formElement['email'].value,
            subject: formElement['subject'].value,
            message: formElement['message'].value
        };
        fetch('/api/contact', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(response => {
            if (response.ok) {
                this.setState({
                    message: 'Successful submission. Thank you for reaching out.',
                    isError: false
                });
            }
            else {
                throw new Error('Sorry, server error. Please try again.');
            }
        })
        .catch(error => {
            console.log('failed to submit form');
            console.log(error.name + ": " + error.message);
            this.setState({
                message: error.message,
                isError: true
            });
        });
    }

    render() {
        const message = this.state.message;
        let messageClass = 'form-alert-message ';
        messageClass += this.state.isError ? 'fail-message' : 'success-message';
        return (
            <div className="contact-form-outter-container">
                <div className="contact-form-inner-container">
                    { message ? <div className={messageClass}>{ message }</div> : '' }
                    <form id="contact-form" onSubmit={ this.handleSubmit }>
                        Email (optional):<br/>
                        <input type="text" name="email"/><br/><br/>
                        Subject (optional):<br/>
                        <input type="text" name="subject"/><br/><br/>
                        Message:<br/>
                        <textarea name='message' /><br/><br/>
                        <div className="center">
                            <input id="form-submit" type="submit" value="Submit"></input>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Contact;