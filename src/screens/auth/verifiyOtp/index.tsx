import React, {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Colors, Icon, Icons, Images, Strings} from '../../../assets';
import {ButtonView, Container, IconButton, InputTextView} from '../../../components';
import {loginSuccess, useAuthNavigator, useMobileSelector, useUiSelector} from '../../../redux';
import {DrawerActions} from "@react-navigation/core";
import {Screens} from "../../index";
import {reset} from "react-native-svg/lib/typescript/lib/Matrix2D";
import {ApiEndpoints, getInstitute, setToken, setUserProfile} from "../../../data";
import axios from "axios";
import {call, put} from "redux-saga/effects";
import {MainNavigator} from "../../../router/MainNavigator";
import {AuthNavigator} from "../../../router/AuthNavigator";
import createStackNavigator from "react-native-screens/createNativeStackNavigator";

const RESEND_TIME_OUT = 10;

export function VerifyOTP() {
    const {showSnackbar} = useUiSelector();

    const {navigation, route} = useAuthNavigator();
    let {mobile} = route.params
    let [showTimer, setShowTimer] = useState(true)
    const [pin, setPin] = useState('');
    const [timeLeft, setTimeLeft] = useState(120);

    const {isLoading, isOTPSend, isOTPVerified, sendMobileOTP, verifyMobileOTP} = useMobileSelector();

    const pin1Ref = useRef(null);
    const pin2Ref = useRef(null);
    const pin3Ref = useRef(null);
    const pin4Ref = useRef(null);
    const pin5Ref = useRef(null);
    const pin6Ref = useRef(null);
    const handlePinKeyPress = (event, ref) => {
        try {
            if (event.nativeEvent.key === 'Backspace' && ref.current) {
                ref.current.setNativeProps({text: ''});
                ref.current.focus();
                setPin('')
            }
        } catch (e) {

        }
    };

    function matchPin(newPin: string) {
        console.log(newPin)
    }

    const handlePinInput = (text, ref) => {
        try {
            const newPin = pin + text;

            if (newPin.length <= 6) {
                setPin(newPin);
            }
            if (newPin.length === 6) {
                // matchPin(newPin);
            }
            if (text.length === 1 && ref.current) {
                ref.current.focus();
            }

        } catch (e) {

        }
    };

    function startTimer() {
        setShowTimer(true)
        setTimeLeft(120)

        const intervalId = setInterval(() => {
            setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }

    useEffect(() => {
        startTimer()

    }, []);

    useEffect(() => {
        if (timeLeft === 0) {
            console.log("time ended")
            setShowTimer(false)
            // clearInterval(intervalId);
            // handle timer completion here
        }
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    async function ResendOTP() {
        console.log("hereeeee")

        await getInstitute().then(institute => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'InstitutionCode': institute?.institutionCode
                },
            };

            let url = ApiEndpoints.BASE_API_URL + ApiEndpoints.SEND_OTP + "/" + mobile
            console.log(url)
            axios.get(url, config)
                .then(response => {
                    startTimer()
                    console.log(response)
                })
                .catch(error => {
                    showSnackbar(error.response.data.messageDescription, true);

                });
        });

    }

    async function verifyPinNow() {

        // console.log(pin)
        // if (pin.length === 6) {
        //     await getInstitute().then(institute => {
        //         const config = {
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 'InstitutionCode': institute?.institutionCode
        //             },
        //         };
        //
        //         let url = ApiEndpoints.BASE_API_URL + ApiEndpoints.VERIFY_OTP + "/" + pin
        //         axios.get(url, config)
        //             .then(response => {
        //                 // console.log(response)
        //                 // setToken(response.token ? response.token : '');
        //                 // setUserProfile(response.user);
        //                 // loginSuccess(response.user);
        //                 // navigation.navigate(Screens.DRAWER)
        //                 console.log(response.data)
        //             })
        //             .catch(error => {
        //                 // console.log(error.response.data)
        //                 showSnackbar(error.response.data, true);
        //
        //
        //                 // navigation.navigate(AuthNavigator);
        //
        //
        //
        //                 // navigation.navigate(Screens.COURSE_INFORMATION);
        //
        //                 // showSnackbar(error.response, true);
        //
        //             });
        //     });
        // } else {
        //     showSnackbar("Please enter pin", true);
        // }
    }

    return (
        <Container style={_styles.main}>
            <Container style={_styles.container} isSafeArea>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => navigation.navigate(Screens.LOGIN)} style={_styles.backbtn}>
                        <Icon icon={Icons.IC_ARROW_LEFT} size={12}
                        />
                    </TouchableOpacity>
                    <Text style={_styles.topBarTxt}>Verify OTP</Text>
                </View>
                <Image source={Images.IMG_OTP_HEADER} style={_styles.header} resizeMode={'contain'}/>
                <View style={_styles.content}>
                    <Text style={_styles.description}>Enter pin code sent to your mobile number: {mobile}</Text>
                    <View style={_styles.pinVIew}>
                        <TextInput
                            style={_styles.pinInput}
                            keyboardType="numeric"
                            maxLength={1}
                            onKeyPress={(event) => handlePinKeyPress(event, pin1Ref)}

                            ref={pin1Ref}
                            onChangeText={(text) => handlePinInput(text, pin2Ref)}
                            onSubmitEditing={() => pin2Ref.current.focus()}
                        />
                        <TextInput
                            style={_styles.pinInput}
                            keyboardType="numeric"
                            maxLength={1}
                            onKeyPress={(event) => handlePinKeyPress(event, pin1Ref)}

                            ref={pin2Ref}
                            onChangeText={(text) => handlePinInput(text, pin3Ref)}
                            onSubmitEditing={() => pin3Ref.current.focus()}
                        />
                        <TextInput
                            style={_styles.pinInput}
                            keyboardType="numeric"
                            maxLength={1}
                            onKeyPress={(event) => handlePinKeyPress(event, pin2Ref)}

                            ref={pin3Ref}
                            onChangeText={(text) => handlePinInput(text, pin4Ref)}
                            onSubmitEditing={() => pin4Ref.current.focus()}
                        />
                        <TextInput
                            style={_styles.pinInput}
                            keyboardType="numeric"
                            maxLength={1}
                            onKeyPress={(event) => handlePinKeyPress(event, pin3Ref)}
                            ref={pin4Ref}
                            onChangeText={(text) => handlePinInput(text, pin5Ref)}
                            onSubmitEditing={() => pin5Ref.current.focus()}
                        />
                        <TextInput
                            style={_styles.pinInput}
                            keyboardType="numeric"
                            maxLength={1}
                            onKeyPress={(event) => handlePinKeyPress(event, pin4Ref)}
                            ref={pin5Ref}
                            onChangeText={(text) => handlePinInput(text, pin6Ref)}
                            onSubmitEditing={() => pin6Ref.current.focus()}
                        />
                        <TextInput
                            style={_styles.pinInput}
                            keyboardType="numeric"
                            maxLength={1}
                            onKeyPress={(event) => handlePinKeyPress(event, pin5Ref)}
                            ref={pin6Ref}
                            onChangeText={(text) => handlePinInput(text, null)}
                        />
                    </View>
                    {showTimer ? <ButtonView
                        title={"Verify"}
                        isLoading={isLoading}
                        onPress={() => {
                            // verifyPinNow()
                            // if (!isLoading && !isOTPSend) {
                            //     sendMobileOTP(mobile);
                            // } else if (!isLoading && isOTPSend && !isOTPVerified) {
                                verifyMobileOTP(pin);
                            // }
                        }}
                    /> : ""}
                    <View style={_styles.resendView}>
                        {showTimer ? <Text> OTP will expire in: {minutes < 10 ? '0' : ''}
                                {minutes}:{seconds < 10 ? '0' : ''}
                                {seconds}
                            </Text>
                            : ""}
                    </View>
                    {showTimer ? "" :
                        <TouchableOpacity onPress={() =>
                            ResendOTP()
                        } style={_styles.resend}><Text style={{color: Colors.ACCENT}}>Resend
                            OTP</Text></TouchableOpacity>

                    }


                </View>
            </Container>
        </Container>
    );
}

