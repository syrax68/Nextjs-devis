import React, {useState, useEffect} from 'react';
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
  Tabs,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import countries from '../../helpers/countries';
import organismes from '../../helpers/organisme';
import BusinessIcon from '@material-ui/icons/Business';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PersonIcon from '@material-ui/icons/Person';


function TabPanel(props) {
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
          <Box p={1}  className={styles.tabpanelBox}>
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
  
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
export default function Facture(props) {
    const [value, setValue] = React.useState(0);
    const [address, setAddress] = useState();
    const [organisme, setOrganisme] = useState();
    const [facture, setFacture] = useState()
    const [country, setCountry] = useState();

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    const onChangeOrganisme = (event, values) => {
        setOrganisme(values);
    }

    const onChangeCountry = (event, values) => {
        setCountry(values);
    }
    useEffect(() => {
        async function myFunction(){
            setAddress(JSON.parse(localStorage.getItem('dataAddress')))
            if(localStorage.getItem('dataFacture')){
                setFacture(JSON.parse(localStorage.getItem('dataFacture')));
            }
        }
        myFunction(); // This worked for me
        
    }, []);
    return (
        <Box className={styles.body}>
            <div className={styles.tabPanel}>
                <Typography component={'span'} variant={'body2'} className={styles.textmenu}>Qui finance cette formation ?</Typography>
            </div>           
            <Tabs
                value={value}
                onChange={handleChangeTab}
                indicatorColor="primary"
                textColor="primary"
                className={styles.menuBar}
            >
                <Tab className={[styles.menu, styles.menuleft].join(' ')} label="Particulier" {...a11yProps(0)} icon={<PersonIcon/>} style={{width: "33.33%"}}/>
                <Tab className={styles.menu} label="Organisme" {...a11yProps(1)} style={{width: "33.33%"}} icon={<PeopleAltIcon/>}/>
                <Tab className={[styles.menu, styles.menuright].join(' ')} label="Entreprise" {...a11yProps(2)} icon={<BusinessIcon/>} style={{width: "33.33%"}}/>
            </Tabs>
            <Formik
                enableReinitialize
                initialValues={{
                    state: address?address.state:'',
                    code:  address?address.code:'',
                    address:  address?address.address:'',
                    country:  facture?facture.country:address?address.country:countries[73],
                }}
                validationSchema={Yup.object().shape({
                    state: Yup.string().required('Merci de renseigner la ville'),
                    code: Yup.number().min(0).required('Merci de renseigner le code postal'),
                    address: Yup.string().max(50).required(`Merci de renseigner l\'adresse`),
                    country: Yup.object().required('Merci de renseigner le pays')
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
                        if (typeof window !== "undefined") {
                            if(country){
                                values.country = country;
                            }
                            localStorage.setItem('dataFacture',JSON.stringify(values))    
                        }
                        return props.setActiveStep(3)
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
                                        xs={12}
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
                                        xs={12}
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
                                        xs={12}
                                    >
                                        <Autocomplete
                                            className={styles.autocompleted}
                                            getOptionLabel={(option) => option.text}
                                            options={countries}
                                            //defaultValue={countries[73]}
                                            onBlur={handleBlur}
                                            onChange={onChangeCountry}
                                            value={values.country}
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
                                            Générer mon devis
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
                    state: address?address.state:'',
                    code:  address?address.code:'',
                    address:  address?address.address:'',
                    country:  facture?facture.country:address?address.country:countries[73],
                    organisme: organisme?organisme:facture?facture.organisme:'',
                }}
                validationSchema={Yup.object().shape({
                    organisme: Yup.object().required('Merci de renseigner l\'organisme'),
                    state: Yup.string().required('Merci de renseigner la ville'),
                    code: Yup.number().min(0).required('Merci de renseigner le code postal'),
                    address: Yup.string().max(50).required(`Merci de renseigner l\'adresse`),
                    country: Yup.object().required('Merci de renseigner le pays')
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
                        if (typeof window !== "undefined") {
                            if(country){
                                values.country = country;
                            }
                            if(organisme){
                                values.organisme = organisme;
                            }
                            localStorage.setItem('dataFacture',JSON.stringify(values))    
                        }
                        return props.setActiveStep(3)
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
                        <TabPanel value={value} index={1}>
                            <CardContent
                                className={styles.content}
                            >
                                <Grid
                                    container
                                    spacing={2}
                                >
                                    <Grid
                                    item
                                    md={12}
                                    xs={12}
                                    >
                                        <Autocomplete
                                            className={styles.autocompleted}
                                            getOptionLabel={(option) => option.text}
                                            options={organismes}
                                            onBlur={handleBlur}
                                            onChange={onChangeOrganisme}
                                            value={values.organisme}
                                            renderInput={(params) => (
                                                <TextField
                                                    error={Boolean(touched.organisme && errors.organisme)}
                                                    helperText={touched.organisme && errors.organisme}
                                                    fullWidth
                                                    label="Organisme"
                                                    name="organisme"
                                                    variant="outlined"
                                                    {...params}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
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
                                        xs={12}
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
                                            value={values.country}
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
                                    {errors.submit && (
                                        <Box mt={3}>
                                            <FormHelperText error>
                                                {errors.submit}
                                            </FormHelperText>
                                        </Box>
                                    )}
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
                                            Générer mon devis
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
                    state: address?address.state:'',
                    code:  address?address.code:'',
                    address:  address?address.address:'',
                    country:  facture?facture.country:address?address.country:countries[73],
                    company: address?address.company?address.company:facture?facture.company:'':'',
                }}
                validationSchema={Yup.object().shape({
                    state: Yup.string().required('Merci de renseigner la ville'),
                    code: Yup.number().min(0).required('Merci de renseigner le code postal'),
                    address: Yup.string().max(50).required(`Merci de renseigner l\'adresse`),
                    country: Yup.object().required('Merci de renseigner le pays'),
                    company:Yup.string().max(50).required('Merci de renseigner le nom de l\'entreprise')
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
                        if (typeof window !== "undefined") {
                            if(country){
                                values.country = country;
                            }
                            localStorage.setItem('dataFacture',JSON.stringify(values))    
                        }
                        return props.setActiveStep(3)
                    }catch (err) {
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
                        <TabPanel value={value} index={2}>
                            <CardContent
                                className={styles.content}
                            >
                                <Grid
                                    container
                                    spacing={2}
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
                                        label="Nom entreprise"
                                        name="company"
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
                                        xs={12}
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
                                            value={values.country}
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
                                            Générer mon devis
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
