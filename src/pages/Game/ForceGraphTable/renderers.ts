import {
  CONST_CARD_BACK_IMAGE,
  CONST_DEFAULT_AVATAR_IMAGE,
  CONST_EMPTY_CARD_IMAGE,
} from "../../../const";
import {
  CardNode,
  GraphNode,
  isCardNode,
  isUserNode,
  Renderable,
  UserNode,
} from "./types";

const setShadow = (ctx: CanvasRenderingContext2D) => {
  ctx.shadowColor = "#000";
  ctx.shadowBlur = 6;
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 3;
};

const scaleImage = (image: HTMLImageElement, targetSize: number) => {
  const ratio = targetSize / image.width;
  const height = image.height * ratio;
  return { width: targetSize, height };
};

const renderPlayer = (
  node: Renderable<UserNode>,
  ctx: CanvasRenderingContext2D
) => {
  let image = CONST_DEFAULT_AVATAR_IMAGE;
  if (node.img) {
    image = new Image();
    image.src = node.img;
  }
  const { width, height } = scaleImage(image, 32);
  ctx.save();
  ctx.beginPath();
  node.__pointerArc = [node.x, node.y, 16, 0, 2 * Math.PI, false];
  ctx.arc(...node.__pointerArc);
  ctx.fillStyle = "#47271a";
  ctx.strokeStyle = "#47271a";
  ctx.lineWidth = 4;
  setShadow(ctx);
  ctx.fill();
  ctx.stroke();
  ctx.clip();
  ctx.drawImage(image, node.x - width / 2, node.y - height / 2, width, height);
  ctx.closePath();
  ctx.restore();
  ctx.closePath();
  ctx.restore();
};

const renderCard = (
  node: Renderable<CardNode>,
  ctx: CanvasRenderingContext2D
) => {
  const cardImage = node.revealed
    ? CONST_EMPTY_CARD_IMAGE
    : CONST_CARD_BACK_IMAGE;
  const { width, height } = scaleImage(cardImage, 32);
  ctx.save();
  ctx.beginPath();
  node.__pointerRect = [node.x - width / 2, node.y - height / 2, width, height];
  setShadow(ctx);
  ctx.drawImage(cardImage, ...node.__pointerRect);
  // put text value in the center of the card
  if (node.revealed) {
    ctx.font = `bold 25px "Segoe UI"`;
    ctx.fillStyle = "#d56f3e";
    const textSize = ctx.measureText(node.id);
    ctx.fillText(node.id, node.x - textSize.width / 2, node.y + 9);
  }
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
