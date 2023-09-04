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
import { useParams } from "react-router-dom";

import UserContext from "../App/UserContext";
import database from "../firebase";
import { Game } from "../types";

export type BonkProps = {
  isBonking: boolean;
  setBonking: Dispatch<SetStateAction<boolean>>;
  bonkPlayer: Dispatch<string>;
};

export const bonkSound = new Audio("/bonk.mp3");

export const useBonks = () => {
  const { gameId } = useParams();
  const [isBonking, setBonking] = useState(false);
  const { id: userId } = useContext(UserContext);

  const [activeBonks, setBonks] = useState<Game["bonks"]>({});
  const bonksRef = useMemo(
    () => ref(database, `games/${gameId}/bonks`),
    [gameId]
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
