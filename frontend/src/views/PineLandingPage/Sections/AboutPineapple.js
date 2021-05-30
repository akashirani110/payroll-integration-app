import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/aboutPineappleStyle.js";

const useStyles = makeStyles(styles);

export default function AboutPineappleSection(){
    const classes = useStyles();
    return (
    <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Here's how we serve you Pineapple!</h2>
            <h5 className={classes.description}>
            We at Pineapple believe managing your money can be made simple and easy, changing the way you spend, save, borrow and repay to get on top and get ahead. 
            That is why we have created Australia’s first financial wellbeing wallet.
            Be better with money and save yourself a Pineapple a week.
            </h5>
          </GridItem>
          
        </GridContainer>
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <InfoArea
                title="Update primary bank account"
                description="Employees can update their primary account through our platform by providing the account details that needs to be changed"
                icon={AccountBalanceIcon}
                iconColor="info"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <InfoArea
                title="Update pay run calendar"
                description="This feature let's your employee update the pay run calendar of their choice eg. weekly, fornightly or monthly"
                icon={CalendarTodayIcon}
                iconColor="success"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <InfoArea
                title="Add savings account"
                description="Your employees can now add a savings account with a fixed amount to be added without any hassle to save some $$$ for a rainy day"
                icon={AttachMoneyIcon}
                iconColor="danger"
                vertical
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <InfoArea
                title="Update savings account"
                description="Employees can update their savings account details directly, anytime and without the need to fill any forms and submit them to the HR"
                icon={AccountBalanceWalletIcon}
                iconColor="danger"
                vertical
              />
            </GridItem>
          </GridContainer>
        </div>
    </div>
    );
}