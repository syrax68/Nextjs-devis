import React, {useEffect} from 'react';
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
    const textAreas = document.getElementsByClassName('textarea');
    useEffect(() => {   
        Array.prototype.forEach.call(textAreas, function(elem) {
            console.log(elem.placeholder)
            elem.placeholder = elem.placeholder.replace(/\\n/g, '\n');
        });
    },)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const countries = [
        { "text": "Afghanistan", "value": "AF" },
        { "text": "Åland Islands", "value": "AX" },
        { "text": "Albania", "value": "AL" },
        { "text": "Algeria", "value": "DZ" },
        { "text": "American Samoa", "value": "AS" },
        { "text": "Andorra", "value": "AD" },
        { "text": "Angola", "value": "AO" },
        { "text": "Anguilla", "value": "AI" },
        { "text": "Antarctica", "value": "AQ" },
        { "text": "Antigua and Barbuda", "value": "AG" },
        { "text": "Argentina", "value": "AR" },
        { "text": "Armenia", "value": "AM" },
        { "text": "Aruba", "value": "AW" },
        { "text": "Australia", "value": "AU" },
        { "text": "Austria", "value": "AT" },
        { "text": "Azerbaijan", "value": "AZ" },
        { "text": "Bahamas", "value": "BS" },
        { "text": "Bahrain", "value": "BH" },
        { "text": "Bangladesh", "value": "BD" },
        { "text": "Barbados", "value": "BB" },
        { "text": "Belarus", "value": "BY" },
        { "text": "Belgium", "value": "BE" },
        { "text": "Belize", "value": "BZ" },
        { "text": "Benin", "value": "BJ" },
        { "text": "Bermuda", "value": "BM" },
        { "text": "Bhutan", "value": "BT" },
        { "text": "Bolivia", "value": "BO" },
        { "text": "Bosnia and Herzegovina", "value": "BA" },
        { "text": "Botswana", "value": "BW" },
        { "text": "Bouvet Island", "value": "BV" },
        { "text": "Brazil", "value": "BR" },
        { "text": "British Indian Ocean Territory", "value": "IO" },
        { "text": "Brunei Darussalam", "value": "BN" },
        { "text": "Bulgaria", "value": "BG" },
        { "text": "Burkina Faso", "value": "BF" },
        { "text": "Burundi", "value": "BI" },
        { "text": "Cambodia", "value": "KH" },
        { "text": "Cameroon", "value": "CM" },
        { "text": "Canada", "value": "CA" },
        { "text": "Cape Verde", "value": "CV" },
        { "text": "Cayman Islands", "value": "KY" },
        { "text": "Central African Republic", "value": "CF" },
        { "text": "Chad", "value": "TD" },
        { "text": "Chile", "value": "CL" },
        { "text": "China", "value": "CN" },
        { "text": "Christmas Island", "value": "CX" },
        { "text": "Cocos (Keeling) Islands", "value": "CC" },
        { "text": "Colombia", "value": "CO" },
        { "text": "Comoros", "value": "KM" },
        { "text": "Congo", "value": "CG" },
        { "text": "Congo, The Democratic Republic of the", "value": "CD" },
        { "text": "Cook Islands", "value": "CK" },
        { "text": "Costa Rica", "value": "CR" },
        { "text": "Cote D'Ivoire", "value": "CI" },
        { "text": "Croatia", "value": "HR" },
        { "text": "Cuba", "value": "CU" },
        { "text": "Cyprus", "value": "CY" },
        { "text": "Czech Republic", "value": "CZ" },
        { "text": "Denmark", "value": "DK" },
        { "text": "Djibouti", "value": "DJ" },
        { "text": "Dominica", "value": "DM" },
        { "text": "Dominican Republic", "value": "DO" },
        { "text": "Ecuador", "value": "EC" },
        { "text": "Egypt", "value": "EG" },
        { "text": "El Salvador", "value": "SV" },
        { "text": "Equatorial Guinea", "value": "GQ" },
        { "text": "Eritrea", "value": "ER" },
        { "text": "Estonia", "value": "EE" },
        { "text": "Ethiopia", "value": "ET" },
        { "text": "Falkland Islands (Malvinas)", "value": "FK" },
        { "text": "Faroe Islands", "value": "FO" },
        { "text": "Fiji", "value": "FJ" },
        { "text": "Finland", "value": "FI" },
        { "text": "France", "value": "FR" },
        { "text": "French Guiana", "value": "GF" },
        { "text": "French Polynesia", "value": "PF" },
        { "text": "French Southern Territories", "value": "TF" },
        { "text": "Gabon", "value": "GA" },
        { "text": "Gambia", "value": "GM" },
        { "text": "Georgia", "value": "GE" },
        { "text": "Germany", "value": "DE" },
        { "text": "Ghana", "value": "GH" },
        { "text": "Gibraltar", "value": "GI" },
        { "text": "Greece", "value": "GR" },
        { "text": "Greenland", "value": "GL" },
        { "text": "Grenada", "value": "GD" },
        { "text": "Guadeloupe", "value": "GP" },
        { "text": "Guam", "value": "GU" },
        { "text": "Guatemala", "value": "GT" },
        { "text": "Guernsey", "value": "GG" },
        { "text": "Guinea", "value": "GN" },
        { "text": "Guinea-Bissau", "value": "GW" },
        { "text": "Guyana", "value": "GY" },
        { "text": "Haiti", "value": "HT" },
        { "text": "Heard Island and Mcdonald Islands", "value": "HM" },
        { "text": "Holy See (Vatican City State)", "value": "VA" },
        { "text": "Honduras", "value": "HN" },
        { "text": "Hong Kong", "value": "HK" },
        { "text": "Hungary", "value": "HU" },
        { "text": "Iceland", "value": "IS" },
        { "text": "India", "value": "IN" },
        { "text": "Indonesia", "value": "ID" },
        { "text": "Iran, Islamic Republic Of", "value": "IR" },
        { "text": "Iraq", "value": "IQ" },
        { "text": "Ireland", "value": "IE" },
        { "text": "Isle of Man", "value": "IM" },
        { "text": "Israel", "value": "IL" },
        { "text": "Italy", "value": "IT" },
        { "text": "Jamaica", "value": "JM" },
        { "text": "Japan", "value": "JP" },
        { "text": "Jersey", "value": "JE" },
        { "text": "Jordan", "value": "JO" },
        { "text": "Kazakhstan", "value": "KZ" },
        { "text": "Kenya", "value": "KE" },
        { "text": "Kiribati", "value": "KI" },
        { "text": "Korea, Democratic People'S Republic of", "value": "KP" },
        { "text": "Korea, Republic of", "value": "KR" },
        { "text": "Kuwait", "value": "KW" },
        { "text": "Kyrgyzstan", "value": "KG" },
        { "text": "Lao People'S Democratic Republic", "value": "LA" },
        { "text": "Latvia", "value": "LV" },
        { "text": "Lebanon", "value": "LB" },
        { "text": "Lesotho", "value": "LS" },
        { "text": "Liberia", "value": "LR" },
        { "text": "Libyan Arab Jamahiriya", "value": "LY" },
        { "text": "Liechtenstein", "value": "LI" },
        { "text": "Lithuania", "value": "LT" },
        { "text": "Luxembourg", "value": "LU" },
        { "text": "Macao", "value": "MO" },
        { "text": "Macedonia, The Former Yugoslav Republic of", "value": "MK" },
        { "text": "Madagascar", "value": "MG" },
        { "text": "Malawi", "value": "MW" },
        { "text": "Malaysia", "value": "MY" },
        { "text": "Maldives", "value": "MV" },
        { "text": "Mali", "value": "ML" },
        { "text": "Malta", "value": "MT" },
        { "text": "Marshall Islands", "value": "MH" },
        { "text": "Martinique", "value": "MQ" },
        { "text": "Mauritania", "value": "MR" },
        { "text": "Mauritius", "value": "MU" },
        { "text": "Mayotte", "value": "YT" },
        { "text": "Mexico", "value": "MX" },
        { "text": "Micronesia, Federated States of", "value": "FM" },
        { "text": "Moldova, Republic of", "value": "MD" },
        { "text": "Monaco", "value": "MC" },
        { "text": "Mongolia", "value": "MN" },
        { "text": "Montserrat", "value": "MS" },
        { "text": "Morocco", "value": "MA" },
        { "text": "Mozambique", "value": "MZ" },
        { "text": "Myanmar", "value": "MM" },
        { "text": "Namibia", "value": "NA" },
        { "text": "Nauru", "value": "NR" },
        { "text": "Nepal", "value": "NP" },
        { "text": "Netherlands", "value": "NL" },
        { "text": "Netherlands Antilles", "value": "AN" },
        { "text": "New Caledonia", "value": "NC" },
        { "text": "New Zealand", "value": "NZ" },
        { "text": "Nicaragua", "value": "NI" },
        { "text": "Niger", "value": "NE" },
        { "text": "Nigeria", "value": "NG" },
        { "text": "Niue", "value": "NU" },
        { "text": "Norfolk Island", "value": "NF" },
        { "text": "Northern Mariana Islands", "value": "MP" },
        { "text": "Norway", "value": "NO" },
        { "text": "Oman", "value": "OM" },
        { "text": "Pakistan", "value": "PK" },
        { "text": "Palau", "value": "PW" },
        { "text": "Palestinian Territory, Occupied", "value": "PS" },
        { "text": "Panama", "value": "PA" },
        { "text": "Papua New Guinea", "value": "PG" },
        { "text": "Paraguay", "value": "PY" },
        { "text": "Peru", "value": "PE" },
        { "text": "Philippines", "value": "PH" },
        { "text": "Pitcairn", "value": "PN" },
        { "text": "Poland", "value": "PL" },
        { "text": "Portugal", "value": "PT" },
        { "text": "Puerto Rico", "value": "PR" },
        { "text": "Qatar", "value": "QA" },
        { "text": "Reunion", "value": "RE" },
        { "text": "Romania", "value": "RO" },
        { "text": "Russian Federation", "value": "RU" },
        { "text": "RWANDA", "value": "RW" },
        { "text": "Saint Helena", "value": "SH" },
        { "text": "Saint Kitts and Nevis", "value": "KN" },
        { "text": "Saint Lucia", "value": "LC" },
        { "text": "Saint Pierre and Miquelon", "value": "PM" },
        { "text": "Saint Vincent and the Grenadines", "value": "VC" },
        { "text": "Samoa", "value": "WS" },
        { "text": "San Marino", "value": "SM" },
        { "text": "Sao Tome and Principe", "value": "ST" },
        { "text": "Saudi Arabia", "value": "SA" },
        { "text": "Senegal", "value": "SN" },
        { "text": "Serbia and Montenegro", "value": "CS" },
        { "text": "Seychelles", "value": "SC" },
        { "text": "Sierra Leone", "value": "SL" },
        { "text": "Singapore", "value": "SG" },
        { "text": "Slovakia", "value": "SK" },
        { "text": "Slovenia", "value": "SI" },
        { "text": "Solomon Islands", "value": "SB" },
        { "text": "Somalia", "value": "SO" },
        { "text": "South Africa", "value": "ZA" },
        { "text": "South Georgia and the South Sandwich Islands", "value": "GS" },
        { "text": "Spain", "value": "ES" },
        { "text": "Sri Lanka", "value": "LK" },
        { "text": "Sudan", "value": "SD" },
        { "text": "Suriname", "value": "SR" },
        { "text": "Svalbard and Jan Mayen", "value": "SJ" },
        { "text": "Swaziland", "value": "SZ" },
        { "text": "Sweden", "value": "SE" },
        { "text": "Switzerland", "value": "CH" },
        { "text": "Syrian Arab Republic", "value": "SY" },
        { "text": "Taiwan, Province of China", "value": "TW" },
        { "text": "Tajikistan", "value": "TJ" },
        { "text": "Tanzania, United Republic of", "value": "TZ" },
        { "text": "Thailand", "value": "TH" },
        { "text": "Timor-Leste", "value": "TL" },
        { "text": "Togo", "value": "TG" },
        { "text": "Tokelau", "value": "TK" },
        { "text": "Tonga", "value": "TO" },
        { "text": "Trinidad and Tobago", "value": "TT" },
        { "text": "Tunisia", "value": "TN" },
        { "text": "Turkey", "value": "TR" },
        { "text": "Turkmenistan", "value": "TM" },
        { "text": "Turks and Caicos Islands", "value": "TC" },
        { "text": "Tuvalu", "value": "TV" },
        { "text": "Uganda", "value": "UG" },
        { "text": "Ukraine", "value": "UA" },
        { "text": "United Arab Emirates", "value": "AE" },
        { "text": "United Kingdom", "value": "GB" },
        { "text": "United States", "value": "US" },
        { "text": "United States Minor Outlying Islands", "value": "UM" },
        { "text": "Uruguay", "value": "UY" },
        { "text": "Uzbekistan", "value": "UZ" },
        { "text": "Vanuatu", "value": "VU" },
        { "text": "Venezuela", "value": "VE" },
        { "text": "Viet Nam", "value": "VN" },
        { "text": "Virgin Islands, British", "value": "VG" },
        { "text": "Virgin Islands, U.S.", "value": "VI" },
        { "text": "Wallis and Futuna", "value": "WF" },
        { "text": "Western Sahara", "value": "EH" },
        { "text": "Yemen", "value": "YE" },
        { "text": "Zambia", "value": "ZM" },
        { "text": "Zimbabwe", "value": "ZW" }
    ];
    return (
        <Box className={styles.body}>   
            <TabPanel value={value} index={0} className={styles.tabPanel}>
                <Typography component={'span'} variant={'body2'} className={styles.textmenu}>Qui demande cette formation?</Typography>
            </TabPanel>
            <TabPanel value={value} index={1} className={styles.tabPanel}>
                <Typography component={'span'} variant={'body2'} className={styles.textmenu}>Parler à un conseiller : 09 72 65 24 84</Typography>
            </TabPanel>
            <form name="contact" method="POST" data-netlify="true">
                <Tabs
                    value={value}
                    onChange={handleChange}
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
                                    aria-label="minimum height" 
                                    rowsMin={10} 
                                    className={[styles.textarea, "textarea"].join(' ')}
                                    placeholder="Mon métier est:\nMon projet est:\nMes objectifs sont:\nMon budget de formation est:\nJe souhaite etre recontacté aux dates et horaires suivants :" 
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
                                    aria-label="minimum height" 
                                    rowsMin={10} 
                                    className={[styles.textarea, "textarea"].join(' ') }
                                    placeholder="Mon métier est:\nMon projet est:\nMes objectifs sont:\nMon budget de formation est:\nJe souhaite etre recontacté aux dates et horaires suivants :" 
                                />
                            </Grid>     
                        </Grid>
                    </CardContent>
                </TabPanel>
            </form>
        </Box>               
  )
}
export default Address;