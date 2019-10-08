import React from 'react';

import InputBar from './InputBar';
import ResultDetail from './ResultDetail';

class Result extends React.Component {

    state = {
        results: {}
    }

    constructor() {
        super();
        
    }

    componentDidMount() {
        // fetch nearby establishments with input data given by Home page
        if (this.props.location.state.query_data) {
            // const result = getNearbyEstablishments(this.state.query_data);
            // this.setState({ results: result });
        }
    }


    handleSubmit(query_object) {
        this.setState({
            query_data: query_object,
            toResults: true
        });
    }


    render() {
        return (
            <div>
                <div className="input-bar">
                    <InputBar
                        onSubmit={this.handleSubmit} />
                </div>
                <div className="result-container">
                    <ResultDetail 
                        result={this.state.results} />
                </div>
            </div>
        );
    }
}

export default Result;