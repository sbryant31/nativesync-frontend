var React = require('react')
var normalize = require('../node_modules/normalize.css/normalize.css')
var flexbox = require('../node_modules/flexboxgrid/dist/flexboxgrid.min.css')
var blueprintjs = require('../node_modules/@blueprintjs/core/dist/blueprint.css')
var state = require('./modules/state')
var store = require('store')
import { browserHistory } from 'react-router'
import { Toaster, Position, Intent} from "@blueprintjs/core";

module.exports = React.createClass({
  getInitialState(){
    console.log('initial state',state())
    return state()
  },
  toast:null,
  componentWillMount:function(){
    console.log('app component mounting')
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
        self.toast.show({message:value,intent:Intent.DANGER})
        state.set('error',null)
      }
    })
    state.on(['showSuccess'],function(value){
      if(value){
        self.toast.show({message:value,intent:Intent.SUCCESS})
        state.set('showSuccess',null)
      }
    })
    state.on(['me'],function(value){
      store.set('me',value)
      self.setState({me:value})
    })
    state.on(['mode'],function(value){
      store.set('mode',value)
      self.setState({mode:value})
    })
    state.on(['client_id'],function(value){
      store.set('client_id',value)
      store.set('partner_id',null)
      self.setState({client_id:value})
      self.setState({partner_id:null})
    })
    state.on(['partner_id'],function(value){
      store.set('client_id',null)
      store.set('partner_id',value)
      self.setState({client_id:null})
      self.setState({partner_id:value})
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
      <Toaster onDismiss={this.clearError} timeout={3000} ref={(x)=>{this.toast=x;}}/>
      {child}
    </div>

  }
})

