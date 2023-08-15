import { GraphNode, Renderable, UserNode } from "./types";

const scale = (image: HTMLImageElement, targetSize: number) => {
  const ratio = image.width / targetSize;
  const width = targetSize;
  const height = image.height * ratio;
  return { width, height };
};

const renderPlayer = (
  node: Renderable<UserNode>,
  ctx: CanvasRenderingContext2D
) => {
  const img = new Image();
  img.src = node.img ?? "/mystery.png";

  const { width, height } = scale(img, 32);
  ctx.save();
  ctx.beginPath();
  ctx.arc(node.x, node.y, 16, 0, 2 * Math.PI, false);
  node.__pointerArc = [node.x, node.y, 16, 0, 2 * Math.PI, false];
  ctx.fill();
  ctx.clip();
  ctx.closePath();
  ctx.drawImage(img, node.x - width / 2, node.y - height / 2, width, height);
  ctx.restore();
};

export const nodePointerAreaPaint = (
  node: Renderable<GraphNode>,
  color: string,
  ctx: CanvasRenderingContext2D
) => {
  if (node.type === "player") {
    ctx.fillStyle = color;
    const args = node.__pointerArc;
    if (!args) {
      return;
    }
    ctx.arc(...args);
    ctx.fill();
  }
};

export const nodeCanvasObject = (
  node: Renderable<GraphNode>,
  ctx: CanvasRenderingContext2D
) => {
  if (node.type === "player") {
    renderPlayer(node, ctx);
  } else {
    ctx.fillRect(node.x - 6, node.y - 4, 12, 8);
  }
};
