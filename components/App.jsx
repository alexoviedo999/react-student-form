import React, {Component} from 'react';
import { Container, Panel } from 'muicss/react';
import 'es6-promise';
import 'whatwg-fetch';
import SuccessBanner from './SuccessBanner.jsx';
import FormElements from './FormElements.jsx';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
		  studentForm: this.props.studentForm,
		  student: {},
		  genderValidate: false,
		  formSuccess: false
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
		this.resetForm = this.resetForm.bind(this);
	}

	handleUpdate(value, type){
		var studentKey;

		//map values in json document to student json
		if (type.title === 'Name') {
			studentKey = 'name';
		} else if (type.title === 'Date of Birth') {
			studentKey = 'dob';
		} else if (type.title === 'Residency') {
			studentKey = 'residency';
			this.setState({value: value});
		} else if (type.title === 'Gender') {
			studentKey = 'gender';
		} else {
			console.log("form error");
		}

		//set student state
		this.setState({
		  student: {
			...this.state.student,
			[studentKey]: value
		  }
		});
	}

	resetForm () {
		this.setState({ student: {} });
		var inputs = document.getElementsByTagName('input');
		var inputsArray = Array.from(inputs);

		inputsArray.forEach((input) => {
			if(input.getAttribute('type') ==='radio'){
				input.checked=false;
			}
		});

		var invalidInputs = document.getElementsByClassName('mui--is-not-empty mui--is-dirty');

		var invalidInputsArray = Array.from(invalidInputs);
		invalidInputsArray.forEach((input) => {
			input.className = "mui--is-empty";
		})
	}

	handleSubmit (e) {
		e.preventDefault();
		const {student, studentForm} = this.state;

		//validate residency and gender data
		if (!student.residency) {
			student.residency = studentForm.fields[2].options[0];
		}
		if (!this.state.student.gender) {
			this.setState({ genderValidate: true });
			return;
		}
		this.setState({ genderValidate: false });

		//api post
		const jsonStudent = JSON.stringify(student);
		fetch(studentForm.service, {
			method: 'POST',
			headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json'
			},
			body: jsonStudent
		})
		  .then(function(response) {
			console.log('response', response);
		    return response.json()
		  }).then(function(body) {
		    console.log('success', body);
		  }).then(() => {
			this.resetForm ();
			this.setState({ formSuccess: true });
		  }).catch(function(error) {
	    	console.log('student form request failed', error)
	      });
	}

	render() {
		return (
			<Container style={{maxWidth: '600px', marginTop: '30px'}}>
				<Panel>
					<FormElements formState={this}/>
				</Panel>
				<SuccessBanner bannerState={this.state.formSuccess}/>
			</Container>
		)
	}
}


export default App;
