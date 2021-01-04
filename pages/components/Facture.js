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
import Autocomplete from '@material-ui/lab/Autocomplete';
import countries from '../../helpers/countries'

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
          <Box p={3}  className={styles.tabpanelBox}>
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
export default function Facture() {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box className={styles.body}>   
            <Typography component={'span'} variant={'body2'} className={styles.textmenu}>Qui finance cette formation ?</Typography>
            <form name="contact" method="POST" data-netlify="true">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    className={styles.menuBar}
                >
                    <Tab className={styles.menu} label="Particulier" {...a11yProps(0)} style={{width: "30%"}}/>
                    <Tab className={styles.menu} label="Organisme" {...a11yProps(1)} style={{width: "30%"}}/>
                    <Tab className={styles.menu} label="Entreprise" {...a11yProps(2)} style={{width: "30%"}}/>
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
                            md={12}
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
                            <Autocomplete
                                className={styles.autocompleted}
                                getOptionLabel={(option) => option.text}
                                options={countries}
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
                                label="Votre organisme"
                                name="organisme"
                                required
                                variant="outlined"
                            />
                            </Grid>
                            <Grid
                            item
                            md={12}
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
                            <Autocomplete
                                className={styles.autocompleted}
                                getOptionLabel={(option) => option.text}
                                options={countries}
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
                        </Grid>
                    </CardContent>
                </TabPanel>
                <TabPanel value={value} index={2}>
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
                                label="Nom entreprise"
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
                        </Grid>
                    </CardContent>
                </TabPanel>
            </form>
        </Box>               
  )
}
