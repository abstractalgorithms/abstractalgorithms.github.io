# Abstract Algorithms Android App

This is a React Native Android app that embeds the Abstract Algorithms blog website (https://abstractalgorithms.github.io) in a WebView wrapper.

## Features

- 📱 Native Android WebView wrapper
- 🔄 Offline caching support  
- 🎨 Optimized mobile interface
- ⚡ Fast loading and navigation
- 🔗 Deep linking support
- 🔙 Hardware back button support
- 📊 Mobile-optimized styling

## Building the App

### Prerequisites

- Node.js 16+
- Java Development Kit (JDK) 17
- Android SDK
- React Native CLI

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Build debug APK:
```bash
npm run build:android-debug
```

3. Build release APK:
```bash
npm run build:android
```

### Automated Build Process

The project includes a GitHub Actions workflow that automatically builds and releases Android APKs when changes are pushed to the main branch.

#### GitHub Actions Features:
- 🚀 Automatic APK generation on push to main
- 📦 Debug and release builds
- 🎯 Artifact uploads
- 📋 Automatic GitHub releases
- ⚡ Gradle caching for faster builds

#### Triggering Builds:

1. **Automatic**: Push changes to `main` branch or modify files in `android/` directory
2. **Manual**: Go to GitHub Actions → "Build Android APK" → "Run workflow"

#### Download APKs:

1. **From GitHub Actions**: Go to the workflow run and download artifacts
2. **From Releases**: Check the [Releases page](https://github.com/abstractalgorithms/abstractalgorithms.github.io/releases) for published APKs

## Installation

1. Download the APK from GitHub Releases or Actions artifacts
2. Enable "Install from unknown sources" in your Android device settings
3. Install the downloaded APK file
4. Launch "Abstract Algorithms" app

## Configuration

The app is configured to load `https://abstractalgorithms.github.io` by default. You can modify the URL in `App.tsx`:

```typescript
const WEBSITE_URL = 'https://abstractalgorithms.github.io';
```

## Project Structure

```
android/
├── App.tsx                 # Main React Native component with WebView
├── index.js               # Entry point
├── package.json           # Dependencies and scripts
├── metro.config.js        # Metro bundler configuration
├── babel.config.js        # Babel transpiler configuration
└── android/               # Native Android project
    ├── build.gradle       # Root build configuration
    ├── settings.gradle    # Project settings
    ├── gradle.properties  # Gradle properties
    ├── gradlew           # Gradle wrapper (Unix)
    ├── gradlew.bat       # Gradle wrapper (Windows)
    └── app/              # Android app module
        ├── build.gradle   # App build configuration
        ├── debug.keystore # Debug signing key
        └── src/main/      # App source code
            ├── AndroidManifest.xml
            ├── java/com/abstractalgorithms/app/
            │   ├── MainActivity.java
            │   └── MainApplication.java
            └── res/       # App resources
```

## Development Notes

- The app uses React Native 0.72.6
- WebView component from `react-native-webview`
- Splash screen support via `react-native-splash-screen`
- Orientation support via `react-native-orientation-locker`
- AsyncStorage for local data persistence

## Troubleshooting

### Build Issues

1. **Gradle Issues**: Clean build cache
```bash
cd android && ./gradlew clean
```

2. **Node Modules**: Reinstall dependencies
```bash
rm -rf node_modules && npm install
```

3. **Metro Cache**: Clear React Native cache
```bash
npx react-native start --reset-cache
```

### APK Installation Issues

1. Enable "Install from unknown sources" in Android settings
2. Make sure the APK is compatible with your device architecture
3. Check if you have enough storage space

## License

This project is part of the Abstract Algorithms blog and follows the same license terms.
