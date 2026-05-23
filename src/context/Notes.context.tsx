import React, { createContext, useContext, useState } from "react";

import { AxiosProvider } from "../Constant";

export interface Note {
  _id: string;

  title: string;

  short_desc: string;

  content: string;

  is_published: boolean;

  started_at?: string;

  completed_at?: string;

  expected_completion_date?: string;

  paused_until?: string;

  is_paused?: boolean;

  createdAt: string;
}

interface Notes {
  createNote: (
    title: string,
    short_desc: string,
    content: string,
  ) => Promise<void>;

  deleteNote: (id: string) => Promise<void>;

  getNoteById: (id: string) => Promise<void>;

  updateNote: (
    id: string,
    title: string,
    short_desc: string,
    content: string,
  ) => Promise<void>;

  fetchallNotes: () => Promise<void>;

  getNotesByStatus: (status: string) => Promise<void>;

  startProcess: (id: string, expected_completion_date: string) => Promise<void>;

  pauseProcess: (id: string, paused_until: string) => Promise<void>;

  resumeProcess: (id: string) => Promise<void>;

  completeProcess: (id: string) => Promise<void>;

  notes: Note[];

  note: Note | null;
}

const NotesContext = createContext<Notes>({
  createNote: async () => {},

  deleteNote: async () => {},

  getNoteById: async () => {},

  updateNote: async () => {},

  fetchallNotes: async () => {},

  getNotesByStatus: async () => {},

  startProcess: async () => {},

  pauseProcess: async () => {},

  resumeProcess: async () => {},

  completeProcess: async () => {},

  notes: [],

  note: null,
});

// eslint-disable-next-line react-refresh/only-export-components
export const useNotes = () => {
  return useContext(NotesContext);
};

const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const [note, setNote] = useState<Note | null>(null);

  // GET SINGLE NOTE
  const getNoteById = async (id: string) => {
    try {
      const { data } = await AxiosProvider.get(`/notes/get/${id}`);

      setNote(data);
    } catch (error) {
      console.error(error);
    }
  };

  // GET ALL NOTES
  const fetchallNotes = async () => {
    try {
      const res = await AxiosProvider.get("/notes/get-all");

      setNotes(res.data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  // GET NOTES BY STATUS
  const getNotesByStatus = async (status: string) => {
    try {
      const res = await AxiosProvider.get(`/notes/status/${status}`);

      setNotes(res.data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  // CREATE NOTE
  const createNote = async (
    title: string,
    short_desc: string,
    content: string,
  ) => {
    try {
      await AxiosProvider.post("/notes/create", {
        title,
        short_desc,
        content,
      });

    } catch (error) {
      console.error(error);
    }
  };

  // DELETE NOTE
  const deleteNote = async (id: string) => {
    try {
      await AxiosProvider.post(`/notes/delete/${id}`);

    } catch (error) {
      console.error(error);
    }
  };

  // UPDATE NOTE
  const updateNote = async (
    id: string,
    title: string,
    short_desc: string,
    content: string,
  ) => {
    try {
      await AxiosProvider.patch(`/notes/update/${id}`, {
        title,
        short_desc,
        content,
      });

    } catch (error) {
      console.error(error);
    }
  };

  // START PROCESS
  const startProcess = async (id: string, expected_completion_date: string) => {
    try {
      await AxiosProvider.patch(`/notes/start/${id}`, {
        expected_completion_date,
      });

    } catch (error) {
      console.error(error);
    }
  };

  // PAUSE PROCESS
  const pauseProcess = async (id: string, paused_until: string) => {
    try {
      await AxiosProvider.patch(`/notes/pause/${id}`, {
        paused_until,
      });

    } catch (error) {
      console.error(error);
    }
  };

  // RESUME PROCESS
  const resumeProcess = async (id: string) => {
    try {
      await AxiosProvider.patch(`/notes/resume/${id}`);

    } catch (error) {
      console.error(error);
    }
  };

  // COMPLETE PROCESS
  const completeProcess = async (id: string) => {
    try {
      await AxiosProvider.patch(`/notes/complete/${id}`);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NotesContext.Provider
      value={{
        createNote,

        deleteNote,

        getNoteById,

        updateNote,

        fetchallNotes,

        getNotesByStatus,

        startProcess,

        pauseProcess,

        resumeProcess,

        completeProcess,

        notes,

        note,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;
