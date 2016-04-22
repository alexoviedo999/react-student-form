import React, {Component} from 'react';

const jsonDoc = {
	"service": "http://api/students/",
	"fields": [
		{
			"title": "Name",
			"type": "text"
		},
		{
			"title": "Date of Birth",
			"type": "date"
		},
		{
			"title": "Residency",
			"type": "select",
			"options": [
				"In State",
				"Out of State",
				"Foreign"
			]
		},
		{
			"title": "Gender",
			"type": "radio",
			"options": [
				"Male",
				"Female"
			]
		}
	]
}

// console.log('jsonDoc1', jsonDoc);
// const blob = JSON.stringifyß(jsonDoc);

class App extends Component {

	constructor() {
		super();

		const Student = {
			name: 'joe',
			dob: null,
			residency: null,
			gender: null
		}

		this.state = {
		  jsonDoc: jsonDoc,
		  student: Student,
		  studentName: 'tom'
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleNameUpdate = this.handleNameUpdate.bind(this);
	}

	handleNameUpdate(value){
		// let {name} = this.state.student;


		this.setState({
	      student: {
	        ...this.state.student,
	        name: value
	      }
	    });
		//
		// this.setState({
		//   student: Object.assign({}, student, { name: value });
		// })
	}

	conponentWillMount () {
		console.log('mount 1');
	}

	handleSubmit (e) {
		e.preventDefault(); //why???
	 	console.log('handle submit', e);
	}

	render() {

		return (
			<div>
				<form student  = {this.state.student}>

				<input
		        	type='text'
		        	onChange={(e) => this.handleNameUpdate(e.target.value)} value={this.state.student.name}/>
					<h1>{this.state.student.name}</h1>

					{/*<button style={{color:'blue'}} onClick={()=> this.handleSubmit()}>Submit</button>*/}

				</form>
			</div>
		)
	}
}

// App.propTypes = {
// 	name: React.propTypes.string
// }


export default App;
