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
          <div>Average: {isNaN(average) ? "🤔" : average}</div>
          <div className="progress">{progress}%</div>
        </div>
      </div>
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="rgb(255, 180, 31)"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}}`}
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
    title: "User",
    dataIndex: "user",
    key: "user",
  },
  {
    title: "Vote",
    dataIndex: "vote",
    key: "vote",
  },
];
// TODO: get players from GameContext
const Results: FC<Pick<Game, "players">> = ({ players }) => {
  const { dataSource, average, consensus } = useMemo(() => {
    if (!players) {
      return { dataSource: [], average: 0, consensus: 100 };
    }
    const playerIds = Object.keys(players);
    let total = 0;
    let skipped = 0;
    let count: Record<string, number> = {};
    const rows = playerIds.map((playerId) => {
      const vote =
        players[playerId] === CONST_EMPTY_OPTION ? "?" : players[playerId];
      // dont include non-number votes in average
      if (vote === CONST_EMPTY_OPTION || Number.isNaN(Number(vote))) {
        skipped += 1;
      } else {
        total += Number(vote);
      }
      count[vote] = (count[vote] ?? 0) + 1;
      const row = {
        user: (
          <div className="results-row-user">
            <Player key={playerId} id={playerId} />
          </div>
        ),
        vote,
      };

      return row;
    });

    rows.sort((a, b) => {
      if (a.vote === "" || a.vote === "?" || a.vote === "☕") {
        return -1;
      }
      return Number(b.vote) - Number(a.vote);
    });
    const winner = Object.keys(count).sort((a, b) => count[a] - count[b])[0];

    return {
      dataSource: rows,
      average: total / (rows.length - skipped),
      // highest number of votes divided by number of players
      consensus: (count[winner] / rows.length) * 100,
    };
  }, [players]);

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
        radius={100}
        stroke={10}
      />
    </div>
  );
};

export default Results;
