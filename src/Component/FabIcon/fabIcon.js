import React, { Component } from 'react';
// import History from '../../History/History';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './fabIcon.css'
import History from '../../History/History'

library.add(faPlus)

class FabIcon extends Component {

    handleOnClick() {
        const { addProducts } = this.props

        addProducts()
    }

    render() {
        return (
            <div onClick={() => this.handleOnClick()}>
                <nav className="Fab-Icons" tooltip={'Add a Product'}>
                    {
                        <FontAwesomeIcon className='buttons' icon='plus' />
                    }
                </nav>
            </div>
        );
    }

}


export default FabIcon;