import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
//import Header from "components/Header/Header.js";
//import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import WorkIcon from '@material-ui/icons/Work';
import DialpadIcon from '@material-ui/icons/Dialpad';

import useCustomForm from './FormModel/useCustomForm';

import { Input, TextField, InputAdornment } from '@material-ui/core';
//import classes from '*.module.css';
import styles from "assets/jss/material-kit-react/views/loginPage.js";


const useStyles = makeStyles(styles);
export default function SignUpForm (props) {
    const classes = useStyles();
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function() {
        setCardAnimation("");
    }, 700);
    const {inputs, handleInputChange, handleSubmit} = useCustomForm(SignUpForm);
    // alert(`User created!
    //     Name: ${inputs.fullName} Email: ${inputs.email}`);
    
    // const signup = () =>{
    //     alert(`User created!
    //     Name: ${inputs.fullName} Email: ${inputs.email}`);
    // }
    // const {inputs, handleInputChange, handleSubmit} = useCustomForm(signup);


  return(
    
        
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <form className={classes.form} onSubmit={handleSubmit} >
              <CardHeader color="primary" className={classes.cardHeader}>
                <h4>Sign Up</h4>
              </CardHeader>
              <CardBody>
                <Input
                  name = "firstName"
                  placeholder = "First Name"
                  type = "text"
                  required
                  fullWidth
                  onChange={handleInputChange}
                  value={inputs.firstName || ''}
                  //inputProps={fullName}
                >
                </Input>

                <Input
                  name = "lastName"
                  placeholder = "Last Name"
                  type = "text"
                  required
                  fullWidth
                  onChange={handleInputChange}
                  value={inputs.lastName || ''}
                  //inputProps={fullName}
                >
              	</Input>
                               
              	<Input
                  name = "position"
                  placeholder = "Position"
                  type = "text"
                  required
                  fullWidth
                  onChange={handleInputChange}
                	value={inputs.position || ''}>
                </Input>

                <Input
                  name = "email"
                  placeholder = "Email"
                  type = "email"
                  required
                  fullWidth
                  color = 'primary'
                	onChange={handleInputChange}
                  value={inputs.email || ''}>
                </Input>

                <Input
                  name = "password"
                  placeholder = "Password"
                  type = "password"
                  required
                  fullWidth
                  onChange={handleInputChange}
                  value={inputs.password || ''}>
                  <InputAdornment position="end">
                    <WorkIcon className={classes.icons} />
                  </InputAdornment>
                 </Input>
							</CardBody>

              <CardFooter className={classes.cardFooter}>
                <Button simple color="primary" size="lg" type ="submit">
                  Submit
                </Button>
              </CardFooter>

            </form>
          </Card>    
        </GridItem>
      </GridContainer>
    </div>
        
  );
}
//export default SignUpForm;