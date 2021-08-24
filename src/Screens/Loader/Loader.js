// import React from 'react';
// import ReactLoading from 'react-loading';

// const Example = ({ type, color }) => (
//     <ReactLoading type={type} color={color} height={667} width={375} />
// );

// export default Example;
// import React from 'react';
// import ReactLoading from 'react-loading';

// const Example = ({ type, color }) => (
//     <ReactLoading type={type} color={color} height={'20%'} width={'20%'} />
// );

// export default Example;

import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import './Loader.css';

class Loader extends Component {
    render() {
        return (
            <div className="LoaderDiv">
                <ReactLoading className={"Loader"} type={"spin"} color={'#3f984f'} height={'30%'} width={'30%'} />
            </div>
        )
    }
}

export default Loader;