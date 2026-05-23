import { useState } from "react";

import type { Note } from "../context/Notes.context";

interface Props {
  note: Note | null;

  show: boolean;

  onClose: () => void;

  onPause: (id: string, paused_until: string) => Promise<void>;

  onResume: (id: string) => Promise<void>;

  onComplete: (id: string) => Promise<void>;

  onDelete: (id: string) => Promise<void>;

  onUpdate: (note: Note) => void;

  onStart: (id: string, expected_completion_date: string) => Promise<void>;
}

const NoteModal = ({
  note,
  show,
  onClose,
  onPause,
  onResume,
  onComplete,
  onDelete,
  onUpdate,
  onStart,
}: Props) => {
  const [selectedDate, setSelectedDate] = useState("");

  const [showStartDate, setShowStartDate] = useState(false);

  const [showPauseDate, setShowPauseDate] = useState(false);

  if (!show || !note) return null;

  const now = new Date();

  const isDelayed =
    note.expected_completion_date &&
    new Date(note.expected_completion_date) < now &&
    !note.completed_at;

  const status = note.completed_at
    ? "Completed"
    : note.is_paused
      ? "Paused"
      : isDelayed
        ? "Delayed"
        : note.started_at
          ? "In Progress"
          : "Pending";

  // START HANDLER
  const handleStartClick = async () => {
    if (!selectedDate) {
      alert("Please select expected completion date");

      return;
    }

    await onStart(note._id, selectedDate);
  };

  // PAUSE HANDLER
  const handlePauseClick = async () => {
    if (!selectedDate) {
      alert("Please select pause until date");

      return;
    }

    await onPause(note._id, selectedDate);
  };

  return (
    <div className="note-modal-overlay">
      <div className="note-modal-box">
        {/* CLOSE BTN */}
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        {/* HEADER */}
        <div className="modal-header-section">
          <h1>{note.title}</h1>

          <div
            className={`status-badge ${
              status === "Completed"
                ? "completed"
                : status === "Paused"
                  ? "paused"
                  : status === "Delayed"
                    ? "delayed"
                    : status === "In Progress"
                      ? "progress"
                      : "pending"
            }`}
          >
            {status}
          </div>
        </div>

        {/* SHORT DESC */}
        <div className="modal-section">
          <h4>Short Description:</h4>

          <p>{note.short_desc}</p>
        </div>

        {/* CONTENT */}
        <div className="modal-section">
          <h4>Content:</h4>

          <p>{note.content}</p>
        </div>

        {/* META */}
        <div className="meta-section">
          <p>
            <strong>Created:</strong>{" "}
            {new Date(note.createdAt).toLocaleString()}
          </p>

          {note.started_at ? (
            <p>
              <strong>Started:</strong>{" "}
              {new Date(note.started_at).toLocaleString()}
            </p>
          ) : null}

          {note.completed_at ? (
            <p>
              <strong>Completed:</strong>{" "}
              {new Date(note.completed_at).toLocaleString()}
            </p>
          ) : null}

          {note.expected_completion_date ? (
            <p>
              <strong>Expected:</strong>{" "}
              {new Date(note.expected_completion_date).toLocaleDateString()}
            </p>
          ) : (
            <p>
              <strong>Expected:</strong> Not Set
            </p>
          )}

          {note.paused_until ? (
            <p>
              <strong>Paused Until:</strong>{" "}
              {new Date(note.paused_until).toLocaleDateString()}
            </p>
          ) : null}
        </div>

        {/* DATE PICKER */}

        {/* ACTION BUTTONS */}
        <div className="action-buttons">
          {!note.completed_at && (
            <>
              {/* PENDING */}
              {!note.started_at ? (
                <>
                  {!showStartDate ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => setShowStartDate(true)}
                    >
                      Start
                    </button>
                  ) : (
                    <div className="date-action-box">
                      <input
                        type="date"
                        className="form-control"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />

                      <button
                        className="btn btn-primary"
                        onClick={handleStartClick}
                      >
                        Confirm Start
                      </button>
                    </div>
                  )}
                </>
              ) : note.is_paused ? (
                /* PAUSED */
                <button
                  className="btn btn-info"
                  onClick={() => onResume(note._id)}
                >
                  Resume
                </button>
              ) : (
                /* IN PROGRESS */
                <>
                  {!showPauseDate ? (
                    <button
                      className="btn btn-warning"
                      onClick={() => setShowPauseDate(true)}
                    >
                      Pause
                    </button>
                  ) : (
                    <div className="date-action-box">
                      <input
                        type="date"
                        className="form-control"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />

                      <button
                        className="btn btn-warning"
                        onClick={handlePauseClick}
                      >
                        Confirm Pause
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* COMPLETE */}
              <button
                className="btn btn-success"
                onClick={() => onComplete(note._id)}
              >
                Complete
              </button>
            </>
          )}

          {/* DELETE */}
          <button className="btn btn-danger" onClick={() => onDelete(note._id)}>
            Delete
          </button>

          {/* UPDATE */}
          <button className="btn btn-dark" onClick={() => onUpdate(note)}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
