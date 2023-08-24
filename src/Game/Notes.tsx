import "./notes.css";

import { Button, Input, InputRef, List, Popover, Typography } from "antd";
import { Dispatch, useEffect, useRef, useState } from "react";
import { useBoolean } from "usehooks-ts";

import { useNotes } from "../hooks/useNotes";

type NoteProps = {
  index: number;
  value: string;
  deleteNote: Dispatch<number>;
};
const Note = ({ index, value, deleteNote }: NoteProps) => {
  return (
    <List.Item>
      <div>{value}</div>
      <Button
        size="small"
        // @ts-ignore - legacy antd type, missing from props
        type="danger"
        onClick={() => {
          deleteNote(index);
        }}
      >
        🗑️
      </Button>
    </List.Item>
  );
};

const Header = ({ addNote }: { addNote: Dispatch<string> }) => {
  const { value: open, toggle } = useBoolean(false);
  const [newNote, setNewNote] = useState("");
  const inputRef = useRef<InputRef>(null);
  useEffect(() => {
    setNewNote("");
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const onSubmit = () => {
    addNote(newNote);
    toggle();
  };
  const content = (
    <>
      <Input
        type="text"
        ref={inputRef}
        value={newNote}
        onChange={({ target: { value } }) => {
          setNewNote(value);
        }}
        onKeyUp={({ code }) => {
          if (code === "Enter") {
            onSubmit();
          }
        }}
      />
      <div>
        <Button type="primary" onClick={onSubmit}>
          Create Note
        </Button>
      </div>
    </>
  );
  return (
    <Popover
      open={open}
      content={content}
      placement="right"
      title="New Note"
      trigger="click"
    >
      <div className="notes-header">
        <Button onClick={toggle}>Add Note</Button>
      </div>
    </Popover>
  );
};

const Notes = () => {
  const { addNote, deleteNote, notes } = useNotes();
  return (
    <div className="notes-wrapper">
      <div className="notes-panel">
        <List
          header={<Header addNote={addNote} />}
          bordered
          locale={{ emptyText: "No notes" }}
          dataSource={notes}
          renderItem={(note, index) => (
            <Note deleteNote={deleteNote} value={note} index={index} />
          )}
        />
      </div>
    </div>
  );
};
export default Notes;
