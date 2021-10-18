import React, {useEffect, useState} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import * as RNFS from 'react-native-fs';
import {ScrollView} from 'react-native-gesture-handler';
import File from '../../components/File';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const FilesScreen = ({route, navigation}) => {
  const [allFiles, setAllFiles] = useState([]);
  const [hiddenFiles, sethiddenFiles] = useState([]);
  const path = route.params.path;

  const hidden = useSelector(state => state.hidden);

  useEffect(() => {
    RNFS.readDir(RNFS.ExternalStorageDirectoryPath + path) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then(result => {
        setAllFiles(result);
        const filtered = result.filter(file => !file.name.startsWith('.'));
        sethiddenFiles(filtered);
      })
      .catch(err => {
        console.log(err.message, err.code);
      });
  }, []);

  return (
    <ScrollView>
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
    </ScrollView>
  );
};

export default FilesScreen;
