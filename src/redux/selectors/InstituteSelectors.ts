import React, {useState} from 'react';
import {Alert} from 'react-native';
import {useSelector} from 'react-redux';
import {registerRequest, saveRequest, useAuthNavigator, useUiSelector, verifyRequest} from '..';
import {Strings} from '../../assets';
import {ApiEndpoints, InstituteDetail, InstituteRequest} from '../../data';
import {isNullOrEmpty, isValidEmail, isValidMobile} from '../../utils';
import {RootState} from '../RootTypes';
import StoreService from '../StoreService';
import axios from "axios";
import moment from "moment";

const instituteStateSelector = (state: RootState) => state.institute;

export const useInstituteSelector = () => {
    const {isLoading, institute, error} = useSelector(instituteStateSelector);
    const {showSnackbar} = useUiSelector();

    React.useEffect(() => {
        if (error) {
            showSnackbar(error?.error.message);
        }
    }, [error]);

    React.useEffect(() => {
    }, []);

    const save = (institute: InstituteDetail) => {
        StoreService.dispatch(saveRequest(institute));
    };

    const verify = (code: string, onSuccess?: () => void) => {
        if (!isNullOrEmpty(code)) {
            StoreService.dispatch(verifyRequest({code: code.toString(), onSuccess: () => onSuccess && onSuccess()}));
        } else {
            showSnackbar('Please enter school code.', true);
        }
    };

    return {isLoading, institute, error, isVerified: !!institute, verify, save};
};

export const useInstituteRegisterSelector = () => {
    const [institute, setInstitute] = React.useState<InstituteRequest>();
    const {isLoading, isRegistered, error} = useSelector(instituteStateSelector);
    const {navigation} = useAuthNavigator();
    const {showSnackbar} = useUiSelector();
    let [leadCode, setLeadCode] = useState();

    const register = () => {
        const message = getValidationMessage();
        if (institute && !message) {
            let obj = {
                leadCode: "0017",
                leadDate: moment().format('DD-MM-YYYY'),
                enquiredBy: institute.Enquire,
                institutionName: institute.InstitutionName,
                location: institute.CityName,
                institutionType: institute.InstitutionType,
                affiliationType: institute.AffiliationType,
                affiliationCode: "",
                medium: institute.Medium,
                mobileNo: institute.ContactNumber,
                emailId: institute.Email,
                demoTime: '',
                demoDate: '',
                remarks: institute.Remarks,
                demoStatus: "Pending",
                leadStatus: "Active",
                source: "Online",
            }
            axios.post(ApiEndpoints.BASE_API_URL + ApiEndpoints.CREATE_LEAD_MANAGEMENT, obj)
                .then(response => {
                    Alert.alert(Strings.Common.REGISTER_TITLE, Strings.Common.REGISTER_MESSAGE, [
                        {
                            text: Strings.Common.OK,
                            onPress: () => {
                                navigation.goBack();
                            },
                        },
                    ]);
                })
                .catch(error => {
                    console.log(error)
                    if (error) {
                        // showSnackbar(error?.error.message);
                    }
                });


            // setLeadCode(response.data)

            // StoreService.dispatch(
            //     registerRequest({
            //       body: institute,
            //       onSuccess: () => {
            //         Alert.alert(Strings.Common.REGISTER_TITLE, Strings.Common.REGISTER_MESSAGE, [
            //           {
            //             text: Strings.Common.OK,
            //             onPress: () => {
            //               navigation.goBack();
            //             },
            //           },
            //         ]);
            //       },
            //       onError: () => {
            //         if (error) {
            //           showSnackbar(error?.error.message);
            //         }
            //       },
            //     }),
            // );


        } else {
            showSnackbar(message ? message : 'Please enter valid institute details.');
        }
    };

    const getValidationMessage = (): string | undefined => {
        if (isNullOrEmpty(institute?.InstitutionName)) {
            return 'Please enter institute name.';
        } else if (isNullOrEmpty(institute?.InstitutionType)) {
            return 'Please select institute type.';
        } else if (isNullOrEmpty(institute?.AffiliationType)) {
            return 'Please select affiliation type.';
        } else if (isNullOrEmpty(institute?.Medium)) {
            return 'Please select school medium.';
        }
        // else if (!institute?.CountryId || institute?.CountryId === 0) {
        //     return 'Please select country.';
        // } else if (!institute?.StateId || institute?.StateId === 0) {
        //     return 'Please select state.';
        // } else if (!institute?.CityId || institute?.CityId === 0) {
        //     return 'Please select city.';
        // }
        else if (isNullOrEmpty(institute?.CityName)) {
            return 'Please enter location.';
        }  else if (isNullOrEmpty(institute?.Pincode)) {
            return 'Please enter pin code.';
        } else if (isNullOrEmpty(institute?.ContactNumber)) {
            return 'Please enter contact number.';
        } else if (isNullOrEmpty(institute?.Enquire)) {
            return 'Please enter full name.';
        } else if (isNullOrEmpty(institute?.Email)) {
            return 'Please enter email address.';
        } else if (!isValidEmail(institute?.Email)) {
            return 'Please enter valid email address.';
        } else if (!isValidMobile(institute?.ContactNumber)) {
            return 'Please enter valid contact number.';
        } else {
            return undefined;
        }
    };

    return {isLoading, institute, setInstitute, register};
};
