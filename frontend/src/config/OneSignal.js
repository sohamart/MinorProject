import OneSignal from "react-onesignal";

const initOneSignal = async () => {

  await OneSignal.init({

    appId: "YOUR_ONESIGNAL_APP_ID",

    allowLocalhostAsSecureOrigin: true,

  });

  // 🔥 Auto Permission Popup

  await OneSignal.Notifications.requestPermission(true);

};

export default initOneSignal;