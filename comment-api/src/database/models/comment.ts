import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { chapter, chapterId } from './chapter';
import type { commentInteraction, commentInteractionId } from './commentInteraction';
import type { user, userId } from './user';

export interface commentAttributes {
  id: number;
  content: string;
  status: number;
  parentId?: number;
  createdAt: Date;
  updatedAt: Date;
  chapterId?: number;
  userId: number;
  storyId?: number;
}

export type commentPk = "id";
export type commentId = comment[commentPk];
export type commentOptionalAttributes = "id" | "status" | "parentId" | "createdAt" | "updatedAt" | "chapterId" | "storyId";
export type commentCreationAttributes = Optional<commentAttributes, commentOptionalAttributes>;

export class comment extends Model<commentAttributes, commentCreationAttributes> implements commentAttributes {
  id!: number;
  content!: string;
  status!: number;
  parentId?: number;
  createdAt!: Date;
  updatedAt!: Date;
  chapterId?: number;
  userId!: number;
  storyId?: number;

  // comment belongsTo chapter via chapterId
  chapter!: chapter;
  getChapter!: Sequelize.BelongsToGetAssociationMixin<chapter>;
  setChapter!: Sequelize.BelongsToSetAssociationMixin<chapter, chapterId>;
  createChapter!: Sequelize.BelongsToCreateAssociationMixin<chapter>;
  // comment hasMany commentInteraction via commentId
  commentInteractions!: commentInteraction[];
  getCommentInteractions!: Sequelize.HasManyGetAssociationsMixin<commentInteraction>;
  setCommentInteractions!: Sequelize.HasManySetAssociationsMixin<commentInteraction, commentInteractionId>;
  addCommentInteraction!: Sequelize.HasManyAddAssociationMixin<commentInteraction, commentInteractionId>;
  addCommentInteractions!: Sequelize.HasManyAddAssociationsMixin<commentInteraction, commentInteractionId>;
  createCommentInteraction!: Sequelize.HasManyCreateAssociationMixin<commentInteraction>;
  removeCommentInteraction!: Sequelize.HasManyRemoveAssociationMixin<commentInteraction, commentInteractionId>;
  removeCommentInteractions!: Sequelize.HasManyRemoveAssociationsMixin<commentInteraction, commentInteractionId>;
  hasCommentInteraction!: Sequelize.HasManyHasAssociationMixin<commentInteraction, commentInteractionId>;
  hasCommentInteractions!: Sequelize.HasManyHasAssociationsMixin<commentInteraction, commentInteractionId>;
  countCommentInteractions!: Sequelize.HasManyCountAssociationsMixin;
  // comment belongsToMany user via commentId and userId
  userId_users!: user[];
  getUserId_users!: Sequelize.BelongsToManyGetAssociationsMixin<user>;
  setUserId_users!: Sequelize.BelongsToManySetAssociationsMixin<user, userId>;
  addUserId_user!: Sequelize.BelongsToManyAddAssociationMixin<user, userId>;
  addUserId_users!: Sequelize.BelongsToManyAddAssociationsMixin<user, userId>;
  createUserId_user!: Sequelize.BelongsToManyCreateAssociationMixin<user>;
  removeUserId_user!: Sequelize.BelongsToManyRemoveAssociationMixin<user, userId>;
  removeUserId_users!: Sequelize.BelongsToManyRemoveAssociationsMixin<user, userId>;
  hasUserId_user!: Sequelize.BelongsToManyHasAssociationMixin<user, userId>;
  hasUserId_users!: Sequelize.BelongsToManyHasAssociationsMixin<user, userId>;
  countUserId_users!: Sequelize.BelongsToManyCountAssociationsMixin;
  // comment belongsTo user via userId
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof comment {
    return comment.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    chapterId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'chapter',
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    storyId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'comment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "FK_chapter_comment_idx",
        using: "BTREE",
        fields: [
          { name: "chapterId" },
        ]
      },
      {
        name: "FK_user_comment_idx",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
  }
}
