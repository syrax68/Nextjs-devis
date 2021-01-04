import React from 'react';
import styles from '../../styles/modal.module.css';
import * as Yup from 'yup';
import { Formik } from 'formik';
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
