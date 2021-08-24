import React, { Component } from 'react';
import { connect } from 'react-redux';
import History from '../../History/History';

import './NotFound.css'


class NotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="NotFoundDiv">
                <div className="NotFound">
                    <div className="NotFound-404">
                        <h1>Oops!</h1>
                    </div>
                    <h2>404 - Page not found</h2>
                    <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
                    <button onClick={() => History.push('/')}>Go To Homepage</button>
                </div>
            </div>
        )
    }
}

export default NotFound