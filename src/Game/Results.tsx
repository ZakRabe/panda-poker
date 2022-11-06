import './results.css'

import { Table } from 'antd'
import { FC, useMemo } from 'react'

import { CONST_EMPTY_OPTION } from '../const'
import { Game } from '../types'
import Player from './Player'

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
            {isNaN(average) ? "🤔" : average.toFixed(1)}
          </div>
          {/* <div className="progress">{Math.round(progress)}%</div> */}
        </div>
      </div>
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="rgb(255, 180, 31)"
          fill="white"
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
    title: "Players",
    dataIndex: "playersColumn",
    key: "playersColumn",
  },
  {
    title: "Vote",
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
        voteColumn: (
          <div
            style={{
              textAlign: "center",
            }}
            className={`winner_${choice}`}
          >
            <strong>{choice}</strong>
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
          (a, b) => counts[a].length - counts[b].length
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

  return (
    <div className="results">
      <style>
        {winners?.map((winner) => {
          return `td:has(.winner_${winner}){
  background-color: rgb(255, 180, 31, 0.4);
}
td:has(.winner_${winner}):hover{
  background-color: rgb(255, 180, 31, 0.2) !important;
}
`;
        })}
      </style>
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
