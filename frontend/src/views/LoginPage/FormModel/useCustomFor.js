import { useState, useEffect, useRef } from "react";
import { userToken } from "utils/auth";


const useCustomFor = (callback) => {
	const [inputs, setInputs] = useState({});

	/**
	 * Author: Maed
	 */
	const handleSubmit = (event) => {
		if (event) {
			event.preventDefault();
			const { email, password } = inputs
			fetch('/api/user/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ user: { email, password } })
			}).then(async (res) => {
				const result = await res.json();
				console.log(result)

				if (result.success) {
					window.location.href = '/dashboard'
				}
			})
		}
	}

	const handleInputChange = (event) => {
		event.persist();
		setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
	}

	return {
		handleSubmit,
		handleInputChange,
		inputs
	};
}

export default useCustomFor;