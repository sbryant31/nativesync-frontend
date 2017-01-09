import React from 'react';

export default class IntegrationDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    // fetch the integration details here
  }

  render() {
    return (
      <div className="IntegrationDetails">
        <h1>Integration Details</h1>
        <h2>Id = {this.props.id}</h2>
      </div>
    );
  }
}
