import React, { useState, useEffect, useRef } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
//import Icon from "@material-ui/core/Icon";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
//import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import WorkIcon from '@material-ui/icons/Work';
import DialpadIcon from '@material-ui/icons/Dialpad';

import useCustomForm from './FormModel/useCustomForm';

import styles from "assets/jss/material-kit-react/views/loginPage.js";

const useStyles = makeStyles(styles);

export default function PersonalDetails (props){
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function() {
        setCardAnimation("");
    }, 700);

    const classes = useStyles();
    const{
        //formField: { fullName, position, email, password }
    ...rest} = props;
    // const { 
    //      formField: { 
    //          fullName, 
    //          position, 
    //          email, 
    //          password }
    //       } = props;

    const initialValues = {
				firstName: "",
				lastName: "",
        position: "",
        email:"",
        password:""
    };
    
    const {
        values,
        errors,
        touched,
        handleChange,
        //handleBlur,
        handleSubmit
        } = useCustomForm({ 
            initialValues,
            onSubmit: values => console.log({values}) 
        });
    

    return(
        <div>
            <Header
                absolute
                color="white"
                brand="Pineapple"
                rightLinks = {<HeaderLinks />}
                {...rest}
            />
            <div>
            <div className={classes.container}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={4}>
                            <Card className={classes[cardAnimaton]}>
                            <form className={classes.form} onSubmit={handleSubmit}>
                                <CardHeader color="primary" className={classes.cardHeader}>
                                <h4>Sign Up</h4>
                                </CardHeader>
                                <CardBody>
                                    <CustomInput
                    
                                        //name = "fullName"
                                        values = {values.firstName}
                                        //onChange = {handleChange}
                                        //data = {orgName}
                                        labelText = "First Name"
                                        contentEditable= "false"
                                        id="firstname"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type:"text",
                                            name:"firstName",
                                            endAdornment: (
                                            <InputAdornment position="end">
                                               <WorkIcon className={classes.icons} /> 
                                            </InputAdornment>
                                            )
                                        }} 
                                    ></CustomInput>
                                    <CustomInput
                    
																				//name = "fullName"
																				values = {values.lastName || ''}
																				//onChange = {handleChange}
																				//data = {orgName}
																				labelText = "Last Name"
																				contentEditable= "false"
																				id="lastname"
																				formControlProps={{
																						fullWidth: true
																				}}
																				inputProps={{
																						type:"text",
																						name:"lastName",
																						endAdornment: (
																						<InputAdornment position="end">
																							<WorkIcon className={classes.icons} /> 
																						</InputAdornment>
																						)
																				}} 
																		></CustomInput>
                                    <CustomInput
                                        //name = "position"
                                        values = {values.position || ''}
                                        onChange = {handleChange}
                                        //data = {orgName}
                                        labelText = "Position"
                                        contentEditable= "false"
                                        id="position"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "text",
                                            endAdornment: (
                                            <InputAdornment position="end">
                                               <WorkIcon className={classes.icons} /> 
                                            </InputAdornment>
                                            )
                                        }} 
                                    ></CustomInput>
                                    <CustomInput
                                        //name = "email"
                                        values = {values.email || ''}
                                        onChange = {handleChange}
                                        labelText="Email"
                                        id="email"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "email",
                                            endAdornment: (
                                            <InputAdornment position="end">
                                                <DialpadIcon className={classes.icons} />
                                            </InputAdornment>
                                            )
                                        }}
                                    />
                                    <CustomInput
                                        //name = "password"
                                        values = {values.password || ''}
                                        onChange = {handleChange}
                                        //data = {orgName}
                                        labelText = "Password"
                                        contentEditable= "false"
                                        id="password"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: "password",
                                            endAdornment: (
                                            <InputAdornment position="end">
                                               <WorkIcon className={classes.icons} /> 
                                            </InputAdornment>
                                            )
                                        }} 
                                    ></CustomInput>
                                    
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
            </div>
        </div>
    );
    //onClick={() => props.history.push('/personal-details'),
}