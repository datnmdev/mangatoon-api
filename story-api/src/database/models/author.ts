import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { story, storyId } from './story';
import type { storyAuthorDetail, storyAuthorDetailId } from './storyAuthorDetail';

export interface authorAttributes {
  id: number;
  name: string;
}

export type authorPk = "id";
export type authorId = author[authorPk];
export type authorOptionalAttributes = "id";
export type authorCreationAttributes = Optional<authorAttributes, authorOptionalAttributes>;

export class author extends Model<authorAttributes, authorCreationAttributes> implements authorAttributes {
  id!: number;
  name!: string;

  // author belongsToMany story via authorId and storyId
  storyId_stories!: story[];
  getStoryId_stories!: Sequelize.BelongsToManyGetAssociationsMixin<story>;
  setStoryId_stories!: Sequelize.BelongsToManySetAssociationsMixin<story, storyId>;
  addStoryId_story!: Sequelize.BelongsToManyAddAssociationMixin<story, storyId>;
  addStoryId_stories!: Sequelize.BelongsToManyAddAssociationsMixin<story, storyId>;
  createStoryId_story!: Sequelize.BelongsToManyCreateAssociationMixin<story>;
  removeStoryId_story!: Sequelize.BelongsToManyRemoveAssociationMixin<story, storyId>;
  removeStoryId_stories!: Sequelize.BelongsToManyRemoveAssociationsMixin<story, storyId>;
  hasStoryId_story!: Sequelize.BelongsToManyHasAssociationMixin<story, storyId>;
  hasStoryId_stories!: Sequelize.BelongsToManyHasAssociationsMixin<story, storyId>;
  countStoryId_stories!: Sequelize.BelongsToManyCountAssociationsMixin;
  // author hasMany storyAuthorDetail via authorId
  storyAuthorDetails!: storyAuthorDetail[];
  getStoryAuthorDetails!: Sequelize.HasManyGetAssociationsMixin<storyAuthorDetail>;
  setStoryAuthorDetails!: Sequelize.HasManySetAssociationsMixin<storyAuthorDetail, storyAuthorDetailId>;
  addStoryAuthorDetail!: Sequelize.HasManyAddAssociationMixin<storyAuthorDetail, storyAuthorDetailId>;
  addStoryAuthorDetails!: Sequelize.HasManyAddAssociationsMixin<storyAuthorDetail, storyAuthorDetailId>;
  createStoryAuthorDetail!: Sequelize.HasManyCreateAssociationMixin<storyAuthorDetail>;
  removeStoryAuthorDetail!: Sequelize.HasManyRemoveAssociationMixin<storyAuthorDetail, storyAuthorDetailId>;
  removeStoryAuthorDetails!: Sequelize.HasManyRemoveAssociationsMixin<storyAuthorDetail, storyAuthorDetailId>;
  hasStoryAuthorDetail!: Sequelize.HasManyHasAssociationMixin<storyAuthorDetail, storyAuthorDetailId>;
  hasStoryAuthorDetails!: Sequelize.HasManyHasAssociationsMixin<storyAuthorDetail, storyAuthorDetailId>;
  countStoryAuthorDetails!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof author {
    return author.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'author',
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
        name: "FTS_name_author",
        type: "FULLTEXT",
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
  }
}
