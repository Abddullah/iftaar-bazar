import React, { Component } from 'react';
import Pager from 'react-pager';
import '../Pager/Pager.css'

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 1,
            current: 0,
            visiblePage: 3,
        };

        this.handlePageChanged = this.handlePageChanged.bind(this);
    }

    componentWillMount() {
        const { pages } = this.props;
        console.log('Pages******', pages);
        this.setState({ total: pages })

    }

    componentWillReceiveProps(props) {
        const { pages } = props;
        console.log('Pages******', pages);
        this.setState({ total: pages })

    }

    handlePageChanged(newPage) {
        console.log('newPage************', newPage)
        this.setState({ current: newPage });
        this.props.pageNum(newPage)
    }

    render() {
        return (
            <Pager
                total={this.state.total}
                current={this.state.current}
                visiblePages={this.state.visiblePage}
                titles={{ first: 'First', last: 'Last' }}
                className="pagination-sm pull-right"
                onPageChanged={this.handlePageChanged}
            />
        );
    }
}


export default Pagination;


// window.onload = () => {
//     render(React.createElement(Pager), document.querySelector('#Pager'));
// };