import React, {useEffect, useRef, useState} from 'react';
import {
  StatusBar,
  View,
  BackHandler,
  Alert,
  Linking,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {WebView} from 'react-native-webview';
import SplashScreen from 'react-native-splash-screen';

const WEBSITE_URL = 'https://abstractalgorithms.github.io';

const App = () => {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(WEBSITE_URL);

  useEffect(() => {
    // Hide splash screen after component mounts
    SplashScreen.hide();

    // Handle hardware back button
    const backAction = () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      } else {
        Alert.alert('Hold on!', 'Are you sure you want to go back?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [canGoBack]);

  const handleNavigationStateChange = (navState) => {
    setCanGoBack(navState.canGoBack);
    setCurrentUrl(navState.url);
  };

  const handleShouldStartLoadWithRequest = (request) => {
    // Allow navigation within the same domain
    if (request.url.startsWith(WEBSITE_URL)) {
      return true;
    }

    // Open external links in default browser
    Linking.openURL(request.url);
    return false;
  };

  const injectedJavaScript = `
    // Hide address bar and make it more app-like
    document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    
    // Add some mobile-specific styling
    const style = document.createElement('style');
    style.innerHTML = \`
      body {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
      }
      
      /* Improve mobile experience */
      .prose {
        font-size: 16px !important;
        line-height: 1.6 !important;
      }
      
      /* Better touch targets */
      a, button {
        min-height: 44px;
        display: flex;
        align-items: center;
      }
    \`;
    document.head.appendChild(style);
    
    true;
  `;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <WebView
        ref={webViewRef}
        source={{uri: WEBSITE_URL}}
        style={styles.webview}
        onNavigationStateChange={handleNavigationStateChange}
        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
        injectedJavaScript={injectedJavaScript}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        scalesPageToFit={true}
        startInLoadingState={true}
        allowsBackForwardNavigationGestures={true}
        pullToRefreshEnabled={true}
        bounces={false}
        scrollEnabled={true}
        userAgent="AbstractAlgorithms-Android-App/1.0"
        // Performance optimizations
        androidHardwareAccelerationDisabled={false}
        mixedContentMode="compatibility"
        thirdPartyCookiesEnabled={true}
        // Security
        allowFileAccess={false}
        allowUniversalAccessFromFileURLs={false}
        allowFileAccessFromFileURLs={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  webview: {
    flex: 1,
  },
});

export default App;
