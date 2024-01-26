/* eslint-disable */

import React, {
  RefObject, useEffect, useRef, useState,
} from 'react';
import { animated, useTransition } from 'react-spring';

interface LikeParticlesProps {
    likeCount: number;
    containerRef: RefObject<HTMLDivElement>;
    incrementLikes?: (count: number) => void;
}

interface Particle {
    key: number;
}

function getLeftOffset(item: Particle, containerWidth: number): number {
  return Math.sin(item.key * (Math.PI / 16)) * containerWidth * 0.5;
}

const LikeParticles: React.FC<LikeParticlesProps> = ({
  likeCount,
  containerRef,
  incrementLikes,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const prevLikeCount = usePrevious(likeCount);
  const idRef = useRef(0);

  function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<T>();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }

  useEffect(() => {
    if (likeCount > (prevLikeCount ?? 0)) {
      setParticles((prev) => [...Array(likeCount - (prevLikeCount ?? 0))]
        .map(() => ({ key: idRef.current++ }))
        .concat(prev));
    }
  }, [likeCount, prevLikeCount]);

  const transitions = useTransition(particles, {
    from: (item, idx) => ({
      opacity: 0,
      top: 0,
      left: getLeftOffset(item, containerRef.current?.getBoundingClientRect()?.width * 0.5 ?? 0),
    }),
    enter: (item, idx) => ({
      opacity: 1,
      top: -80,
      left: getLeftOffset(item, containerRef.current?.getBoundingClientRect()?.width ?? 0),
    }),
    leave: (item, idx) => ({
      opacity: 0,
      config: {
        duration: 100,
      },
    }),
    keys: particles.map((particle) => particle.key),
    onRest: () => setParticles([]),
    trail: 5,
    config: {
      duration: 500,
    },
    onDestroyed: () => {
      incrementLikes?.(1);
    },
  });

  return (
        <div className="absolute top-1/2  left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {transitions((style, item) => (
                <animated.div
                    style={style}
                    className="text-green-500 absolute transform -translate-x-1/2 -translate-y-[110%]"
                >
                    <svg
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g
                            id="Icons"
                            stroke="none"
                            strokeWidth="1"
                            fill="none"
                            fillRule="evenodd"
                        >
                            <path
                                d="M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z"
                                id="Shape"
                                fill="#FF0000"
                                fillRule="nonzero"
                            ></path>
                        </g>
                    </svg>
                </animated.div>
            ))}
        </div>
  );
};

export default LikeParticles;
