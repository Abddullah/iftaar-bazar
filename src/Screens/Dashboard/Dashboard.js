import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { seenBadge } from '../../store/action/chatAction'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Badge } from '@material-ui/core'
import TimeAgo from 'react-timeago'
import History from '../../History/History';
import { LogoutAction } from '../../store/action/action';
import { searchProductAction, searchProductTextAction, getBasketItems } from '../../store/action/productAction';
import logo from '../../Assets/images/icon-01.png';

import logo1 from '../../Assets/images/headerLogo.png'
import { Button } from '@material-ui/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import firebase from '../../Config/Firebase/firebase';
import Image from '../../Assets/images/LogoUpdated.png'
import MessageTemplate from '../../Component/ChatBox/Message';

import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

import '../Dashboard/Dashboard.css'
import { faHome, faTags, faUserEdit, faSort, faUserLock, faUser, faUserCheck, faShoppingCart, faShoppingBasket, faComment } from '@fortawesome/free-solid-svg-icons';
import ChatBox from '../../Component/ChatBox/ChatBox';
import { AirlineSeatReclineExtraOutlined } from '@material-ui/icons';
library.add(faHome, faTags, faUserEdit, faSort, faUserLock, faUser, faUserCheck, faShoppingCart, faShoppingBasket, faComment)
const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
        height: '55px'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },

    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },

    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
});

