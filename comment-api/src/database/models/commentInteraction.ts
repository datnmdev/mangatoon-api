import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { comment, commentId } from './comment';
import type { user, userId } from './user';

export interface commentInteractionAttributes {
  commentId: number;
  userId: number;
  interactionType: number;
}

export type commentInteractionPk = "commentId" | "userId";
export type commentInteractionId = commentInteraction[commentInteractionPk];
export type commentInteractionCreationAttributes = commentInteractionAttributes;

export class commentInteraction extends Model<commentInteractionAttributes, commentInteractionCreationAttributes> implements commentInteractionAttributes {
  commentId!: number;
  userId!: number;
  interactionType!: number;

  // commentInteraction belongsTo comment via commentId
  comment!: comment;
  getComment!: Sequelize.BelongsToGetAssociationMixin<comment>;
  setComment!: Sequelize.BelongsToSetAssociationMixin<comment, commentId>;
  createComment!: Sequelize.BelongsToCreateAssociationMixin<comment>;
  // commentInteraction belongsTo user via userId
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof commentInteraction {
    return commentInteraction.init({
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'comment',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    interactionType: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'commentInteraction',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "commentId" },
          { name: "userId" },
        ]
      },
      {
        name: "FK_user_commentInteraction_idx",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
  }
}
