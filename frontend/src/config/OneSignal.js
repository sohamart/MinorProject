import OneSignal from "react-onesignal";

const initOneSignal = async () => {

  // 🔥 localhost এ run করবে না

  if (
    window.location.hostname === "localhost"
  ) {
    return;
  }

  await OneSignal.init({

    appId: "YOUR_APP_ID",

    allowLocalhostAsSecureOrigin: true,

  });

  await OneSignal.Notifications
    .requestPermission(true);

};

export default initOneSignal;