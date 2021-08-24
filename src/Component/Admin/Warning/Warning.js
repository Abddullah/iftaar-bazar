import React, { Component } from 'react';
import { connect } from 'react-redux';

class Warning extends Component {
    constructor(props) {
        super(props);
        this.state = {
            warn: null
        }
    }

    componentWillMount() {
        const { chats, item } = this.props;
        var count = 0;
        chats.map(chatData => {
            console.log('Itemsssssssssss', item)
            if ((item.data.reciever === chatData.data.reciever && item.data.sender === chatData.data.sender && chatData.data.warning && !chatData.data.adminSeen)
                ||
                (item.data.reciever === chatData.data.sender && item.data.sender === chatData.data.reciever && chatData.data.warning && !chatData.data.adminSeen)
            ) {
                console.log('Itemsssssssssss', chatData)
                count = count + 1;
                this.setState({ warn: count })
            }
        })
    }

    componentWillReceiveProps(props) {
        const { chats, item } = props;
        var count = 0;
        setTimeout(() => {
            chats.map(chatData => {
            console.log('Itemsssssssssss', chatData)
                if ((item.data.reciever === chatData.data.reciever && item.data.sender === chatData.data.sender && chatData.data.warning && !chatData.data.adminSeen)
                    ||
                    (item.data.reciever === chatData.data.sender && item.data.sender === chatData.data.reciever && chatData.data.warning && !chatData.data.adminSeen)
                ) {
                    console.log('ItemsssssssssssProps', chatData)
                    count = count + 1;
                    this.setState({ warn: count })
                }
            }, 10)
        })
    }

    render() {
        const { warn } = this.state;
        return (
            // <i>{warn} Warning Message</i>
            <i>
                {
                    warn ?
                        warn + " Warning Message"
                        :
                        null
                }
            </i>
        )
    }
}

// export default Warning

function mapStateToProps(states) {
    return ({
        allUser: states.authReducer.USERS,
        chats: states.chatReducer.ALLCHAT,
        chatFlag: states.chatReducer.CHATFLAG,
    })
}

function mapDispatchToProps(dispatch) {
    // return ({
    //     actions: bindActionCreators({
    //         ChatAction
    //     }, dispatch)
    // })
}

export default connect(mapStateToProps, mapDispatchToProps)(Warning);