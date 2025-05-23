import React, { FC, memo } from 'react';
import {
  View, Text, TouchableOpacity,
} from 'react-native';
import { Image } from 'expo-image';
import Animated, {
  useSharedValue, useAnimatedStyle, useDerivedValue, withTiming,
} from 'react-native-reanimated';
import { StoryAvatarProps } from '../../core/dto/componentsDTO';
import AvatarStyles from './Avatar.styles';
import Loader from '../Loader';
import { AVATAR_OFFSET } from '../../core/constants';

const AnimatedImage = Animated.createAnimatedComponent( Image );

const StoryAvatar: FC<StoryAvatarProps> = ( {
  id,
  avatarSource,
  name,
  stories,
  loadingStory,
  seenStories,
  onPress,
  colors,
  seenColors,
  size,
  showName,
  nameTextStyle,
  nameTextProps,
  renderAvatar,
  avatarBorderRadius,
} ) => {

  const loaded = useSharedValue( false );
  const isLoading = useDerivedValue( () => loadingStory.value === id || !loaded.value );
  const seen = useDerivedValue(
    () => seenStories.value[id] === stories[stories.length - 1]?.id,
  );
  const loaderColor = useDerivedValue( () => ( seen.value ? seenColors : colors ) );

  const onLoad = () => {

    loaded.value = true;

  };

  const imageAnimatedStyles = useAnimatedStyle( () => (
    { opacity: withTiming( isLoading.value ? 0.5 : 1 ) }
  ) );

  if ( renderAvatar ) {

    return renderAvatar( seen.value );

  }

  if ( !avatarSource ) {

    return null;

  }

  return (
    <View style={AvatarStyles.name}>
      <View style={AvatarStyles.container}>
        <TouchableOpacity activeOpacity={0.6} onPress={onPress} testID={`${id}StoryAvatar${stories.length}Story`}>
          <Loader loading={isLoading} color={loaderColor} size={size + AVATAR_OFFSET * 2} />
          <AnimatedImage
            source={avatarSource}
            cachePolicy={'disk'}
            style={[
              AvatarStyles.avatar,
              imageAnimatedStyles,
              { width: size, height: size, borderRadius: avatarBorderRadius ?? ( size / 2 ), paddingHorizontal:4 },
            ]}
            testID="storyAvatarImage"
            onLoad={onLoad}
          />
        </TouchableOpacity>
      </View>
      {Boolean( showName ) && (
        <Text
          {...nameTextProps}
          style={[ { width: size + AVATAR_OFFSET * 2 }, nameTextStyle ]}
        >
          {name}
        </Text>
      )}
    </View>
  );

};

export default memo( StoryAvatar );
