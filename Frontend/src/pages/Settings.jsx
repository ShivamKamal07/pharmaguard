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
    <div className="pg-page">
      <div className="pg-page-header">
        <div>
          <span className="pg-eyebrow">Account</span>
          <h2>Settings</h2>
        </div>
      </div>

      {/* Profile Settings */}

      <div className="pg-card pg-card-pad mb-4">
        <h5 style={{ marginBottom: 18 }}>Profile</h5>

        <div className="pg-field">
          <label className="pg-label">Name</label>
          <input
            type="text"
            className="pg-input"
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
            placeholder="Enter your name"
          />
        </div>

        <div className="pg-field" style={{ marginBottom: 0 }}>
          <label className="pg-label">Email</label>
          <input
            type="email"
            className="pg-input"
            name="email"
            value={profile.email}
            onChange={handleProfileChange}
            placeholder="Enter your email"
          />
        </div>
      </div>

      {/* App Preferences */}

      <div className="pg-card pg-card-pad mb-4">
        <h5 style={{ marginBottom: 18 }}>App Preferences</h5>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <span style={{ fontSize: "0.88rem" }}>Enable Dark Mode</span>
          <label className="pg-switch">
            <input
              type="checkbox"
              name="darkMode"
              checked={preferences.darkMode}
              onChange={handlePreferenceChange}
            />
            <span className="pg-switch-track" />
          </label>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "0.88rem" }}>Enable Email Notifications</span>
          <label className="pg-switch">
            <input
              type="checkbox"
              name="notifications"
              checked={preferences.notifications}
              onChange={handlePreferenceChange}
            />
            <span className="pg-switch-track" />
          </label>
        </div>
      </div>

      {/* Security */}

      <div className="pg-card pg-card-pad mb-4">
        <h5 style={{ marginBottom: 18 }}>Security</h5>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="pg-btn pg-btn-outline">
            Change Password
          </button>

          <button className="pg-btn pg-btn-danger-outline">
            Delete Account
          </button>
        </div>
      </div>

      {/* Save Button */}

      <button className="pg-btn pg-btn-primary" onClick={handleSave}>
        Save Settings
      </button>
    </div>
  );
};

export default Settings;
