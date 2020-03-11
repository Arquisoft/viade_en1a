import React, {Component} from 'react';

class RoutesInfo extends Component {
    constructor(props) {
        super(props);

    }

    render() {
            const rows = this.props.map((route) => {
                return (
                    <tr>
                        <td>{route.name}</td>
                    </tr>
                )
            });

            return <tbody>{rows}</tbody>

    };
}

export default RoutesInfo;