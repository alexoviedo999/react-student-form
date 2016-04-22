import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

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

ReactDOM.render(
  <App studentForm={jsonDoc} />,
  document.getElementById('root')
);
