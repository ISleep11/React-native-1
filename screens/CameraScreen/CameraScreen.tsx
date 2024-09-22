import { View, StyleSheet, Linking, Alert } from "react-native";
import { useEffect, useState } from "react";
import { Camera, CameraView } from "expo-camera";
import Permission from "../../components/Permission/Permission";
import IconButton from "../../components/IconButton/IconButton";
import SwitchIcon from "../../assets/icons/IconSVG/SwitchCameraMode.svg";
import TakePictureIcon from "../../assets/icons/IconSVG/TakePicture.svg";
import VideoIcon from "../../assets/icons/IconSVG/Video.svg";
import CameraIcon from "../../assets/icons/IconSVG/SwitchToPhoto.svg";
import StartRecordingIcon from "../../assets/icons/IconSVG/StartRecording.svg";
import StopRecordingIcon from "../../assets/icons/IconSVG/StopRecording.svg";

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraRef, setCameraRef] = useState<CameraView | null>(null);
  const [facing, setFacing] = useState<"front" | "back">("back");
  const [cameraMode, setCameraMode] = useState<"video" | "picture">("picture");
  const [recording, setRecording] = useState(false);

  async function requestPermission() {
    try {
      const { status: cameraPermissionStatus } =
        await Camera.requestCameraPermissionsAsync();
      const { status: audioPermissionStatus } =
        await Camera.requestMicrophonePermissionsAsync();
      if (
        cameraPermissionStatus === "granted" &&
        audioPermissionStatus === "granted"
      ) {
        setHasPermission(true);
      } else if (
        cameraPermissionStatus === "denied" ||
        audioPermissionStatus === "denied"
      ) {
        Alert.alert(
          "Permission Denied",
          "You need to enable all features needed",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Open Settings",
              onPress: () => Linking.openSettings(),
            },
          ]
        );
      }
    } catch (error) {
      console.error("Error requesting camera permission:", error);
      setHasPermission(false);
    }
  }

  useEffect(() => {
    // console.log("Requesting permission...");
    requestPermission();
  }, []);

  if (!hasPermission)
    return (
      <Permission
        title="Need access to the camera"
        buttonText="Enable"
        onClick={() => requestPermission()}
        buttonStyle={styles.permissionButtonStyle}
        buttonTextStyle={styles.buttonText}
        titleStyle={styles.title}
        buttonColor={{ main: "#426570", onPress: "#536b73" }}
      />
    );

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        facing={facing}
        ref={(ref) => setCameraRef(ref)}
        mode={cameraMode}
      ></CameraView>

      <View style={styles.buttonsPanel}>
        {cameraMode === "picture" ? (
          <>
            <IconButton
              onClick={async () => {
                if (cameraRef) {
                  let photo = await cameraRef.takePictureAsync();
                  console.log(photo);
                }
              }}
              buttonStyle={styles.switchButtonStyle}
              icon={TakePictureIcon}
            />
            <IconButton
              onClick={() => {
                setFacing((previous) =>
                  previous === "back" ? "front" : "back"
                );
              }}
              buttonStyle={styles.switchButtonStyle}
              icon={SwitchIcon}
            />
          </>
        ) : (
          <>
            {recording ? (
              <IconButton
                onClick={async () => {
                  setRecording(false);
                  if (cameraRef) {
                    cameraRef.stopRecording();
                  }
                }}
                buttonStyle={styles.switchButtonStyle}
                icon={StopRecordingIcon}
              />
            ) : (
              <IconButton
                onClick={async () => {
                  setRecording(true);
                  if (cameraRef) {
                    let video = await cameraRef.recordAsync();
                    console.log("Video:", video);
                  }
                }}
                buttonStyle={styles.switchButtonStyle}
                icon={StartRecordingIcon}
              />
            )}
          </>
        )}

        {recording ? null : (
          <IconButton
            onClick={() => {
              setCameraMode((prev) =>
                prev === "picture" ? "video" : "picture"
              );
            }}
            buttonStyle={styles.switchButtonStyle}
            icon={cameraMode === "picture" ? VideoIcon : CameraIcon}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  permissionButtonStyle: {
    width: 240,
    height: 90,
    marginTop: 25,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 30,
    color: "#cccccc",
  },
  title: {
    fontSize: 45,
    color: "#cccccc",
    textAlign: "center",
  },
  buttonsPanel: {
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "black",
    flexDirection: "row",
    height: 60,
  },
  switchButtonStyle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
