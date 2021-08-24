import React, { Component } from 'react';
import { connect } from 'react-redux';
import History from '../../History/History';
import Containers from '../../Container/container/container';
import PersistentDrawerLeft from '../Dashboard/Dashboard'

class Home extends Component {
    constructor(props) {
        super(props);

    }

    // componentWillMount() {
    //     console.log('homepage run')
    //     if (!this.props.currentUserUID) {
    //         History.push('/login')
    //     }
    // }
    render() {
        return (
            <div>
                {/* <Containers /> */}
                <PersistentDrawerLeft />
            </div>
        );
    }
}


function mapStateToProps(states) {
    return ({
        currentUser: states.authReducer.CURRENTUSER,
        currentUserUID: states.authReducer.CURRENTUSERUID,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        // LoginUser: (user) => {
        //     dispatch(LoginAction(user));
        // }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);