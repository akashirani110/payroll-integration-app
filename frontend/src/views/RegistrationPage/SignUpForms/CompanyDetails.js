import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { Input, TextField } from "@material-ui/core";


const useStyles = makeStyles(styles);

export default function CompanyDetails(props){
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function() {
        setCardAnimation("");
    }, 700);
    var [hasError, setErrors] = useState(false);
    var [orgData, setOrgData] = useState({});
    var [orgName, setOrgName] = useState({});
    var [orgABN, setOrgABN] = useState({});

    const classes = useStyles();
    const { organisationName, organisationABN, ...rest } = props;
 
    useEffect(() => {
       
        fetch("http://localhost:5000/api/organisation/org-data")
            .then(response => response.json())
            .then(orgData => setOrgData(orgData[0]));
            setOrgName(orgData.Organisation);
            setOrgABN(orgData.Abn); 
           console.log(orgName);
				
					 
    }, []);

    return(
        <div>
            
            <div>
                <div className={classes.container}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={4}>
                            <Card className={classes[cardAnimaton]}>
                            <form className={classes.form}>
                                <CardHeader color="primary" className={classes.cardHeader}>
                                <h4>Sign Up</h4>
                                </CardHeader>
                                <CardBody>
                                    
                                    <TextField
                                        name = "organisationName"
																				value = {orgData.Organisation || ''}
                                        //data = {orgName}
                                        //labelText = "Organisation Name"
                                        id="orgName"
                                        readOnly
                                        fullWidth
                                    >
                                    </TextField>
                                    <TextField
                                        name = "organisationABN"
																				value = {orgData.Abn || ''}
                                        id="orgABN"
                                        readOnly
                                        fullWidth
                                    />
                                    
                                </CardBody>
                                <CardFooter className={classes.cardFooter}>
                                    <Button simple color="primary" size="lg" onClick={() => props.history.push('/signup-form')}>
                                        Next
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
}