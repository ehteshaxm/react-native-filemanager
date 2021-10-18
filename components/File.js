/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

const File = ({name, time, isFile, isDirectory}) => {
  const theme = useSelector(state => state.theme);
  const file = isFile();
  const directory = isDirectory();
  const datetime = time.toLocaleString();

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 15,
        alignItems: 'center',
      }}>
      {directory && (
        <View
          style={{
            padding: 10,
            backgroundColor: 'tomato',
            borderRadius: 18,
            marginRight: 15,
          }}>
          <Ionicons name={'folder-open'} size={30} />
        </View>
      )}
      {file && (
        <View
          style={{
            padding: 10,
            borderRadius: 18,
            marginRight: 15,
          }}>
          <Ionicons name={'document'} size={30} />
        </View>
      )}
      <View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: theme === 'dark' ? 'white' : 'black',
          }}>
          {name}
        </Text>
        <Text style={{color: theme === 'dark' ? 'white' : 'black'}}>
          {datetime}
        </Text>
      </View>
    </View>
  );
};

export default File;
