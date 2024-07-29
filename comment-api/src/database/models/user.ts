import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comment, commentId } from './comment';
import type { commentInteraction, commentInteractionId } from './commentInteraction';

export interface userAttributes {
  id: number;
}

export type userPk = "id";
export type userId = user[userPk];
export type userCreationAttributes = userAttributes;

export class user extends Model<userAttributes, userCreationAttributes> implements userAttributes {
  id!: number;

  // user hasMany comment via userId
  comments!: comment[];
  getComments!: Sequelize.HasManyGetAssociationsMixin<comment>;
  setComments!: Sequelize.HasManySetAssociationsMixin<comment, commentId>;
  addComment!: Sequelize.HasManyAddAssociationMixin<comment, commentId>;
  addComments!: Sequelize.HasManyAddAssociationsMixin<comment, commentId>;
  createComment!: Sequelize.HasManyCreateAssociationMixin<comment>;
  removeComment!: Sequelize.HasManyRemoveAssociationMixin<comment, commentId>;
  removeComments!: Sequelize.HasManyRemoveAssociationsMixin<comment, commentId>;
  hasComment!: Sequelize.HasManyHasAssociationMixin<comment, commentId>;
  hasComments!: Sequelize.HasManyHasAssociationsMixin<comment, commentId>;
  countComments!: Sequelize.HasManyCountAssociationsMixin;
  // user belongsToMany comment via userId and commentId
  commentId_comments!: comment[];
  getCommentId_comments!: Sequelize.BelongsToManyGetAssociationsMixin<comment>;
  setCommentId_comments!: Sequelize.BelongsToManySetAssociationsMixin<comment, commentId>;
  addCommentId_comment!: Sequelize.BelongsToManyAddAssociationMixin<comment, commentId>;
  addCommentId_comments!: Sequelize.BelongsToManyAddAssociationsMixin<comment, commentId>;
  createCommentId_comment!: Sequelize.BelongsToManyCreateAssociationMixin<comment>;
  removeCommentId_comment!: Sequelize.BelongsToManyRemoveAssociationMixin<comment, commentId>;
  removeCommentId_comments!: Sequelize.BelongsToManyRemoveAssociationsMixin<comment, commentId>;
  hasCommentId_comment!: Sequelize.BelongsToManyHasAssociationMixin<comment, commentId>;
  hasCommentId_comments!: Sequelize.BelongsToManyHasAssociationsMixin<comment, commentId>;
  countCommentId_comments!: Sequelize.BelongsToManyCountAssociationsMixin;
  // user hasMany commentInteraction via userId
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

  static initModel(sequelize: Sequelize.Sequelize): typeof user {
    return user.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'user',
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
    ]
  });
  }
}
