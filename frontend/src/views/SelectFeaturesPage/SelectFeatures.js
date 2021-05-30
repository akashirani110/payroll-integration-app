import React, {useState} from 'react';

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
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Check from "@material-ui/icons/Check";

import styles from "assets/jss/material-kit-react/views/selectFeaturesStyle";
//import customCheckboxRadioSwitch from "assets/jss/material-kit-react/customCheckboxRadioSwitch.js";
import { userInfo } from 'os';

const useStyles = makeStyles(styles);

export default function SelectFeatures(){
	const classes = useStyles();
	const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function() {
        setCardAnimation("");
		}, 700);
		
	const[selectFeature, setSelectFeature] = useState([false,false,false,false]);

	const handleSubmit =async(event) => {
			console.log(selectFeature)
			
			await fetch('http://localhost:5000/api/organisation/addfeatures', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({feature: `${selectFeature}`})
			}).then((res)=>{
				if(res.ok){
					window.location.href = 'http://localhost:3000/success-registration';
				}
				else{
					window.alert('Waiting for server..');
				}
			})
		}

	const handleChange =(event) => {
		//event.preventDefault();
		let newArr = [...selectFeature];
		if (event.target.checked) {
		newArr[event.target.id] = true;	
		} else {
      newArr[event.target.id] = false;
    }
		setSelectFeature(newArr);
	}
	
return(
  <div className={classes.container}>
		<div className={classes.title} color="secondary">
			</div>
			<GridContainer justify="center">
				<GridItem xs={12} sm={12} md={4}>
        	<Card>
          	<form className={classes.form} onSubmit = {handleSubmit} >
            	<CardHeader color="primary" className={classes.cardHeader}>
              	<h4>Select Features</h4>
            	</CardHeader>
							<CardBody>
							<div
                className={
                  classes.checkboxAndRadio +
                  " " +
                  classes.checkboxAndRadioHorizontal
                }
              >
								<FormControlLabel
									control={
										
										<Checkbox
											id="0"
											color="secondary"
											tabIndex={-1}
											value="Update primary bank account"
											onChange = {handleChange}
											checkedIcon={<Check className={classes.checkedIcon} />}
											icon={<Check className={classes.uncheckedIcon} />}
											classes={{
												checked: classes.checked,
												root: classes.checkRoot
											}}
											
										/>
										
									}
									classes={{ label: classes.label, root: classes.labelRoot }}
                  label="Update primary bank account"
								/>
							</div>
							<div
                className={
                  classes.checkboxAndRadio +
                  " " +
                  classes.checkboxAndRadioHorizontal
                }
              >
                <FormControlLabel
                  control={
                    <Checkbox
											id="1"
											tabIndex={-1}
											value="Update pay run calendar"
											color="secondary"
											onChange = {handleChange}
											checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked,
                        root: classes.checkRoot
                      }}
                    />
                  }
                  classes={{ label: classes.label, root: classes.labelRoot }}
                  label="Update pay run calendar"
                />
              </div>
							<div
                className={
                  classes.checkboxAndRadio +
                  " " +
                  classes.checkboxAndRadioHorizontal
                }
              >
                <FormControlLabel
                  control={
                    <Checkbox
											id="2"
											tabIndex={-1}
											color="secondary"
											value="Add savings account"
											onChange = {handleChange}
											checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked,
                        root: classes.checkRoot
                      }}
                    />
                  }
                  classes={{ label: classes.label, root: classes.labelRoot }}
                  label="Add savings account"
                />
              </div>

							<div
                className={
                  classes.checkboxAndRadio +
                  " " +
                  classes.checkboxAndRadioHorizontal
                }
              >
                <FormControlLabel
                  control={
                    <Checkbox
											id="3"
											tabIndex={-1}
											color="primary"
											value="Update savings account"
											onChange = {handleChange}
											checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked,
                        root: classes.checkRoot
                      }}
                    />
                  }
                  classes={{ label: classes.label, root: classes.labelRoot }}
                  label="Update savings account"
                />
              </div>
									
								
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
  )
}