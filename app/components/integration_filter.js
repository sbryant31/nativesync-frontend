var React = require('react')


// <input type="text">Service 1</input>
//       <input type="text">Service 2</input>
//       <button type="button"
//         onClick={this.browse()}
//       >Browse Integrations</button>
//       <input type="radio">For Sale</input>
//       <input type="radio">Free</input>

module.exports = React.createClass({
  getDefaultProps:function(){
    return {
      items:{}
    }
  },
  handleSubmit:function(event){
    event.preventDefault();
    alert("hi");
  },
  render:function(){
    // var items = lodash.map(this.props.items,function(item){
    //   return <li key={item.name}>
    //     <button
    //       type='button'
    //       onClick={this.goto.bind(this,item.url)}
    //       className='pt-menu-item'>{item.name}</button>
    //   </li>
    // }.bind(this))
    return <div>
      <form onSubmit= {this.handleSubmit}>
      <label>Service 1
        <input type="text"/>
      </label>
      <label> Service 2
        <input type="text"/>
      </label>
      <label>
        <input type="radio"/>For Sale
      </label>
      <label>
        <input type="radio"/>Free
      </label>
      <label>
        <input type="submit" value="Search"/>
      </label>
      </form>
    </div>
  }
})

