import React, { Component } from 'react';
import SignUpForm from './SignUpForm';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from "@material-ui/core/Typography";
import CreateProfile from "../CreateProfile/CreateProfile";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}))


function getSteps() {
    return ['Sign Up', 'Create Profile']
}

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return <SignUpForm />;
        case 1:
            return <CreateProfile />;
        default:
            return 'Unknown Index!';
    }
}

const Signup = props => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();


    const handleNext = props => {
        setActiveStep(activeStep + 1);
    }

    return (
        <div>
            <header>
                <nav className="signup-nav px-2 py-2">
                    <h5>Sign Up</h5>
                </nav>
            </header>
            <section className={classes.root}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        )
                    })}
                </Stepper>
                <button className="btn btn-sm btn-info" onClick={handleNext}>Next</button>
                <div>
                    {activeStep > steps.length ? (
                        <div>
                            <h3>ERROR: You must have ended up on this page by accident</h3>
                        </div>
                    ) : (
                            <div>
                                {getStepContent(activeStep)}
                            </div>
                        )}
                </div>
            </section>
        </div>
    );

}

export default Signup;


