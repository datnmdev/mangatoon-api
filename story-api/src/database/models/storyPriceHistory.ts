import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { story, storyId } from './story';

export interface storyPriceHistoryAttributes {
  id: number;
  price: number;
  startTime: Date;
  storyId: number;
}

export type storyPriceHistoryPk = "id";
export type storyPriceHistoryId = storyPriceHistory[storyPriceHistoryPk];
export type storyPriceHistoryOptionalAttributes = "id";
export type storyPriceHistoryCreationAttributes = Optional<storyPriceHistoryAttributes, storyPriceHistoryOptionalAttributes>;

export class storyPriceHistory extends Model<storyPriceHistoryAttributes, storyPriceHistoryCreationAttributes> implements storyPriceHistoryAttributes {
  id!: number;
  price!: number;
  startTime!: Date;
  storyId!: number;

  // storyPriceHistory belongsTo story via storyId
  story!: story;
  getStory!: Sequelize.BelongsToGetAssociationMixin<story>;
  setStory!: Sequelize.BelongsToSetAssociationMixin<story, storyId>;
  createStory!: Sequelize.BelongsToCreateAssociationMixin<story>;

  static initModel(sequelize: Sequelize.Sequelize): typeof storyPriceHistory {
    return storyPriceHistory.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    price: {
      type: DataTypes.DECIMAL(12,3),
      allowNull: false
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    storyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'story',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'storyPriceHistory',
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
        name: "FK_story_storyPriceHistory_story_idx",
        using: "BTREE",
        fields: [
          { name: "storyId" },
        ]
      },
    ]
  });
  }
}
