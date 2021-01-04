import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/modal.module.css';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Button,
  CardContent,
  Typography,
  Grid,
  TextField,
  Box,
  Tab,
  Avatar,
  Tabs,
  TextareaAutosize
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';  
import countries from '../../helpers/countries';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3} className={styles.tabpanelBox}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
  
const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const Address = () => {
    const [value, setValue] = React.useState(0);
    const textareaRef = useRef();
    
    useEffect(() => {   
        textareaRef.current.placeholder = textareaRef.current.placeholder.replace(/\\n/g, '\n');
    },) 
    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box className={styles.body}>   
            <TabPanel value={value} index={0} className={styles.tabPanel}>
                <Typography component={'span'} variant={'body2'} className={styles.textmenu}>Qui demande cette formation?</Typography>
            </TabPanel>
            <TabPanel value={value} index={1} className={styles.tabPanel}>
                <Typography component={'span'} variant={'body2'} className={styles.textmenu}>Parler à un conseiller : 09 72 65 24 84</Typography>
            </TabPanel>
            <Formik
                enableReinitialize
                initialValues={{
                    name: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().max(255).required('Name is required'),
                })}
                onSubmit={async (values, {
                    resetForm,
                    setErrors,
                    setStatus,
                    setSubmitting
                }) => {
                    try {
                    // NOTE: Make API request
                    await wait(200);
                    resetForm();
                    setStatus({ success: true });
                    setSubmitting(false);
                    enqueueSnackbar('Envoyée!', {
                        variant: 'success'
                    });
                    } catch (err) {
                    console.error(err);
                    setStatus({ success: false });
                    setErrors({ submit: err.message });
                    setSubmitting(false);
                    }
                }}
                >
                {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    touched,
                    values
                }) => (
                <form onSubmit={handleSubmit}>
                    <Tabs
                        value={value}
                        onChange={handleChangeTab}
                        indicatorColor="primary"
                        textColor="primary"
                        className={styles.menuBar}
                    >
                        <Tab className={styles.menu} label="Particulier" icon={<Avatar alt="test avatar" src="/image/personal.png" />} style={{width: "50%"}} {...a11yProps(0)} />
                        <Tab className={styles.menu} label="Professionnel" icon={<Avatar alt="avatar" src="/image/personal.png" />} style={{width: "50%"}} {...a11yProps(1)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <CardContent
                            className={styles.content}
                        >
                            <Grid
                                container
                                spacing={2}
                            >
                                <Grid
                                item
                                md={6}
                                xs={12}
                                >
                                <TextField
                                    fullWidth
                                    label="Prénom"
                                    name="prenom"
                                    required
                                    variant="outlined"
                                />
                                </Grid>
                                <Grid
                                item
                                md={6}
                                xs={12}
                                >
                                <TextField
                                    fullWidth
                                    label="Nom"
                                    name="nom"
                                    required
                                    variant="outlined"
                                />
                                </Grid>
                                <Grid
                                item
                                md={6}
                                xs={12}
                                >
                                <TextField
                                    fullWidth
                                    label="Ville"
                                    name="ville"
                                    required
                                    variant="outlined"
                                />
                                </Grid>
                                <Grid
                                item
                                md={6}
                                xs={12}
                                >
                                <TextField
                                    fullWidth
                                    label="Code Postal"
                                    name="code"
                                    required
                                    variant="outlined"
                                />
                                </Grid>
                                <Grid
                                item
                                md={6}
                                xs={12}
                                >
                                <TextField
                                    fullWidth
                                    label="Adresse"
                                    name="adresse"
                                    required
                                    variant="outlined"
                                />
                                </Grid>
                                <Grid
                                item
                                md={6}
                                xs={12}
                                >
                                <Autocomplete
                                    className={styles.autocompleted}
                                    getOptionLabel={(option) => option.text}
                                    options={countries}
                                    required
                                    renderInput={(params) => (
                                    <TextField
                                        fullWidth
                                        label="Pays"
                                        name="pays"
                                        variant="outlined"
                                        {...params}
                                    />
                                    )}
                                />
                                </Grid>
                                <Grid
                                item
                                md={12}
                                xs={12}
                                >
                                    <Typography component={'span'} variant={'body2'}>
                                        Message
                                    </Typography>                         
                                    <TextareaAutosize 
                                        ref={textareaRef}
                                        aria-label="minimum height" 
                                        rowsMin={10} 
                                        className={[styles.textarea, "textarea"].join(' ')}
                                        placeholder="Mon métier est:\nMon projet est:\nMes objectifs sont:\nMon budget de formation est:\nJe souhaite etre recontacté aux dates et horaires suivants :" 
                                    />
                                </Grid>
                                <Grid
                                item
                                md={12}
                                xs={12}
                                >
                                    <Button 
                                        fullWidth
                                        variant="contained" 
                                        className={styles.boutton} 
                                        disabled={isSubmitting}
                                        type="submit"
                                    >
                                        Envoyer mon devis
                                    </Button>
                                </Grid>      
                            </Grid>
                        </CardContent>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <CardContent
                            className={styles.content}
                        >
                            <Grid
                                container
                                spacing={4}
                            >
                                <Grid
                                item
                                md={12}
                                xs={12}
                                >
                                <TextField
                                    fullWidth
                                    label="Entreprise"
                                    name="entreprise"
                                    required
                                    variant="outlined"
                                />
                                </Grid>
                                <Grid
                                item
                                md={6}
                                xs={12}
                                >
                                <TextField
                                    fullWidth
                                    label="Ville"
                                    name="ville"
                                    required
                                    variant="outlined"
                                />
                                </Grid>
                                <Grid
                                item
                                md={6}
                                xs={12}
                                >
                                <TextField
                                    fullWidth
                                    label="Code Postal"
                                    name="code"
                                    required
                                    variant="outlined"
                                />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                spacing={4}
                            >
                                <Grid
                                item
                                md={6}
                                xs={12}
                                >
                                <TextField
                                    fullWidth
                                    label="Adresse"
                                    name="adresse"
                                    required
                                    variant="outlined"
                                />
                                </Grid>
                                <Grid
                                item
                                md={6}
                                xs={12}
                                >
                                <Autocomplete
                                    className={styles.autocompleted}
                                    getOptionLabel={(option) => option.text}
                                    options={countries}
                                    required
                                    renderInput={(params) => (
                                    <TextField
                                        fullWidth
                                        label="Pays"
                                        name="pays"
                                        variant="outlined"
                                        {...params}
                                    />
                                    )}
                                />
                                </Grid>
                                <Grid
                                item
                                md={12}
                                xs={12}
                                >
                                    <Typography component={'span'} variant={'body2'}>
                                        Message
                                    </Typography>
                                    <TextareaAutosize 
                                        ref={textareaRef}
                                        aria-label="minimum height" 
                                        rowsMin={10} 
                                        className={[styles.textarea, "textarea"].join(' ') }
                                        placeholder="Mon métier est:\nMon projet est:\nMes objectifs sont:\nMon budget de formation est:\nJe souhaite etre recontacté aux dates et horaires suivants :" 
                                    />
                                </Grid>     
                            </Grid>
                            <Grid
                                item
                                md={12}
                                xs={12}
                                >
                                <Button 
                                    fullWidth
                                    variant="contained" 
                                    className={styles.boutton} 
                                    disabled={isSubmitting}
                                    type="submit"
                                >
                                    Envoyer mon devis
                                </Button>
                            </Grid> 
                        </CardContent>
                    </TabPanel>
                </form>
            )}
            </Formik>
        </Box>               
  )
}
export default Address;