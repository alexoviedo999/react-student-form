import React, {Component} from 'react';
import {
	Appbar,
	Form,
	Input,
	Button,
	Radio,
	Select,
	Option,
	Container,
	Panel
} from 'muicss/react';
import 'es6-promise';
import 'whatwg-fetch';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
		  studentForm: this.props.studentForm,
		  student: {},
		  genderValidate: false
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
			alert("Sorry, didn't work")
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

		//validate residency and gender data
		if (!this.state.student.residency) {
			this.state.student.residency = this.state.studentForm.fields[2].options[0];
		}
		if (!this.state.student.gender) {
			this.setState({ genderValidate: true });
			return;
		}
		this.setState({ genderValidate: false });


		//api post
		const jsonStudent = JSON.stringify(this.state.student);
		fetch(this.state.studentForm.service, {
			method: 'POST',
			headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json'
			},
			body: jsonStudent
		})
		  .then(function(response) {
		    return response.json()
		  }).then(function(body) {
		    console.log('success', body);
		  }).then(() => {
			this.resetForm ();

		  }).catch(function(error) {
	    	console.log('student form request failed', error)
	      });
	}


	render() {
		const validateStyle = {
			validateOn: {
				display: 'inline-block',
				position: 'relative',
			    left: '75px',
			    color: 'red',
			    textDecoration: 'underline'
			},
			validateOff: {
				display: 'none'
			}
		}

		const formElements = this.state.studentForm.fields.map((item, i) => {
			if (item.type === "select") {
				return (
					<div key={i}>
						<label>{item.title}</label>
							<Select
								value={this.state.student.residency}
								onChange={(e) => this.handleUpdate(e, item)}>
									{item.options.map( (opt, i) => <Option key={'option'+i}
									label={opt}
									value={opt} />)}
							</Select>
					</div>
				)

			} else if (item.type === "radio") {
				return (
					<div key={i}>
						<label>{item.title}</label>
						<span style={this.state.genderValidate ? validateStyle.validateOn : validateStyle.validateOff}>Please Select Gender!</span>
						{item.options.map( (opt, i) => <div key={'radio'+i}>
							<Radio
								type="radio"
								id={'radio'+i}
								value={opt}
								label={opt}
								onClick={(e) => this.handleUpdate(e.target.value, item)}
								name={item.title} />
						</div>) }
					</div>
				)

			} else {
				return (
					<div key={i}>
						<Input
							id={'studenForm'+i}
							style={{WebkitBoxShadow: '0 0 0px 1000px white inset'}}
							type='text'
							label={item.title === "Name" ? "name": "date of birth (mm/dd/yyyy)"}
							pattern={item.type === 'date' ? '\\d{1,2}\\/\\d{1,2}\\/\\d{4}': undefined}
							floatingLabel={true}
							required={true}
							onChange={(e) => this.handleUpdate(e.target.value, item)} value={item.type === "text" ? this.state.student.name : this.state.student.dob}
							/>
					</div>
				)
			}
		});

		return (
			<Container style={{maxWidth: '600px', marginTop: '30px'}}>
				<Panel>
					<Form student={this.state.student} onSubmit={(e)=> this.handleSubmit(e)}>
						<legend style={{textAlign: 'center'}}>
							Education Partners Student Form
						</legend>
						<p style={{textAlign: 'center', color: 'gray'}}>*All fields are mandatory</p>

						{formElements}

						<div className="mui--text-center">
							<Button variant="raised" type='submit'>Send</Button>
						</div>
					</Form>
				</Panel>

			</Container>
		)
	}
}


export default App;
