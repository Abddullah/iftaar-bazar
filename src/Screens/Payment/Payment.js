import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import './CheckOutForm.css';
import History from '../../History/History'
import { connect } from 'react-redux';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: null
    }
  }

  componentWillMount() {
    const { currentUserUID, location } = this.props;
    if (currentUserUID) {
      this.setState({ uid: currentUserUID })
    }
    if (location.state) {
      const amount = location.state.subtotal
      this.setState({ amount, order: location.state })
    } else {
      History.push('/')
    }
  }

  componentWillReceiveProps(props) {
    const { currentUserUID } = props;
    if (currentUserUID) {
      this.setState({ uid: currentUserUID })
    }
  }


  render() {
    const { uid, amount, order } = this.state;
    return (
      <StripeProvider apiKey="pk_live_gE9qdw9PReofrlVoqxMnvsZL">
      {/* <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx"> */}
        <Elements>
          <CheckoutForm uid={uid && uid} amount={amount && amount} order={order && order} />
        </Elements>
      </StripeProvider>
    );
  }
}

// export default Payment;


function mapStateToProps(states) {
  return ({
    currentUserUID: states.authReducer.CURRENTUSERUID,
  })
}

// function mapDispatchToProps(dispatch) {
//   return {
//       actions: bindActionCreators({
//           LoginAction
//       }, dispatch)
//   }
// }

export default connect(mapStateToProps, null)(Payment);
