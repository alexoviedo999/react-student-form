import React, {Component} from 'react';
import Form  from 'react-json-editor';

var schema = {
  title      : "My pretty form",
  description: "Declarative pure data DSLs are the best.",
  type       : "object",
  properties : {
    comment: {
      title      : "Your comment",
      description: "Type something here.",
      type       : "string",
      minLength  : 1
    }
  }
};

class App extends Component {

  constructor() {
    super();

    this.state = {
      schema: schema
    }

    this.onSubmit = this.onSubmit.bind(this);
  }

	onSubmit (data, buttonValue, errors) {
	  alert('Data  : '+JSON.stringify(data)+'\n'+
	        'Button: '+buttonValue+'\n'+
	        'Errors: '+JSON.stringify(errors));
	};

	render() {
    const {schema} = this.state;
		return (
			<Form
        schema   = {schema}
        onSubmit = {this.onSubmit} />
		)
	}

}

export default App;
