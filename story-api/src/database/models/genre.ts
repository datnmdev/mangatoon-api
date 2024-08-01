import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { story, storyId } from './story';
import type { storyGenreDetail, storyGenreDetailId } from './storyGenreDetail';

export interface genreAttributes {
  id: number;
  name: string;
  description?: string;
}

export type genrePk = "id";
export type genreId = genre[genrePk];
export type genreOptionalAttributes = "id" | "description";
export type genreCreationAttributes = Optional<genreAttributes, genreOptionalAttributes>;

export class genre extends Model<genreAttributes, genreCreationAttributes> implements genreAttributes {
  id!: number;
  name!: string;
  description?: string;

  // genre belongsToMany story via genreId and storyId
  storyId_story_storyGenreDetails!: story[];
  getStoryId_story_storyGenreDetails!: Sequelize.BelongsToManyGetAssociationsMixin<story>;
  setStoryId_story_storyGenreDetails!: Sequelize.BelongsToManySetAssociationsMixin<story, storyId>;
  addStoryId_story_storyGenreDetail!: Sequelize.BelongsToManyAddAssociationMixin<story, storyId>;
  addStoryId_story_storyGenreDetails!: Sequelize.BelongsToManyAddAssociationsMixin<story, storyId>;
  createStoryId_story_storyGenreDetail!: Sequelize.BelongsToManyCreateAssociationMixin<story>;
  removeStoryId_story_storyGenreDetail!: Sequelize.BelongsToManyRemoveAssociationMixin<story, storyId>;
  removeStoryId_story_storyGenreDetails!: Sequelize.BelongsToManyRemoveAssociationsMixin<story, storyId>;
  hasStoryId_story_storyGenreDetail!: Sequelize.BelongsToManyHasAssociationMixin<story, storyId>;
  hasStoryId_story_storyGenreDetails!: Sequelize.BelongsToManyHasAssociationsMixin<story, storyId>;
  countStoryId_story_storyGenreDetails!: Sequelize.BelongsToManyCountAssociationsMixin;
  // genre hasMany storyGenreDetail via genreId
  storyGenreDetails!: storyGenreDetail[];
  getStoryGenreDetails!: Sequelize.HasManyGetAssociationsMixin<storyGenreDetail>;
  setStoryGenreDetails!: Sequelize.HasManySetAssociationsMixin<storyGenreDetail, storyGenreDetailId>;
  addStoryGenreDetail!: Sequelize.HasManyAddAssociationMixin<storyGenreDetail, storyGenreDetailId>;
  addStoryGenreDetails!: Sequelize.HasManyAddAssociationsMixin<storyGenreDetail, storyGenreDetailId>;
  createStoryGenreDetail!: Sequelize.HasManyCreateAssociationMixin<storyGenreDetail>;
  removeStoryGenreDetail!: Sequelize.HasManyRemoveAssociationMixin<storyGenreDetail, storyGenreDetailId>;
  removeStoryGenreDetails!: Sequelize.HasManyRemoveAssociationsMixin<storyGenreDetail, storyGenreDetailId>;
  hasStoryGenreDetail!: Sequelize.HasManyHasAssociationMixin<storyGenreDetail, storyGenreDetailId>;
  hasStoryGenreDetails!: Sequelize.HasManyHasAssociationsMixin<storyGenreDetail, storyGenreDetailId>;
  countStoryGenreDetails!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof genre {
    return genre.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'genre',
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
        name: "FTS_name_genre",
        type: "FULLTEXT",
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
  }
}
