import { container, title } from "assets/jss/material-kit-react.js";
import {
  secondaryColor,
} from "assets/jss/material-kit-react.js";


const successfulRegistrationPage = {

		background: {
			background:"#205f70",
			height: "100vh"
		},

    container: {
        ...container,
        zIndex: "2",
        position: "relative",
        paddingTop: "30vh",
        color: "#256171",
        paddingBottom: "200px"
			},
			title: {
        ...title,
        marginBottom: "1rem",
        marginTop: "30px",
        minHeight: "32px",
        textDecoration: "none",
        color:"#fdc315"
			},
			pineappleText: {
				marginBottom: "1rem",
        marginTop: "30px",
        minHeight: "32px",
        textDecoration: "none",
				color: secondaryColor
			},
			a: {
				color: secondaryColor
			}
}

export default successfulRegistrationPage;