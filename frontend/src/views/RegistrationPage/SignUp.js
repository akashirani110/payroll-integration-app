import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { TextField } from 'formik-material-ui';
import { makeStyles } from "@material-ui/core/styles";
import { Stepper, Step, StepLabel, CircularProgress } from '@material-ui/core';
import CompanyDetails from './SignUpForms/CompanyDetails';
import PersonalDetails from './SignUpForms/PersonalDetails';

import ValidationSchema from './SignUpForms/FormModel/ValidationSchema';
import FormInitialValues from './SignUpForms/FormModel/FormInitialValues';
import SignUpFormModel from './SignUpForms/FormModel/SignUpFormModel';

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
//import Button from "components/CustomButtons/Button.js";
//import classes from "*.module.css";
import styles from "assets/jss/material-kit-react/views/loginPage.js";

const useStyles = makeStyles(styles);

const steps = ['Company Details', 'Personal Details'];
const { formId, formField } = SignUpFormModel;

function _renderStepContent(step) {
    switch (step) {
        case 0:
            return <CompanyDetails formField={formField} />
        case 1:
            return <PersonalDetails formField={formField} />
    }
}

export default function SignUp(){
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const currentValidationSchema = ValidationSchema[activeStep];
    const isLastStep = activeStep === steps.length - 1;

    function _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function _submitForm(values, actions) {
        await _sleep(1000);
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
        setActiveStep(activeStep  + 1);
    }

    function _handleSubmit(values, actions){
        if(isLastStep) {
            _submitForm(values, actions);
        }
        else{
            setActiveStep(activeStep + 1);
            actions.setSubmitting(false);
        }
    }

    function _handleBack(){
        setActiveStep(activeStep - 1);
    }
    return(

        <div>
            <div className={classes.container}>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={4}>
                    <Card>
                      <Formik initialValues={{
                        companyName:'',
                        companyABN:'',
                        customerName:'',
                        customerPosition:''
                      	}} onSubmit={() => {}}>
                        <Form autoComplete="off">
                        	<Field name="companyName" component={TextField} />
                          <Field name="companyABN" component={TextField} />
                          <Field name="customerName" component={TextField} label="Name"/>
                          <Field name="customerPosition" component={TextField} label="Your Position" />

                        </Form>
                      </Formik>

                    </Card>

                	</GridItem>

                </GridContainer>
            </div>
            <h3>This is where organisation will be displayed</h3>
        </div>
    );
}