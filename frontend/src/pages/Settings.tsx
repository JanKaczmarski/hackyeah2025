import { useState, FormEvent } from "react";
import { useAuthStore } from "../stores/authStore";
import { useCurrentUser, useUpdateUser } from "../hooks/queries/useUser";

export function Settings() {
  const { user } = useAuthStore();
  const { data: userData } = useCurrentUser();
  const updateUser = useUpdateUser();

  // Profile form state
  const [name, setName] = useState(user?.name || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");

  // Password form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI state
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleProfileSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setProfileError("");
    setProfileMessage("");

    try {
      await updateUser.mutateAsync({ name, avatar });
      setProfileMessage("Profile updated successfully!");
      setTimeout(() => setProfileMessage(""), 3000);
    } catch (err) {
      setProfileError("Failed to update profile. Please try again.");
    }
  };

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordMessage("");

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    try {
      // TODO: Implement password change API call
      // await api.patch("/user/password", { currentPassword, newPassword });
      setPasswordMessage("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordMessage(""), 3000);
    } catch (err) {
      setPasswordError("Failed to change password. Please check your current password.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 pt-20 pb-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">
          Account Settings
        </h1>

        {/* Profile Settings */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Profile Information
          </h2>

          {profileMessage && (
            <div className="bg-success-50 border border-success-200 text-success-700 px-4 py-3 rounded-lg mb-4">
              {profileMessage}
            </div>
          )}

          {profileError && (
            <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg mb-4">
              {profileError}
            </div>
          )}

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={user?.email || ""}
                disabled
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-neutral-100 text-neutral-500 cursor-not-allowed"
              />
              <p className="text-xs text-neutral-500 mt-1">
                Email cannot be changed
              </p>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Avatar URL
              </label>
              <input
                type="url"
                id="avatar"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            <button
              type="submit"
              disabled={updateUser.isPending}
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 active:bg-primary-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updateUser.isPending ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>

        {/* Password Settings */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">
            Change Password
          </h2>

          {passwordMessage && (
            <div className="bg-success-50 border border-success-200 text-success-700 px-4 py-3 rounded-lg mb-4">
              {passwordMessage}
            </div>
          )}

          {passwordError && (
            <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg mb-4">
              {passwordError}
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
              <p className="text-xs text-neutral-500 mt-1">
                Must be at least 8 characters long
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 active:bg-primary-800 transition-colors"
            >
              Change Password
            </button>
          </form>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-6 border border-error-200">
          <h2 className="text-xl font-semibold text-error-700 mb-4">
            Danger Zone
          </h2>
          <p className="text-neutral-600 mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button className="bg-error-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-error-700 active:bg-error-800 transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
