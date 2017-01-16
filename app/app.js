var React = require('react');
const NavbarLayout = require('./pages/navbar_layout');

// CSS
import '../node_modules/normalize.css/normalize.css';
import '../node_modules/flexboxgrid/dist/flexboxgrid.min.css';
import '../node_modules/@blueprintjs/core/dist/blueprint.css';
import '../node_modules/react-select/dist/react-select.css';
import '../node_modules/codemirror/lib/codemirror.css';

// some temp styles nick made, replace this with sass
import './styles/main.scss';

var state = require('./modules/state');
var store = require('store');
import { browserHistory } from 'react-router';
import { Toaster, Position, Intent} from "@blueprintjs/core";

module.exports = React.createClass({
  getInitialState() {
    console.log('initial state', state());
    return state();
  },
  toast:null,
  componentWillMount: function() {
    console.log('app component mounting');
    var self = this;
    // state.on('change', function() {
    //   console.log('app state',arguments)
    // })
    state.on(['token'], function(value) {
      console.log('token', value);
      store.set('token', value);
      self.setState({token: value});
    });
    state.on(['error'], function(value) {
      console.log('error', value);
      if(value) {
        self.toast.show({message: value,intent:Intent.DANGER});
        state.set('error', null);
      }
    });
    state.on(['showSuccess'], function(value) {
      if(value) {
        self.toast.show({message: value,intent:Intent.SUCCESS});
        state.set('showSuccess', null);
      }
    });
    state.on(['me'], function(value) {
      store.set('me', value);
      self.setState({me: value});
    });
    state.on(['org'], function(value) {
      store.set('org', value);
      self.setState({'org': value});
    });
  },

  clearError:function() {
    console.log('clearing error');
    state.set('error', null);
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return (nextState.token && nextState.me) || (!nextState.token && !nextState.me);
  },

  render: function() {
    var children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {...this.state});
    }
    return (
      <div>
        <Toaster onDismiss={this.clearError} timeout={3000} ref={(x)=>{this.toast=x;}}/>
        {children}
      </div>
    );
  }
});
