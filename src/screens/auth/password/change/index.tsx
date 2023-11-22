import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Colors } from "../../../../assets";
import { ButtonView, Container, HeaderView, HorizontalDivider } from "../../../../components";
import { useChangePasswordSelector, useMainNavigator } from "../../../../redux";

export function ChangePassword() {
    const { isLoading, onChangePassword } = useChangePasswordSelector();

    const [currentPassword, setCurrentPassword] = React.useState<string>();
    const [newPassword, setNewPassword] = React.useState<string>();
    const [confirmPassword, setConfirmPassword] = React.useState<string>();

    return <Container style={_styles.main}>
        <Container style={_styles.container} isSafeArea>
            <HeaderView title={"Change Password"} />
            <HorizontalDivider width={3} />
            <View style={{ padding: 20, flex: 1 }}>
                <TextInput
                    editable={!isLoading}
                    style={_styles.input}
                    placeholderTextColor={Colors.L_GRAY}
                    onChangeText={text => {
                        setCurrentPassword(text);
                    }}
                    value={currentPassword}
                    placeholder={"Current Password"}
                />
                <HorizontalDivider width={20} />
                <TextInput
                    editable={!isLoading}
                    style={_styles.input}
                    placeholderTextColor={Colors.L_GRAY}
                    onChangeText={text => {
                        setNewPassword(text);
                    }}
                    value={newPassword}
                    placeholder={"New Password"}
                />
                <HorizontalDivider width={20} />
                <TextInput
                    editable={!isLoading}
                    style={_styles.input}
                    placeholderTextColor={Colors.L_GRAY}
                    onChangeText={text => {
                        setConfirmPassword(text);
                    }}
                    value={confirmPassword}
                    placeholder={"Confirm Password"}
                />
                <ButtonView
                    title={"Change Password"}
                    style={{ marginTop: 50, width: '100%', position: 'absolute', bottom: 20, left: 20, right: 20 }}
                    isLoading={isLoading}
                    onPress={() => {
                        onChangePassword(currentPassword, newPassword, confirmPassword);
                    }}
                />
            </View>
        </Container>
    </Container>
}
const _styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.ACCENT,
    },
    container: {
        backgroundColor: Colors.PRIMARY,
    },
    input: {
        width: '100%',
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        borderWidth: 1.5,
        borderColor: Colors.WHITE,
        color: Colors.WHITE,
    },
});