import React, {
  ReactElement, useRef, useState, useEffect,
} from 'react';
import Layout from '@theme/Layout';

type ProjectMetadata = {
    name: string;
    link: string;
    description: string;
    previewImage: string;
};

const projects: ProjectMetadata[] = [
  {
    name: 'Cash Compass', link: 'https://cashcompass.co', description: 'Open Source, Offline First, Personal Finance App', previewImage: 'https://cashcompass.co/_static/icons/icon-128x128.png',
  },
  {
    name: 'Find The Sub', link: 'https://findthesub.ericdudley.com', description: 'Match Reddit post titles to subreddits', previewImage: 'https://i.imgur.com/rgK8YTD.png',
  },
  {
    name: "Benford's Law", link: 'https://benfords-law.ericdudley.com', description: 'Visualization of the mathematics principle', previewImage: 'https://benfords-law.ericdudley.com/favicon.ico',
  },
  {
    name: 'Family Cookbook', link: 'https://recipes.ericdudley.com', description: 'Deployment of nyum for my family recipes', previewImage: 'https://recipes.ericdudley.com/assets/logo.svg',
  },
];

const CARD_WIDTH = 150;
const CARD_HEIGHT = 250;
const SPEED = 1;
const STOP_RADIUS = 100;
const SLOW_RADIUS = 200;

interface ItemState {
    x: number;
    y: number;
    dx: number;
    dy: number;
}

