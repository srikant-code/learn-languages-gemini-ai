import { useEffect, useState } from "react";

function Settings() {
  const [settings, setSettings] = useState({});
  const [lastSynced, setLastSynced] = useState(null);

  // Load settings from local storage when component mounts
  useEffect(() => {
    const storedSettings = localStorage.getItem("userSettings");
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }
    const storedSyncTime = localStorage.getItem("lastSynced");
    if (storedSyncTime) {
      setLastSynced(new Date(storedSyncTime));
    }
  }, []);

  // Save settings to local storage and Firebase
  const saveSettings = async (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem("userSettings", JSON.stringify(newSettings));
    const now = new Date();
    setLastSynced(now);
    localStorage.setItem("lastSynced", now.toString());

    // Save settings to Firebase
    const user = firebase.auth().currentUser;
    if (user) {
      await db.collection("settings").doc(user.uid).set(newSettings);
    }
  };

  // Sync settings from Firebase
  const syncSettings = async () => {
    const user = firebase.auth().currentUser;
    if (user) {
      const doc = await db.collection("settings").doc(user.uid).get();
      if (doc.exists) {
        const newSettings = doc.data();
        saveSettings(newSettings);
      }
    }
  };

  return (
    <div>
      <button onClick={syncSettings}>Sync Settings</button>
      {lastSynced && <p>Last synced on: {lastSynced.toString()}</p>}
      {/* Display settings */}
      <pre>{JSON.stringify(settings, null, 2)}</pre>
    </div>
  );
}

export default Settings;
