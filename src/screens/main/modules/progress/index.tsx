import moment from 'moment';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { ChartData } from 'react-native-chart-kit/dist/HelperTypes';
import { Colors, Strings } from '../../../../assets';
import { Container, HeaderView } from '../../../../components';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export function ProgressScreen() {
  const dataSet: ChartData = {
    labels: ['First Term', 'Second Term', 'Third Term'],
    datasets: [
      {
        data: [20, 60, 100],
        colors: [(opacity = 1) => '#23467C', (opacity = 1) => '#23467C', (opacity = 1) => '#23467C'],
      },
      {
        data: [100], // max
      },
    ],
  };

  const dataSetAcademic: ChartData = {
    labels: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
    datasets: [
      {
        data: [80, 40, 50, 95, 85, 32, 60, 70, 80, 55, 75],
        colors: [
          (opacity = 1) => '#23467C',
          (opacity = 1) => '#23467C',
          (opacity = 1) => '#23467C',
          (opacity = 1) => '#23467C',
          (opacity = 1) => '#23467C',
          (opacity = 1) => '#23467C',
          (opacity = 1) => '#23467C',
          (opacity = 1) => '#23467C',
          (opacity = 1) => '#23467C',
          (opacity = 1) => '#23467C',
          (opacity = 1) => '#23467C',
        ],
      },
      {
        data: [100], // max
      },
    ],
  };

  return (
    <Container style={_styles.main}>
      <Container style={_styles.container} isSafeArea>
        <HeaderView title={Strings.Progress.TITLE} isSearch isNotification />
        <View style={{ flex: 1, padding: 10 }}>
          <View style={{ flex: 1 }}>
            <Text style={_styles.title}>{Strings.Progress.CURRENT_TITLE + moment().format('yyyy')}</Text>
            <View style={_styles.graphHolder}>
              <BarChart
                data={dataSet}
                width={screenWidth - 50}
                height={screenHeight / 3}
                chartConfig={{
                  backgroundColor: 'transparent',
                  backgroundGradientFromOpacity: 0,
                  backgroundGradientToOpacity: 0,
                  color: (opacity = 1) => '#23467C',
                  barPercentage: 1.5,
                  barRadius: 0,
                  decimalPlaces: 0,
                }}
                style={{ marginTop: 20, marginStart: 10, marginEnd: 15 }}
                yAxisSuffix=""
                yAxisLabel=""
                withHorizontalLabels={true}
                fromZero={true}
                withCustomBarColorFromData={true}
                flatColor={true}
                withInnerLines={false}
                showBarTops={false}
                showValuesOnTopOfBars={false}
              />
              <Text style={_styles.yAxisLabel}>{'Examination'}</Text>
              <Text style={_styles.xAxisLabel}>{'Percentage'}</Text>
            </View>
          </View>
          <View style={{ flex: 1, marginTop: 10 }}>
            <Text style={_styles.title}>{Strings.Progress.PREVIOUS_TITLE}</Text>
            <View style={_styles.graphHolder}>
              <BarChart
                data={dataSetAcademic}
                width={screenWidth - 50}
                height={screenHeight / 3}
                chartConfig={{
                  backgroundColor: 'transparent',
                  backgroundGradientFromOpacity: 0,
                  backgroundGradientToOpacity: 0,
                  color: (opacity = 1) => '#23467C',
                  barPercentage: 0.5,
                  barRadius: 0,
                  decimalPlaces: 0,
                }}
                style={{ marginTop: 15, marginStart: 10, marginEnd: 15 }}
                yAxisSuffix=""
                yAxisLabel=""
                withHorizontalLabels={true}
                fromZero={true}
                withCustomBarColorFromData={true}
                flatColor={true}
                withInnerLines={false}
                showBarTops={false}
                showValuesOnTopOfBars={false}
              />
              <Text style={_styles.xAxisLabel}>{'Percentage'}</Text>
              <Text style={_styles.yAxisLabel}>{'Academic Year'}</Text>
            </View>
          </View>
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
  title: {
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    fontSize: 16,
    backgroundColor: Colors.CYAN,
    color: Colors.PRIMARY,
    fontWeight: 'bold',
  },
  graphHolder: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  xAxisLabel: {
    fontSize: 12,
    fontStyle: 'italic',
    color: Colors.PRIMARY,
    textAlign: 'center',
    position: 'absolute',
    transform: [{ rotate: '-90deg' }],
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    marginStart: -30,
  },
  yAxisLabel: {
    fontSize: 12,
    fontStyle: 'italic',
    color: Colors.PRIMARY,
    textAlign: 'center',
  },
});
