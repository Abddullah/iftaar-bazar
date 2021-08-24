import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert2'
import History from '../../History/History'
import { Button } from '@material-ui/core'
import { productCheckout } from '../../store/action/orderAction'
import { CardElement, injectStripe } from 'react-stripe-elements';
import Containers from '../../Container/container/container';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard, faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons'
import Image from '../../Assets/images/Mastercard.png';
import Image1 from '../../Assets/images/payment.jpg';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

library.add(faCreditCard, faMoneyCheckAlt)


const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
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
    backgroundColor: 'transparent',
    border: '1px solid rgb(241, 123, 1)',
    color: 'rgb(241, 123, 1)'
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

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit,
    fontSize: 'medium'
  },
});

class CheckoutForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cash: false,
      accountName: '',
      date: '',
      transactionId: '',
      paid: '',
      currentUser: null
    }
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    const { currentUser } = this.props;
    if (this.props.order) {
      console.log('Props Ofr CurrentUSer', currentUser)
      this.setState({ order: this.props.order, currentUser })
    }
  }

  componentWillReceiveProps(props) {
    const { currentUser } = props;
    if (props.order) {
      console.log('Props Ofr CurrentUSer', currentUser)
      this.setState({ order: props.order, currentUser })
    }

  }

  async submit(ev) {
    swal.showLoading();
    const { currentUser } = this.state;
    const { flag, userUID } = this.props
    var userName = currentUser.firstName + " " + currentUser.lastName;
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;
    var date = new Date().getDate();
    var time;
    if (month < 10 && date < 10) {
      time = year + '-0' + month + '-0' + date
    }
    else if (month < 10 && date > 9) {
      time = year + '-0' + month + '-' + date
    }
    else if (month > 9 && date < 10) {
      time = year + '-' + month + '-0' + date
    }
    else if (month > 9 && date > 9) {
      time = year + '-' + month + '-' + date
    }
    console.log('Run************', time)
    const { amount } = this.props
    console.log(amount, 'amount here')
    let { token } = await this.props.stripe.createToken({ name: userName });
    console.log(token, 'token***');
    if (token) {

      let chargeObject = {
        token: token,
        amount: Math.round(amount * 100),
        currency: "usd"
      }
      console.log(chargeObject, 'chargeObject')
      fetch("https://us-central1-vendor-web-ffe78.cloudfunctions.net/stripePayment", {
        method: "POST",
        // mode: "cors",
        // headers: {
        //   "Content-Type": "text/plain"
        // },
        body: JSON.stringify(chargeObject)
      })
        .then((response) => {
          console.log(response, 'response')
          response.json().then((jsonRep) => {
            console.log(jsonRep, 'jsonRep')
            const { flag } = this.props
            const { productCheckout } = this.props.actions
            const { order } = this.state
            order.paid = amount;
            // order.transactionId = transactionId;
            order.transactionId = '---';
            order.accountName = userName;
            order.date = time;
            order.paymentStatus = "confirmed";
            console.log("orderStatus", order)
            productCheckout(order, flag, userUID)
              .then(() => {
                const toast = swal.mixin({
                  toast: true,
                  position: 'center',
                  showConfirmButton: false,
                  timer: 1000
                });
                toast({
                  type: 'success',
                  title: 'Successfully Buy Your Product'
                })
                setTimeout(() => {
                  History.push('/orders')
                }, 1000);
              })
          })
        })
        .catch((errorinparsing) => {
          console.log(errorinparsing, 'errorinparsing')
        })
        .catch((err) => {
          console.log(err, 'errrr-')

          const toast = swal.mixin({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 1000
          });
          toast({
            type: 'error',
            title: err.message
          })
        })
    }
    else {
      const toast = swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 1000
      });
      toast({
        type: 'error',
        title: 'Something went wrong'
      })
    }

  }

  confirmOrder() {
    const { flag, userUID } = this.props
    const { productCheckout } = this.props.actions
    const { order, paid, transactionId, accountName, date } = this.state
    var putDate = new Date(date).getTime();
    var getDate = new Date().getTime();
    if (paid && transactionId && accountName && date) {
      if (putDate < getDate) {
        order.paid = paid;
        order.transactionId = transactionId;
        order.accountName = accountName;
        order.date = date;
        order.paymentStatus = "pending";
        productCheckout(order, flag, userUID)
          .then(() => {
            const toast = swal.mixin({
              toast: true,
              position: 'center',
              showConfirmButton: false,
              timer: 1000
            });
            toast({
              type: 'success',
              title: 'Successfully Buy Your Product'
            })
            setTimeout(() => {
              History.push('/orders')
            }, 1000);
          })
      }
      else {
        const toast = swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 1000
        });
        toast({
          type: 'error',
          title: 'Incorrect Date'
        })
      }
    }
    else {
      const toast = swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 1000
      });
      toast({
        type: 'error',
        title: 'Something went wrong'
      })
    }
  }

  render() {
    const { cash, order, paid, transactionId, accountName, date } = this.state
    const { classes } = this.props
    return (
      <Containers>
        <div className={'vendor-products'}>
          <div>
            Payment Methods
          </div>
          <hr />
          <div className={'payment-method'}>
            <div className={'left-container'}>
              <div style={!cash ? { backgroundColor: '#f4f4f4' } : null} onClick={() => this.setState({ cash: false })}>
                <div>
                  <FontAwesomeIcon color={'#f27b01'} icon={'credit-card'} />
                </div>
                Credit/Debit Card
              </div>
              <div style={cash ? { backgroundColor: '#f4f4f4' } : null} onClick={() => this.setState({ cash: true })}>
                <div>
                  <FontAwesomeIcon color={'#f27b01'} icon={'money-check-alt'} />
                </div>
                Bank Transfer
              </div>
              {
                !cash &&
                <div className={'payment-checkout'}>
                  <div>
                    <MySnackbarContentWrapper
                      variant="warning"
                      className={classes.margin}
                      message="Buyer needs to cover all the agent charges."
                    />
                  </div>
                  <div>
                    <img src={Image} width={70} />
                  </div>
                  <div>
                    <CardElement />
                  </div>
                  <div>
                    <Button
                      variant={'contained'}
                      className={'checkout-btn'}
                      onClick={this.submit}
                    >
                      PLACE ORDER
                  </Button>
                  </div>
                </div>
              }
              {
                cash &&
                <div className={'payment-checkout'}>
                  <div>
                    <MySnackbarContentWrapper
                      variant="warning"
                      className={classes.margin}
                      message="Agent charges will be paid by buyer stripe charges will be paid by seller"
                    />
                  </div>
                  <div className={'BankPayment'} style={{ fontSize: '18px' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Bank Account Number</TableCell>
                          <TableCell align="right">International Bank Code</TableCell>
                          <TableCell align="right">Beneficiary Name</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>641-691795-001</TableCell>
                          <TableCell align="right">7331</TableCell>
                          <TableCell align="right">Tham Heng Kok David</TableCell>
                        </TableRow>
                      </TableBody>

                      <TableHead>
                        <TableRow>
                          <TableCell>Swift Code</TableCell>
                          <TableCell align="right">Bank</TableCell>
                          <TableCell align="right">Branch Name</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>OCBCSGSG</TableCell>
                          <TableCell align="right">OVERSEA-CHINESE BANKING CORPORATION LIMITED</TableCell>
                          <TableCell align="right">---</TableCell>
                        </TableRow>
                      </TableBody>

                      <TableHead>
                        <TableRow>
                          <TableCell>Address</TableCell>
                          <TableCell align="right">City</TableCell>
                          <TableCell align="right">Country</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>OCBC CENTRE FLOOR 9 65 CHULIA STREET</TableCell>
                          <TableCell align="right">SINGAPORE</TableCell>
                          <TableCell align="right">SINGAPORE</TableCell>
                        </TableRow>
                      </TableBody>

                      <TableHead>
                        <TableRow>
                          <TableCell>Zip Code</TableCell>
                          <TableCell align="right">Institution Code</TableCell>
                          <TableCell align="right">Country Code</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>049513</TableCell>
                          <TableCell align="right">OCBC</TableCell>
                          <TableCell align="right">SG</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Transaction ID</TableCell>
                          <TableCell align="right">Amount</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <input value={transactionId} type={'text'} onChange={(e) => { this.setState({ transactionId: e.target.value }) }} />
                          </TableCell>
                          <TableCell align="right">
                            <input value={paid} type={'text'} onChange={(e) => { this.setState({ paid: e.target.value }) }} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="right">Name</TableCell>
                          <TableCell align="right">Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell align="right">
                            <input value={accountName} type={'text'} onChange={(e) => { this.setState({ accountName: e.target.value }) }} />
                          </TableCell>
                          <TableCell align="right">
                            <input value={date} type={'date'} onChange={(e) => { this.setState({ date: e.target.value }) }} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <div>
                    <Button
                      variant={'contained'}
                      className={'checkout-btn'}
                      onClick={() => this.confirmOrder()}
                    >
                      Confirm ORDER
                  </Button>
                  </div>
                </div>
              }
            </div>
            <div className={'right-container'}>
              <div>
                Order Summary
              </div>
              <div>
                <hr />
              </div>
              <div className={'pricing'}>
                <div>
                  {/* Subtotal ({totalQuantity} items) */}
                  Subtotal ({order && order.product.length} items)
                </div>
                <div>
                  ${order && order.subtotal}
                </div>
              </div>
              <div className={'pricing'}>
                <div style={{ fontWeight: 'bold' }}>
                  Total Amount
                </div>
                <div style={{ color: '#f27b01', fontWeight: 600 }}>
                  ${order && order.subtotal}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Containers>
    );
  }
}


function mapStateToProps(states) {
  return ({
    products: states.productReducer.ALLPRODUCTS,
    currentUser: states.authReducer.CURRENTUSER,
    flag: states.cartReducer.FLAG,
    userUID: states.authReducer.CURRENTUSERUID,
  })
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      productCheckout
    }, dispatch)
  }
}



// export default connect(mapStateToProps, mapDispatchToProps)(injectStripe(CheckoutForm));

// export default injectStripe(CheckoutForm);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles2)(injectStripe(CheckoutForm)));