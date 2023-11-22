import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors, Strings } from '../../../../assets';
import { ComingSoonComponent, Container, HeaderView } from '../../../../components';

export function HostelScreen() {
  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView title={Strings.Hostel.TITLE} isSearch isNotification />
        <View style={{ flex:1, justifyContent:'center'}}>
          <ComingSoonComponent title="Coming Soon" message={"Looks like this feature is not available."}/>
        </View>
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
});
