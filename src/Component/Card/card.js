import React, { Component } from 'react';
import './card.css'
import History from '../../History/History'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
library.add(faBan);


class Card extends Component {

    getDetails(key) {
        console.log(key)
        History.push("/details/" + key)
    }

    deleteProduct(key) {
        const { productDelete } = this.props

        productDelete(key)
    }

    render() {
        return (
            <div className={'product_card'}>
                <div>
                    <img src={this.props.image} />
                    {
                        this.props.status === 'blocked' ?
                            <div tooltip={'Blocked'} className={"BlockDiv"}>
                                <FontAwesomeIcon
                                    size='1x'
                                    icon={"ban"}
                                />
                            </div>
                            :
                            null
                    }
                </div>
                <div className={'product-details'}>
                    <div>
                        {this.props.productName}
                    </div>
                    <div>
                        {this.props.brandName}
                    </div>
                    <div>
                        <hr />
                    </div>
                    <div>
                        <span onClick={() => this.getDetails(this.props.productKey)}>
                            View Details
                        </span>
                    </div>
                </div>
                <div onClick={() => this.deleteProduct(this.props.productKey)} className={'delete_product'}>
                    <div style={{ textAlign: 'center', flexGrow: 1 }}>
                        {'Delete'}
                    </div>
                    <div>X</div>
                </div>
            </div>
        );
    }
}

export default Card;
