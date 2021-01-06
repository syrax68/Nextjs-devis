import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/modal.module.css';
import * as Yup from 'yup';
import { Formik } from 'formik';
import wait from '../../utils/wait';
import {
    Button,
    CardContent,
    Typography,
    FormHelperText,
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
                <Box p={1} className={styles.tabpanelBox}>
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
const Address = (props) => {
    const [value, setValue] = useState(0);
    const [contact, setContact] = useState();
    const [country, setCountry] = useState();
    const [address, setAddress] = useState();
    const textareaRef = useRef();

    useEffect(() => {
        if (typeof window !== "undefined") {
            setContact(JSON.parse(localStorage.getItem('dataContact')))
            setAddress(JSON.parse(localStorage.getItem('dataAddress')))    
        }
        textareaRef.current? textareaRef.current.placeholder = textareaRef.current.placeholder.replace(/\\n/g, '\n'):null;
    },[value, setContact, setAddress])
    
    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };  
    const onChangeCountry = (event, values) => {
        setCountry(values);
    }
    return (
        <Box className={styles.body}>
            <TabPanel value={value} index={1} className={styles.tabPanel}>
                <Typography component={'span'} variant={'body2'} className={styles.textmenu}>Parler à un conseiller : 09 72 65 24 84</Typography>
            </TabPanel>
            <Tabs
                value={value}
                onChange={handleChangeTab}
                indicatorColor="primary"
                textColor="primary"
                className={styles.menuBar}
            >
                <Tab className={[styles.menu , styles.menuleft, value===0?styles.activeTab:null].join(' ')} label="Particulier" icon={<Avatar alt="test avatar" src="/image/personal.png" />} style={{ width: "50%" }} {...a11yProps(0)} />
                <Tab className={[styles.menu , styles.menuright, value===1?styles.activeTab:null].join(' ')} label="Professionnel" icon={<Avatar alt="avatar" src="/image/professional.png" />} style={{ width: "50%" }} {...a11yProps(1)} />
            </Tabs>
            <Formik
                enableReinitialize
                initialValues={{
                    firstname: address?address.firstname:contact?contact.firstnamekljh:'',
                    lastname: address?address.lastname:contact?contact.lastnamekljh:'',
                    state: address?address.state:'',
                    code: address?address.code:'',
                    address: address?address.address:'',
                    country: address?address.country:country?country:countries[73],
                    message: address?address.message:'',
                }}
                validationSchema={Yup.object().shape({
                    firstname: Yup.string().max(30).required('Merci de renseigner votre nom'),
                    lastname: Yup.string().max(30).required('Merci de renseigner votre prénom'),
                    state: Yup.string().required('Merci de renseigner votre ville'),
                    code: Yup.number().typeError('Le code postal doit être un nombre').required('Merci de renseigner votre code postal'),
                    address: Yup.string().max(50).required(`Merci de renseigner l\'adresse`),
                    country: Yup.object().required('Merci de renseigner le pays'),
                    message: Yup.string().max(255),
                })}
                onSubmit={async (values, {
                    resetForm,
                    setErrors,
                    setStatus,
                    setSubmitting
                }) => {
                    try {
                        // NOTE: Make API request
                        console.log(address);
                        await wait(200);
                        resetForm();
                        setStatus({ success: true });
                        setSubmitting(false);
                        if (typeof window !== "undefined") {
                            if(country){
                                values.country = country?country:countries[73];
                            }
                            localStorage.setItem('dataAddress',JSON.stringify(values))    
                        }
                        return props.setActiveStep(2)
                    } catch (err) {
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
                        <TabPanel value={value} index={0}>
                            <CardContent
                                className={styles.content}
                            >
                                <Grid
                                    container
                                    spacing={2}
                                    className={styles.container}
                                >
                                    <Grid
                                        item
                                        md={6}
                                        xs={6}
                                    >
                                        <TextField
                                            error={Boolean(touched.lastname && errors.lastname)}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.lastname}
                                            fullWidth
                                            label="Prénom"
                                            name="lastname"
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={6}
                                    >
                                        <TextField
                                            error={Boolean(touched.firstname && errors.firstname)}
                                            helperText={touched.firstname && errors.firstname}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.firstname}
                                            fullWidth
                                            label="Nom"
                                            name="firstname"
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={6}
                                    >
                                        <TextField
                                            error={Boolean(touched.state && errors.state)}
                                            helperText={touched.state && errors.state}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.state}
                                            fullWidth
                                            label="Ville"
                                            name="state"
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={6}
                                    >
                                        <TextField
                                            error={Boolean(touched.address && errors.address)}
                                            helperText={touched.address && errors.address}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.address}
                                            fullWidth
                                            label="Adresse"
                                            name="address"
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={6}
                                    >
                                        <TextField
                                            error={Boolean(touched.code && errors.code)}
                                            helperText={touched.code && errors.code}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.code}
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
                                        xs={6}
                                    >
                                        <Autocomplete
                                            className={styles.autocompleted}
                                            getOptionLabel={(option) => option.text}
                                            options={countries}
                                            defaultValue={countries[73]}
                                            onBlur={handleBlur}
                                            onChange={onChangeCountry}
                                            renderInput={(params) => (
                                                <TextField
                                                    error={Boolean(touched.country && errors.country)}
                                                    helperText={touched.country && errors.country}
                                                    fullWidth
                                                    label="Pays"
                                                    name="country"
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
                                        <Typography component={'span'} variant={'body1'}>
                                            Message
                                        </Typography>
                                        <TextareaAutosize
                                            error={Boolean(touched.message && errors.message)}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.message}
                                            ref={textareaRef}
                                            name="message"
                                            aria-label="minimum height"
                                            rowsMin={8}
                                            className={styles.textarea}
                                            placeholder="Mon métier est:\nMon projet est:\nMes objectifs sont:\nMon budget de formation est:\nJe souhaite etre recontacté aux dates et horaires suivants :"
                                        />
                                    </Grid>
                                    {errors.submit && (
                                        <Box mt={3}>
                                            <FormHelperText error>
                                                {errors.submit}
                                            </FormHelperText>
                                        </Box>
                                    )}
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
                    </form>
                )}
            </Formik>
            <Formik
                enableReinitialize
                initialValues={{
                    firstname: address?address.firstname:contact?contact.firstnamekljh:'',
                    lastname: address?address.lastname:contact?contact.lastnamekljh:'',
                    state: address?address.state:'',
                    code: address?address.code:'',
                    address: address?address.address:'',
                    country: address?address.country:country?country:countries[73],
                    message: address?address.message:'',
                    company: address?address.company:'',
                }}
                validationSchema={Yup.object().shape({
                    state: Yup.string().required(`Merci de renseigner la ville`),
                    code: Yup.number().typeError('Le code postal doit être un nombre').required(`Merci de renseigner le code postal`),
                    address: Yup.string().max(50).required(`Merci de renseigner l\'adresse`),
                    country: Yup.object().required('Merci de renseigner le pays'),
                    message: Yup.string().max(255),
                    company: Yup.string().max(50).required(`Merci de renseigner l\'entreprise`)
                })}
                onSubmit={async (values, {
                    resetForm,
                    setErrors,
                    setStatus,
                    setSubmitting
                }) => {
                    try {
                        // NOTE: Make API request
                        console.log(values)
                        await wait(200);
                        resetForm();
                        setStatus({ success: true });
                        setSubmitting(false);
                        if (typeof window !== "undefined") {
                            values.country = country?country:countries[73];
                            localStorage.setItem('dataAddress',JSON.stringify(values))    
                        }
                        return props.setActiveStep(2)
                    } catch (err) {
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
                        <TabPanel value={value} index={1}>
                            <CardContent
                                className={styles.content}
                            >
                                <Grid
                                    container
                                    spacing={2}
                                    className={styles.container}
                                >
                                    <Grid
                                        item
                                        md={12}
                                        xs={12}
                                    >
                                        <TextField
                                            error={Boolean(touched.company && errors.company)}
                                            helperText={touched.company && errors.company}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.company}
                                            fullWidth
                                            label="Entreprise"
                                            name="company"
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={6}
                                    >
                                        <TextField
                                            error={Boolean(touched.state && errors.state)}
                                            helperText={touched.state && errors.state}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.state}
                                            fullWidth
                                            label="Ville"
                                            name="state"
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={6}
                                    >
                                        <TextField
                                            error={Boolean(touched.address && errors.address)}
                                            helperText={touched.address && errors.address}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.address}
                                            fullWidth
                                            label="Adresse"
                                            name="address"
                                            required
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={6}
                                    >
                                        <TextField
                                            error={Boolean(touched.code && errors.code)}
                                            helperText={touched.code && errors.code}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.code}
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
                                        xs={6}
                                    >
                                        <Autocomplete
                                            className={styles.autocompleted}
                                            getOptionLabel={(option) => option.text}
                                            options={countries}
                                            defaultValue={countries[73]}
                                            onBlur={handleBlur}
                                            onChange={onChangeCountry}
                                            renderInput={(params) => (
                                                <TextField
                                                    error={Boolean(touched.country && errors.country)}
                                                    helperText={touched.country && errors.country}
                                                    fullWidth
                                                    label="Pays"
                                                    name="country"
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
                                        <Typography component={'span'} variant={'body1'}>
                                            Message
                                        </Typography>
                                        <TextareaAutosize
                                            error={Boolean(touched.message && errors.message)}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.message}
                                            ref={textareaRef}
                                            name="message"
                                            aria-label="minimum height"
                                            rowsMin={8}
                                            className={styles.textarea}
                                            placeholder="Mon métier est:\nMon projet est:\nMes objectifs sont:\nMon budget de formation est:\nJe souhaite etre recontacté aux dates et horaires suivants :"
                                        />
                                    </Grid>
                                    {errors.submit && (
                                        <Box mt={3}>
                                            <FormHelperText error>
                                                {errors.submit}
                                            </FormHelperText>
                                        </Box>
                                    )}
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
                    </form>
                 )}
            </Formik>        
        </Box>
    )
}
export default Address;