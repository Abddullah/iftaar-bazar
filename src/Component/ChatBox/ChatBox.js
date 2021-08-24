import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './Message.css';
import TimeAgo from 'react-timeago';
import { Badge } from '@material-ui/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import Warning from '../Admin/Warning/Warning';
library.add(faComments);

class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            allUser: null,
            chatWith: null,
            count: 0,

        }

        this._openChat = this._openChat.bind(this);
    }

    componentWillMount() {
        const { allUser, chatWith, chats, chatFlag } = this.props;
        var count = 0;
        console.log(chatWith, 'AllUser', allUser);
        if (allUser) {
            setTimeout(() => {
                this.setState({ allUser, chatWith, chats })
                chats.map(item => {
                    if (item.data.warning && !item.data.adminSeen) {
                        count = count + 1;
                        this.setState({ count })
                    }
                })
            }, 1000)
        }
    }

    componentWillReceiveProps(props) {
        const { allUser, chatWith, chats, chatFlag } = props;
        var count = 0;
        if (allUser) {
            setTimeout(() => {
                this.setState({ allUser, chatWith, chats, count: 0 })
                chats.map(item => {
                    console.log(chats, 'AllUserssss');
                    if (item.data.warning && !item.data.adminSeen) {
                        count = count + 1;
                        this.setState({ count })
                    }
                })
            }, 1000)
        }
    }

    handleClick = event => {
        const { closeChat } = this.props;
        this.setState({ anchorEl: event.currentTarget });
        closeChat()
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    _openChat(item) {
        const { chatItem } = this.props;
        chatItem(item)
        this.setState({ anchorEl: null });
        console.log('item', item)
    }

    render() {
        const { arr, anchorEl, chatWith, allUser, count } = this.state;
        console.log('ChatsWith', chatWith)
        return (
            <div className={"ChatBadge"}>
                {
                    count > 0 ?
                        <Badge className={"Badge"} color='primary' badgeContent={count}>
                            <FontAwesomeIcon
                                className={'ChatIcon'}
                                aria-owns={anchorEl ? 'simple-menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleClick}
                                size='2x'
                                icon={"comments"}
                                style={{ cursor: "pointer" }}
                                title="All Chats"
                            />
                        </Badge>
                        :
                        <FontAwesomeIcon
                            className={'ChatIcon'}
                            aria-owns={anchorEl ? 'simple-menu' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleClick}
                            size='2x'
                            icon={"comments"}
                            style={{ cursor: "pointer" }}
                            title="All Chats"
                        />
                }
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    className={"ChatBox"}
                >
                    {allUser && chatWith && chatWith.length ?
                        chatWith.map(item => {
                            return <li className={"ChatList"} onClick={() => this._openChat(item)}>
                                <div>
                                    <div className={'NameList'}>
                                        <div>
                                            {
                                                allUser.map(userItem => {
                                                    return (userItem.data.role !== 'admin') && (item.data.reciever === userItem.data.userUid || item.data.sender === userItem.data.userUid) && (userItem.data.role === 'seller') &&
                                                        <div>
                                                            {userItem.data.firstName.slice(0, 1).toUpperCase()}
                                                        </div>
                                                })
                                            }
                                            {
                                                allUser.map(userItem => {
                                                    return (userItem.data.role !== 'admin') && (item.data.reciever === userItem.data.userUid || item.data.sender === userItem.data.userUid) && (userItem.data.role === 'buyer') &&
                                                        <div>
                                                            {userItem.data.firstName.slice(0, 1).toUpperCase()}
                                                        </div>
                                                })
                                            }
                                        </div>
                                        <div>
                                            <div>
                                                {
                                                    allUser.map(userItem => {
                                                        return (userItem.data.role !== 'admin') && (item.data.reciever === userItem.data.userUid || item.data.sender === userItem.data.userUid) && (userItem.data.role === 'seller') &&
                                                            <b title={'Seller Account'}>
                                                                {`${(userItem.data.firstName.slice(0, 1)).toUpperCase()}${userItem.data.firstName.slice(1) + ' ' + userItem.data.lastName}`}
                                                                <Warning item={item} />
                                                            </b>
                                                    })
                                                }
                                            </div>
                                            {

                                            }
                                            <div>
                                                Last Message From{' '}
                                                <a>
                                                    {
                                                        allUser.map(userItem => {
                                                            return (userItem.data.role !== 'admin') && (item.data.reciever === userItem.data.userUid || item.data.sender === userItem.data.userUid) && (userItem.data.role === 'buyer') &&
                                                                <b title={'Buyer Account'}>
                                                                    {`${(userItem.data.firstName.slice(0, 1)).toUpperCase()}${userItem.data.firstName.slice(1) + ' ' + userItem.data.lastName}`}
                                                                </b>
                                                        })
                                                    }
                                                </a>{' '}
                                                <TimeAgo date={item.data.time} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        })
                        :
                        <div className={"Empty-Chat"}>No Messages</div>
                    }
                </Menu>
            </div>
        )
    }
}

// export default ChatBox;


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

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);