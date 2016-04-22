import React, {Component} from 'react';
import {Appbar, Form, Input, Button, Radio, Select, Option, Container, Panel} from 'muicss/react';


class App extends Component {

	constructor(props) {
		super(props);

		const Student = {
			name: '',
			dob: '',
			residency: '',
			gender: ''
		}
		//are properties necessary in Student?

		this.state = {
		  studentForm: this.props.studentForm,
		  student: Student
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
	}


	handleUpdate(value, type){
		// let {name} = this.state.student;
		// debugger;
		var studentKey;

		if (type.title === 'Name') {
			studentKey = 'name';
		} else if (type.title === 'Date of Birth') {
			studentKey = 'dob';
		} else if (type.title === 'Residency') {
			studentKey = 'residency';
		} else {
			studentKey = 'gender';
		}

		this.setState({
		  student: {
			...this.state.student,
			[studentKey]: value
		  }
		});

		// this.setState({
		//   student: Object.assign({}, this.state.student, { [studentKey]: value })
	    // });

		console.log('state', this.state.student);
	}

	handleSubmit () {
		// debugger;
		// e.preventDefault(); //why???
	 	console.log('student submit', this.state.student);
	}

	render() {

		const formElements = this.state.studentForm.fields.map((item, i) => {
				if (item.type === "select") {
					return (
						<div key={i}>
							<label for={'studenForm'+i}>{item.title}</label>
							<Select
								id={'studenForm'+i}
								type='text'
								onChange={(e) => this.handleUpdate(e.target.value, item)} value={this.state.student.residency}>
								{item.options.map( (opt, i) => <Option key={'option'+i} label={opt} value={opt}>{opt}</Option>)}
							</Select>

						</div>
					)

				} else if (item.type === "radio") {
					return (
						<div key={i}>
							<label for={'studenForm'+i}>{item.title}</label>
							{item.options.map( (opt, i) => <div><Radio
								type="radio"
								id={'radio'+i}
								key={'radio'+i}
								value={opt}
								label={opt}
								onChange={(e) => this.handleUpdate(e.target.value, item)}
								name={item.title} />
						</div>) }

						</div>
					)

				} else {
					return (
						<div key={i}>
							<Input
								id={'studenForm'+i}
								type={item.title === "Name" ? "text": "date"}
								label={item.title === "Name" ? "name": "date of birth"}
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
					<Form student={this.state.student} onSubmit={()=> this.handleSubmit()}>
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
