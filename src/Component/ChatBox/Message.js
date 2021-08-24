import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ChatAction, UpdateSeen } from '../../store/action/chatAction';
import './Message.css';
import SendImage from '../../Assets/images/message.png'
import disableImage from '../../Assets/images/message2.png'
import ReactDOM from 'react-dom';
import Loader from 'react-loader-spinner'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import WarningIcon from '@material-ui/icons/Warning';
import Snackbar from '@material-ui/core/Snackbar';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
library.add(faLocationArrow)

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

function MySnackbarContent(props) {
    const { classes, className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={classNames(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            // action={[
            //     <IconButton
            //         key="close"
            //         aria-label="Close"
            //         color="inherit"
            //         className={classes.close}
            //         onClick={onClose}
            //     >
            //         <CloseIcon className={classes.icon} />
            //     </IconButton>,
            // ]}
            {...other}
        />
    );
}

MySnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const styles1 = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

class MessageTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatLength: 0,
            warn: false,
            focus: false,
            open: false,
            otherUID: props.otherUID,
            message: '',
            chatArr: [],
            currentUserUID: null,

            chatUserUID: []
        }

        this._text = this._text.bind(this);
        this._send = this._send.bind(this);
        this._close = this._close.bind(this);
        this._open = this._open.bind(this);
        this._sender = this._sender.bind(this);
        this._reciever = this._reciever.bind(this);


        this.scrollToBottom = this.scrollToBottom.bind(this);
    }


    scrollToBottom = () => {
        const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    componentWillMount() {
        const { currentUserUID, otherUID, chats, open } = this.props;

        console.log(currentUserUID, 'cuprops.currentUserUID wilmount')

        if (currentUserUID) {
            setTimeout(() => {
                console.log('Chatssss', chats, currentUserUID, otherUID)
                if (chats) {
                    chats.sort(
                        function (a, b) {
                            return a.time - b.time
                        }
                    );
                    this.setState({ chatArr: chats, currentUserUID })
                    this.scrollDown()
                }
            }, 100)
        }

        // Wasi Code


        if (this.props.openChatMessage) {
            const msg = this.props.openChatMessage
            let arr = []
            chats.map((items, index) => {
                if ((items.sender === msg.sender && items.reciever === msg.reciever)
                    ||
                    (items.sender === msg.reciever && items.reciever === msg.sender)
                ) {
                    // if (!items.seen && items.reciever === currentUserUID) {
                    //     console.log('working seen messages')
                    //     const { UpdateSeen } = this.props.actions
                    //     UpdateSeen(items, currentUserUID, otherUID)
                    // }
                    arr.push(items)
                }
                if (chats.length === index + 1) {
                    const { UpdateSeen } = this.props.actions
                    console.log('working seen messages', 'items', items, 'msg', msg, 'currentUserUID', currentUserUID)
                    UpdateSeen(items, currentUserUID, otherUID)
                }
                this.setState({ chatArr: arr }, () => {
                })
            })
        }


        // Wasi Coode


        if (this.props.openChat) {
            this.setState({ open: true })
        }

        if (this.props.allUsers) {
            const { allUsers, otherUID } = this.props
            allUsers.map((items => {
                if (items.data.userUid === otherUID) {
                    const fn = items.data.firstName
                    const ln = items.data.lastName
                    const user = `${(fn.slice(0, 1)).toUpperCase() + fn.slice(1)} ${ln}`
                    this.setState({ username: user })
                }
            }))
        }
    }


    componentWillReceiveProps(props) {
        const { currentUserUID, chats, otherUID, open } = props;
        const { chatLength } = this.state;
        console.log(props.currentUserUID, 'cuprops.currentUserUID props')
        if (chatLength < chats.length) {
            if (currentUserUID) {
                if (chats) {

                    // console.log(chats, 'chtas herer')
                    setTimeout(() => {
                        chats.sort(
                            function (a, b) {
                                return a.time - b.time
                            }
                        );
                        this.setState({ chatArr: chats, currentUserUID })

                    }, 100)
                }

            }

            if (props.openChatMessage) {
                const msg = props.openChatMessage
                let arr = []
                console.log('working seen Show Run Count')
                chats.map((items, index) => {
                    if (items.sender === msg.sender && items.reciever === msg.reciever) {
                        // if (!items.seen && items.reciever === currentUserUID) {
                        //     console.log('working seen messages')
                        //     const { UpdateSeen } = props.actions
                        //     UpdateSeen(items, currentUserUID, otherUID)
                        // }
                        arr.push(items)

                    }
                    if (chats.length === index + 1) {
                        const { UpdateSeen } = props.actions
                        console.log('working seen messagesChats Length', chats.length)
                        UpdateSeen(items, currentUserUID, otherUID)
                    }
                    this.setState({ chatArr: arr, chatLength: chats.length }, () => {
                    })
                })
            }

            if (props.dropdown) {
                this.setState({ open: false })
            } else {
                this.setState({ open: true })
            }

            if (props.otherUID) {
                this.setState({ otherUID: props.otherUID })
            }

            if (props.allUsers) {
                const { allUsers, otherUID } = props
                allUsers.map((items => {
                    if (items.data.userUid === otherUID) {
                        const fn = items.data.firstName
                        const ln = items.data.lastName
                        const user = `${(fn.slice(0, 1)).toUpperCase() + fn.slice(1)} ${ln}`
                        this.setState({ username: user })
                    }
                }))
            }

        }
    }


    scrollDown() {
        setTimeout(() => {

            const { otherUID, currentUserUID, chatUserUID, chatArr } = this.state;
            if (chatArr && chatArr.length) {
                chatArr.map((item, index) => {
                    if ((item.sender === currentUserUID && item.reciever === otherUID) || (item.reciever === currentUserUID && item.sender === otherUID)) {
                        const node = ReactDOM.findDOMNode(this['_div' + index]);
                        if (node) {
                            node.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
                        }
                    }
                })
            }
        }, 100);

        return true
    }


    _close() {
        const { closeChat } = this.props
        this.setState({ open: false })

        if (closeChat) {
            closeChat()
        }

    }

    _open() {
        this.setState({ open: true })
    }

    _reciever(item, index) {
        return (
            <div ref={(ref) => this['_div' + index] = ref} className={'SenderMsg'}>
                <div className={'msg-Time'}>
                    <div>
                        {item.message}
                    </div>
                    <div>
                        {new Date(item.time).toLocaleTimeString()}
                    </div>
                </div>
            </div>
        )
    }

    _sender(item, index) {
        return (
            <div ref={(ref) => this['_div' + index] = ref} className={'RecieverMsg'}>
                <div className={'msg-Time2'}>
                    <div>
                        {item.message}
                    </div>
                    <div>
                        {new Date(item.time).toLocaleTimeString()}
                    </div>
                </div>
            </div>
        )
    }

    _messages = (item, index) => {
        const { otherUID, currentUserUID, chatUserUID } = this.state;

        if (item.sender === currentUserUID && item.reciever === otherUID) {
            return this._reciever(item, index)
        }
        else if (item.reciever === currentUserUID && item.sender === otherUID) {

            return this._sender(item, index)
        }
    }

    seenMessages(items, index) {
        const { currentUserUID, otherUID } = this.state
        // console.log(items, 'items')
        // console.log(currentUserUID, 'currentUserUID')
        if (currentUserUID === items.reciever) {

            return this._messages(items, index)

        } else {
            return this._messages(items, index)
        }
    }

    _text(val) {
        this.setState({ message: val })

        if (val.toUpperCase().includes("PAY") || val.toUpperCase().includes("PRICE") || val.toUpperCase().includes("@") ||
            val.toUpperCase().includes("EMAIL") || val.toUpperCase().includes("CALL") || val.toUpperCase().includes("AMOUNT") ||
            val.toUpperCase().includes("CASH")) {
            this.setState({ warn: true, })
        }else{
            this.setState({ warn: false })
        }

        if (val) {
            this.setState({ focus: true })
        } else {
            this.setState({ focus: false })
        }
    }

    _send() {
        const { message, otherUID, currentUserUID, warn } = this.state;
        // console.log('Time', new Date().getTime())
        if (message) {
            let msgObj = {
                reciever: otherUID,
                sender: currentUserUID,
                message,
                time: new Date().getTime(),
                warning: warn,
                adminSeen: warn ? false : true,
                seen: false
            }
            console.log('sg obj', msgObj)
            // console.log(msgObj, 'msgObjmsgObj')
            this.setState({ message: '', loading: true })
            if (message) {
                this.props.actions.ChatAction(msgObj)
                    .then(() => {
                        this.setState({ loading: false, warn: false })
                        console.log('mesahsdjashvd', message)

                        document.getElementsByTagName('input')[0].focus()
                    })
            }
        } else {
            this.setState({ message: '', loading: false })

        }
    }


    pressEnter(e) {
        const { message } = this.state
        if (e.key === 'Enter') {
            if (message) {
                this._send()
            }
        }
    }


    render() {
        const { open, message, chatArr, focus, warn, loading, username, warnMsg } = this.state;
        const { classes } = this.props
        // console.log('message', message)
        return (
            <div>
                {
                    open && this.scrollDown() &&
                    <div className={'Chat'}>
                        <div className={'ChatHead'} onClick={() => this._close()}>
                            {
                                username ?
                                    username :
                                    'User'
                            }
                        </div>
                        <div
                            ref={(el) => { this.messagesContainer = el; }}
                            className={'ChatMessages'}
                        >
                            <ul>
                                {
                                    chatArr.map((item, index) => {
                                        // return this._messages(item, index)
                                        return this.seenMessages(item, index)
                                    })
                                }
                            </ul>
                        </div>

                        {warn ?
                            <div className={'warning_Divs'} >

                                <MySnackbarContentWrapper
                                    variant="warning"
                                    // className={'warning_Div'}
                                    // className={classes.margin}
                                    message=
                                    {
                                        `Providing email, Skype, or phone number is only allowed if it is 
                                        needed as part of the service.Otherwise, all communication must 
                                        go through Teq Exchange.!`
                                    }
                                />
                            </div>
                            :
                            null
                        }

                        <div className={"SendingDiv"}>
                            <div>
                                {
                                    loading ?
                                        <input className={focus ? 'Focus' : 'Blur'}
                                            placeholder={'Sending...'}
                                            disabled
                                            value={message}
                                        />
                                        :
                                        <input className={focus ? 'Focus' : 'Blur'}
                                            placeholder={'Type Something...'}
                                            value={message}
                                            onKeyPress={(e) => this.pressEnter(e)}
                                            onChange={(e) => this._text(e.target.value)}
                                        />

                                }
                            </div>
                            {
                                focus ?
                                    loading ?
                                        <div style={{ marginTop: '5px', cursor: 'text' }}>
                                            <Loader
                                                type="ThreeDots"
                                                color="#f27b01"
                                                height="25"
                                                width="25"
                                            />
                                        </div>
                                        :
                                        <div onClick={() => this._send()}>
                                            <img src={SendImage} width={35} />
                                        </div>
                                    :
                                    <div>
                                        <img src={disableImage} style={{ cursor: 'text' }} width={35} />
                                    </div>
                            }
                        </div>
                    </div>
                }
                {
                    !open &&
                    <div className={'CloseChat'} onClick={() => this._open()}>
                        Open Chat!
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(states) {
    return ({
        currentUserUID: states.authReducer.CURRENTUSERUID,
        chats: states.chatReducer.CHAT,
        // chatFlag: states.chatReducer.CHATFLAG,
        notSeen: states.chatReducer.NOTSEEN,
        modifiedSeen: states.chatReducer.MODIFIEDSEEN,
        allUsers: states.authReducer.USERS,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        actions: bindActionCreators({
            ChatAction, UpdateSeen
        }, dispatch)
    })
}


const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

export default connect(mapStateToProps, mapDispatchToProps)(MessageTemplate);