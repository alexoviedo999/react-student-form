import React from 'react';
import {
	Appbar,
	Form,
	Input,
	Button,
	Radio,
	Select,
	Option
} from 'muicss/react';

const FormElements = (props) => {

  const {formState} = props;
  const {student, studentForm, genderValidate} = props.formState.state;
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
    },
    inputNoYello: {
      WebkitBoxShadow: '0 0 0px 1000px white inset'
    }
  }

  const formElements = studentForm.fields.map((item, i) => {
    if (item.type === 'select') {
      return (
        <div key={i}>
          <label>{item.title}</label>
          <Select
            value={student.residency}
            onChange={(e) => formState.handleUpdate(e, item)}>
              {item.options.map((opt, i) => <Option key={'option' + i}
              label={opt}
              value={opt} />)}
          </Select>
        </div>
      )
    } else if (item.type === 'radio') {
      return (
        <div key={i}>
          <label>{item.title}</label>
          <span style={genderValidate ? validateStyle.validateOn : validateStyle.validateOff}>Please Select Gender!</span>
          {item.options.map((opt, i) => <div key={'radio' + i}>
            <Radio
              type="radio"
              id={'radio' + i}
              value={opt}
              label={opt}
              name={item.title}
              onClick={(e) => formState.handleUpdate(e.target.value, item)} />
          </div>) }
        </div>
      )
    } else {
      return (
        <div key={i}>
          <Input
            id={'studenForm' + i}
            style={validateStyle.inputNoYello}
            type="text"
            label={item.title === 'Name' ? 'name' : 'date of birth (mm/dd/yyyy)'}
            pattern={item.type === 'date' ? '\\d{1,2}\\/\\d{1,2}\\/\\d{4}' : undefined}
            floatingLabel={true}
            required={true}
            value={item.type === 'text' ? student.name : student.dob}
            onChange={(e) => props.formState.handleUpdate(e.target.value, item)} />
        </div>
      )
    }
  });

  return (
    <Form student={student} onSubmit={(e)=> formState.handleSubmit(e)}>
      <legend className="mui--text-center">
        Education Partners Student Form
      </legend>
      <p className="mui--text-center" style={{color: 'gray'}}>*All fields are mandatory</p>

      {formElements}

      <div className="mui--text-center">
        <Button variant="raised" type="submit">Send</Button>
      </div>
    </Form>
  )
}

export default FormElements;
