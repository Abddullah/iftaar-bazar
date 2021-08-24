import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert2';


import './Contact.css';

const styles = theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing.unit * 2,
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 400,
    },
});

class SendMail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            data: props.item.data,
            message: '',
            sendMail: false
        };
        this._sendMail = this._sendMail.bind(this);
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        const { data } = this.state;
        console.log('Data', data)
        this.setState({ open: false });
    };

    handleMaxWidthChange = event => {
        this.setState({ maxWidth: event.target.value });
    };

    handleFullWidthChange = event => {
        this.setState({ fullWidth: event.target.checked });
    };

    // _sendMail = () => {
    async _sendMail() {
        const { message, data } = this.state;
        const mail = {
            recepientEmail: data.email,
            subject: data.subject,
            message
        }
        this.setState({ sendMail: true })
        if (message) {
            // let response = await fetch("http://localhost:5000/vendor-web-ffe78/us-central1/sendEmail", {
            let response = await fetch("https://us-central1-vendor-web-ffe78.cloudfunctions.net/sendEmail", {
                method: "POST",
                headers: { "Content-Type": "text/plain" },
                body: JSON.stringify(mail)
            });
            if (response.ok) {
                console.log('mail', mail)
                this.setState({ message: '', sendMail: false, open: false })
            }
            else {
                swal({
                    type: 'error',
                    title: 'Something went wrong',
                })
                this.setState({ sendMail: false })
            }
        }
        else {
            swal({
                type: 'error',
                title: 'Please type some message',
            })
        }
    }

    render() {
        const { classes } = this.props;
        const { data, message, sendMail } = this.state;
        return (
            <React.Fragment>
                <Button variant="outlined" color="primary" size={"small"} onClick={this.handleClickOpen}>
                    Reply
                </Button>
                <Dialog
                    fullWidth={true}
                    maxWidth={"sm"}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="max-width-dialog-title"
                >
                    <DialogTitle id="max-width-dialog-title">Send Message</DialogTitle>
                    <DialogContent>
                        <div>
                            <InputLabel style={{ width: '100px', color: 'black' }}>To Name:</InputLabel>
                            <InputLabel>{data.name}</InputLabel>
                        </div>
                        <div>
                            <InputLabel style={{ width: '100px', color: 'black' }}>To Address:</InputLabel>
                            <InputLabel>{data.email}</InputLabel>
                        </div>
                        <div>
                            <InputLabel style={{ width: '100px', color: 'black' }}>Subject:</InputLabel>
                            <InputLabel>{data.subject}</InputLabel>
                        </div>
                        <div>
                            <InputLabel style={{ width: '90px', color: 'black' }}>Message:</InputLabel>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Message"
                                multiline
                                rowsMax="4"
                                value={message}
                                onChange={(e) => this.setState({ message: e.target.value })}
                                className={classes.textField}
                                margin="normal"
                                // helperText="hello"
                                variant="outlined"
                            />
                        </div>
                    </DialogContent>
                    {
                        sendMail ?
                            <DialogActions>
                                <Button disabled>
                                    Send
                                </Button>
                                <Button disabled>
                                    Close
                                </Button>
                            </DialogActions>
                            :
                            <DialogActions>
                                <Button color={"primary"} variant={"outlined"} onClick={this._sendMail} color="primary">
                                    Send
                                </Button>
                                <Button color={"primary"} variant={"outlined"} onClick={this.handleClose} color="primary">
                                    Close
                                </Button>
                            </DialogActions>
                    }
                </Dialog>
            </React.Fragment>
        );
    }
}

SendMail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SendMail);