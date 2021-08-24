import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ChatAction, updateWarningSeen } from '../../../store/action/chatAction';
import './AllChats.css';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import ChatUser from '../ChatUser/ChatUser';
library.add(faLocationArrow, faArrowAltCircleUp)


class AllChatsAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            chatData: props.chatItems,
            chatArr: [],
            warningArr: [],
            allUser: []
        }

        this._warningMsg = this._warningMsg.bind(this);
        this._close = this._close.bind(this);
        this._sender = this._sender.bind(this);
        this._reciever = this._reciever.bind(this);


        // this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    scrollToBottom = () => {
        const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    componentWillMount() {
        const { allUser, chats, chatFlag, open } = this.props;
        const { chatData, warningArr } = this.state;
        var arr = [];
        if (allUser) {
            console.log('chatDatasssssss', chatData)
            setTimeout(() => {

                // console.log('Chats', chats)
                chats.sort(
                    function (a, b) {
                        return a.data.time - b.data.time
                    }
                );
                console.log('Chatsssss', chats)
                this.setState({ chatArr: chats, allUser })

                chats.map((item, index) => {
                    console.log('AllChatssss', chats)
                    if ((item.data.sender === chatData.data.sender && item.data.reciever === chatData.data.reciever)
                        ||
                        (item.data.sender === chatData.data.reciever && item.data.reciever === chatData.data.sender)
                    ) {
                        if (item.data.warning) {
                            item.data.adminSeen = true;
                            this.props.actions.updateWarningSeen(item.key, chats, !chatFlag)
                            arr.push(index)
                            this.setState({ warningArr: arr })
                        }
                    }
                    setTimeout(() => {
                        var len = index;
                        const node = ReactDOM.findDOMNode(this['_div' + len]);
                        if (node) {
                            console.log('node***********', node)
                            node.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 1000)
                })
            }, 100)
        }
    }

    componentWillReceiveProps(props) {
        const { allUser, chats, chatFlag, open } = props;
        const { chatData, warningArr } = this.state;
        var arr = [];
        if (allUser) {
            setTimeout(() => {
                chats.sort(
                    function (a, b) {
                        return a.data.time - b.data.time
                    }
                );
                console.log('Chatsssss', chats)
                this.setState({ chatArr: chats, allUser, warningArr: [] })

                chats.map((item, index) => {
                    if ((item.data.sender === chatData.data.sender && item.data.reciever === chatData.data.reciever)
                        ||
                        (item.data.sender === chatData.data.reciever && item.data.reciever === chatData.data.sender)
                    ) {
                        if (item.data.warning) {
                            item.data.adminSeen = true;
                            props.actions.updateWarningSeen(item.key, chats, !chatFlag)

                            arr.push(index)
                            this.setState({ warningArr: arr })
                        }
                    }
                    setTimeout(() => {
                        var len = index;
                        const node = ReactDOM.findDOMNode(this['_div' + len]);
                        if (node) {
                            console.log('node***********', node)
                            node.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
                        }
                    }, 1000)
                })
            }, 100)
        }
    }


    _close() {
        const { refreshItem } = this.props
        refreshItem()
        this.setState({ chatData: null })
    }

    _reciever(item, index) {
        const { allUser, warningArr } = this.state;
        return (
            <li ref={(ref) => this['_div' + index] = ref} className={item.data.warning ? 'WarningSenderMgs' : 'SenderList'}>
                {
                    item.data.warning ?
                        <div>
                            {item.data.message}
                            <ChatUser item={item.data.sender} />
                        </div>
                        :
                        <div>{item.data.message}</div>
                }
            </li>
        )
    }

    _sender(item, index) {
        const { allUser, warningArr } = this.state;
        return (
            <li ref={(ref) => this['_div' + index] = ref} className={item.data.warning ? 'WarningRecieverMsgs' : 'RecieverList'}>
                {
                    item.data.warning ?
                        <div>
                            {item.data.message}
                            <ChatUser item={item.data.sender} />
                        </div>
                        :
                        <div>{item.data.message}</div>
                }
            </li>
        )
    }

    _messages = (item, index) => {
        const { chatData, warningArr, allUser } = this.state;
        console.log('Run***************', item)
        if (item.data.sender === chatData.data.sender && item.data.reciever === chatData.data.reciever) {
            return this._sender(item, index)
        }
        if (item.data.reciever === chatData.data.sender && item.data.sender === chatData.data.reciever) {
            return this._reciever(item, index)
        }
    }

    // _adminSeen(index){

    // }

    _warningMsg() {
        const { warningArr, count } = this.state;
        console.log('Index', warningArr, count)
        if (warningArr.length) {
            var len;
            if (count === 0) {
                len = warningArr[count]
                this.setState({ count: count + 1 })
            }
            else {
                if (warningArr.length + 1 > count) {
                    len = warningArr[count]
                    this.setState({ count: count + 1 })
                }
            }
            if (count === warningArr.length - 1) {
                this.setState({ count: 0 })
            }
            if (len) {
                const node = ReactDOM.findDOMNode(this['_div' + len]);
                if (node) {
                    console.log('node', node)
                    node.scrollIntoView();
                }
            }
        }
    }

    render() {
        const { open, chatArr, focus, warningArr } = this.state;
        // console.log('chatArr', chatArr)
        return (
            <div>
                <div className={'ChatDiv'}>
                    <div className={'ChatHeadDiv'} onClick={this._close}>
                        Close Chat
                        </div>
                    <div className={"blankDiv"}>

                    </div>
                    <div
                        ref={(el) => { this.messagesContainer = el; }}
                        className={'ChatMessagesDiv'}
                    >
                        <ul>
                            {
                                chatArr.map((item, index) => {
                                    return this._messages(item, index)
                                })
                            }
                        </ul>
                    </div>
                    <div className={"SendingDivo"}>
                        <div style={{ textAlign: "center" }}>
                            {
                                warningArr.length ? 'Tap Arrow To See Warning Chat' : 'No Warning In This Chat'
                            }
                        </div>
                        <div style={{ paddingTop: 1 }} onClick={this._warningMsg}>
                            <FontAwesomeIcon
                                size={'1x'}
                                icon={"arrow-alt-circle-up"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(states) {
    return ({
        currentUserUID: states.authReducer.CURRENTUSERUID,
        chats: states.chatReducer.ALLCHAT,
        chatFlag: states.chatReducer.CHATFLAG,
        allUser: states.authReducer.USERS,

    })
}

function mapDispatchToProps(dispatch) {
    return ({
        actions: bindActionCreators({
            ChatAction, updateWarningSeen
        }, dispatch)
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(AllChatsAdmin);