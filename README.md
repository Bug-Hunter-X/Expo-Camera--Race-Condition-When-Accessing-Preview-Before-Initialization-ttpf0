# Expo Camera Race Condition Bug

This repository demonstrates a race condition bug that can occur when using the Expo Camera API. The bug arises when attempting to access the camera preview before the Camera component has fully initialized. This can lead to unexpected crashes or silent failures, making it difficult to diagnose.

## Bug Description

The core problem is a race condition where the app attempts to access camera properties or start using the preview before the Expo Camera component is ready. This results in undefined behavior and unpredictable results.

## How to Reproduce

1. Clone this repository.
2. Run `npm install`.
3. Run the app using `expo start`.
4. Observe the error (or lack thereof, if the bug is not triggered consistently).

## Solution

The provided solution ensures that the camera preview is accessed only after it's fully initialized by using the `onCameraReady` callback of the Expo Camera component.