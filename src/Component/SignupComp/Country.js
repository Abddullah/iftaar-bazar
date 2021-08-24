import React, { Component } from 'react';


class Country extends Component {
    constructor(props) {
        super(props);
        this.state = {
            val: ''
        }
        this.country = this.country.bind(this)
    }

    country(value) {
        var index = value.nativeEvent.target.selectedIndex;
        console.log('this.country', value.nativeEvent.target[index].text)
        var country = value.nativeEvent.target[index].text
        this.props.countryVal(country)
    }

    componentWillMount() {
        const { country } = this.props;
        console.log('Country', this.props)
        this.setState({ val: country })
    }

    componentWillReceiveProps(props) {
        const { country } = props;
        console.log('Country', this.props)
        this.setState({ val: country })
    }

    render() {
        const { val } = this.state;
        return (
            // <div>
            <select onChange={(e) => this.country(e)} name="country" id="country">
                <option value="" label="Select a country … " selected={val === ""}>Select a country …       </option>
                <optgroup id="country-optgroup-Africa" label="Africa">
                    <option selected={val === "DZ"} value="DZ" label="Algeria">Algeria</option>
                    <option selected={val === "AO"} value="AO" label="Angola">Angola</option>
                    <option selected={val === "BJ"} value="BJ" label="Benin">Benin</option>
                    <option selected={val === "BW"} value="BW" label="Botswana">Botswana</option>
                    <option selected={val === "BF"} value="BF" label="Burkina Faso">Burkina Faso</option>
                    <option selected={val === "BI"} value="BI" label="Burundi">Burundi</option>
                    <option selected={val === "CM"} value="CM" label="Cameroon">Cameroon</option>
                    <option selected={val === "CV"} value="CV" label="Cape Verde">Cape Verde</option>
                    <option selected={val === "CF"} value="CF" label="Central African Republic">Central African Republic</option>
                    <option selected={val === "TD"} value="TD" label="Chad">Chad</option>
                    <option selected={val === "KM"} value="KM" label="Comoros">Comoros</option>
                    <option selected={val === "CG"} value="CG" label="Congo - Brazzaville">Congo - Brazzaville</option>
                    <option selected={val === "CD"} value="CD" label="Congo - Kinshasa">Congo - Kinshasa</option>
                    <option selected={val === "CI"} value="CI" label="Côte d’Ivoire">Côte d’Ivoire</option>
                    <option selected={val === "DJ"} value="DJ" label="Djibouti">Djibouti</option>
                    <option selected={val === "EG"} value="EG" label="Egypt">Egypt</option>
                    <option selected={val === "GQ"} value="GQ" label="Equatorial Guinea">Equatorial Guinea</option>
                    <option selected={val === "ER"} value="ER" label="Eritrea">Eritrea</option>
                    <option selected={val === "ET"} value="ET" label="Ethiopia">Ethiopia</option>
                    <option selected={val === "GA"} value="GA" label="Gabon">Gabon</option>
                    <option selected={val === "GM"} value="GM" label="Gambia">Gambia</option>
                    <option selected={val === "GH"} value="GH" label="Ghana">Ghana</option>
                    <option selected={val === "GN"} value="GN" label="Guinea">Guinea</option>
                    <option selected={val === "GW"} value="GW" label="Guinea-Bissau">Guinea-Bissau</option>
                    <option selected={val === "KE"} value="KE" label="Kenya">Kenya</option>
                    <option selected={val === "LS"} value="LS" label="Lesotho">Lesotho</option>
                    <option selected={val === "LR"} value="LR" label="Liberia">Liberia</option>
                    <option selected={val === "LY"} value="LY" label="Libya">Libya</option>
                    <option selected={val === "MG"} value="MG" label="Madagascar">Madagascar</option>
                    <option selected={val === "MW"} value="MW" label="Malawi">Malawi</option>
                    <option selected={val === "ML"} value="ML" label="Mali">Mali</option>
                    <option selected={val === "MR"} value="MR" label="Mauritania">Mauritania</option>
                    <option selected={val === "MU"} value="MU" label="Mauritius">Mauritius</option>
                    <option selected={val === "YT"} value="YT" label="Mayotte">Mayotte</option>
                    <option selected={val === "MA"} value="MA" label="Morocco">Morocco</option>
                    <option selected={val === "MZ"} value="MZ" label="Mozambique">Mozambique</option>
                    <option selected={val === "NA"} value="NA" label="Namibia">Namibia</option>
                    <option selected={val === "NE"} value="NE" label="Niger">Niger</option>
                    <option selected={val === "NG"} value="NG" label="Nigeria">Nigeria</option>
                    <option selected={val === "RW"} value="RW" label="Rwanda">Rwanda</option>
                    <option selected={val === "RE"} value="RE" label="Réunion">Réunion</option>
                    <option selected={val === "SH"} value="SH" label="Saint Helena">Saint Helena</option>
                    <option selected={val === "SN"} value="SN" label="Senegal">Senegal</option>
                    <option selected={val === "SC"} value="SC" label="Seychelles">Seychelles</option>
                    <option selected={val === "SL"} value="SL" label="Sierra Leone">Sierra Leone</option>
                    <option selected={val === "SO"} value="SO" label="Somalia">Somalia</option>
                    <option selected={val === "ZA"} value="ZA" label="South Africa">South Africa</option>
                    <option selected={val === "SD"} value="SD" label="Sudan">Sudan</option>
                    <option selected={val === "SZ"} value="SZ" label="Swaziland">Swaziland</option>
                    <option selected={val === "ST"} value="ST" label="São Tomé and Príncipe">São Tomé and Príncipe</option>
                    <option selected={val === "TZ"} value="TZ" label="Tanzania">Tanzania</option>
                    <option selected={val === "TG"} value="TG" label="Togo">Togo</option>
                    <option selected={val === "TN"} value="TN" label="Tunisia">Tunisia</option>
                    <option selected={val === "UG"} value="UG" label="Uganda">Uganda</option>
                    <option selected={val === "EH"} value="EH" label="Western Sahara">Western Sahara</option>
                    <option selected={val === "ZM"} value="ZM" label="Zambia">Zambia</option>
                    <option selected={val === "ZW"} value="ZW" label="Zimbabwe">Zimbabwe</option>
                </optgroup>
                <optgroup id="country-optgroup-Americas" label="Americas">
                    <option selected={val === "AI"} value="AI" label="Anguilla">Anguilla</option>
                    <option selected={val === "AG"} value="AG" label="Antigua and Barbuda">Antigua and Barbuda</option>
                    <option selected={val === "AR"} value="AR" label="Argentina">Argentina</option>
                    <option selected={val === "AW"} value="AW" label="Aruba">Aruba</option>
                    <option selected={val === "BS"} value="BS" label="Bahamas">Bahamas</option>
                    <option selected={val === "BB"} value="BB" label="Barbados">Barbados</option>
                    <option selected={val === "BZ"} value="BZ" label="Belize">Belize</option>
                    <option selected={val === "BM"} value="BM" label="Bermuda">Bermuda</option>
                    <option selected={val === "BO"} value="BO" label="Bolivia">Bolivia</option>
                    <option selected={val === "BR"} value="BR" label="Brazil">Brazil</option>
                    <option selected={val === "VG"} value="VG" label="British Virgin Islands">British Virgin Islands</option>
                    <option selected={val === "CA"} value="CA" label="Canada">Canada</option>
                    <option selected={val === "KY"} value="KY" label="Cayman Islands">Cayman Islands</option>
                    <option selected={val === "CL"} value="CL" label="Chile">Chile</option>
                    <option selected={val === "CO"} value="CO" label="Colombia">Colombia</option>
                    <option selected={val === "CR"} value="CR" label="Costa Rica">Costa Rica</option>
                    <option selected={val === "CU"} value="CU" label="Cuba">Cuba</option>
                    <option selected={val === "DM"} value="DM" label="Dominica">Dominica</option>
                    <option selected={val === "DO"} value="DO" label="Dominican Republic">Dominican Republic</option>
                    <option selected={val === "EC"} value="EC" label="Ecuador">Ecuador</option>
                    <option selected={val === "SV"} value="SV" label="El Salvador">El Salvador</option>
                    <option selected={val === "FK"} value="FK" label="Falkland Islands">Falkland Islands</option>
                    <option selected={val === "GF"} value="GF" label="French Guiana">French Guiana</option>
                    <option selected={val === "GL"} value="GL" label="Greenland">Greenland</option>
                    <option selected={val === "GD"} value="GD" label="Grenada">Grenada</option>
                    <option selected={val === "GP"} value="GP" label="Guadeloupe">Guadeloupe</option>
                    <option selected={val === "GT"} value="GT" label="Guatemala">Guatemala</option>
                    <option selected={val === "GY"} value="GY" label="Guyana">Guyana</option>
                    <option selected={val === "HT"} value="HT" label="Haiti">Haiti</option>
                    <option selected={val === "HN"} value="HN" label="Honduras">Honduras</option>
                    <option selected={val === "JM"} value="JM" label="Jamaica">Jamaica</option>
                    <option selected={val === "MQ"} value="MQ" label="Martinique">Martinique</option>
                    <option selected={val === "MX"} value="MX" label="Mexico">Mexico</option>
                    <option selected={val === "MS"} value="MS" label="Montserrat">Montserrat</option>
                    <option selected={val === "AN"} value="AN" label="Netherlands Antilles">Netherlands Antilles</option>
                    <option selected={val === "NI"} value="NI" label="Nicaragua">Nicaragua</option>
                    <option selected={val === "PA"} value="PA" label="Panama">Panama</option>
                    <option selected={val === "PY"} value="PY" label="Paraguay">Paraguay</option>
                    <option selected={val === "PE"} value="PE" label="Peru">Peru</option>
                    <option selected={val === "PR"} value="PR" label="Puerto Rico">Puerto Rico</option>
                    <option selected={val === "BL"} value="BL" label="Saint Barthélemy">Saint Barthélemy</option>
                    <option selected={val === "KN"} value="KN" label="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                    <option selected={val === "LC"} value="LC" label="Saint Lucia">Saint Lucia</option>
                    <option selected={val === "MF"} value="MF" label="Saint Martin">Saint Martin</option>
                    <option selected={val === "PM"} value="PM" label="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                    <option selected={val === "VC"} value="VC" label="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                    <option selected={val === "SR"} value="SR" label="Suriname">Suriname</option>
                    <option selected={val === "TT"} value="TT" label="Trinidad and Tobago">Trinidad and Tobago</option>
                    <option selected={val === "TC"} value="TC" label="Turks and Caicos Islands">Turks and Caicos Islands</option>
                    <option selected={val === "VI"} value="VI" label="U.S. Virgin Islands">U.S. Virgin Islands</option>
                    <option selected={val === "US"} value="US" label="United States">United States</option>
                    <option selected={val === "UY"} value="UY" label="Uruguay">Uruguay</option>
                    <option selected={val === "VE"} value="VE" label="Venezuela">Venezuela</option>
                </optgroup>
                <optgroup id="country-optgroup-Asia" label="Asia">
                    <option selected={val === "AF"} value="AF" label="Afghanistan">Afghanistan</option>
                    <option selected={val === "AM"} value="AM" label="Armenia">Armenia</option>
                    <option selected={val === "AZ"} value="AZ" label="Azerbaijan">Azerbaijan</option>
                    <option selected={val === "BH"} value="BH" label="Bahrain">Bahrain</option>
                    <option selected={val === "BD"} value="BD" label="Bangladesh">Bangladesh</option>
                    <option selected={val === "BT"} value="BT" label="Bhutan">Bhutan</option>
                    <option selected={val === "BN"} value="BN" label="Brunei">Brunei</option>
                    <option selected={val === "KH"} value="KH" label="Cambodia">Cambodia</option>
                    <option selected={val === "CN"} value="CN" label="China">China</option>
                    <option selected={val === "CY"} value="CY" label="Cyprus">Cyprus</option>
                    <option selected={val === "GE"} value="GE" label="Georgia">Georgia</option>
                    <option selected={val === "HK"} value="HK" label="Hong Kong SAR China">Hong Kong SAR China</option>
                    <option selected={val === "IN"} value="IN" label="India">India</option>
                    <option selected={val === "ID"} value="ID" label="Indonesia">Indonesia</option>
                    <option selected={val === "IR"} value="IR" label="Iran">Iran</option>
                    <option selected={val === "IQ"} value="IQ" label="Iraq">Iraq</option>
                    <option selected={val === "IL"} value="IL" label="Israel">Israel</option>
                    <option selected={val === "JP"} value="JP" label="Japan">Japan</option>
                    <option selected={val === "JO"} value="JO" label="Jordan">Jordan</option>
                    <option selected={val === "KZ"} value="KZ" label="Kazakhstan">Kazakhstan</option>
                    <option selected={val === "KW"} value="KW" label="Kuwait">Kuwait</option>
                    <option selected={val === "KG"} value="KG" label="Kyrgyzstan">Kyrgyzstan</option>
                    <option selected={val === "LA"} value="LA" label="Laos">Laos</option>
                    <option selected={val === "LB"} value="LB" label="Lebanon">Lebanon</option>
                    <option selected={val === "MO"} value="MO" label="Macau SAR China">Macau SAR China</option>
                    <option selected={val === "MY"} value="MY" label="Malaysia">Malaysia</option>
                    <option selected={val === "MV"} value="MV" label="Maldives">Maldives</option>
                    <option selected={val === "MN"} value="MN" label="Mongolia">Mongolia</option>
                    <option selected={val === "MM"} value="MM" label="Myanmar [Burma]">Myanmar [Burma]</option>
                    <option selected={val === "NP"} value="NP" label="Nepal">Nepal</option>
                    <option selected={val === "NT"} value="NT" label="Neutral Zone">Neutral Zone</option>
                    <option selected={val === "KP"} value="KP" label="North Korea">North Korea</option>
                    <option selected={val === "OM"} value="OM" label="Oman">Oman</option>
                    <option selected={val === "PK"} value="PK" label="Pakistan">Pakistan</option>
                    <option selected={val === "PS"} value="PS" label="Palestinian Territories">Palestinian Territories</option>
                    <option selected={val === "YD"} value="YD" label="People's Democratic Republic of Yemen">People's Democratic Republic of Yemen</option>
                    <option selected={val === "PH"} value="PH" label="Philippines">Philippines</option>
                    <option selected={val === "QA"} value="QA" label="Qatar">Qatar</option>
                    <option selected={val === "SA"} value="SA" label="Saudi Arabia">Saudi Arabia</option>
                    <option selected={val === "SG"} value="SG" label="Singapore">Singapore</option>
                    <option selected={val === "KR"} value="KR" label="South Korea">South Korea</option>
                    <option selected={val === "LK"} value="LK" label="Sri Lanka">Sri Lanka</option>
                    <option selected={val === "SY"} value="SY" label="Syria">Syria</option>
                    <option selected={val === "TW"} value="TW" label="Taiwan">Taiwan</option>
                    <option selected={val === "TJ"} value="TJ" label="Tajikistan">Tajikistan</option>
                    <option selected={val === "TH"} value="TH" label="Thailand">Thailand</option>
                    <option selected={val === "TL"} value="TL" label="Timor-Leste">Timor-Leste</option>
                    <option selected={val === "TR"} value="TR" label="Turkey">Turkey</option>
                    <option selected={val === "TM"} value="TM" label="Turkmenistan">Turkmenistan</option>
                    <option selected={val === "AE"} value="AE" label="United Arab Emirates">United Arab Emirates</option>
                    <option selected={val === "UZ"} value="UZ" label="Uzbekistan">Uzbekistan</option>
                    <option selected={val === "VN"} value="VN" label="Vietnam">Vietnam</option>
                    <option selected={val === "YE"} value="YE" label="Yemen">Yemen</option>
                </optgroup>
                <optgroup id="country-optgroup-Europe" label="Europe">
                    <option selected={val === "AL"} value="AL" label="Albania">Albania</option>
                    <option selected={val === "AD"} value="AD" label="Andorra">Andorra</option>
                    <option selected={val === "AT"} value="AT" label="Austria">Austria</option>
                    <option selected={val === "BY"} value="BY" label="Belarus">Belarus</option>
                    <option selected={val === "BE"} value="BE" label="Belgium">Belgium</option>
                    <option selected={val === "BA"} value="BA" label="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                    <option selected={val === "BG"} value="BG" label="Bulgaria">Bulgaria</option>
                    <option selected={val === "HR"} value="HR" label="Croatia">Croatia</option>
                    <option selected={val === "CY"} value="CY" label="Cyprus">Cyprus</option>
                    <option selected={val === "CZ"} value="CZ" label="Czech Republic">Czech Republic</option>
                    <option selected={val === "DK"} value="DK" label="Denmark">Denmark</option>
                    <option selected={val === "DD"} value="DD" label="East Germany">East Germany</option>
                    <option selected={val === "EE"} value="EE" label="Estonia">Estonia</option>
                    <option selected={val === "FO"} value="FO" label="Faroe Islands">Faroe Islands</option>
                    <option selected={val === "FI"} value="FI" label="Finland">Finland</option>
                    <option selected={val === "FR"} value="FR" label="France">France</option>
                    <option selected={val === "DE"} value="DE" label="Germany">Germany</option>
                    <option selected={val === "GI"} value="GI" label="Gibraltar">Gibraltar</option>
                    <option selected={val === "GR"} value="GR" label="Greece">Greece</option>
                    <option selected={val === "GG"} value="GG" label="Guernsey">Guernsey</option>
                    <option selected={val === "HU"} value="HU" label="Hungary">Hungary</option>
                    <option selected={val === "IS"} value="IS" label="Iceland">Iceland</option>
                    <option selected={val === "IE"} value="IE" label="Ireland">Ireland</option>
                    <option selected={val === "IM"} value="IM" label="Isle of Man">Isle of Man</option>
                    <option selected={val === "IT"} value="IT" label="Italy">Italy</option>
                    <option selected={val === "JE"} value="JE" label="Jersey">Jersey</option>
                    <option selected={val === "LV"} value="LV" label="Latvia">Latvia</option>
                    <option selected={val === "LI"} value="LI" label="Liechtenstein">Liechtenstein</option>
                    <option selected={val === "LT"} value="LT" label="Lithuania">Lithuania</option>
                    <option selected={val === "LU"} value="LU" label="Luxembourg">Luxembourg</option>
                    <option selected={val === "MK"} value="MK" label="Macedonia">Macedonia</option>
                    <option selected={val === "MT"} value="MT" label="Malta">Malta</option>
                    <option selected={val === "FX"} value="FX" label="Metropolitan France">Metropolitan France</option>
                    <option selected={val === "MD"} value="MD" label="Moldova">Moldova</option>
                    <option selected={val === "MC"} value="MC" label="Monaco">Monaco</option>
                    <option selected={val === "ME"} value="ME" label="Montenegro">Montenegro</option>
                    <option selected={val === "NL"} value="NL" label="Netherlands">Netherlands</option>
                    <option selected={val === "NO"} value="NO" label="Norway">Norway</option>
                    <option selected={val === "PL"} value="PL" label="Poland">Poland</option>
                    <option selected={val === "PT"} value="PT" label="Portugal">Portugal</option>
                    <option selected={val === "RO"} value="RO" label="Romania">Romania</option>
                    <option selected={val === "RU"} value="RU" label="Russia">Russia</option>
                    <option selected={val === "SM"} value="SM" label="San Marino">San Marino</option>
                    <option selected={val === "RS"} value="RS" label="Serbia">Serbia</option>
                    <option selected={val === "CS"} value="CS" label="Serbia and Montenegro">Serbia and Montenegro</option>
                    <option selected={val === "SK"} value="SK" label="Slovakia">Slovakia</option>
                    <option selected={val === "SI"} value="SI" label="Slovenia">Slovenia</option>
                    <option selected={val === "ES"} value="ES" label="Spain">Spain</option>
                    <option selected={val === "SJ"} value="SJ" label="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                    <option selected={val === "SE"} value="SE" label="Sweden">Sweden</option>
                    <option selected={val === "CH"} value="CH" label="Switzerland">Switzerland</option>
                    <option selected={val === "UA"} value="UA" label="Ukraine">Ukraine</option>
                    <option selected={val === "SU"} value="SU" label="Union of Soviet Socialist Republics">Union of Soviet Socialist Republics</option>
                    <option selected={val === "GB"} value="GB" label="United Kingdom">United Kingdom</option>
                    <option selected={val === "VA"} value="VA" label="Vatican City">Vatican City</option>
                    <option selected={val === "AX"} value="AX" label="Åland Islands">Åland Islands</option>
                </optgroup>
                <optgroup id="country-optgroup-Oceania" label="Oceania">
                    <option selected={val === "AS"} value="AS" label="American Samoa">American Samoa</option>
                    <option selected={val === "AQ"} value="AQ" label="Antarctica">Antarctica</option>
                    <option selected={val === "AU"} value="AU" label="Australia">Australia</option>
                    <option selected={val === "BV"} value="BV" label="Bouvet Island">Bouvet Island</option>
                    <option selected={val === "IO"} value="IO" label="British Indian Ocean Territory">British Indian Ocean Territory</option>
                    <option selected={val === "CX"} value="CX" label="Christmas Island">Christmas Island</option>
                    <option selected={val === "CC"} value="CC" label="Cocos [Keeling] Islands">Cocos [Keeling] Islands</option>
                    <option selected={val === "CK"} value="CK" label="Cook Islands">Cook Islands</option>
                    <option selected={val === "FJ"} value="FJ" label="Fiji">Fiji</option>
                    <option selected={val === "PF"} value="PF" label="French Polynesia">French Polynesia</option>
                    <option selected={val === "TF"} value="TF" label="French Southern Territories">French Southern Territories</option>
                    <option selected={val === "GU"} value="GU" label="Guam">Guam</option>
                    <option selected={val === "HM"} value="HM" label="Heard Island and McDonald Islands">Heard Island and McDonald Islands</option>
                    <option selected={val === "KI"} value="KI" label="Kiribati">Kiribati</option>
                    <option selected={val === "MH"} value="MH" label="Marshall Islands">Marshall Islands</option>
                    <option selected={val === "FM"} value="FM" label="Micronesia">Micronesia</option>
                    <option selected={val === "NR"} value="NR" label="Nauru">Nauru</option>
                    <option selected={val === "NC"} value="NC" label="New Caledonia">New Caledonia</option>
                    <option selected={val === "NZ"} value="NZ" label="New Zealand">New Zealand</option>
                    <option selected={val === "NU"} value="NU" label="Niue">Niue</option>
                    <option selected={val === "NF"} value="NF" label="Norfolk Island">Norfolk Island</option>
                    <option selected={val === "MP"} value="MP" label="Northern Mariana Islands">Northern Mariana Islands</option>
                    <option selected={val === "PW"} value="PW" label="Palau">Palau</option>
                    <option selected={val === "PG"} value="PG" label="Papua New Guinea">Papua New Guinea</option>
                    <option selected={val === "PN"} value="PN" label="Pitcairn Islands">Pitcairn Islands</option>
                    <option selected={val === "WS"} value="WS" label="Samoa">Samoa</option>
                    <option selected={val === "SB"} value="SB" label="Solomon Islands">Solomon Islands</option>
                    <option selected={val === "GS"} value="GS" label="South Georgia and the South Sandwich Islands">South Georgia and the South Sandwich Islands</option>
                    <option selected={val === "TK"} value="TK" label="Tokelau">Tokelau</option>
                    <option selected={val === "TO"} value="TO" label="Tonga">Tonga</option>
                    <option selected={val === "TV"} value="TV" label="Tuvalu">Tuvalu</option>
                    <option selected={val === "UM"} value="UM" label="U.S. Minor Outlying Islands">U.S. Minor Outlying Islands</option>
                    <option selected={val === "VU"} value="VU" label="Vanuatu">Vanuatu</option>
                    <option selected={val === "WF"} value="WF" label="Wallis and Futuna">Wallis and Futuna</option>
                </optgroup>
            </select>
            // </div>
        )
    }
}

export default Country;