class PersistentDrawerLeft extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: '',
            open: false,
            text: 'Home',
            openChatBox: false,
            currentUser: true,
            chatOpen: false,
            count: 0,
            messageList: [],
            allUsers: [],
            basket: null
        }

        this.pageChange = this.pageChange.bind(this);
        this.logout = this.logout.bind(this);
        this.Login = this.Login.bind(this);

    }

    componentWillMount() {
        const { basket, addBasket } = this.props
        const { getBasketItems } = this.props.actions
        window.scrollTo(0, 0)
        const myData = localStorage.getItem('myBasket')
        if (myData) {
        } else {
            localStorage.setItem('myBasket', JSON.stringify([]))
        }
        getBasketItems()

        if (basket && basket.length) {
            console.log(basket, 'basket items')
            var count = 0
            basket.map((items) => {
                count += items.quantity
                this.setState({ badge: count })
            })
        }
    }


    componentWillReceiveProps(props) {
        const { basket, cartFlag } = props

        if (basket && basket.length || cartFlag || !cartFlag) {
            console.log(basket, 'basket items')

            var count = 0
            basket.map((items) => {
                count += items.quantity
                this.setState({ badge: count })
            })
        }
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    pageChange(path, text) {
        History.push(path);
        // console.log('Text', path, text);
        this.setState({ text })
    }

    logout() {
        // this.props.LogoutAction()
        this.props.actions.LogoutAction()
            .then((success) => {
                this.setState({ auth: 'logout' })
                this.props.history.index = 0;
            })
            .catch((error) => {
                this.setState({ auth: '' })
            })
    }

    Login() {
        History.push('/login')
    }

    openChatBox(items) {
        // console.log(items, 'my items here')
        this.setState({
            openChatBox: {
                reciever: items.reciever,
                sender: items.sender,
                openChatBox: true,
            },
            chatOpen: true,
            dropdownOpen: false,
        })
    }

    myChat(items, index) {
        const { badgeNum } = this.state
        const name = items.data
        const userMessages = items.message.slice(0)

        return (
            <div onClick={() => this.openChatBox(items)} className={'chat-row'}>
                <div className={'chat-image'}>
                    <div>
                        {
                            name.firstName.slice(0, 1).toUpperCase()
                        }
                    </div>
                </div>
                <div>
                    {/* {name.firstName + ' ' + name.lastName} */}
                    {`${(name.firstName.slice(0, 1)).toUpperCase()}${name.firstName.slice(1) + ' ' + name.lastName}`}
                    <span className={'msg-badge'}>{
                        badgeNum &&
                            badgeNum[index] &&
                            // badgeNum[index].sender === items.sender &&
                            badgeNum[index].badge ?
                            badgeNum[index].badge
                            : null

                    }</span>
                    <div style={{ color: 'grey', fontSize: '12px', fontWeight: '400' }}>
                        <span>
                            {
                                userMessages.length > 20 ?
                                    userMessages.slice(0, 20) + '...'
                                    :
                                    userMessages
                            }
                        </span>
                        <span style={{ float: 'right', marginRight: '10px' }}>
                            {/* <TimeAgo date={items.time} /> */}
                        </span>
                    </div>
                </div>
                <div className={'chat-hr'}>
                    <hr />
                </div>
            </div>
        )
    }

    showMore(text) {
        this.setState({ showmore: text })
    }

    closeChat() {
        this.setState({
            chatOpen: false
        })
    }

    Home() {
        this.props.actions.searchProductTextAction("")
        History.push('/')
    }


    _search = (val) => {
        const { allProducts } = this.props;
        var arr = [];
        if (allProducts && allProducts.length) {
            allProducts.map(item => {
                if (
                    (item.data.status === 'approved') &&
                    (item.data.name.toUpperCase().match(val.toUpperCase()) ||
                        item.data.brand.toUpperCase().match(val.toUpperCase()) ||
                        item.data.productType.toUpperCase().match(val.toUpperCase()) ||
                        item.data.manufacture.toUpperCase().match(val.toUpperCase()))
                ) {
                    arr.push(item)
                }
            })
        }
        console.log('Search Product Dashboard***', arr);
        this.props.actions.searchProductAction(arr)
        this.props.actions.searchProductTextAction(val)
    }


    render() {
        const { classes, theme, currentUser, currentUserUID } = this.props;
        const { open, text, badge, auth, messageList, basket, openChatBox, dropdownOpen, notSeenAll, chatOpen } = this.state;
        // console.log('Text', text);
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    style={{ backgroundColor: '#3f984f' }}
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        {
                            currentUserUID ?

                                <IconButton
                                    color="inherit"
                                    aria-label="Open drawer"
                                    onClick={this.handleDrawerOpen}
                                    className={classNames(classes.menuButton, open && classes.hide)}
                                >
                                    <MenuIcon />
                                </IconButton>
                                :
                                null
                        }
                        <Typography variant="h6" color="inherit" noWrap>
                            {/* Persistent drawer */}
                            <div className={'logoHeader'}>
                                <div style={{ paddingLeft: 20 }}>
                                    <img onClick={() => this.Home()} src={Image} style={{ width: 180, height: 64, cursor: 'pointer' }} alt="Log" />
                                </div>
                                {/* <div>
                                    <h4 onClick={() => this.Home()} style={{ cursor: 'pointer' }} className={"Heading"}>Iftar Bazar</h4>
                                </div> */}
                            </div>
                        </Typography>
                        <div className={"Logout-btn"}>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    onChange={(e) => { this._search(e.target.value) }}
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                />
                            </div>
                            {
                                <Button size={'small'} onClick={() => History.push('/cart')} className={'cartIconBtn'}>
                                    {
                                        badge ?
                                            <Badge color={'primary'} badgeContent={badge && badge}>
                                                <FontAwesomeIcon className={'cart-Icon'} icon={'shopping-cart'} />
                                            </Badge>
                                            :
                                            <FontAwesomeIcon className={'cart-Icon'} icon={'shopping-cart'} />
                                    }
                                </Button>
                            }
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <img src={logo} style={{ width: 60, height: 60 }} alt="Log" />
                        <h3 style={{ color: 'grey' }}>Teq XC</h3>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    {
                        currentUser && currentUser.role === 'seller' ?
                            < List >
                                {currentUserUID ?
                                    < List >
                                        {
                                            [{ Text: 'Home', icon: 'home', path: '/' }, { Text: 'Products', icon: 'tags', path: '/products' }, { Text: 'Order', icon: 'shopping-basket', path: '/orders' }, { Text: 'Profile', icon: 'user-check', path: '/profile' }].map((item, index) => (
                                                <ListItem button onClick={() => this.pageChange(item.path, item.Text)} className={classes.listItem} key={item.Text}>
                                                    <ListItemIcon>
                                                        <FontAwesomeIcon
                                                            size='1x'
                                                            icon={`${item.icon}`}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText primary={item.Text} />
                                                </ListItem>
                                            ))
                                        }
                                    </ List>
                                    :
                                    < List >
                                        {
                                            [{ Text: 'Home', icon: 'home', path: '/' }].map((item, index) => (
                                                <ListItem button onClick={() => this.pageChange(item.path, item.Text)} className={classes.listItem} key={item.Text}>
                                                    <ListItemIcon>
                                                        <FontAwesomeIcon
                                                            size='1x'
                                                            icon={`${item.icon}`}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText primary={item.Text} />
                                                </ListItem>
                                            ))
                                        }
                                    </ List>
                                }

                            </List>
                            :
                            < List >
                                {currentUserUID ?
                                    < List >
                                        {
                                            [{ Text: 'Home', icon: 'home', path: '/' }, { Text: 'Order', icon: 'shopping-basket', path: '/orders' }, { Text: 'Profile', icon: 'user-check', path: '/profile' }].map((item, index) => (
                                                <ListItem button onClick={() => this.pageChange(item.path, item.Text)} className={classes.listItem} key={item.Text}>
                                                    <ListItemIcon>
                                                        <FontAwesomeIcon
                                                            size='1x'
                                                            icon={`${item.icon}`}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText primary={item.Text} />
                                                </ListItem>
                                            ))
                                        }
                                    </ List>
                                    :
                                    < List >
                                        {
                                            [{ Text: 'Home', icon: 'home', path: '/' }].map((item, index) => (
                                                <ListItem button onClick={() => this.pageChange(item.path, item.Text)} className={classes.listItem} key={item.Text}>
                                                    <ListItemIcon>
                                                        <FontAwesomeIcon
                                                            size='1x'
                                                            icon={`${item.icon}`}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText primary={item.Text} />
                                                </ListItem>
                                            ))
                                        }
                                    </ List>
                                }

                            </List>
                    }
                    <Divider />
                </Drawer>
                <main
                    className={classNames(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                </main>
                {
                    currentUserUID ?
                        <div>
                            {/* <MessageTemplate otherUID={product.data.userUid} /> */}
                            {
                                chatOpen ?
                                    <MessageTemplate
                                        otherUID={currentUserUID !== openChatBox.sender ? openChatBox.sender : openChatBox.reciever}
                                        openChatMessage={openChatBox}
                                        closeChat={() => this.closeChat()}
                                        openChat={chatOpen}
                                        dropdown={dropdownOpen}
                                    />
                                    :
                                    null
                            }
                        </div>
                        :
                        null
                }
            </div >
        );
    }
}

PersistentDrawerLeft.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

function mapStateToProps(states) {
    return ({
        currentUser: states.authReducer.CURRENTUSER,
        allUsers: states.authReducer.USERS,
        currentUserUID: states.authReducer.CURRENTUSERUID,
        myCart: states.cartReducer.CART,
        counter: states.cartReducer.COUNTER,
        authChange: states.authReducer.AUTHCHANGE,
        flag: states.cartReducer.FLAG,
        chat: states.chatReducer.CHAT,
        notSeen: states.chatReducer.NOTSEEN,
        modifiedSeen: states.chatReducer.MODIFIEDSEEN,
        allProducts: states.productReducer.ALLPRODUCTS,
        basket: states.productReducer.GETCART,
        cartFlag: states.productReducer.CARTFLAG,
    })
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            LogoutAction, seenBadge, searchProductAction, searchProductTextAction,
            getBasketItems
        }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(PersistentDrawerLeft));