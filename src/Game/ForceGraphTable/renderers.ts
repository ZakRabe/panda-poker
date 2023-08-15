import { CONST_DEFAULT_AVATAR_BASE64, CONST_EMPTY_CARD_BASE64 } from "./assets";
import {
  CardNode,
  GraphNode,
  isCardNode,
  isUserNode,
  Renderable,
  UserNode,
} from "./types";

const scaleImage = (image: HTMLImageElement, targetSize: number) => {
  const ratio = targetSize / image.width;
  const height = image.height * ratio;
  return { width: targetSize, height };
};

const renderPlayer = (
  node: Renderable<UserNode>,
  ctx: CanvasRenderingContext2D
) => {
  const img = new Image();
  img.src = node.img || CONST_DEFAULT_AVATAR_BASE64;

  const { width, height } = scaleImage(img, 32);
  ctx.save();
  ctx.beginPath();
  node.__pointerArc = [node.x, node.y, 16, 0, 2 * Math.PI, false];
  ctx.arc(...node.__pointerArc);
  ctx.fillStyle = "#47271a";
  ctx.strokeStyle = "#47271a";
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.stroke();
  ctx.clip();
  ctx.drawImage(img, node.x - width / 2, node.y - height / 2, width, height);
  ctx.closePath();
  ctx.restore();
};

const renderCard = (
  node: Renderable<CardNode>,
  ctx: CanvasRenderingContext2D
) => {
  const img = new Image();
  img.src = CONST_EMPTY_CARD_BASE64;

  const { width, height } = scaleImage(img, 32);
  ctx.save();
  ctx.beginPath();
  node.__pointerRect = [node.x - width / 2, node.y - height / 2, width, height];
  ctx.drawImage(img, ...node.__pointerRect);
  ctx.closePath();
  ctx.restore();
};

export const nodePointerAreaPaint = (
  node: Renderable<GraphNode>,
  color: string,
  ctx: CanvasRenderingContext2D
) => {
  if (isUserNode(node)) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = color;
    const args = node.__pointerArc;
    if (!args) {
      return;
    }
    ctx.arc(...args);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
  if (isCardNode(node)) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = color;
    const args = node.__pointerRect;
    if (!args) {
      return;
    }
    ctx.fillRect(...args);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
};

export const nodeCanvasObject = (
  node: Renderable<GraphNode>,
  ctx: CanvasRenderingContext2D
) => {
  if (node.type === "player") {
    renderPlayer(node, ctx);
  } else {
    renderCard(node, ctx);
  }
};
