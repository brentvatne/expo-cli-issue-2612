import * as React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import Constants from "expo-constants";

import * as FileSystem from "expo-file-system";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const [downloadProgress, setDownloadProgress] = useState(0);

  const downloadResumable = FileSystem.createDownloadResumable(
    "https://tse2-mm.cn.bing.net/th/id/OIP.YoNtXYr0k-kJBQNCKsPgWAHaEL?pid=Api&rs=1",
    FileSystem.documentDirectory + "test.apk",
    {},
    (downloadProgress: {
      totalBytesWritten: number,
      totalBytesExpectedToWrite: number,
    }) => {
      console.log("download progress called");
      const progress =
        downloadProgress.totalBytesWritten /
        downloadProgress.totalBytesExpectedToWrite;
      console.log("total " + downloadProgress.totalBytesExpectedToWrite);
      console.log("progress " + downloadProgress.totalBytesWritten);
      setDownloadProgress(progress);
    }
  );

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{downloadProgress}</Text>
      <Button onPress={() => downloadResumable.downloadAsync()} title="Start Download" color="#841584" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
