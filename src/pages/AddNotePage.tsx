import React from "react";
import { useNotes } from "../context/Notes.context";

const AddNotes = () => {
  const [state, setState] = React.useState({
    title: "",
    short_desc: "",
    content: "",
  });

  const onchangeHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const { createNote } = useNotes();

  const AddNoteFn = async (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      if (
        !state.title ||
        !state.short_desc ||
        !state.content
      ) {
        alert("Please fill all the fields");
        return;
      }

      await createNote(
        state.title,
        state.short_desc,
        state.content
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unknown error");
      }
    } finally {
      setState({
        title: "",
        short_desc: "",
        content: "",
      });
    }
  };

  return (
    <div className="container py-5">
      {/* Heading */}
      <div className="mb-4">
        <h1 className="fw-bold">
          Add Notes
        </h1>

        <p className="text-muted mb-0">
          Create and manage your notes easily.
        </p>
      </div>

      {/* Form Card */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-4 p-md-5">

          <form
            onSubmit={AddNoteFn}
            className="mx-auto"
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
                className="form-control"
                name="title"
                placeholder="Enter note title"
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
                className="form-control"
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
                className="form-control"
                name="content"
                rows={6}
                placeholder="Write your note content..."
              ></textarea>
            </div>

            {/* Button */}
            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className="btn btn-primary px-4 py-2"
              >
                Create Note
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNotes;