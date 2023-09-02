import "./notes.css";

import { Button, Input, InputRef, List, Popover } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { useBoolean } from "usehooks-ts";

import { useNotes, UseNotesReturn } from "../../../hooks/useNotes";

type NoteProps = Pick<UseNotesReturn, "deleteNote"> & {
  index: number;
  value: string;
};

const urlPattern =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

type ExtractHyperlinkProps = { value: string };
const ExtractHyperlink = ({ value }: ExtractHyperlinkProps) => {
  const parsed = value.split(" ").map((word) => {
    if (!urlPattern.test(word)) {
      return <>{word} </>;
    }
    return (
      <>
        <a target="_blank" rel="noreferrer" href={word}>
          {word}
        </a>{" "}
      </>
    );
  });

  return <>{parsed}</>;
};

const Note = ({ index, value, deleteNote }: NoteProps) => {
  return (
    <List.Item>
      <div>
        <ExtractHyperlink value={value} />
      </div>
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

type HeaderProps = Pick<UseNotesReturn, "addNote">;
const Header = ({ addNote }: HeaderProps) => {
  const { value: open, toggle } = useBoolean(false);
  const [newNote, setNewNote] = useState("");
  const inputRef = useRef<InputRef>(null);
  const popoverRef = useRef(null);

  useEffect(() => {
    if (!popoverRef.current || !open) {
      return;
    }

    const onClickAway = ({ target }: MouseEvent) => {
      // @ts-ignore
      const popoverContent = popoverRef.current.popupRef.current.getElement();
      if (target !== popoverContent) {
        toggle();
      }
    };
    window.addEventListener("click", onClickAway);
    return () => {
      window.removeEventListener("click", onClickAway);
    };
  }, [open, toggle]);

  useEffect(() => {
    setNewNote("");
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  const onSubmit = useCallback(() => {
    if (!newNote) {
      return;
    }
    addNote(newNote);
    toggle();
  }, [addNote, newNote, toggle]);

  useEffect(() => {
    const onKeyUp = ({ code }: KeyboardEvent) => {
      switch (code) {
        case "Enter":
        case "NumpadEnter":
          onSubmit();
          break;
        case "Escape":
          toggle();
          break;
      }
    };
    if (open) {
      window.addEventListener("keyup", onKeyUp);
    }

    return () => {
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [onSubmit, open, toggle]);

  const content = (
    <>
      <Input
        type="text"
        className="notes-input"
        ref={inputRef}
        value={newNote}
        onChange={({ target: { value } }) => {
          setNewNote(value);
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
      ref={popoverRef}
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
            <Note
              key={index}
              deleteNote={deleteNote}
              value={note}
              index={index}
            />
          )}
        />
      </div>
    </div>
  );
};
export default Notes;
