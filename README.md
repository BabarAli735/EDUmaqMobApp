# Debug APK
## _What can I use it for?_

A debug .apk file will allow you to install and test your app before publishing to app stores. Mind you, this is not yet ready for publishing, and there are quite a few things you’ll need to do to before you can publish. Nevertheless, it’ll be useful for initial distribution and testing.
You’ll need to enable debugging options on your phone to run this apk.

## _Prerequisite:_

- react-native version > 0.58

## _How to generate one in 3 steps?_
>Step 1: Go to the root of the project in the terminal and run the below command:

```sh
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```

>Step 2: Go to android directory:

```sh
cd android
```

>Step 3: Now in this android folder, run this command

```sh
./gradlew assembleDebug
```

There! you’ll find the apk file in the following path:

```sh
yourProject/android/app/build/outputs/apk/debug/app-debug.apk
```


# Release APK

>Step 1. Generate a keystore

You will need a Java generated signing key which is a keystore file used to generate a React Native executable binary for Android. You can create one using the keytool in the terminal with the following command.

```sh
keytool -genkey -v -keystore your_key_name.keystore -alias your_key_alias -keyalg RSA -keysize 2048 -validity 10000
```

Once you run the keytool utility, you’ll be prompted to type in a password. *Make sure you remember the password.

You can change your_key_name with any name you want, as well as your_key_alias. This key uses key-size 2048, instead of default 1024 for security reason.

>Step 2. Adding Keystore to your project

Firstly, you need to copy the file your_key_name.keystore and paste it under the android/app directory in your React Native project folder.

On Terminal:

```sh
mv my-release-key.keystore /android/app
```

You need to open your android\app\build.gradle file and add the keystore configuration. There are two ways of configuring the project with keystore. First, the common and unsecured way:

```sh
android {
....
  signingConfigs {
    release {
      storeFile file('your_key_name.keystore')
      storePassword 'your_key_store_password'
      keyAlias 'your_key_alias'
      keyPassword 'your_key_file_alias_password'
    }
  }
  buildTypes {
    release {
      ....
      signingConfig signingConfigs.release
    }
  }
}
```

This is not a good security practice since you store the password in plain text. Instead of storing your keystore password in .gradle file, you can stipulate the build process to prompt you for these passwords if you are building from the command line.

To prompt for password with the Gradle build file, change the above config as:

```sh
signingConfigs {
  release {
    storeFile file('your_key_name.keystore')
    storePassword System.console().readLine("\nKeystore password:")
    keyAlias System.console().readLine("\nAlias: ")
    keyPassword System.console().readLine("\Alias password: ")
   }
}
```

```sh
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle 
--assets-dest android/app/src/main/res/
```

>Step 3. Release APK Generation

Place your terminal directory to android using:

```sh
cd android
```

For Windows,

```sh
gradlew assembleRelease
```

For Linux and Mac OSX:

```sh
./gradlew assembleRelease
```

As a result, the APK creation process is done. You can find the generated APK at android/app/build/outputs/apk/app-release.apk. This is the actual app, which you can send to your phone or upload to the Google Play Store. Congratulations, you’ve just generated a React Native Release Build APK for Android.