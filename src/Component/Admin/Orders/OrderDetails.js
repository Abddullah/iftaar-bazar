import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core';
import History from '../../../History/History';



import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Image from '../../../Assets/images/pdfDownload.png';
import OrderSeller from './OrderSeller';

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

class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: null,
            data: this.props.item,
            status: this.props.status,
            userData: null

        }
    }

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    componentWillMount() {
        const { allUser } = this.props;
        const { data } = this.state;
        console.log('allUser***', allUser)
        if (allUser) {
            allUser.map(item => {
                if (item.data.userUid === data.userUid) {
                    this.setState({ userData: item.data })
                    console.log('item.data.userUid', item.data.userUid)
                }
            })
        }
    }

    componentWillReceiveProps(props) {
        const { allUser } = props;
        console.log('allUser', allUser)
        const { data } = this.state;
        // console.log('allUser***', allUser)
        if (allUser) {
            allUser.map(item => {
                if (item.data.userUid === data.userUid) {
                    this.setState({ userData: item.data })
                    console.log('item.data.userUidProps', item.data.userUid)
                }
            })
        }
    }

    render() {
        const { classes } = this.props;
        const { expanded, data, userData, status } = this.state;

        console.log('status****', status)
        return (
            <div className={classes.mainroot}>
                <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>Product Detail</Typography>
                        <Typography style={{ width: '100%' }} className={classes.secondaryHeading}>
                            <div style={{ color: '#0275d8', width: '50%', float: 'left' }}>{expanded ? 'Close Product Detail' : 'Click To View Product Detail'}</div>
                            <div style={{ width: '50%', float: 'left', textAlign: 'right', color: '#b5b3b3' }}>{status.toUpperCase()}</div></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className={"Order_Product_Detail"}>
                            <div className={'Images'}>
                                {
                                    data.images.length ?
                                        data.images.map(item => {
                                            return <img src={item.image} style={{ width: '200px' }} />
                                        })
                                        :
                                        <img src={'https://www.spiritexpressclub.com/sc/wp-content/uploads/2016/06/imagecomingsoon-500x500.png'} />
                                }
                            </div>
                            <div>
                                <Paper className={classes.root}>
                                    <Table className={classes.table}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Product Name</TableCell>
                                                <TableCell align="right">Brand</TableCell>
                                                <TableCell align="right">Model</TableCell>
                                                <TableCell align="right">Specification</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>{data.name}</TableCell>
                                                <TableCell align="right">{data.brand}</TableCell>
                                                <TableCell align="right">{data.model}</TableCell>
                                                <TableCell align="right">{data.summarySpecs ? data.summarySpecs : 'No Specification for This Product'}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Series</TableCell>
                                                <TableCell align="right">Code</TableCell>
                                                <TableCell align="right">Product Type</TableCell>
                                                <TableCell align="right">Product File</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>{data.series}</TableCell>
                                                <TableCell align="right">{data.code}</TableCell>
                                                <TableCell align="right">${data.productType}</TableCell>
                                                <TableCell align="right">
                                                    {
                                                        data.pdf ?
                                                            <a href={data.pdf} target={'_blank'} download>
                                                                <img src={Image} style={{ width: '30px' }} /> <span>{data.filename}</span>
                                                            </a>
                                                            :
                                                            "No File Attached"
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>New/Used</TableCell>
                                                <TableCell align="right">Date</TableCell>
                                                <TableCell align="right">Discount</TableCell>
                                                <TableCell align="right">Price</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>{data.product}</TableCell>
                                                <TableCell align="right">{data.date}</TableCell>
                                                <TableCell align="right">{data.discount ? `$${data.discount}` : 'No discount'}</TableCell>
                                                <TableCell align="right">${data.price}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Paper>

                                {
                                    userData && userData.companyName ?
                                        <OrderSeller item={userData} />
                                        :
                                        null
                                }
                            </div>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <div style={{ marginTop: 15, textAlign: "center" }}>
                    <Button size={"small"} color={"primary"} variant={"outlined"} onClick={() => History.goBack()}>View Payment Details</Button>
                </div>
            </div>
        )
    }
}


OrderDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(states) {
    return ({
        allUser: states.authReducer.USERS,
    })
}


export default connect(mapStateToProps, null)(withStyles(styles)(OrderDetails));