// bug.js
import * as React from 'react';
import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [type, setType] = React.useState(Camera.Constants.Type.back);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />; 
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  //Here is the problematic code, accessing the camera before it's ready
  const takePicture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
      console.log(photo.uri);
    }
  };

  const cameraRef = React.useRef(null);

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
      </Camera>
      <Button title="Take Picture" onPress={takePicture} />
    </View>
  );
}
//bugSolution.js
import * as React from 'react';
import { Camera, useCameraDevices } from 'expo-camera';

export default function App() {
  const devices = useCameraDevices();
  const [hasPermission, setHasPermission] = React.useState(null);
  const [cameraType, setCameraType] = React.useState(devices?.back?.id ?? null);
  const [isCameraReady, setIsCameraReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCameraReady = () => {
    setIsCameraReady(true);
  };

  if (hasPermission === null) {
    return <View/>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (isCameraReady && cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
      console.log('Photo URI:', photo.uri);
    }
  };

  const cameraRef = React.useRef(null);

  return (
    <View style={{ flex: 1 }}>
      {cameraType && (
        <Camera
          style={{ flex: 1 }}
          type={cameraType}
          onCameraReady={handleCameraReady}
          ref={cameraRef}
        />
      )}
      <Button title="Take Picture" onPress={takePicture} disabled={!isCameraReady} />
    </View>
  );
}
