import React, { useEffect, useRef, useState } from "react";

// Game Constants
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 20;
const INVADER_WIDTH = 30;
const INVADER_HEIGHT = 20;
const PROJECTILE_WIDTH = 4;
const PROJECTILE_HEIGHT = 10;
const INVADER_ROWS = 4;
const INVADER_COLS = 8;
const PLAYER_SPEED = 5;
const PROJECTILE_SPEED = 7;
const INVADER_SPEED = 0.5; // Initial speed
const INVADER_DROP_DISTANCE = 10;

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  active: boolean;
}

interface Invader extends GameObject {
  type: number;
}

export const SpaceInvaders = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Game State Refs (to avoid closure staleness in loop)
  const gameState = useRef({
    player: {
      x: CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2,
      y: CANVAS_HEIGHT - PLAYER_HEIGHT - 10,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
      active: true,
    } as GameObject,
    projectiles: [] as GameObject[],
    invaders: [] as Invader[],
    invaderDirection: 1, // 1 for right, -1 for left
    keys: {
      ArrowLeft: false,
      ArrowRight: false,
      Space: false,
    },
    lastShotTime: 0,
  });

  const initGame = () => {
    // Reset State
    gameState.current.player.x = CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2;
    gameState.current.projectiles = [];
    gameState.current.invaders = [];
    gameState.current.invaderDirection = 1;
    setScore(0);
    setGameOver(false);
    setVictory(false);
    setGameStarted(true);

    // Create Invaders
    const invaders: Invader[] = [];
    for (let r = 0; r < INVADER_ROWS; r++) {
      for (let c = 0; c < INVADER_COLS; c++) {
        invaders.push({
          x: 50 + c * (INVADER_WIDTH + 15),
          y: 40 + r * (INVADER_HEIGHT + 15),
          width: INVADER_WIDTH,
          height: INVADER_HEIGHT,
          active: true,
          type: r,
        });
      }
    }
    gameState.current.invaders = invaders;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "ArrowLeft") gameState.current.keys.ArrowLeft = true;
      if (e.code === "ArrowRight") gameState.current.keys.ArrowRight = true;
      if (e.code === "Space") gameState.current.keys.Space = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "ArrowLeft") gameState.current.keys.ArrowLeft = false;
      if (e.code === "ArrowRight") gameState.current.keys.ArrowRight = false;
      if (e.code === "Space") gameState.current.keys.Space = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (!gameStarted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const gameLoop = (timestamp: number) => {
      if (gameOver || victory) return;

      update(timestamp);
      draw(ctx);
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    const update = (timestamp: number) => {
      const state = gameState.current;

      // Player Movement
      if (state.keys.ArrowLeft) {
        state.player.x = Math.max(0, state.player.x - PLAYER_SPEED);
      }
      if (state.keys.ArrowRight) {
        state.player.x = Math.min(
          CANVAS_WIDTH - PLAYER_WIDTH,
          state.player.x + PLAYER_SPEED
        );
      }

      // Shooting
      if (state.keys.Space && timestamp - state.lastShotTime > 400) {
        state.projectiles.push({
          x: state.player.x + PLAYER_WIDTH / 2 - PROJECTILE_WIDTH / 2,
          y: state.player.y,
          width: PROJECTILE_WIDTH,
          height: PROJECTILE_HEIGHT,
          active: true,
        });
        state.lastShotTime = timestamp;
      }

      // Projectiles Movement
      state.projectiles.forEach((p) => (p.y -= PROJECTILE_SPEED));
      state.projectiles = state.projectiles.filter(
        (p) => p.y + p.height > 0 && p.active
      );

      // Invaders Movement
      let hitWall = false;
      state.invaders.forEach((inv) => {
        if (!inv.active) return;
        if (
          (inv.x + inv.width >= CANVAS_WIDTH && state.invaderDirection === 1) ||
          (inv.x <= 0 && state.invaderDirection === -1)
        ) {
          hitWall = true;
        }
      });

      if (hitWall) {
        state.invaderDirection *= -1;
        state.invaders.forEach((inv) => (inv.y += INVADER_DROP_DISTANCE));
      }

      state.invaders.forEach((inv) => {
        if (!inv.active) return;
        inv.x += INVADER_SPEED * state.invaderDirection;
      });

      // Collision Detection
      state.invaders.forEach((inv) => {
        if (!inv.active) return;

        // Check Projectile Hits
        state.projectiles.forEach((proj) => {
          if (!proj.active) return;
          if (
            proj.x < inv.x + inv.width &&
            proj.x + proj.width > inv.x &&
            proj.y < inv.y + inv.height &&
            proj.height + proj.y > inv.y
          ) {
            inv.active = false;
            proj.active = false;
            setScore((s) => s + 10);
          }
        });

        // Check Game Over (Invader reached bottom)
        if (inv.y + inv.height >= state.player.y) {
          setGameOver(true);
        }
      });

      // Check Victory
      if (state.invaders.every((inv) => !inv.active)) {
        setVictory(true);
        setGameOver(true); // Stop loop
      }
    };

    const draw = (ctx: CanvasRenderingContext2D) => {
      // Clear Canvas
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      const state = gameState.current;

      // Draw Player
      ctx.fillStyle = "#FFA500";
      ctx.fillRect(
        state.player.x,
        state.player.y,
        state.player.width,
        state.player.height
      );

      // Draw Projectiles
      ctx.fillStyle = "white";
      state.projectiles.forEach((p) => {
        if (p.active) ctx.fillRect(p.x, p.y, p.width, p.height);
      });

      // Draw Invaders
      state.invaders.forEach((inv) => {
        if (inv.active) {
          // Simple visual difference for rows
          ctx.fillStyle =
            inv.type === 0 ? "#ffffff" : inv.type === 1 ? "#7d7d7d" : "#FFA500";
          ctx.fillRect(inv.x, inv.y, inv.width, inv.height);
        }
      });
    };

    animationFrameId = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(animationFrameId);
  }, [gameStarted, gameOver, victory]);

  return (
    <div className="flex flex-col items-center justify-center p-2 bg-orange-500 text-neutral-900 rounded-sm">
      <div className="mb-2 flex justify-between w-full max-w-[600px] px-4 font-bold">
        <span>Score: {score}</span>
        <span>Controls: Arrow Keys + Space</span>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="border-2 border-foreground rounded bg-background"
        />

        {(!gameStarted || gameOver) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70">
            {victory ? (
              <div className="flex flex-col items-center">
                <h2 className="text-3xl font-bold text-green-500 mb-4">
                  You Win!
                </h2>
                <h4 className="text-md text-white mb-5">
                  All bugs have been fixed!
                </h4>
              </div>
            ) : gameOver && gameStarted ? (
              <h2 className="text-3xl font-bold text-red-500 mb-4">
                Game Over
              </h2>
            ) : (
              <div className="flex flex-col items-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Bug Invaders
                </h2>
                <h4 className="text-md text-white mb-5">
                  Destroy all bugs before they reach production!
                </h4>
              </div>
            )}

            <button
              onClick={initGame}
              className="px-6 py-2 bg-orange-400 hover:bg-orange-300 text-white rounded font-bold cursor-pointer"
              type="button"
            >
              {gameStarted ? "Play Again" : "Start Game"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
