//import { response } from "express";
import { useState, useEffect, useRef } from "react";


const useCustomForm = (callback) => {
    const [inputs, setInputs] = useState({});

    const handleSubmit = async(event) => {
        if(event) {
            event.preventDefault();
            //fetch('')
            
            const data = JSON.stringify({FirstName: `${inputs.firstName}`, LastName: `${inputs.lastName}`, Position: `${inputs.position}`, Email: `${inputs.email}`, Password: `${inputs.password}` });
            //      alert(data);
            //console.log(data);
            await fetch('http://localhost:5000/api/user',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({FirstName: `${inputs.firstName}`, LastName: `${inputs.lastName}`, Position: `${inputs.position}`, Email: `${inputs.email}`, Password: `${inputs.password}` })
						}).then((res) => {
							if(res.ok){
                                res.json().then((jsonData) => {
																	console.log(jsonData)
																	if(jsonData.message == "User registered successfully"){
                                    window.location.href = '/select-features'
                                }
                                else if(jsonData.message == "User is already linked to the organisation"){
                                    window.location.href = '/already-registered'
                                }
                                else{
                                    window.alert("Something went wrong");
                                }
                                })
                            }
                            else{
                                window.alert("Something went wrong");
                            }
						})
        //callback();

    }
}

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    }

    return {
        handleSubmit,
        handleInputChange,
        inputs
    };
}

export default useCustomForm;