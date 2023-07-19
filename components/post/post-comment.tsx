"use client";
import React from "react";
import CommentItem from "@/components/post/comment/comment-item";
import CommentPost from "@/components/post/comment/comment-post";
import { v4 } from "uuid";

const reviews = [
  {
    id: 1,
    rating: 5,
    content: `
      <p>This icon pack is just what I need for my latest project. There's an icon for just about anything I could ever need. Love the playful look!</p>
    `,
    date: "July 16, 2021",
    datetime: "2021-07-16",
    author: "Emily Selman",
    avatarSrc:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
  },
  {
    id: 2,
    rating: 5,
    content: `
      <p>Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so it's a steal at this price.</p>
    `,
    date: "July 12, 2021",
    datetime: "2021-07-12",
    author: "Hector Gibbons",
    avatarSrc:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
  },
  // More reviews...
];

interface PostCommentProps {
  slug?: string;
}

const PostComment = () => {
  return (
    <div
      id="comments"
      className="mx-auto max-w-4xl bg-gray-50 p-5 rounded-md shadow-sm ring-1 ring-black/5 my-5"
    >
      <div>
        <CommentPost />
        <div className="py-5 px-2">
          {reviews.map((review, reviewIdx) => (
            <CommentItem
              key={v4()}
              id={review.id.toString()}
              name={review.author}
              image={review.avatarSrc}
              comment={review.content}
              date={review.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostComment;
