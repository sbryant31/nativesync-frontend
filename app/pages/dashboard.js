var React = require('react');
// var Navbar = require('../components/navbar');

module.exports = React.createClass({
  componentWillUpdate: function(nextProps, nextState) {
    if (!nextProps.token) {
      actions.goto('/');
    }
  },
  render(){
    return <div>
      Dashboard
    </div>
  }
})
