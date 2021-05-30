import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
//import Chat from "@material-ui/icons/Chat";
//import VerifiedUser from "@material-ui/icons/VerifiedUser";
//import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productDetailStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
    const classes = useStyles();
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Life{"'"}s sweeter with Pineapple</h2>
            <h5 className={classes.description}>
            Pineapple is a financial wellbeing wallet that makes it simple to see where your money is going, plan for what is coming up, spend fruitfully and take control of your pay.
​            Be positive about money and get ahead on
            your sunny day savings.
            </h5>
          </GridItem>
          
        </GridContainer>
        
      </div>
    );
  }
  