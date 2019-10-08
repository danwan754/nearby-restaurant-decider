import React from 'react';
import {Redirect} from 'react-router-dom';

import Title from './Title';
import InputBar from './InputBar';

class Home extends React.Component {

    state = {
        toResults: false,
        query_data: {}
    }

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(query_object) {
        this.setState({
            query_data: query_object,
            toResults: true
        });
    }


    render() {

        if (this.state.toResults) {
            return (
                <Redirect to={{
                    pathname: '/results',
                    state: this.state.query_data
                }} />
            )
        }
        return (
            <div className="home-background">
                <Title />
                <InputBar 
                    onSubmit={this.handleSubmit}
                    submitClassName="center-submit" />
            </div>
        );
    }
}

export default Home;