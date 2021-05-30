import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import { Link } from "react-router-dom";

import styles from "./../../assets/jss/material-kit-react/views/successfulRegistrationPage";

const useStyles = makeStyles(styles);

export default function AlreadyRegistered(){
  const classes = useStyles();
  return(
		<div className={classes.background}>
		<div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>The User is already registered for this organisation!</h2>
					<h2 className={classes.title}>
						Please <a className={classes.a} href="/login">login</a> to continue...
					</h2>
          
        </GridItem>
          
      </GridContainer>
        
    </div>
		</div>
  );
}