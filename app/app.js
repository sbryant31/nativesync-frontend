var React = require('react')
var normalize = require('../node_modules/normalize.css/normalize.css')
var flexbox = require('../node_modules/flexboxgrid/dist/flexboxgrid.min.css')
var blueprintjs = require('../node_modules/@blueprintjs/core/dist/blueprint.css')
var state = require('./modules/state')
var store = require('store')
import { browserHistory } from 'react-router'
import { Toaster, Position} from "@blueprintjs/core";

const ErrorToast = Toaster.create({
  className: "pt-intent-danger",
  position: Position.TOP_CENTER,
});

module.exports = React.createClass({
  getInitialState(){
    console.log('initial state',state())
    return state()
  },
  errorToast:null,
  componentWillMount:function(){
    console.log('app component mountiung')
    var self = this
    // state.on('change',function(){
    //   console.log('app state',arguments)
    // })
    state.on(['token'],function(value){
      console.log('token',value)
      store.set('token',value)
      self.setState({token:value})
    })
    state.on(['error'],function(value){
      console.log('error',value)
      if(value){
        self.errorToast.show({message:value})
        state.set('error',null)
      }
    })
    state.on(['me'],function(value){
      store.set('me',value)
      self.setState({me:value})
    })
  },
  clearError:function(){
    console.log('clearing error')
    state.set('error',null)
  },
  render: function() {
    var child = null

    if(this.props.children){
      child = React.cloneElement(this.props.children,this.state)
    }
    return <div>
      <Toaster className='pt-intent-danger' onDismiss={this.clearError} timeout={3000} ref={(x)=>{this.errorToast=x;}}/>
      {child}
    </div>

  }
})

