import React, {Component} from 'react';


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
							<select
								id={'studenForm'+i}
								type='text'
								onChange={(e) => this.handleUpdate(e.target.value, item)} value={this.state.student.residency}>
								{item.options.map( (opt, i) => <option key={'option'+i} value={opt}>{opt}</option>)}
							</select>
							<label for={'studenForm'+i}>{item.title}</label>
						</div>
					)

				} else if (item.type === "radio") {
					return (
						<div key={i}>
							<label for={'studenForm'+i}>{item.title}</label>
							{item.options.map( (opt, i) => <div><input
								type="radio"
								id={'radio'+i}
								key={'radio'+i}
								value={opt}
								onChange={(e) => this.handleUpdate(e.target.value, item)}
								name={item.title} />
							<label for={'radio'+i} >{opt}</label></div>) }

						</div>
					)

				} else {
					return (
						<div key={i}>
							<input
								id={'studenForm'+i}
								type='text'
								onChange={(e) => this.handleUpdate(e.target.value, item)} value={item.type === "text" ? this.state.student.name : this.state.student.dob}
								/>
							<label for={'studenForm'+i}>{item.title}</label>
						</div>
					)
				}
		});

		return (
			<div>
				<form student={this.state.student} onSubmit={()=> this.handleSubmit()}>

					{formElements}

					<button style={{color:'blue'}} type='submit'>Submit</button>

				</form>
			</div>
		)
	}
}

// App.propTypes = {
// 	name: React.propTypes.string
// }


export default App;
