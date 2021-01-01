import React from 'react';
import styles from '../../styles/modal.module.css'
import {
  Button,
  CardContent,
  Grid,
  TextField
} from '@material-ui/core';

export default function Facture() {
  return (
        <div className={styles.body}>   
            <p id="transition-modal-title">Qui demande cette formation?</p>

            <form name="contact" method="POST" data-netlify="true">
                <CardContent
                    className={styles.content}
                >
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
                    </Grid>
                </CardContent>
            </form>
        </div>               
  )
}
