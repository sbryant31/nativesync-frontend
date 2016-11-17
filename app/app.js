var React = require('react')
var normalize = require('../node_modules/normalize.css/normalize.css')
var flexbox = require('../node_modules/flexboxgrid/dist/flexboxgrid.min.css')
var blueprintjs = require('../node_modules/@blueprintjs/core/dist/blueprint.css')
var state = require('./modules/state')
import { browserHistory } from 'react-router'

module.exports = React.createClass({
  getInitialState(){
    return {}
  },
  componentWillMount(){
    var self = this
    state.on('change',function(value,path){
      console.log('state change',value)
      self.setState(value)
    })
  },
  render: function() {
    var child = null
    var errorBar = null
    if(this.props.children){
      child = React.cloneElement(this.props.children,this.state)
    }
    return <div>
    {child}
    </div>
    
  }
})

