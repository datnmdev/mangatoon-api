import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { story, storyId } from './story';
import type { user, userId } from './user';

export interface storyFollowDetailAttributes {
  storyId: number;
  userId: number;
}

export type storyFollowDetailPk = "storyId" | "userId";
export type storyFollowDetailId = storyFollowDetail[storyFollowDetailPk];
export type storyFollowDetailCreationAttributes = storyFollowDetailAttributes;

export class storyFollowDetail extends Model<storyFollowDetailAttributes, storyFollowDetailCreationAttributes> implements storyFollowDetailAttributes {
  storyId!: number;
  userId!: number;

  // storyFollowDetail belongsTo story via storyId
  story!: story;
  getStory!: Sequelize.BelongsToGetAssociationMixin<story>;
  setStory!: Sequelize.BelongsToSetAssociationMixin<story, storyId>;
  createStory!: Sequelize.BelongsToCreateAssociationMixin<story>;
  // storyFollowDetail belongsTo user via userId
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof storyFollowDetail {
    return storyFollowDetail.init({
    storyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'story',
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
    }
  }, {
    sequelize,
    tableName: 'storyFollowDetail',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "storyId" },
          { name: "userId" },
        ]
      },
      {
        name: "FK_user_storyFollowDetail_idx",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
  }
}
