import React from 'react';

import InputBar from './InputBar';
import ResultDetail from './ResultDetail';

import '../css/Result.css';

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
            <div className="result-container">
                <InputBar
                    onSubmit={this.handleSubmit} />
                {/* <ResultDetail 
                    result={this.state.results} /> */}
            </div>
        );
    }
}

export default Result;