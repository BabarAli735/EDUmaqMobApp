import React, {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Colors, Icon, Icons, Images, Strings} from '../../../assets';
import {ButtonView, Container, InputTextView} from '../../../components';
import {useAuthNavigator, useMobileSelector, useUiSelector} from '../../../redux';
import {ApiEndpoints, getInstitute} from "../../../data";
import axios from "axios";

const RESEND_TIME_OUT = 10;

export function MobileScreen() {
    const {navigation, route} = useAuthNavigator();

    const [mobile, setMobile] = React.useState<string>();
    const [otp, setOtp] = React.useState<string>();
    const [otpSent, setOtpSent] = useState(false)
    const [pin, setPin] = useState('');
    let [showTimer, setShowTimer] = useState(true)

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

    const {showSnackbar} = useUiSelector();

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
    React.useEffect(() => {
        if (isOTPVerified) {
            route.params?.onMobileVerified && route.params?.onMobileVerified(mobile);
            navigation.goBack();
        }
    }, [isOTPVerified]);

    function GetOtp() {
        startTimer()
        console.log("here")
        if(mobile?.length==10){
             setOtpSent(true)
            sendMobileOTP(mobile);
        }else{
            showSnackbar("Please enter valid phone", true);

        }

    }
    function resendOtp() {

        startTimer()
        setShowTimer(true)
        if(mobile?.length==10){
            setOtpSent(true)
            sendMobileOTP(mobile);
        }else{
            showSnackbar("Please enter valid phone", true);

        }

    }

    async function verifyPinNow() {

        console.log("here")
        await getInstitute().then(institute => {
            const config = {
                headers: {
                    InstitutionCode: institute && institute.institutionCode ? institute.institutionCode : ''
                },
            };

            let asdasdasdasda = "http://stagingapi.edumaq.in/api/ManageOTP/VerifyOtp/"+pin
            console.log(config)
            axios.get(asdasdasdasda, config)
                .then(response => {
                    //  startTimer()
                     console.log("heater:",response)
                     if(response.data.messageDescription){
                     showSnackbar(response.data.messageDescription, true);
                     }
                     else{
                        verifyMobileOTP(pin);
                     }
                    
                })
            //     .catch(error => {
            //         if(error.response.data.messageDescription){
            //         verifyMobileOTP(pin);
            //         console.log("error")
            //    }
            //    else {
            //        // verifyMobileOTP(pin);
            //         console.log("error3")
            //    }
                    

            //     });
        });
    }

    return (
        <Container style={_styles.main}>
            <Container style={_styles.container} isSafeArea>
                <Image source={Images.IMG_OTP_HEADER} style={_styles.header} resizeMode={'contain'}/>
                {otpSent ?
                    <View style={_styles.content}>
                        <Text style={_styles.title}>{Strings.Institute.OTP_VERIFICATION}</Text>

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
                                verifyPinNow()
                                // if (!isLoading && !isOTPSend) {
                                //     // sendMobileOTP(mobile);
                                // } else if (!isLoading && isOTPSend && !isOTPVerified) {
                                //   verifyMobileOTP(pin);
                                // }
                                // else{
                                //     // verifyMobileOTP(pin);
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
                                resendOtp()
                            } style={_styles.resend}><Text style={{color: Colors.ACCENT}}>Resend
                                OTP</Text></TouchableOpacity>

                        }


                    </View>
                    :
                    <View style={_styles.content}>
                        <Text style={_styles.title}>{Strings.Institute.OTP_VERIFICATION}</Text>
                        <Text style={_styles.description}>{Strings.Institute.VERIFY_INSTITUTE_DESCRIPTION}</Text>
                        <View style={{flexDirection: 'row', marginTop: 20}}>
                            <InputTextView style={{minWidth: 80}} value={'+91'} isCenterText={true}
                                           rightIcon={props => <Icon {...props} icon={Icons.IC_ARROW_LEFT}
                                                                     rotation={'270deg'}/>} isEditable={false}
                                           onPress={() => {
                                           }}/>
                            <InputTextView
                                style={{flex: 1, marginStart: 10}}
                                placeHolder={Strings.Institute.PHONE}
                                keyboardType={'number-pad'}
                                isEditable={!isLoading}
                                value={mobile}
                                onChangeText={text => {
                                    setMobile(text);
                                }}
                            />
                        </View>

                        <ButtonView
                            title={"Send OTP"}
                            style={{marginTop: 40}}
                            isLoading={isLoading}
                            onPress={() => {
                                GetOtp()
                                 sendMobileOTP(mobile);

                            }}
                        />
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{alignSelf: 'center', marginTop: 30, flexDirection: 'row'}}
                            onPress={() => {
                                if (!isLoading) {
                                    navigation.goBack();
                                }
                            }}>
                            <Text style={{
                                color: Colors.BLACK,
                                fontSize: 16,
                                fontWeight: 'bold',
                                opacity: 0.3
                            }}>{Strings.Institute.REGISTER_1 + ' '}</Text>
                            <Text style={{
                                color: Colors.PRIMARY,
                                fontSize: 16,
                                fontWeight: 'bold'
                            }}>{Strings.Institute.REGISTER_2}</Text>
                        </TouchableOpacity>
                    </View>
                }
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
        opacity: 0.3,
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
    },
});