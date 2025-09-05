import { useState } from "react";

export default function Profile({ user, updateProfile, closeModal }) {
    const [form, setForm] = useState({
      name: user.name || "",
      bio: user.bio || "",
      avatar: user.avatar || "",
    });
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSave = () => {
      updateProfile(form);
      closeModal(); 
    };
  
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-full max-w-md shadow-xl">
          <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
  
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white/70">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white/20 text-white border border-white/30 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
  
            <div>
              <label className="block text-sm text-white/70">Bio</label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 rounded-lg bg-white/20 text-white border border-white/30 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
  
            {/* <div>
              <label className="block text-sm text-white/70">Avatar URL</label>
              <input
                type="text"
                name="avatar"
                value={form.avatar}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-white/20 text-white border border-white/30 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div> */}
          </div>
  
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={closeModal}
              className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-all"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
  