import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useNotes } from "../context/Notes.context";
import { useAuth } from "../context/Auth.context";

import NoteModal from "./NoteModal";

import type { Note } from "../context/Notes.context";

const AllNotes = () => {
  const {
    notes,
    startProcess,
    pauseProcess,
    resumeProcess,
    completeProcess,
    deleteNote,
  } = useNotes();

  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const navigate = useNavigate();

  const [selectedNote, setSelectedNote] =
    useState<Note | null>(null);

  const [showModal, setShowModal] =
    useState<boolean>(false);

  const openModal = (note: Note) => {
    setSelectedNote(note);

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);

    setSelectedNote(null);
  };

  // START NOTE
  const handleStart = async (
    id: string,
    expected_completion_date: string,
  ) => {
    if (!expected_completion_date) {
      alert(
        "Please select expected completion date",
      );

      return;
    }

    await startProcess(
      id,
      expected_completion_date,
    );

    closeModal();
  };

  // PAUSE NOTE
  const handlePause = async (
    id: string,
    paused_until: string,
  ) => {
    if (!paused_until) {
      alert(
        "Please select pause end date",
      );

      return;
    }

    await pauseProcess(id, paused_until);

    closeModal();
  };

  // RESUME NOTE
  const handleResume = async (
    id: string,
  ) => {
    await resumeProcess(id);

    closeModal();
  };

  // COMPLETE NOTE
  const handleComplete = async (
    id: string,
  ) => {
    await completeProcess(id);

    closeModal();
  };

  // DELETE NOTE
  const handleDelete = async (
    id: string,
  ) => {
    await deleteNote(id);

    closeModal();
  };

  // UPDATE NOTE
  const handleUpdate = (note: Note) => {
    closeModal();

    navigate(`/update/${note._id}`);
  };

  return (
    <>
      <div className="row g-4">
        {notes.map((note) => {
          const now = new Date();

          const isDelayed =
            note.expected_completion_date &&
            new Date(
              note.expected_completion_date,
            ) < now &&
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

          return (
            <div
              className="col-md-6 col-lg-5"
              key={note._id}
            >
              <div
                className="modern-note-card"
                onClick={() =>
                  openModal(note)
                }
              >
                <div className="card-top">
                  <h2>{note.title}</h2>

                  <div
                    className={`note-pill ${
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

                <p className="note-short-desc">
                  {note.short_desc}
                </p>

                <p className="note-content">
                  {note.content}
                </p>

                <div className="note-footer">
                  {isAdmin && note.user_id && (
                    <div className="note-owner-tag">
                      👤 {note.user_id.slice(-6)}
                    </div>
                  )}
                  {note.expected_completion_date && (
                    <div className="note-date">
                      Expected:{" "}
                      {new Date(
                        note.expected_completion_date,
                      ).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <NoteModal
        note={selectedNote}
        show={showModal}
        onClose={closeModal}
        onStart={handleStart}
        onPause={handlePause}
        onResume={handleResume}
        onComplete={handleComplete}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </>
  );
};

export default AllNotes;