import ReactNativeBlobUtil from 'react-native-blob-util';

const DownloadAndInstall = async(link) => {
  const android = ReactNativeBlobUtil.android;
  console.log('update')
  await ReactNativeBlobUtil.config({
    addAndroidDownloads: {
      useDownloadManager: true,
      title: 'Moment.apk',
      description: 'An APK that will be installed',
      mime: 'application/vnd.android.package-archive',
      mediaScannable: true,
      notification: true,
      path: ReactNativeBlobUtil.fs.dirs.DownloadDir + "/Moment.apk"
    },
  })
    .fetch('GET', link)
    .then(res => {
      android.actionViewIntent(
        res.path(),
        'application/vnd.android.package-archive',
      );
    }).catch(err => console.log('err: ', err.message));
};

export default DownloadAndInstall

// https://drive.google.com/uc?export=download&id=1d1Bex1UJ0HT1r9PWX02uqx81jy528g_p
// https://disk.yandex.ru/d/7Ph-vdMSG7yQ3w