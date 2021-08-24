import React, { Component } from 'react';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import { connect } from 'react-redux';
import './Contact.css';
import History from '../../../History/History';


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import SendMail from './SendMail';
import { ClipLoader } from 'react-spinners';


const styles = theme => ({
    mainroot: {
        width: '100%',
    },
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
});



class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: [],
            role: null
        }
    }

    componentWillMount() {
        const { contact, role } = this.props;
        if (role) {
            console.log('role****', role)
            setTimeout(() => {
                contact.sort(
                    function (a, b) {
                        return new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
                    }
                );
                this.setState({ contact, role })
            }, 1000)
        }
    }
    componentWillReceiveProps(props) {
        const { contact, role } = props;
        if (role) {
            console.log('role****', role, contact)
            setTimeout(() => {
                contact.sort(
                    function (a, b) {
                        return new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
                    }
                );
                this.setState({ contact, role })
            }, 1000)
        }
    }

    render() {
        const { classes } = this.props;
        const { contact, role } = this.state;
        return (
            <AdminDashboard>
                {
                    contact && role ?
                        <div className={'AdminUserDiv'}>
                            <div className={"Users"}>
                                Users Issue
                            <Button style={{ float: 'right' }} variant={"outlined"} color={"primary"} onClick={() => History.goBack()}>go back</Button>
                            </div>
                            {
                                contact.length ?
                                    <Paper className={classes.root}>
                                        <Table className={classes.table}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell className={'THead'}>Name</TableCell>
                                                    <TableCell className={'THead'} align="right">Email Address</TableCell>
                                                    <TableCell className={'THead'} align="right">Subject</TableCell>
                                                    <TableCell className={'THead'} align="right">Message</TableCell>
                                                    <TableCell className={'THead'} align="right">Reply</TableCell>
                                                </TableRow>
                                            </TableHead>

                                            <TableBody>
                                                {
                                                    contact ?
                                                        contact.map(item => {
                                                            return <TableRow>
                                                                <TableCell>{item.data.name}</TableCell>
                                                                <TableCell align="right">{item.data.email}</TableCell>
                                                                <TableCell align="right">{item.data.subject}</TableCell>
                                                                <TableCell align="right">{item.data.message}</TableCell>
                                                                <TableCell className={'THead'} align="right">
                                                                    <SendMail item={item} />
                                                                </TableCell>
                                                            </TableRow>
                                                        })
                                                        :
                                                        null
                                                }
                                            </TableBody>
                                        </Table>
                                    </Paper>
                                    :
                                    <div style={{ textAlign: 'center', fontSize: 24, color: 'grey' }}>No Issues</div>
                            }
                        </div>

                        :
                        <div className={'AdminUserDiv'}>
                            <div className={"Users"}>
                                Users Issue
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <ClipLoader
                                    sizeUnit={"px"}
                                    size={120}
                                    color={'#f27b01'}
                                    loading={true}
                                />
                            </div>
                        </div>
                }
            </AdminDashboard>
        )
    }
}

Contact.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(states) {
    return ({
        contact: states.authReducer.CONTACT,
        role: states.authReducer.ROLE,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        // LoginUser: (user) => {
        //     dispatch(LoginAction(user));
        // }
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Contact));