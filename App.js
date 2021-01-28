import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Appearance, Platform, StyleSheet, Text, View } from 'react-native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import Blob, { Curve, Origin } from './Blob';



export default function Screen() {
  return (
    <AppearanceProvider>
      <App/>
    </AppearanceProvider>
  );
}

function App() {
  const colorScheme = useColorScheme();
  let style = getStyle(colorScheme);
  console.log(colorScheme);
  let x_origin = 0;
  let y_origin = 0;

  let list_of_origins = [new Origin(x_origin, y_origin), new Origin(x_origin, y_origin), new Origin(x_origin, y_origin)];
  let list_of_curves = [[randomCurve(), randomCurve(),randomCurve(),randomCurve()], [randomCurve(), randomCurve(),randomCurve(),randomCurve()],[randomCurve(), randomCurve(),randomCurve(),randomCurve()]];

  return (
    <View style={[styles.container, style.container]}>
      <Blob scale={10} height={400} width={400} style={{blob:{color: colorScheme === 'dark' ? '#b65302' : '#FFA04F'}}} list_of_curve_list={list_of_curves} list_of_origins={list_of_origins}/>
      <StatusBar style="auto" />
    </View>
  );
}

function randomCurve() {
  let x1,x2,x3;
  let y1,y2,y3;

  x1 = Math.round((Math.random() - 0.5) * 2 * 10);
  x2 = Math.round((Math.random() - 0.5) * 2 * 10);
  x3 = Math.round((Math.random() - 0.5) * 2 * 10);
  y1 = Math.round((Math.random() - 0.5) * 2 * 10);
  y2 = Math.round((Math.random() - 0.5) * 2 * 10);
  y3 = Math.round((Math.random() - 0.5) * 2 * 10);

  return new Curve(x1,y1,x2,y2,x3,y3);
}

function getStyle(colorScheme) {
  let backgroundColor = colorScheme === 'dark' ? 'black' : 'white';
  let fontColor = colorScheme === 'dark' ? 'white' : 'black';
  let blobColor = colorScheme === 'dark' ? '#b65302' : '#FFA04F';
  return StyleSheet.create({
    text: {
      color: fontColor,
    },
    blob: {
      color: blobColor,
    },
    container: {
      backgroundColor: backgroundColor
    }
  })
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
