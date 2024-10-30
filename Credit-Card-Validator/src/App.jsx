// App.js 

import React, { useState } from "react"; 
import validator from 'validator'

const App = () => { 

const [errorMessage, setErrorMessage] = useState('') 
	
const validateCreditCard = (value) => { 
	
	if (validator.isCreditCard(value)) { 
	setErrorMessage('Valid CreditCard Number') 
	} else { 
	setErrorMessage('Enter valid CreditCard Number!') 
	} 
} 

return ( 
	<div style={{ 
	marginLeft: '200px', 
	}}> 
	<pre> 
		<h2>Validating CreditCard in ReactJS</h2> 
		<span>Enter CreditCard: </span><input type="text"
		onChange={(e) => validateCreditCard(e.target.value)}></input> <br /> 
		<span style={{ 
		fontWeight: 'bold', 
		color: 'red', 
		}}>{errorMessage}</span> 
	</pre> 
	</div> 
); 
} 

export default App
