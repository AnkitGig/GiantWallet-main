import admin from "firebase-admin";

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert("service-account.json"),
});

// Function to send notification
export const sendNotification = async (fcmToken, title, body, data = {}) => {
  const message = {
    token: fcmToken,
    notification: {
      title,
      body,
    },
    data, // optional extra payload
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Notification sent:", response);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};
