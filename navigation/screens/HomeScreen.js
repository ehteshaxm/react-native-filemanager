/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  ScrollView,
  Switch,
  SafeAreaView,
  TouchableHighlight,
} from 'react-native';
import * as RNFS from 'react-native-fs';
import File from '../../components/File';
import {useSelector} from 'react-redux';

export default function HomeScreen({navigation}) {
  const [allFiles, setAllFiles] = useState([]);
  const [hiddenFiles, sethiddenFiles] = useState([]);

  const hidden = useSelector(state => state.hidden);

  useEffect(() => {
    const getter = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Access Storage',
            message: 'Allow the app to access Internal Storage',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the storage');
        } else {
          console.log('Storage permission denied');
        }
      } catch (err) {
        console.warn(err);
        return;
      }

      let path = RNFS.ExternalStorageDirectoryPath;
      // get a list of files and directories in the main bundle
      RNFS.readDir(path) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
        .then(result => {
          setAllFiles(result);
          const filtered = result.filter(file => !file.name.startsWith('.'));
          sethiddenFiles(filtered);
        })
        .catch(err => {
          console.log(err.message, err.code);
        });
    };
    getter();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{marginTop: 15}}>
        {hidden
          ? allFiles.map(file => (
              <TouchableHighlight
                key={file.name}
                onPress={() =>
                  navigation.push('File', {path: `/${file.name}`})
                }>
                <File
                  name={file.name}
                  isDirectory={file.isDirectory}
                  isFile={file.isFile}
                  time={file.mtime}
                />
              </TouchableHighlight>
            ))
          : hiddenFiles.map(file => (
              <TouchableHighlight
                key={file.name}
                onPress={() =>
                  navigation.push('File', {path: `/${file.name}`})
                }>
                <File
                  name={file.name}
                  isDirectory={file.isDirectory}
                  isFile={file.isFile}
                  time={file.mtime}
                />
              </TouchableHighlight>
            ))}
      </ScrollView>
    </SafeAreaView>
  );
}
