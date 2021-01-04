import React from 'react';
import styles from '../../styles/modal.module.css';
import * as Yup from 'yup';
import { Formik } from 'formik';
import wait from '../../utils/wait';
import {
  Button,
  CardContent,
  Typography,
  Grid,
  TextField
} from '@material-ui/core';

export default function Contact() {
  return (
        <div className={styles.body}>   
            <Typography className={styles.textmenu}>Qui demande cette formation?</Typography>

            <Formik
                enableReinitialize
                initialValues={{
                    firstname:'',
                    lastname:'',
                    email:'',
                    phone:'',
                }}
                validationSchema={Yup.object().shape({
                    firstname: Yup.string().max(30).required('Merci de renseigner votre nom'),
                    lastname: Yup.string().max(30).required('Merci de renseigner votre prénom'),
                    email: Yup.string().email('Invalid email').required('L\'adresse email est requise'),
                    phone: Yup.string().max(30).required('Le numero téléphone est requise'),
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
                    console.log('success')
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
                                    error={Boolean(touched.email && errors.email)}
                                    helperText={touched.email && errors.email}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    fullWidth
                                    label="Email"
                                    name="email"
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
                                <TextField
                                    error={Boolean(touched.phone && errors.phone)}
                                    helperText={touched.phone && errors.phone}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.phone}
                                    fullWidth
                                    label="Télephone"
                                    name="phone"
                                    required
                                    variant="outlined"
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
                        </Grid>
                    </CardContent>
                </form>
                )}
            </Formik>
        </div>               
  )
}