const _styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.PRIMARY,
    },
    container: {
        backgroundColor: Colors.WHITE,
    },
    backbtn: {
        backgroundColor: Colors.L_GRAY,
        width: 40,
        borderRadius: 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    topBarTxt: {
        color: Colors.PRIMARY,
        fontSize: 30,
        alignSelf: 'center',
        fontWeight: 'bold',
        marginStart: 20
    },
    header: {
        width: '100%',
        height: '40%',
    },
    content: {
        width: '100%',
        height: '60%',
        padding: 30,
        backgroundColor: Colors.WHITE,
    },
    title: {
        fontSize: 25,
        color: Colors.PRIMARY,
        fontWeight: 'bold',
    },
    description: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 10,
        color: Colors.BLACK,
    },

    resend: {
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: Colors.ACCENT,
        borderRadius: 5,
        width: 200,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    register: {
        color: Colors.PRIMARY,
        fontSize: 16,
    },
    pinInput: {
        borderRadius: 5,
        width: 45,
        height: 45,
        textAlign: 'center',
        fontSize: 25,
        margin: 5,
        backgroundColor: '#eaeaea'
    }, pinVIew: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        margin: 20
    },
    resendView: {
        margin: 10,
        alignSelf: 'center',
        flexDirection: 'row'
    }
});
