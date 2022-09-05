import {
  DeleteOutline,
  SaveOutlined,
  UploadFile,
  UploadFileOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { setActiveNote } from "../../store/journal/journalSlice";
import {
  startDeletingNote,
  startSaveNote,
  startUploadingFiles,
} from "../../store/journal/thunks";
import { ImageGallery } from "../components/ImageGallery";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { useRef } from "react";

export const NoteView = () => {
  const {
    active: note,
    isSaving,
    messageSaved,
  } = useSelector((state) => state.journal);
  const dispatch = useDispatch();
  const { title, body, date, onInputChange, formState } = useForm(note);
  const uploadInputRef = useRef();

  const dateString = useMemo(() => {
    const newDate = new Date(date).toUTCString();
    return newDate;
  }, [date]);
  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);
  useEffect(() => {
    if (messageSaved !== "") {
      Swal.fire("Updated note", messageSaved, "success");
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };
  const onFileInputChange = ({ target }) => {
    dispatch(startUploadingFiles(target.files));
  };
  const onUploadFile = () => {
    uploadInputRef.current.click();
  };
  const onDelete = () => {
    dispatch(startDeletingNote());
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input
          type="file"
          multiple
          disabled={isSaving}
          onChange={onFileInputChange}
          ref={uploadInputRef}
          style={{ display: "none" }}
        />
        <IconButton color="primary" onClick={onUploadFile} disabled={isSaving}>
          <UploadOutlined />
        </IconButton>
        <Button
          disabled={isSaving}
          color="primary"
          sx={{ padding: 2 }}
          onClick={onSaveNote}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Enter title"
          label="Title"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="what happened to you today?"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <Grid container justifyContent="end">
        <Button onClick={onDelete} sx={{ mt: 2 }} color="error">
          <DeleteOutline />
          Delete
        </Button>
      </Grid>

      <ImageGallery />
    </Grid>
  );
};
