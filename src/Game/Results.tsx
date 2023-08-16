import "./results.css";

import { FC } from "react";

import { useResults } from "../hooks/useResults";
import { Game } from "../types";

const ProgressRing: FC<{
  radius: number;
  stroke: number;
  progress: number;
  average: number;
}> = ({ radius, stroke, progress, average }) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = isNaN(progress)
    ? 0
    : circumference - (progress / 100) * circumference;

  return (
    <div className="progress-ring">
      <div className="content">
        <div>
          <strong className="consensus">{Math.round(progress)}%</strong>
          <br />
          Consensus
        </div>
        <div>
          <div>Average</div>
          <div className="average">
            {isNaN(average) ? "🤔" : parseFloat(average.toFixed(1))}
          </div>
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

const Results: FC<Pick<Game, "players">> = ({ players }) => {
  const { average, consensus } = useResults(players);

  return (
    <div className="results">
      <ProgressRing
        average={average}
        progress={consensus}
        radius={125}
        stroke={15}
      />
    </div>
  );
};

export default Results;
