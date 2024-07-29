import type { Sequelize } from "sequelize";
import { chapter as _chapter } from "./chapter";
import type { chapterAttributes, chapterCreationAttributes } from "./chapter";
import { comment as _comment } from "./comment";
import type { commentAttributes, commentCreationAttributes } from "./comment";
import { commentInteraction as _commentInteraction } from "./commentInteraction";
import type { commentInteractionAttributes, commentInteractionCreationAttributes } from "./commentInteraction";
import { user as _user } from "./user";
import type { userAttributes, userCreationAttributes } from "./user";

export {
  _chapter as chapter,
  _comment as comment,
  _commentInteraction as commentInteraction,
  _user as user,
};

export type {
  chapterAttributes,
  chapterCreationAttributes,
  commentAttributes,
  commentCreationAttributes,
  commentInteractionAttributes,
  commentInteractionCreationAttributes,
  userAttributes,
  userCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const chapter = _chapter.initModel(sequelize);
  const comment = _comment.initModel(sequelize);
  const commentInteraction = _commentInteraction.initModel(sequelize);
  const user = _user.initModel(sequelize);

  comment.belongsToMany(user, { as: 'userId_users', through: commentInteraction, foreignKey: "commentId", otherKey: "userId" });
  user.belongsToMany(comment, { as: 'commentId_comments', through: commentInteraction, foreignKey: "userId", otherKey: "commentId" });
  comment.belongsTo(chapter, { as: "chapter", foreignKey: "chapterId"});
  chapter.hasMany(comment, { as: "comments", foreignKey: "chapterId"});
  commentInteraction.belongsTo(comment, { as: "comment", foreignKey: "commentId"});
  comment.hasMany(commentInteraction, { as: "commentInteractions", foreignKey: "commentId"});
  comment.belongsTo(user, { as: "user", foreignKey: "userId"});
  user.hasMany(comment, { as: "comments", foreignKey: "userId"});
  commentInteraction.belongsTo(user, { as: "user", foreignKey: "userId"});
  user.hasMany(commentInteraction, { as: "commentInteractions", foreignKey: "userId"});

  return {
    chapter: chapter,
    comment: comment,
    commentInteraction: commentInteraction,
    user: user,
  };
}
