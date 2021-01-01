import React from 'react';
import Head from 'next/head';
import styles from '../../styles/modal.module.css';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Button,
  Modal,
  Grid,
  Fade,
  Backdrop,
  Stepper,
  makeStyles,
  Typography,
  Step,
  withStyles,
  StepLabel,
} from '@material-ui/core';
import ContactIcon from '@material-ui/icons/PermIdentity';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment';
import StepConnector from '@material-ui/core/StepConnector';
import Contact from './Contact';
import Address from './Address';
import Facture from './Facture';
  
const useQontoStepIconStyles = makeStyles({
    root: {
      color: '#eaeaf0',
      display: 'flex',
      height: 22,
      alignItems: 'center',
    },
    active: {
      color: '#784af4',
    },
    circle: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
    completed: {
      color: '#784af4',
      zIndex: 1,
      fontSize: 18,
    },
});

function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
        })}
      >
        {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
      </div>
    );
}
QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
    alternativeLabel: {
      top: 22,
    },
    active: {
      '& $line': {
        background:
          '#19b3a3',
      },
    },
    completed: {
      '& $line': {
        background:
          '#19b3a3',
      },
    },
    line: {
      height: 3,
      border: 0,
      backgroundColor: '#eaeaf0',
      borderRadius: 1,
    },
})(StepConnector);
const useColorlibStepIconStyles = makeStyles({
    root: {
      backgroundColor: '#ccc',
      zIndex: 1,
      color: '#fff',
      width: 50,
      height: 50,
      display: 'flex',
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    active: {
      background:
        '#19b3a3',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
      background:
        '#19b3a3',
    },
});

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;
  
    const icons = {
      1: <ContactIcon />,
      2: <HomeIcon />,
      3: <AssignmentIcon />,
    };
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Contact', 'Coordonnées', 'Facturation'];
}
  
export default function Devis() {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
  return (
      <main className={styles.main}>
        <Button variant="contained" className={styles.boutton} onClick={handleOpen}>Prendre Contact</Button>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={styles.modal}
            open={open}
            onClose={handleClose}
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className={styles.paper}>
                    <div className={styles.header}>      
                        <Typography className={styles.title} id="ModalLabel">Demander un devis</Typography>
                        <button type="button" className={styles.close} data-dismiss="modal" aria-label="Close" onClick={handleClose}><span aria-hidden="true">×</span></button>
                    </div>
                    <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                        {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                        </Step>
                        ))}
                    </Stepper>
                    <Grid
                        container
                        spacing={4}
                    >
                        {activeStep === steps.length ? (
                        <div>
                            <Typography className={classes.instructions}>
                            All steps completed - you&apos;re finished
                            </Typography>
                            <Button onClick={handleReset} className={classes.button}>
                            Reset
                            </Button>
                        </div>
                        ) : (
                        <div style={{width:"100%"}}>
                        {activeStep === 0? <Contact /> : activeStep === 1? <Address/> : <Facture />}
                            
                            <div className={styles.footer}>
                                <Grid
                                    item
                                    md={12}
                                    xs={12}
                                >
                                    <Button variant="contained" className={styles.boutton} onClick={handleNext}>Envoyer</Button>
                                </Grid>
                            </div>
                        </div>
                        )}
                    </Grid>
                </div>
            </Fade>
        </Modal>
      </main>
  )
}