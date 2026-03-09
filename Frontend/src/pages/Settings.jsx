import React, { useState } from "react";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    notifications: true,
  });

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    setPreferences({
      ...preferences,
      [name]: checked,
    });
  };

  const handleSave = () => {
    console.log("Profile:", profile);
    console.log("Preferences:", preferences);
    alert("Settings saved (demo)");
  };

  return (
    <div>
      <h2 className="mb-4">Settings</h2>

      {/* Profile Settings */}

      <div className="card shadow-sm p-4 mb-4">
        <h5 className="mb-3">Profile</h5>

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={profile.email}
            onChange={handleProfileChange}
            placeholder="Enter your email"
          />
        </div>
      </div>

      {/* App Preferences */}

      <div className="card shadow-sm p-4 mb-4">
        <h5 className="mb-3">App Preferences</h5>

        <div className="form-check form-switch mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            name="darkMode"
            checked={preferences.darkMode}
            onChange={handlePreferenceChange}
          />
          <label className="form-check-label">Enable Dark Mode</label>
        </div>

        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            name="notifications"
            checked={preferences.notifications}
            onChange={handlePreferenceChange}
          />
          <label className="form-check-label">
            Enable Email Notifications
          </label>
        </div>
      </div>

      {/* Security */}

      <div className="card shadow-sm p-4 mb-4">
        <h5 className="mb-3">Security</h5>

        <button className="btn btn-outline-primary me-2">
          Change Password
        </button>

        <button className="btn btn-outline-danger">
          Delete Account
        </button>
      </div>

      {/* Save Button */}

      <button className="btn btn-primary" onClick={handleSave}>
        Save Settings
      </button>
    </div>
  );
};

export default Settings;