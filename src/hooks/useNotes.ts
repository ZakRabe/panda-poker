import { onValue, ref, runTransaction } from "firebase/database";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import database from "../firebase";
import { Game } from "../types";

export const useNotes = () => {
  const { gameId } = useParams();
  const [notes, setNotes] = useState<string[]>([]);

  const notesRef = useMemo(
    () => ref(database, `notes/${gameId}/notes`),
    [gameId]
  );

  useEffect(() => {
    return onValue(notesRef, (snapshot) => {
      const newNotes: Game["notes"] = snapshot.val();

      setNotes(newNotes ?? []);
    });
  }, [notesRef]);

  const addNote = useCallback(
    (note: string) => {
      runTransaction(notesRef, (previousNotes: Game["notes"]) => {
        const newNotes = [...(previousNotes ?? []), note];
        return newNotes;
      });
    },
    [notesRef]
  );

  const deleteNote = useCallback(
    (index: number) => {
      runTransaction(notesRef, (previousNotes: Game["notes"]) => {
        const newNotes = previousNotes;
        newNotes.splice(index, 1);
        return newNotes;
      });
    },
    [notesRef]
  );

  return { notes, addNote, deleteNote };
};
