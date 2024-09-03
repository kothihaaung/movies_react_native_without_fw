import React, { useCallback, useLayoutEffect, useState } from "react";
import {
  LayoutChangeEvent,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

type Props = {
  name?: string;
};

// magic number - max text that will get truncate will be ~370 and the window size is ~390
const SCREEN_PADDING_SIZE = 30;

const HelloTitle: React.FC<Props> = ({ name }) => {
  const [shouldShowName, setShouldShowName] = useState(!!name);
  const [isLoadingText, setIsLoadingText] = useState(true);
  const [computedTitleWidth, setComputedTitleWidth] = useState<number | null>(
    null
  );
  const { width: deviceWidth } = useWindowDimensions();

  const onLayout = (event: LayoutChangeEvent) => {
    if (computedTitleWidth === null) {
      setComputedTitleWidth(event.nativeEvent.layout.width);
      setIsLoadingText(false);
    }
  };

  const checkNameVisibility = useCallback(() => {
    if (computedTitleWidth) {
      setShouldShowName(computedTitleWidth < deviceWidth - SCREEN_PADDING_SIZE);
    }
  }, [computedTitleWidth, setShouldShowName]);

  useLayoutEffect(() => {
    checkNameVisibility();
  }, [computedTitleWidth, deviceWidth]);

  const displayStyle = isLoadingText ? styles.titleNoDisplay : {};
  return (
    <View style={styles.appTitleContainer}>
      {shouldShowName ? (
        <Text
          numberOfLines={1}
          onLayout={onLayout}
          style={{
            ...styles.baseTitle,
            ...styles.appTitle,
            ...displayStyle,
          }}
        >
          Hello, {name}!
        </Text>
      ) : (
        <Text style={{ ...styles.baseTitle, ...styles.largeAppTitle }}>
          Hello!
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  titleNoDisplay: {
    color: "black",
  },
  baseTitle: {
    color: "white",
  },
  appTitle: {
    fontSize: 24,
  },
  largeAppTitle: {
    fontSize: 32,
  },
  appTitleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 4,
    paddingLeft: 14,
  },
});

export default HelloTitle;
