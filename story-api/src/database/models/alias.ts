import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { story, storyId } from './story';

export interface aliasAttributes {
  id: number;
  title: string;
  storyId: number;
}

export type aliasPk = "id";
export type aliasId = alias[aliasPk];
export type aliasOptionalAttributes = "id";
export type aliasCreationAttributes = Optional<aliasAttributes, aliasOptionalAttributes>;

export class alias extends Model<aliasAttributes, aliasCreationAttributes> implements aliasAttributes {
  id!: number;
  title!: string;
  storyId!: number;

  // alias belongsTo story via storyId
  story!: story;
  getStory!: Sequelize.BelongsToGetAssociationMixin<story>;
  setStory!: Sequelize.BelongsToSetAssociationMixin<story, storyId>;
  createStory!: Sequelize.BelongsToCreateAssociationMixin<story>;

  static initModel(sequelize: Sequelize.Sequelize): typeof alias {
    return alias.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(250),
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
    tableName: 'alias',
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
        name: "FK_story_alias_idx",
        using: "BTREE",
        fields: [
          { name: "storyId" },
        ]
      },
      {
        name: "FTS_title_alias",
        type: "FULLTEXT",
        fields: [
          { name: "title" },
        ]
      },
    ]
  });
  }
}
