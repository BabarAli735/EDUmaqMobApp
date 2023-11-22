import React from 'react';
import {
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import {PicketItem, Screens} from '../..';
import {Colors, Icon, Icons, Images} from '../../../assets';
import {ButtonView, Container, HeaderView, InputTextBoxView, InputTextView, SelectionInput} from '../../../components';
import {useAuthNavigator, useInstituteRegisterSelector, useMasterSelector} from '../../../redux';
import {AffiliationType, Citiesist, CountriesList, InstituteType, SchoolMedium, StatesList} from '../../../utils';

export function RegisterScreen() {
    const {navigation} = useAuthNavigator();
    // const {country, state, city} = useMasterSelector();
    const {isLoading, institute, setInstitute, register} = useInstituteRegisterSelector();

    return (
        <Container style={{backgroundColor: Colors.PRIMARY}} isSafeArea={false}>
            <Container style={{backgroundColor: Colors.PRIMARY}} isSafeArea={true}>
                <HeaderView title={"Register"} color={Colors.TRANSPARENT}/>
                <KeyboardAvoidingView style={{flex: 1, height: '100%'}} contentContainerStyle={{flex: 1}}
                                      behavior={Platform.select({android: undefined, ios: 'padding'})}>
                    <ScrollView style={_styles.container}>
                        <InputTextView
                            style={{..._styles.input, marginTop: 0}}
                            placeHolder={'Institute Name'}
                            value={institute && institute.InstitutionName ? institute.InstitutionName : ''}
                            onChangeText={text => {
                                setInstitute({...institute, InstitutionName: text});
                            }}
                        />
                        <SelectionInput
                            style={_styles.input}
                            label={'Institution Type'}
                            value={institute && institute?.InstitutionType ? institute?.InstitutionType : ''}
                            items={InstituteType}
                            onSelect={item => {
                                setInstitute({...institute, InstitutionType: item.value});
                            }}
                        />
                        <SelectionInput
                            style={_styles.input}
                            label={'Affiliation Type'}
                            value={institute && institute?.AffiliationType ? institute?.AffiliationType : ''}
                            items={AffiliationType}
                            onSelect={item => {
                                setInstitute({...institute, AffiliationType: item.value});
                            }}
                        />
                        <SelectionInput
                            style={_styles.input}
                            label={'School Medium'}
                            value={institute && institute?.Medium ? institute?.Medium : ''}
                            items={SchoolMedium}
                            onSelect={item => {
                                setInstitute({...institute, Medium: item.value});
                            }}
                        />
                        <InputTextView
                            style={_styles.input}
                            placeHolder={'Location'}
                            value={institute && institute.CityName ? institute.CityName : ''}
                            onChangeText={text => {
                                setInstitute({...institute, CityName: text});
                            }}
                        />

                        {/*<SelectionInput*/}
                        {/*    style={_styles.input}*/}
                        {/*    label={'Country'}*/}
                        {/*    value={institute && institute?.CountryId}*/}
                        {/*    items={*/}
                        {/*        country*/}
                        {/*            ? country.map(item => {*/}
                        {/*                return {id: item.id, value: item.countryName} as PicketItem;*/}
                        {/*            })*/}
                        {/*            : []*/}
                        {/*    }*/}
                        {/*    onSelect={item => {*/}
                        {/*        setInstitute({...institute, CountryId: item.id, StateId: undefined, CityId: undefined});*/}
                        {/*    }}*/}
                        {/*/>*/}
                        {/*<SelectionInput*/}
                        {/*    style={_styles.input}*/}
                        {/*    label={'State'}*/}
                        {/*    value={institute && institute?.StateId}*/}
                        {/*    items={*/}
                        {/*        state*/}
                        {/*            ? state*/}
                        {/*                ?.filter(item => item.countryId === institute?.CountryId?.toString())*/}
                        {/*                .map(item => {*/}
                        {/*                    return {id: item.id, value: item.stateName} as PicketItem;*/}
                        {/*                })*/}
                        {/*            : []*/}
                        {/*    }*/}
                        {/*    onSelect={item => {*/}
                        {/*        setInstitute({...institute, StateId: item.id, CityId: undefined});*/}
                        {/*    }}*/}
                        {/*/>*/}
                        {/*<SelectionInput*/}
                        {/*    style={_styles.input}*/}
                        {/*    label={'City'}*/}
                        {/*    value={institute && institute?.CityId}*/}
                        {/*    items={*/}
                        {/*        city*/}
                        {/*            ? city*/}
                        {/*                ?.filter(item => item.stateId === institute?.StateId?.toString())*/}
                        {/*                .map(item => {*/}
                        {/*                    return {id: item.id, value: item.cityName} as PicketItem;*/}
                        {/*                })*/}
                        {/*            : []*/}
                        {/*    }*/}
                        {/*    onSelect={item => {*/}
                        {/*        setInstitute({...institute, CityId: item.id, CityName: item.cityName});*/}
                        {/*    }}*/}
                        {/*/>*/}
                        <InputTextView
                            style={_styles.input}
                            placeHolder={'Pin Code'}
                            maxLength={6}
                            keyboardType={'number-pad'}
                            value={institute && institute.Pincode ? institute.Pincode : ''}
                            onChangeText={text => {
                                setInstitute({...institute, Pincode: text});
                            }}
                        />
                        <InputTextView
                            style={_styles.input}
                            placeHolder={'Enquired By'}
                            keyboardType={'email-address'}
                            value={institute && institute.Enquire ? institute.Enquire : ''}
                            onChangeText={text => {
                                setInstitute({...institute, Enquire: text});
                            }}
                        />
                        <InputTextView
                            style={_styles.input}
                            placeHolder={'Email'}
                            keyboardType={'email-address'}
                            value={institute && institute.Email ? institute.Email : ''}
                            onChangeText={text => {
                                setInstitute({...institute, Email: text});
                            }}
                        />
                        <View style={{flexDirection: 'row'}}>
                            <InputTextView
                                style={{..._styles.input, minWidth: 80}}
                                value={'+91'}
                                isEditable={false}
                                isCenterText={true}
                                rightIcon={props => <Icon {...props} icon={Icons.IC_ARROW_LEFT} rotation={'270deg'}/>}
                                onPress={() => {
                                }}
                            />
                            <InputTextView
                                style={{..._styles.input, flex: 1, marginStart: 10}}
                                placeHolder={'Phone Number'}
                                keyboardType={'number-pad'}
                                value={institute && institute.ContactNumber ? institute.ContactNumber : ''}
                                onChangeText={text => {
                                    setInstitute({...institute, ContactNumber: text});
                                }}

                            />
                        </View>
                        <TextInput
                            placeholder={"Remarks"}
                            multiline={true}
                            numberOfLines={4}
                            value={institute && institute.Remarks ? institute.Remarks : ''}
                            style={{
                                marginTop: 10,
                                height:100,
                                justifyContent:'center',
                                alignItems:'center',
                                color:Colors.PRIMARY,
                                borderWidth:1,
                                padding:10,
                                borderRadius:10,
                                textAlignVertical:"top",
                                textAlign:"left",
                                borderColor: institute?.Remarks ? Colors.PRIMARY : Colors.GRAY
                            }}
                            onChangeText={text => {
                                setInstitute({...institute, Remarks: text});
                            }}
                        />

                        <ButtonView title={'Register Institution'} style={{marginTop: 30, marginBottom: 20}}
                                    isLoading={isLoading} onPress={() => register()}/>
                    </ScrollView>
                </KeyboardAvoidingView>
            </Container>
        </Container>
    );
}

const _styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.WHITE,
        padding: 20,
    },
    title: {
        fontSize: 35,
        color: Colors.WHITE,
        fontWeight: 'bold',
    },
    input: {
        marginTop: 10,
    },
    textBox: {
        marginTop: 10,
        height:100,
        justifyContent:'center',
        alignItems:'center',
        color:Colors.PRIMARY,
        borderWidth:1,
        borderColor:Colors.PRIMARY,
        padding:10,
        borderRadius:10,
        textAlignVertical:"top",
        textAlign:"left"
    },
    inputValue: {},
});
