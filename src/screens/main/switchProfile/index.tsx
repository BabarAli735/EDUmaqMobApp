import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Icon, Icons, ImageView, Strings } from '../../../assets';
import { Container, ContentList, HeaderView } from '../../../components';
import { ApiEndpoints, Profile } from '../../../data';
import { useAuthenticationSelector, useSiblingSelector } from '../../../redux';

const image = 'https://media-exp1.licdn.com/dms/image/C5103AQElCB2OnJTc1A/profile-displayphoto-shrink_800_800/0/1536736351378?e=1636588800&v=beta&t=IdcbKD0QbnWl6PabUe8ud_N93zBfyoDLWdOGLbAmsJ4';

export function SwitchProfileScreen() {
  const { profile } = useAuthenticationSelector();
  const { isLoading, siblings, error, onRetry, onSwitchUser } = useSiblingSelector();

  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView title={Strings.Main.SWITCH_PROFILE} />
        {siblings && (
          <View style={_styles.header}>
            <Icon icon={Icons.IC_PROFILE} size={25} color={Colors.GRAY} />
            <Text style={_styles.title}>{'Siblings'}</Text>
          </View>
        )}
        <ContentList<Profile>
          items={siblings?.filter(e => e?.id !== profile?.id)}
          isLoading={isLoading}
          isRetry={!!error}
          onRetry={() => onRetry()}
          message={error ? error.error.message : Strings.Siblings.EMPTY}
          onRender={(item, index) => {
            console.log(item);
            return (
              <TouchableOpacity style={_styles.itemHolder} onPress={() => onSwitchUser(item)}>
                <ImageView icon={item?.imageUrl ? ApiEndpoints.BASE_API_URL + item.imageUrl : Icons.IC_USER} style={_styles.image} />
                <View style={_styles.details}>
                  <Text style={_styles.name}>{item.studentName}</Text>
                  <Text style={_styles.admission}>{'ADMISSION NO : ' + item.admissionNo}</Text>
                  <Text style={_styles.admission}>{'STD ' + item.classCourseName + ' - ' + item.batchName}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </Container>
    </Container>
  );
}

const _styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.ACCENT,
  },
  container: {
    backgroundColor: Colors.PRIMARY,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    marginStart: 10,
    fontWeight: 'bold',
    color: Colors.GRAY,
  },
  itemHolder: {
    padding: 10,
    marginStart: 10,
    marginEnd: 10,
    marginBottom: 10,
    flexDirection: 'row',
    shadowOffset: { width: 2, height: 2 },
    shadowColor: '#aaa',
    shadowOpacity: 1,
    elevation: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  details: {
    justifyContent: 'space-between',
    marginStart: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  admission: {
    fontSize: 16,
    color: Colors.GRAY,
  },
});
