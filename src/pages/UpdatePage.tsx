import React, { useEffect, useState } from "react";
import { useNotes, type Note } from "../context/Notes.context";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePage = () => {
  const navigate = useNavigate();

  const { getNoteById, note, updateNote } = useNotes();

  const [loading, setLoading] = useState(true);

  const params = useParams<{ id: string }>();

  useEffect(() => {
    if (params.id) {
      try {
        getNoteById(params.id);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  const [state, setState] = useState<Note>({
    _id: "",
    title: "",
    short_desc: "",
    content: "",
    is_published: false,
    createdAt: "",
  });

  useEffect(() => {
    if (note) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState(note);
    }
  }, [note]);

  const onchangeHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const UpdateNoteFn = async (
    e: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    try {
      if (
        !params.id ||
        !state.title ||
        !state.short_desc ||
        !state.content
      ) {
        alert("Please fill all the fields");
        return;
      }

      await updateNote(
        params.id,
        state.title,
        state.short_desc,
        state.content,
      );

      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unknown error");
      }
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <>
      <div className="container py-5">

        {/* Back Button */}
        <button
          className="btn btn-dark mb-4"
          onClick={() => navigate("/")}
        >
          ← Back
        </button>

        {/* Update Form Card */}
        <div className="notes-form-wrapper">

          <div className="mb-4">
            <h1 className="fw-bold">
              Update Note
            </h1>

            <p className="text-muted mb-0">
              Edit your existing note details
            </p>
          </div>

          <form
            onSubmit={UpdateNoteFn}
            className="notes-form"
          >

            {/* Title */}
            <div className="mb-4">
              <label
                htmlFor="title"
                className="form-label fw-semibold"
              >
                Title
              </label>

              <input
                onChange={onchangeHandler}
                value={state.title}
                type="text"
                className="form-control custom-input"
                name="title"
                placeholder="Enter note title..."
              />
            </div>

            {/* Short Description */}
            <div className="mb-4">
              <label
                htmlFor="short_desc"
                className="form-label fw-semibold"
              >
                Short Description
              </label>

              <textarea
                onChange={onchangeHandler}
                value={state.short_desc}
                className="form-control custom-input"
                name="short_desc"
                rows={4}
                placeholder="Write a short description..."
              ></textarea>
            </div>

            {/* Content */}
            <div className="mb-4">
              <label
                htmlFor="content"
                className="form-label fw-semibold"
              >
                Content
              </label>

              <textarea
                onChange={onchangeHandler}
                value={state.content}
                className="form-control custom-input"
                name="content"
                rows={7}
                placeholder="Write your note content..."
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-end gap-3">

              <button
                type="button"
                className="btn btn-outline-dark px-4"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary px-4"
              >
                Update Note
              </button>

            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePage;