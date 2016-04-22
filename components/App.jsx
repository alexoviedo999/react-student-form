import React, {Component} from 'react';



// console.log('jsonDoc1', jsonDoc);
// const blob = JSON.stringifyß(jsonDoc);

class App extends Component {

	constructor(props) {
		super(props);

		const Student = {
			name: 'joe',
			dob: null,
			residency: null,
			gender: null
		}

		this.state = {
		  studentForm: this.props.studentForm,
		  student: Student
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

		const formElements = this.state.studentForm.fields.map((item, i)=> {
				if (item.type === "select") {
					return (
						<div key={i}>
							<select
								id={'studenForm'+i}
								type='text'
								onChange={(e) => this.handleNameUpdate(e.target.value)} value={this.state.student.name}>
								{item.options.map( opt => <option value={opt}>{opt}</option>)}
							</select>
							<label for={'studenForm'+i}>{item.title}</label>
						</div>
					)

				} else if (item.type === "radio") {
					return (
						<div key={i}>

							{item.options.map(opt => <input type="radio" value={opt} name={item.title}/>) }
							<label for={'studenForm'+i}>{item.title}</label>
						</div>
					)

				} else {
					return (
						<div key={i}>
							<input
								id={'studenForm'+i}
								type='text'
								onChange={(e) => this.handleNameUpdate(e.target.value)} value={this.state.student.name}
								/>
							<label for={'studenForm'+i}>{item.title}</label>
						</div>
					)
				}
		});

		return (
			<div>
				<form student  = {this.state.student}>

					{formElements}

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
