import { useEffect } from "react";

import { useParams } from "react-router-dom";

import AllNotes from "../components/AllNotes";

import { useNotes } from "../context/Notes.context";

const AllNotesPage = () => {
  const { status } = useParams();

  const {
    getNotesByStatus,
    fetchallNotes,
  } = useNotes();

  useEffect(() => {
    const loadNotes = async () => {
      // ALL NOTES
      if (!status || status === "all") {
        await fetchallNotes();
      }

      // FILTERED NOTES
      else {
        await getNotesByStatus(status);
      }
    };

    loadNotes();
  }, [status]);

  return (
    <div className="container py-5">
      <AllNotes />
    </div>
  );
};

export default AllNotesPage;