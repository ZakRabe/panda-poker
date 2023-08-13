import "./results.css";

import { Table } from "antd";
import { FC, useMemo } from "react";

import { CONST_EMPTY_OPTION } from "../const";
import { Game } from "../types";
import Player from "./Player";

const ProgressRing: FC<{
  radius: number;
  stroke: number;
  progress: number;
  average: number;
}> = ({ radius, stroke, progress, average }) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="progress-ring">
      <div className="content">
        <div>
          <div>average</div>
          <div className="average">
            {isNaN(average) ? "🤔" : parseFloat(average.toFixed(1))}
          </div>
          {/* <div className="progress">{Math.round(progress)}%</div> */}
        </div>
      </div>
      <svg height={radius * 2} width={radius * 2}>
        <circle
          fill="#D0CD94"
          stroke="#47271A"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
    </div>
  );
};

const columns = [
  {
    title: "Count",
    dataIndex: "countColumn",
    key: "countColumn",
    className: "countColumn",
  },
  {
    title: "Players",
    dataIndex: "playersColumn",
    key: "playersColumn",
  },
  {
    title: "Estimate",
    dataIndex: "voteColumn",
    key: "voteColumn",
    className: "voteColumn",
  },
];
// TODO: get players from GameContext
const Results: FC<Pick<Game, "players">> = ({ players }) => {
  const { winners, dataSource, average, consensus } = useMemo(() => {
    if (!players) {
      return { dataSource: [], average: 0, consensus: 100 };
    }
    const playerIds = Object.keys(players);
    let total = 0;
    let skippedCount = 0;
    let counts: Record<string, string[]> = {};

    playerIds.forEach((playerId) => {
      const vote =
        players[playerId] === CONST_EMPTY_OPTION ? "?" : players[playerId];
      const voteNumber = Number(vote);
      // dont include non-number votes in average
      if (vote === CONST_EMPTY_OPTION || Number.isNaN(voteNumber)) {
        skippedCount += 1;
      } else {
        total += voteNumber;
      }

      counts[vote] = [...(counts[vote] ?? []), playerId];
    });
    const rows = Object.keys(counts).map((choice, index) => {
      return {
        vote: choice,
        countColumn: counts[choice].length,
        voteColumn: (
          <div style={{}} className={`winner_${choice}`}>
            {choice}
          </div>
        ),
        playerIds: counts[choice],
        playersColumn: (
          <div
            style={{
              display: "flex",
              gap: 15,
              alignItems: "flex-end",
            }}
            className={`winner_${choice}`}
          >
            {counts[choice].map((playerId) => (
              <Player id={playerId} />
            ))}
          </div>
        ),
      };
    });
    rows.sort((a, b) => {
      if (b.vote === CONST_EMPTY_OPTION || b.vote === "?" || b.vote === "☕") {
        return -1;
      }
      return Number(b.vote) - Number(a.vote);
    });
    const highestCount =
      counts[
        Object.keys(counts).sort(
          (a, b) => counts[b].length - counts[a].length
        )[0]
      ].length;
    const winners = Object.keys(counts).filter(
      (choice) => counts[choice].length === highestCount
    );
    const calcCount = playerIds.length - skippedCount;

    return {
      winners,
      dataSource: rows,
      average: total / calcCount,
      // highest number of votes divided by number of players
      consensus: (counts[winners[0]].length / calcCount) * 100,
    };
  }, [players]);

  // TODO: highlight winner differently in graph
  return (
    <div className="results">
      <div style={{ flex: 1 }}>
        <Table
          size="small"
          pagination={false}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>

      <ProgressRing
        average={average}
        progress={consensus}
        radius={85}
        stroke={10}
      />
    </div>
  );
};

export default Results;
