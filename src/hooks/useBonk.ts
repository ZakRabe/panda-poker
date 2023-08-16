import { onValue, ref, runTransaction } from "firebase/database";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { bonkSound } from "../bonk";
import database from "../firebase";
import { Game } from "../types";
import UserContext from "../UserContext";

export type BonkProps = {
  isBonking: boolean;
  setBonking: Dispatch<SetStateAction<boolean>>;
  bonkPlayer: Dispatch<string>;
};

export const useBonk = (game: Game) => {
  const [isBonking, setBonking] = useState(false);
  const { id: userId } = useContext(UserContext);

  const [activeBonks, setBonks] = useState<Game["bonks"]>({});
  const bonksRef = useMemo(
    () => ref(database, `games/${game.id}/bonks`),
    [game.id]
  );

  useEffect(() => {
    return onValue(bonksRef, (snapshot) => {
      const newBonks: Game["bonks"] = snapshot.val();

      setBonks(newBonks ?? {});
    });
  }, [bonksRef]);

  // watch game.bonks for my user ID
  useEffect(() => {
    const bonkedPlayers = activeBonks ? Object.keys(activeBonks) : [];
    // when we find it play BONK
    if (bonkedPlayers.includes(userId)) {
      console.log("U GOT BONKD");
      bonkSound.play();
      runTransaction(bonksRef, (bonks: Game["bonks"]) => {
        const newBonks = { ...bonks };
        delete newBonks[userId];
        return newBonks;
      });
    }
  }, [activeBonks, bonksRef, userId]);

  const bonkPlayer = (playerId: string) => {
    runTransaction(bonksRef, (bonks: Game["bonks"]) => {
      const newBonks = { ...bonks, [playerId]: true };
      return newBonks;
    });
  };

  return { isBonking, setBonking, activeBonks, bonkPlayer };
};

export const BonkContext = createContext<BonkProps>({
  isBonking: false,
  setBonking: () => {},
  bonkPlayer: () => {},
});
