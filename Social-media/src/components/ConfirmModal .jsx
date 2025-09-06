import React from "react";

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="rounded-2xl fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl w-full max-w-md text-white">
        <h2 className="text-lg font-semibold mb-3">{title}</h2>
        <p className="mb-6 text-sm text-white/70">{message}</p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="cursor-pointer px-4 py-2 rounded-lg bg-gray-500/20 hover:bg-gray-500/30 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="cursor-pointer px-4 py-2 rounded-lg bg-red-500/20 border border-red-400/30 text-red-300 hover:bg-red-500/30 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
