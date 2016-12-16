var React = require('react')
var actions = require('../modules/actions')
var Navbar = require('../components/navbar')
var lodash = require('lodash')

module.exports = React.createClass({
  getInitialState: function() {
    return {
      action: {},
      service: {},
      serviceAuths: []
    }
  },
  componentDidMount: function() {
    var self = this;
    if (this.props.params.id) {
      console.log('getting action id', this.props.params.id);
      actions.getActionById(this.props.params.id)
      .then(function(result) {
        self.setState({action: result});
      })
    }
  },
  render() {
    var authList = lodash.map(this.state.serviceAuths,function(serviceAuth){
      return <div>
        name: { serviceAuth.name }
        type: { serviceAuth.type }
        details: { serviceAuth.details }
      </div>
    })
    var headerList = lodash.map(this.state.action.headers,function(value, key){
      return <div>
        <label class="pt-label">
          Name
          <input class="pt-input" value={ key } />
        </label>
        <label class="pt-label">
          Value
          <input class="pt-input" value={ value } />
        </label>
      </div>
    })
    var queryList = lodash.map(this.state.action.query,function(value, key){
      return <div>
        <label class="pt-label">
          Name
          <input class="pt-input" value={ key } />
        </label>
        <label class="pt-label">
          Value
          <input class="pt-input" value={ value } />
        </label>
      </div>
    })
    var inputList = lodash.map(this.state.action.input,function(parameter){
      return <div>
        <label class="pt-label">
          Name
          <input class="pt-input" value={ parameter.name } />
        </label>
        <label class="pt-label">
          In
          <input class="pt-input" value={ parameter.in } />
        </label>
        <label class="pt-label">
          Description
          <input class="pt-input" value={ parameter.description } />
        </label>
        <label class="pt-label">
          Type
          <input class="pt-input" value={ parameter.type } />
        </label>
      </div>
    })
    var outputList = []; // todo: refactor input list and output list into a component
    return <div>
      <h2>Build an Action</h2>
      <label class="pt-label">
        Service
        <input class="pt-input" value={ this.state.action.service_name } />
      </label>
      <br/>
      <label class="pt-label">
        Function
        <input class="pt-input" value={ this.state.action.function_name } />
      </label>
      <br/>
      <label class="pt-label">
        Description
        <input class="pt-input" value={ this.state.action.description } />
      </label>
      <br/>
      <label class="pt-label">
        Action Type
        <input class="pt-input" value={ this.state.action.type } />
      </label>
      <br/>
      <label class="pt-label">
        Host
        <input class="pt-input" value={ this.state.action.host } />
      </label>
      <br/>
      <label class="pt-label">
        Path
        <input class="pt-input" value={ this.state.action.path } />
      </label>
      <br/>
      <label class="pt-label">
        Method
        <input class="pt-input" value={ this.state.action.method } />
      </label>
      <br/>
      <label class="pt-label">
        Scheme
        <input class="pt-input" value={ this.state.action.schemes } />
      </label>
      <hr />
      <h2>Authentication</h2>
      { authList }
      <hr />
      <h2>Headers</h2>
      { headerList }
      <hr />
      <h2>Query params</h2>
      { queryList }
      <hr />
      <h2>Inputs</h2>
      <label class="pt-label">
        Content Type
        <input class="pt-input" value={ this.state.action.input_content_type } />
      </label>
      <h4>Parameters</h4>
      { inputList }
      <h4>Example</h4>
      { JSON.stringify(this.state.action.input_example) }
      <hr />
      <h2>Outputs</h2>
      <label class="pt-label">
        Content Type
        <input class="pt-input" value={ this.state.action.output_content_type } />
      </label>
      <h4>Parameters</h4>
      { outputList }
      <h4>Example</h4>
      { JSON.stringify(this.state.action.output_example) }

    </div>
  }
})

