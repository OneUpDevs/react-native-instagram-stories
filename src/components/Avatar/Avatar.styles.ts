import { StyleSheet } from 'react-native';
import { AVATAR_OFFSET } from '../../core/constants';

export default StyleSheet.create( {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  avatar: {
    left: AVATAR_OFFSET,
    top: AVATAR_OFFSET,
    position: 'absolute',
  },
  name: {
    alignItems: 'center',
  },
} );
