import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { story, storyId } from './story';
import type { user, userId } from './user';

export interface storyRatingDetailAttributes {
  storyId: number;
  userId: number;
  star: number;
}

export type storyRatingDetailPk = "storyId" | "userId";
export type storyRatingDetailId = storyRatingDetail[storyRatingDetailPk];
export type storyRatingDetailCreationAttributes = storyRatingDetailAttributes;

export class storyRatingDetail extends Model<storyRatingDetailAttributes, storyRatingDetailCreationAttributes> implements storyRatingDetailAttributes {
  storyId!: number;
  userId!: number;
  star!: number;

  // storyRatingDetail belongsTo story via storyId
  story!: story;
  getStory!: Sequelize.BelongsToGetAssociationMixin<story>;
  setStory!: Sequelize.BelongsToSetAssociationMixin<story, storyId>;
  createStory!: Sequelize.BelongsToCreateAssociationMixin<story>;
  // storyRatingDetail belongsTo user via userId
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof storyRatingDetail {
    return storyRatingDetail.init({
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
    },
    star: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'storyRatingDetail',
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
        name: "FK_user_storyRatingDetail_idx",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
  }
}
