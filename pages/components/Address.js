import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/modal.module.css'
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
          <Box p={3}>
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
export default function Address() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box className={styles.body}>   
            <TabPanel value={value} index={0}>
                <Typography component={'span'} variant={'body2'}>Qui demande cette formation?</Typography>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Typography component={'span'} variant={'body2'}>Parler à un conseiller : 09 72 65 24 84</Typography>
            </TabPanel>
            <form name="contact" method="POST" data-netlify="true">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    className={styles.menuBar}
                >
                    <Tab className={styles.menu} label="Particulier" icon={<Avatar alt="test avatar" src="/image/personal.png" />} {...a11yProps(0)} />
                    <Tab className={styles.menu} label="Professionnel" icon={<Avatar alt="avatar" src="/image/personal.png" />} {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={value} index={0}>
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
                            <TextField
                                fullWidth
                                label="Pays"
                                name="pays"
                                required
                                variant="outlined"
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
                                    aria-label="minimum height" 
                                    rowsMin={10} 
                                    className={styles.textarea}
                                    placeholder="Mon métier est:    Mon projet est:     Mes objectifs sont:    Mon budget de formation est: &nbsp Je souhaite etre recontacté aux dates et horaires suivants :" />
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
                            <TextField
                                fullWidth
                                label="Pays"
                                name="pays"
                                required
                                variant="outlined"
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
                                    aria-label="minimum height" 
                                    rowsMin={10} 
                                    className={styles.textarea}
                                    placeholder="Mon métier est:    Mon projet est:     Mes objectifs sont:    Mon budget de formation est: &nbsp Je souhaite etre recontacté aux dates et horaires suivants :" />
                            </Grid>     
                        </Grid>
                    </CardContent>
                </TabPanel>
            </form>
        </Box>               
  )
}
