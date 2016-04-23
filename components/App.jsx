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
		  student: {}
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
	}


	handleUpdate(value, type){
		var studentKey;
		if (type.title === 'Name') {
			studentKey = 'name';
		} else if (type.title === 'Date of Birth') {
			studentKey = 'dob';
		} else if (type.title === 'Residency') {
			studentKey = 'residency';
		} else if (type.title === 'Gender') {
			studentKey = 'gender';
		} else {
			alert("Sorry, didn't work")
		}

		this.setState({
		  student: {
			...this.state.student,
			[studentKey]: value
		  }
		});
	}

	handleSubmit (e) {
		e.preventDefault();
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
		  }).catch(function(error) {
	    	console.log('student form request failed', error)
	      });

			console.log('jsonStudent', jsonStudent);
	}

	render() {

		const formElements = this.state.studentForm.fields.map((item, i) => {
			if (item.type === "select") {
				return (
					<div key={i}>
						<label>{item.title}</label>
						<Select
							defaultValue={item.options[0]}
							onChange={(value) => this.handleUpdate(value, item)}>
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
							label={item.title === "Name" ? "name": "date of birth mm/dd/yyyy"}
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
						<legend style={{textAlign: 'center'}}>Education Partners Student Form</legend>

						{formElements}

						<div className="mui--text-center">
							<Button variant="raised" type='submit'>Submit</Button>
						</div>
					</Form>
				</Panel>
			</Container>
		)
	}
}

// App.propTypes = {
// 	name: React.propTypes.string
// }


export default App;
