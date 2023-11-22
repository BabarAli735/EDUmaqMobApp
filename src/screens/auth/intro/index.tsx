import React from 'react';
import { Dimensions, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { } from 'react-native-gesture-handler';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { Colors, Icon, Icons, Images } from '../../../assets';
import { useAuthNavigator, useUiSelector } from '../../../redux';
import { AdminIntro, StudentIntro, TeacherIntro } from '../../../utils';

function IntroDetailScreen({ image, content, oTitle }: { image: ImageSourcePropType; content: string[]; oTitle: string }) {
  return (
    <View style={{
      width: Dimensions.get('window').width,
      height:'100%'
    }}>
      <View style={_styles.header}>
        <Image style={_styles.image} source={image} />
      </View>
      <View style={_styles.footer}>
        <Text style={_styles.title}>{oTitle}</Text>
        <View style={{ marginTop: 20, marginBottom: 20, flex: 1 }}>
          {content.map((item, index) => {
            return (
              <View key={index.toString()} style={{ ..._styles.item }}>

                {/* <Icon icon={Icons.IC_ARROW_LEFT} size={15} color={Colors.WHITE} rotation={'180deg'} />*/}
                <Text style={{ ..._styles.buttonTitle, fontSize: 16, fontWeight: 'bold', flex: 1 }}>
                  {'\u2022'} {item}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

export function IntroScreen() {
  const { navigation } = useAuthNavigator();
  const { finishIntro } = useUiSelector();
  const [index, setIndex] = React.useState<number>(0);

  function IntroPage(index: number) {
    index = index.index
    if (index == 0) {
      return <IntroDetailScreen key={'1'} image={Images.IMG_INTRO_STUDENT} content={StudentIntro} oTitle={"EduConnect for Students"}/>;
    } else if (index == 1) {
      return <IntroDetailScreen key={'2'} image={Images.IMG_INTRO_TEACHER} content={TeacherIntro} oTitle={"EduConnect for Teachers"}/>;
    } else {
      return <IntroDetailScreen key={'3'} image={Images.IMG_INTRO_ADMIN} content={AdminIntro} oTitle={"EduConnect for Admin"}/>;
    }
  }
  const ButtonView = () => {
    return (
      <View style={_styles.buttonHolder}>
        {/* <TouchableOpacity
          style={_styles.buttonView}
          onPress={() => {
            if (index > 0) {
              setIndex(index - 1);
            } else {
              navigation.goBack();
            }
          }}>
          <Icon icon={Icons.IC_ARROW_LEFT} size={12} color={Colors.WHITE} />
          <Text style={_styles.buttonTitle}>{'Back'}</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={_styles.buttonView}
          onPress={() => {
            if (index < 2) {
              setIndex(index + 1);
            } else {
              finishIntro();
            }
          }}>
          <Text style={{ ..._styles.buttonTitle }}>{'Next'}</Text>
          <Icon icon={Icons.IC_ARROW_LEFT} size={12} color={Colors.WHITE} rotation={'180deg'} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      {/* <SwiperFlatList autoplay={false}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height
        }}
        showPagination
        autoplayLoop={false}
        index={2}
        data={[1, 2, 3]}
        renderItem={({ item, index }) => <IntroPage index={index} />} /> */}

      <SwiperFlatList onChangeIndex={({index})=>setIndex(index)}>
        <IntroDetailScreen key={'1'} image={Images.IMG_INTRO_STUDENT} content={StudentIntro} oTitle={"EduConnect for Students"} />

        <IntroDetailScreen key={'2'} image={Images.IMG_INTRO_TEACHER} content={TeacherIntro} oTitle={"EduConnect for Teachers"}/>
        <View>
        <IntroDetailScreen key={'3'} image={Images.IMG_INTRO_ADMIN} content={AdminIntro} oTitle={"EduConnect for Admin"}/>
          <View style={_styles.bottomView}>
            <ButtonView />
          </View>
        </View>

      </SwiperFlatList>
      <View style={_styles.bottomView}>
        {/*  <ButtonView/>*/}
        <View style={_styles.indicatorHolder}>
          <View style={{ ..._styles.indicator, opacity: index === 0 ? 1 : 0.2 }} />
          <View style={{ ..._styles.indicator, opacity: index === 1 ? 1 : 0.2 }} />
          <View style={{ ..._styles.indicator, opacity: index === 2 ? 1 : 0.2 }} />
        </View>
      </View>
    </View>
  );
}

const _styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
  },
  footer: {
    height: '45%',
    alignItems: 'center',
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    backgroundColor: Colors.PRIMARY,
    position:'absolute',
    bottom:0,
    width:'100%'
  },
  image: {
    width: '100%',
    height: '100%',
    marginTop: 0,
    //resizeMode: 'stretch',
  },
  title: {
    fontSize: 30,
    marginTop: 30,
    color: Colors.WHITE,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomView: {
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 50,
  },
  buttonHolder: {
    flexDirection: 'row',
    width: '100%',
    padding: 20,
    justifyContent: 'space-between',
  },
  buttonView: {
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.ABSENT,
    position:'absolute',
    right:15,
    bottom:-8,

  },
  buttonTitle: {
    paddingStart: 5,
    paddingEnd: 5,
    fontSize: 16,
    color: Colors.WHITE,
  },
  item: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  indicatorHolder: {
    flexDirection: 'row',
  },
  indicator: {
    backgroundColor: Colors.WHITE,
    height: 10,
    width: 10,
    borderRadius: 10,
    marginEnd: 10,
  },
});