export default function ProjectsPage(): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>();
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState<ItemState[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  const initializePositions = () => {
    const el = containerRef.current;
    if (!el) return;
    const { clientWidth, clientHeight } = el;

    const newItems = projects.map(() => {
      const x = Math.random() * (clientWidth - CARD_WIDTH);
      const y = Math.random() * (clientHeight - CARD_HEIGHT);
      const randomDx = (Math.random() > 0.5 ? 1 : -1) * SPEED;
      const randomDy = (Math.random() > 0.5 ? 1 : -1) * SPEED;
      return {
        x, y, dx: randomDx, dy: randomDy,
      };
    });

    setItems(newItems);
  };

  const handleLoadProjects = () => {
    initializePositions();
    setLoaded(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const boundingRect = containerRef.current.getBoundingClientRect();
    mouseRef.current.x = e.clientX - boundingRect.left;
    mouseRef.current.y = e.clientY - boundingRect.top;
  };

  useEffect(() => {
    if (!loaded) return () => {};

    const animate = () => {
      const el = containerRef.current;
      if (!el) return;
      const { clientWidth, clientHeight } = el;

      setItems((prev) => {
        const nextItems = prev.map((item) => {
          const {
            x, y, dx, dy,
          } = item;

          // Mouse distance
          const centerX = x + CARD_WIDTH / 2;
          const centerY = y + CARD_HEIGHT / 2;
          const distX = mouseRef.current.x - centerX;
          const distY = mouseRef.current.y - centerY;
          const dist = Math.sqrt(distX * distX + distY * distY);

          let localDx = dx;
          let localDy = dy;
          if (dist < STOP_RADIUS) {
            localDx = 0;
            localDy = 0;
          } else if (dist < SLOW_RADIUS) {
            const factor = dist / SLOW_RADIUS;
            localDx *= factor;
            localDy *= factor;
          }

          let nextX = x + localDx;
          let nextY = y + localDy;
          let newDx = dx;
          let newDy = dy;

          // Bounce off walls
          if (nextX < 0) {
            nextX = 0;
            newDx = -dx;
          } else if (nextX > clientWidth - CARD_WIDTH) {
            nextX = clientWidth - CARD_WIDTH;
            newDx = -dx;
          }
          if (nextY < 0) {
            nextY = 0;
            newDy = -dy;
          } else if (nextY > clientHeight - CARD_HEIGHT) {
            nextY = clientHeight - CARD_HEIGHT;
            newDy = -dy;
          }

          return {
            x: nextX, y: nextY, dx: newDx, dy: newDy,
          };
        });

        // Check bounding box collisions
        for (let i = 0; i < nextItems.length; i += 1) {
          for (let j = i + 1; j < nextItems.length; j += 1) {
            const a = nextItems[i];
            const b = nextItems[j];

            // Bounding boxes for items a and b
            const aLeft = a.x;
            const aRight = a.x + CARD_WIDTH;
            const aTop = a.y;
            const aBottom = a.y + CARD_HEIGHT;

            const bLeft = b.x;
            const bRight = b.x + CARD_WIDTH;
            const bTop = b.y;
            const bBottom = b.y + CARD_HEIGHT;

            // Check if they overlap
            if (
              aLeft < bRight
                            && aRight > bLeft
                            && aTop < bBottom
                            && aBottom > bTop
            ) {
              // Overlap amounts
              const overlapX = Math.min(aRight - bLeft, bRight - aLeft);
              const overlapY = Math.min(aBottom - bTop, bBottom - aTop);

              // Resolve collision along the axis of least overlap
              if (overlapX < overlapY) {
                // Push horizontally
                const push = overlapX / 2;

                if (a.x < b.x) {
                  nextItems[i].x -= push;
                  nextItems[j].x += push;
                } else {
                  nextItems[i].x += push;
                  nextItems[j].x -= push;
                }

                // Invert dx for both so they bounce horizontally
                [nextItems[i].dx, nextItems[j].dx] = [nextItems[j].dx, nextItems[i].dx];
              } else {
                // Push vertically
                const push = overlapY / 2;

                if (a.y < b.y) {
                  nextItems[i].y -= push;
                  nextItems[j].y += push;
                } else {
                  nextItems[i].y += push;
                  nextItems[j].y -= push;
                }

                // Invert dy for both so they bounce vertically
                [nextItems[i].dy, nextItems[j].dy] = [nextItems[j].dy, nextItems[i].dy];
              }
            }
          }
        }

        return nextItems;
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [loaded]);

  return (
        <Layout>
            <div
                ref={containerRef}
                className="relative flex items-center justify-center bg-gray-100 w-full"
                style={{ height: 'calc(100vh - 128px)' }}
                onMouseMove={handleMouseMove}
            >
                {!loaded && (
                    <button
                        onClick={handleLoadProjects}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg text-xl hover:bg-indigo-500 transition cursor-pointer"
                    >
                        Load Projects
                    </button>
                )}
                {loaded && (
                    <div className="relative w-full h-full overflow-hidden">
                        {projects.map((p, i) => {
                          const style = {
                            width: `${CARD_WIDTH}px`,
                            height: `${CARD_HEIGHT}px`,
                            transform: `translate(${items[i]?.x || 0}px, ${items[i]?.y || 0}px)`,
                            transition: 'transform 0.1s linear',
                          };
                          return (
                                <div
                                    key={p.name}
                                    className="absolute text-center bg-white shadow-lg rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer"
                                    style={style}
                                >
                                    <img
                                        src={p.previewImage}
                                        alt={p.name}
                                        className="w-24 h-24 rounded-full object-cover mb-2"
                                    />
                                    <div className="flex-grow flex flex-col items-center">
                                        <a
                                            href={p.link}
                                            className="block font-bold text-indigo-600 hover:text-indigo-400 mb-1"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {p.name}
                                        </a>
                                        <p className="text-sm text-gray-700">{p.description}</p>
                                    </div>
                                </div>
                          );
                        })}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 shadow-lg rounded-lg p-6 flex flex-col items-center w-[16rem]">
                            <div className="flex space-x-2 mb-4">
                                <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce delay-0"></div>
                                <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce delay-200"></div>
                                <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce delay-400"></div>
                            </div>
                            <p className="text-lg font-semibold text-gray-800">
                                Loading projects
                                {Date.now() % 1000 < 500 ? '.' : Date.now() % 1000 < 750 ? '..' : '...'}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
  );
}
