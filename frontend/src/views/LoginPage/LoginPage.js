import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import WorkIcon from '@material-ui/icons/Work';
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import useCustomFor from './FormModel/useCustomFor'
import image from "assets/img/bg7.jpg";
import { Input } from "@material-ui/core";

const useStyles = makeStyles(styles);
export default function LoginPage() {
  const classes = useStyles();
  const { inputs, handleInputChange, handleSubmit } = useCustomFor(LoginPage);




  // export default function LoginPage(props) {
  //   const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  //  setTimeout(function() {
  //   setCardAnimation("");
  // }, 700);
  // const classes = useStyles();
  // const { ...rest } = props;
  return (
    // <div>
    //   <Header
    //     absolute
    //     color="transparent"
    //     brand="Material Kit React"
    //     rightLinks={<HeaderLinks />}
    //     {...rest}
    //   />
    // <div
    //   className={classes.pageHeader}
    //   style={{
    //     backgroundImage: "url(" + image + ")",
    //     backgroundSize: "cover",
    //     backgroundPosition: "top center"
    //   }}
    //>
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <form className={classes.form} onSubmit={handleSubmit}>
              <CardHeader color="primary" className={classes.cardHeader}>
                <h4>Login</h4>
              </CardHeader>

              <CardBody>
                <Input
                  name="email"
                  placeholder="Email"
                  type="email"
                  required
                  fullWidth
                  onChange={handleInputChange}
                  value={inputs.email || ''}
                ></Input>

                <Input
                  name="password"
                  placeholder="password"
                  type="password"
                  required
                  fullWidth
                  onChange={handleInputChange}
                  value={inputs.password || ''}
                ><InputAdornment position="end">
                    <WorkIcon className={classes.icons} />
                  </InputAdornment>
                </Input>

              </CardBody>

              <CardFooter className={classes.cardFooter}>
                <Button simple color="primary" size="lg" type="submit">
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
//export default LoginPage;