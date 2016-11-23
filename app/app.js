var React = require('react')
var normalize = require('../node_modules/normalize.css/normalize.css')
var flexbox = require('../node_modules/flexboxgrid/dist/flexboxgrid.min.css')
var blueprintjs = require('../node_modules/@blueprintjs/core/dist/blueprint.css')
var state = require('./modules/state')
import { browserHistory } from 'react-router'
import { Toaster, Position} from "@blueprintjs/core";

const ErrorToast = Toaster.create({
  className: "error-toast",
  position: Position.TOP_CENTER,
});

module.exports = React.createClass({
  getInitialState(){
    return {}
  },
  componentWillMount(){
    var self = this
    state.on('change',console.log.bind(console))
    state.on(['token'],function(value){
      self.setState({token:value})
    })
    state.on(['error'],function(value){
      console.log('error set',value)
      self.setState({error:value})
    })
    state.on(['me'],function(value){
      self.setState({me:value})
    })
  },
  clearError:function(){
  },
  render: function() {
    var child = null
    
    if(this.state.error){
      ErrorToast.show({message:this.state.error})
    }

    if(this.props.children){
      child = React.cloneElement(this.props.children,this.state)
    }
    return <div>
    {child}
    </div>
    
  }
})

