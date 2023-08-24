// @ts-ignore
import confetti from "canvas-confetti";

const CONFETTI_DURATION_MS = 1000;
const DEFAULT_CONFETTI_OPTIONS = {
  startVelocity: 30,
  spread: 360,
  ticks: 60,
  zIndex: 0,
};

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const pop = () => {
  var animationEnd = Date.now() + CONFETTI_DURATION_MS;
  const interval: any = setInterval(function () {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / CONFETTI_DURATION_MS);
    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, DEFAULT_CONFETTI_OPTIONS, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, DEFAULT_CONFETTI_OPTIONS, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
};
