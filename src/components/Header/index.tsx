import React, { FC, memo } from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { Image } from "expo-image";
import { WIDTH } from "../../core/constants";
import HeaderStyles from "./Header.styles";
import { StoryHeaderProps } from "../../core/dto/componentsDTO";
import Close from "../Icon/close";

const StoryHeader: FC<StoryHeaderProps> = ({
  avatarSource,
  name,
  onClose,
  avatarSize,
  textStyle,
  closeColor,
  headerStyle,
  headerContainerStyle,
  renderStoryHeader,
  onStoryHeaderPress,
}) => {
  const styles = {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize,
  };
  const width = WIDTH - HeaderStyles.container.left * 2;

  if (renderStoryHeader) {
    return (
      <View style={[HeaderStyles.container, { width }, headerContainerStyle]}>
        {renderStoryHeader()}
      </View>
    );
  }

  return (
    <View
      style={[
        HeaderStyles.container,
        HeaderStyles.containerFlex,
        { width },
        headerContainerStyle,
      ]}
    >
      <Pressable
        style={[HeaderStyles.left, headerStyle]}
        onPress={() => onStoryHeaderPress?.()}
      >
        {Boolean(avatarSource) && (
          <View
            style={[HeaderStyles.avatar, { borderRadius: styles.borderRadius }]}
          >
            <Image source={avatarSource!} style={styles} />
          </View>
        )}
        {Boolean(name) && <Text style={textStyle}>{name}</Text>}
      </Pressable>
      <TouchableOpacity
        onPress={onClose}
        hitSlop={16}
        testID="storyCloseButton"
      >
        <Close color={closeColor} />
      </TouchableOpacity>
    </View>
  );
};

export default memo(StoryHeader);
