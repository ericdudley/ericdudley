import React, { ReactElement, Ref, useMemo } from "react";

import { faker } from "@faker-js/faker";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import LikeParticles from "./LikeParticles";

function getMockData() {
  return {
    username: faker.name.firstName() + " " + faker.name.lastName(),
    profileImage: faker.image.avatar(),
    postImage: faker.image.url(),
    postBody: faker.lorem.paragraph(),
    name: faker.person.fullName(),
    location: faker.location.city(),
    ago: faker.date.recent().toLocaleDateString(),
  };
}

type Variant =
  | "multiple-likes"
  | "position-likes"
  | "infinite-hierarchy"
  | "conditional-likes"
  | "unconditional-likes"
  | "fake-likes";

export default function LikeablePost({
  variant,
}: {
  variant: Variant;
}): ReactElement {
  const { username, profileImage, postImage, postBody, ago, location, name } =
    useMemo(getMockData, []);

  const [likeCount, setLikeCount] = React.useState(0);
  const addLikes = (count: number) => setLikeCount((prev) => prev + count);

  const [tempLikeCount, setTempLikeCount] = React.useState(0);
  const addTempLikes = (count: number) =>
    setTempLikeCount((prev) => prev + count);

  const likeCountElementRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="mx-auto max-w-sm flex flex-col gap-2  py-2 rounded-md">
      {/* profile header */}
      <div className="h-12 flex items-center px-2">
        <div className="flex items-center justify-center">
          <img
            src={profileImage}
            alt="profile"
            className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800"
          />
        </div>
        <div className="ml-4 flex flex-col">
          <div className="flex gap-1 items-center">
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {name}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              &#183;
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formatDistanceToNow(new Date(ago), {
                addSuffix: false,
              })}
            </span>
          </div>
          <span className="text-xs">{location}</span>
        </div>
      </div>
      <img src={postImage} alt="post-image" />
      {/* like button */}
      {variant === "multiple-likes" && (
        <div className="flex items-center gap-1 mt-1">
          {[1, 5, 10, 100, 500].map((count) => (
            <button
              key={count}
              className="text-sm font-medium text-gray-900 dark:text-gray-100 cursor-pointer"
              onClick={() => {
                addTempLikes(count);
              }}
            >
              +{count} {count === 1 ? "like" : "likes"}
            </button>
          ))}
        </div>
      )}
      {/* like count */}
      <div
        className="flex items-center gap-1 mt-1 relative w-fit"
        ref={likeCountElementRef}
      >
        <span className="text-sm text-gray-900 dark:text-gray-100 font-extrabold">
          {likeCount} {likeCount === 1 ? "like" : "likes"}
        </span>
        <LikeParticles
          likeCount={tempLikeCount}
          containerRef={likeCountElementRef}
          incrementLikes={addLikes}
        />
      </div>
      <p className="text-sm font-medium !mb-2">
        <span className="font-extrabold text-gray-900 dark:text-gray-100">
          {username}
        </span>{" "}
        {postBody}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 !mb-2">
        Add a comment...
      </p>
    </div>
  );
}
