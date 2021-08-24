import React, { Component } from 'react';
import { connect } from 'react-redux';
import History from '../../History/History';
import Image from '../../Assets/images/blockimage.png';
import '../404/NotFound.css'


class BlockAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="NotFoundDiv">
                <div className="NotFound">
                    <div>
                        {/* <h1>Oops!</h1> */}
                        <img style={{ width: 300 }} src={Image} alt={'Block Account'} />
                    </div>
                    <h2>Your account has been suspended</h2>
                    <p>Please contact admin to resolve your problem about account</p>
                    <button onClick={() => History.push('/')}>Go To Homepage</button>
                </div>
            </div>
        )
    }
}

export default BlockAccount