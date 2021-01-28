import React, {useState, useEffect} from 'react';
import styles from '../../styles/modal.module.css';
import * as Yup from 'yup';
import 'yup-phone';
import { Formik } from 'formik';
import wait from '../../utils/wait';
import {
  Button,
  CardContent,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import PhoneInput from 'react-phone-input-2';
import prefixe from '../../helpers/prefixePhone';
import 'react-phone-input-2/lib/material.css';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/; 

const Contact = (props) => {
    const [spameur, setSpam] = useState(false);
    const [phone, setPhone] = useState({
        number:"+33 6 12 34 56 78",
        numberOfNumber:"11",
        country:"",
        type:"mobile",
    });
    const [contact, setContact] = useState();
    const [state, setState] = useState({
        viaPhone: true,
        viaEmail: true,
    });
    useEffect(() => {
        if (typeof window !== "undefined") {
            setContact(JSON.parse(localStorage.getItem('dataContact')))   
        }
    },[setContact]);
    const handleChangeContact = (event) => {
        if(contact){
            setContact({ ...contact, viaEmail:'', viaPhone:''} )
        }
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const handleChangePhone=(value, data, event, formattedValue) => {
        if(contact){
            setContact({ ...contact, phonekljh:''} )
        }
        let phone1 = data.format.split(' ');
        setPhone({ ...phone,number:value,numberOfNumber:phone1.join('').length-1,country:data.name,type:"mobile"});
        let getNumberOfPrefixe=[...(value)];
        prefixe.map((item)=>{
            if(item.country === data.name){
                (item.fixe).map((value)=>{
                    if(value == Number(getNumberOfPrefixe[2])){
                        setPhone(prevState => ({ number:prevState.number,numberOfNumber:prevState.numberOfNumber,country:prevState.country, type:"fixe"}));
                    }
                })
            }
        })
    }
    return (
        <div className={styles.body}>   
            <Typography className={styles.textmenu}>Qui demande cette formation?</Typography>
            <Formik
                enableReinitialize
                initialValues={{
                    firstnamekljh:contact?contact.firstnamekljh:'',
                    lastnamekljh:contact?contact.lastnamekljh:'',
                    emailkljh:contact?contact.emailkljh:'',
                    phonekljh:contact?(contact.phonekljh !=="")?contact.phonekljh:phone.number?phone.number:'':phone.number,
                    viaPhone:contact?(contact.viaPhone !== "")?contact.viaPhone:state.viaPhone?state.viaPhone:false:state.viaPhone,
                    viaEmail:contact?(contact.viaEmail !== "")?contact.viaEmail:state.viaEmail?state.viaEmail:false:state.viaEmail,
                    firstname:'',
                    lastname:'',
                    email:'',
                    phone:'',
                }}
                validationSchema={Yup.object().shape({
                    firstnamekljh: Yup.string().max(30).required('Merci de renseigner votre nom'),
                    lastnamekljh: Yup.string().max(30).required('Merci de renseigner votre prénom'),
                    emailkljh: Yup.string().email('Merci de corriger votre Email').required('L\'adresse email est requise'),
                    phonekljh: Yup.string().matches(phoneRegExp, 'Merci de corriger votre numero de téléphone').min(Number(phone.numberOfNumber),'Merci de corriger votre numero de téléphone').max(30).required('Merci de renseigner votre numero téléphone'),
                    firstname: Yup.string().max(30),
                    lastname: Yup.string().max(30),
                    email: Yup.string().email('Merci de corriger votre Email'),
                    //phone: Yup.string().required('Merci de renseigner votre numero téléphone')
                })}
                onSubmit={async (values, {
                    resetForm,
                    setErrors,
                    setStatus,
                    setSubmitting,
                }) => {
                    try {
                    // NOTE: Make API request
                        await wait(200);
                        // fetch('http://apilayer.net/api/check?access_key=2169bfdcde44c79d26efaf608c547ab6&email='+values.emailkljh+'&smtp=1&format=1')
                        // .then((response) => response.json())
                        // .then(data => {
                        //     console.log(data);
                        // });
                        
                        if(values.firstname || values.lastname){
                            setSpam(true);
                        }else{
                            if (typeof window !== "undefined") {
                                values={...values, typePhone:phone.type}
                                localStorage.setItem('dataContact',JSON.stringify(values))    
                            }
                            props.setActiveStep(1);
                            resetForm();
                            setStatus({ success: true });
                            setSubmitting(false);
                        }
                    } catch (err) {
                        console.log(err);
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
                            xs={12}
                            >
                                <TextField
                                    error={Boolean(touched.lastnamekljh && errors.lastnamekljh)}
                                    helperText={touched.lastnamekljh && errors.lastnamekljh}
                                    fullWidth
                                    label="Prénom"
                                    name="lastnamekljh"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastnamekljh}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                            item
                            md={6}
                            xs={12}
                            >
                                <TextField
                                    error={Boolean(touched.firstnamekljh && errors.firstnamekljh)}
                                    helperText={touched.firstnamekljh && errors.firstnamekljh}
                                    fullWidth
                                    label="Nom"
                                    name="firstnamekljh"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstnamekljh}
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
                                    error={Boolean(touched.emailkljh && errors.emailkljh)}
                                    helperText={touched.emailkljh && errors.emailkljh}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.emailkljh}
                                    fullWidth
                                    label="Email"
                                    name="emailkljh"
                                    type="email"
                                    required
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                            item
                            md={6}
                            xs={12}
                            >
                                <PhoneInput
                                    inputClass={styles.phoneInput}
                                    onChange={handleChangePhone}
                                    onBlur={handleBlur}
                                    value={values.phonekljh}
                                    specialLabel="Téléphone (mobile de préférence)"
                                    country={'fr'}
                                    inputProps={{
                                        name: 'phonekljh',
                                        required: true,
                                    }}
                                />
                               <p style={{color:'red',margin:'5px',fontSize:'12px'}}>{errors.phonekljh}</p>
                            </Grid>
                            <Grid
                                item
                                md={12}
                                xs={12}
                            >
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={values.viaPhone}
                                        onChange={handleChangeContact}
                                        classes={{
                                            colorPrimary: styles.colorPrimary,
                                            colorSecondary : styles.colorPrimary,
                                            checked: styles.MuiChecked,
                                            track: styles.track
                                        }}
                                        name="viaPhone" 
                                    />
                                }
                                label="Etre recontacté par téléphone"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={values.viaEmail}
                                        onChange={handleChangeContact}
                                        classes={{
                                            colorPrimary: styles.colorPrimary,
                                            colorSecondary : styles.colorPrimary,
                                            checked: styles.MuiChecked,
                                            track: styles.track
                                        }}
                                        name="viaEmail"
                                    />
                                }
                                label="Etre recontacté par email"
                            />
                            </Grid>  
                            <Grid
                            className={styles.ohnohoney}
                            item
                            md={6}
                            xs={12}
                            >
                                <TextField
                                    error={Boolean(touched.lastname && errors.lastname)}
                                    helperText={touched.lastname && errors.lastname}
                                    fullWidth
                                    label="Prénom"
                                    name="lastname"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastname}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                            className={styles.ohnohoney}
                            item
                            md={6}
                            xs={12}
                            >
                                <TextField
                                    error={Boolean(touched.firstname && errors.firstname)}
                                    helperText={touched.firstname && errors.firstname}
                                    fullWidth
                                    label="Nom"
                                    name="firstname"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstname}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                            className={styles.ohnohoney}
                            item
                            md={6}
                            xs={12}
                            >
                                <TextField
                                    error={Boolean(touched.email && errors.email)}
                                    helperText={touched.email && errors.email}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                            className={styles.ohnohoney}
                            item
                            md={6}
                            xs={12}
                            >
                                <PhoneInput
                                    error={Boolean(touched.phone && errors.phone)}
                                    helperText={touched.phone && errors.phone}
                                    onChange={setPhone}
                                    onBlur={handleBlur}
                                    value={values.phone}
                                    country={'fr'}
                                    inputProps={{
                                        name: 'phone',
                                    }}
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
                                    Envoyer
                                </Button>
                            </Grid>
                            {spameur?
                                <Grid
                                item
                                md={12}
                                xs={12}
                                >
                                    <Typography
                                        variant="h5"
                                        style={{textAlign: 'center'}}
                                    >                               
                                        ❌ HONEYPOT A TROUVÉ UN SPAMMER
                                    </Typography>
                                </Grid>  
                            :null}  
                        </Grid>
                    </CardContent>
                </form>
                )}
            </Formik>
        </div>               
  )
}

export default Contact;