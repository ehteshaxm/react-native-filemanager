import React, {useState} from 'react';
import {View, Text, Switch} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setTheme} from '../../redux/actions';
import {setHidden} from '../../redux/actions';

export default function SettingsScreen({navigation}) {
  const [toggle, setToggle] = useState(false);
  const [hiddenToggle, setHiddenToggle] = useState(false);

  const theme = useSelector(state => state.theme);
  const hidden = useSelector(state => state.hidden);
  const dispatch = useDispatch();

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: theme === 'dark' ? '#171717' : 'white',
          marginTop: 20,
          padding: 10,
          paddingHorizontal: 30,
        }}>
        <View>
          <Text
            style={{
              color: theme === 'dark' ? 'white' : 'black',
              fontSize: 14,
            }}>
            Dark Mode
          </Text>
        </View>
        <View>
          <Switch
            style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
            value={toggle}
            thumbColor={'white'}
            trackColor={{true: 'tomato', false: '#ebebeb'}}
            onChange={async () => {
              if (theme === 'dark') {
                dispatch(setTheme('light'));
              } else {
                dispatch(setTheme('dark'));
              }
              setToggle(!toggle);
            }}
          />
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: theme === 'dark' ? '#171717' : 'white',
          padding: 10,
          paddingHorizontal: 30,
        }}>
        <View>
          <Text
            style={{
              color: theme === 'dark' ? 'white' : 'black',
              fontSize: 14,
            }}>
            Show Hidden Files
          </Text>
        </View>
        <View>
          <Switch
            style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
            value={hiddenToggle}
            thumbColor={'white'}
            trackColor={{true: 'tomato', false: '#ebebeb'}}
            onChange={async () => {
              if (hidden === false) {
                dispatch(setHidden(true));
              } else {
                dispatch(setHidden(false));
              }
              setHiddenToggle(!hiddenToggle);
            }}
          />
        </View>
      </View>
    </View>
  );
}
