import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Button } from '@material-ui/core';
import './AdminDashboard.css'
import History from '../../../History/History';
import firebase from '../../../Config/Firebase/firebase';
import ChatBox from '../../../Component/ChatBox/ChatBox';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AllChatsAdmin from '../../../Component/Admin/AdminMessages/AllChats';

import { LogoutAction } from '../../../store/action/action'
import logo from '../../../Assets/images/teqXC_logo-01.png'
import logo1 from '../../../Assets/images/LogoUpdated.png'


import { faHome, faTags, faUserEdit, faSort, faUserLock, faUsers, faUserCheck, faShoppingCart, faMailBulk, faComments, faMoneyBill, faSpinner, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { AllChats } from '../../../store/action/chatAction';
library.add(faHome, faTags, faUserEdit, faSort, faUserLock, faUsers, faUserCheck, faShoppingCart, faMailBulk, faComments, faMoneyBill, faSpinner, faInfoCircle);


const firestore = require("firebase");
// Required for side-effects
require("firebase/firestore");

const db = firebase.firestore();

db.settings({
    timestampsInSnapshots: true
});

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing.unit * 7 + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9 + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});

class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            chatWith: [],
            chatItems: null
        }

        // this.chatItem = this.chatItem.bind(this)
    }

    componentWillMount() {
        const { chats, chatFlag, allUser } = this.props;
        if (chats) {
            chats.sort(
                function (a, b) {
                    return b.data.time - a.data.time
                }
            );
            var arr = [];
            var result = [];
            chats.forEach(emotion => {
                var val1 = emotion.data.sender + emotion.data.reciever;
                var val2 = emotion.data.reciever + emotion.data.sender;
                if (arr.indexOf(val1) === -1 && arr.indexOf(val2) === -1) {
                    arr.push(val1)
                    result.push(emotion)
                }
                console.log('arrayKeysss', arr)
            })
            this.setState({ chatWith: result })
        }
    }
    componentWillReceiveProps(props) {
        const { chats, chatFlag, allUser } = props;
        console.log(chatFlag, 'Chats', chats);
        if (chats) {
            chats.sort(
                function (a, b) {
                    return b.data.time - a.data.time
                }
            );
            var arr = [];
            var result = [];
            chats.forEach(emotion => {
                var val1 = emotion.data.sender + emotion.data.reciever;
                var val2 = emotion.data.reciever + emotion.data.sender;
                if (arr.indexOf(val1) === -1 && arr.indexOf(val2) === -1) {
                    arr.push(val1)
                    result.push(emotion)
                }
                // console.log('arrayKeysss', arr)
            })
            this.setState({ chatWith: result })
        }
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };


    _logout = () => {
        this.props.actions.LogoutAction()

        // firebase.auth().signOut()
        //     .then(() => {
        //         console.log('Success')
        //     })
    }

    _chatItem = (item) => {
        this.setState({ chatItems: item })
        console.log('ItemChat', item)
    }

    render() {
        const { classes, theme, children } = this.props;
        const { chatWith, chatItems } = this.state;
        console.log('children', this.props)
        return (
            <div className={`${classes.root} AdminDashboardCss`}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: this.state.open,
                    })}
                >
                    <Toolbar disableGutters={!this.state.open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, {
                                [classes.hide]: this.state.open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h4" color="inherit" style={{ cursor: 'pointer' }} noWrap onClick={() => History.push('/')}>
                            <img src={logo1} style={{ width: 180, height: 55, marginRight: 15 }} alt="Log" />
                            {/* Iftar Bazar */}
                        </Typography>
                        <Typography style={{ textAlign: "right" }} variant="div" color="inherit" noWrap>
                            <div className={"Logout-btn"}>
                                {/* <ChatBox chatItem={this._chatItem} closeChat={() => { this.setState({ chatItems: null }) }} chatWith={chatWith} /> */}
                                <div style={{ marginLeft: 30 }}>
                                    <button className={'LogoutBtn'} onClick={this._logout}>
                                        Log out
                                </button>
                                </div>
                            </div>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={classNames(classes.drawer, {
                        [classes.drawerOpen]: this.state.open,
                        [classes.drawerClose]: !this.state.open,
                    })}
                    classes={{
                        paper: classNames({
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open,
                        }),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbar}>
                        <img src={logo} style={{ width: 60, height: 60 }} alt="Log" />
                        <h3 style={{ margin: '0px auto', color: 'grey' }}>Admin</h3>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {
                            [
                                { text: 'Dashboard', icon: 'home', compo: '/' },
                                { text: 'Users', icon: 'users', compo: '/sellerCards' },
                                { text: 'Products', icon: 'tags', compo: '/products' },
                                { text: 'Orders', icon: 'shopping-cart', compo: '/orders' },
                                { text: 'Transactions', icon: 'money-bill', compo: '/transaction' },
                                { text: 'Mails', icon: 'mail-bulk', compo: '/contact' },
                                { text: 'Our Sellers', icon: 'users', compo: '/OurSellers' },
                                { text: 'About', icon: 'info-circle', compo: '/about' }
                            ].map((item, index) => (
                                <ListItem button key={item.text} onClick={() => { History.push(item.compo) }}>
                                    {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                                    <ListItemIcon>
                                        <FontAwesomeIcon
                                            size='1x'
                                            icon={`${item.icon}`}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                            ))}
                        <ListItem button key={'Refresh'} onClick={() => window.location.reload()}>
                            <ListItemIcon>
                                <FontAwesomeIcon
                                    size='1x'
                                    icon={'spinner'}
                                />
                            </ListItemIcon>
                            <ListItemText primary={'Refresh'} />
                        </ListItem>
                    </List>
                    <Divider />
                </Drawer>
                {
                    this.props.children
                }
            </div>
        );
    }
}

AdminDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

// export default withStyles(styles, { withTheme: true })(AdminDashboard);


function mapStateToProps(state) {
    return ({
        chats: state.chatReducer.ALLCHAT,
        chatFlag: state.chatReducer.CHATFLAG,
        allUser: state.authReducer.USERS,
    })
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            LogoutAction
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(AdminDashboard));