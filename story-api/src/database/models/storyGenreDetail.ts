import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { genre, genreId } from './genre';
import type { story, storyId } from './story';

export interface storyGenreDetailAttributes {
  storyId: number;
  genreId: number;
}

export type storyGenreDetailPk = "storyId" | "genreId";
export type storyGenreDetailId = storyGenreDetail[storyGenreDetailPk];
export type storyGenreDetailCreationAttributes = storyGenreDetailAttributes;

export class storyGenreDetail extends Model<storyGenreDetailAttributes, storyGenreDetailCreationAttributes> implements storyGenreDetailAttributes {
  storyId!: number;
  genreId!: number;

  // storyGenreDetail belongsTo genre via genreId
  genre!: genre;
  getGenre!: Sequelize.BelongsToGetAssociationMixin<genre>;
  setGenre!: Sequelize.BelongsToSetAssociationMixin<genre, genreId>;
  createGenre!: Sequelize.BelongsToCreateAssociationMixin<genre>;
  // storyGenreDetail belongsTo story via storyId
  story!: story;
  getStory!: Sequelize.BelongsToGetAssociationMixin<story>;
  setStory!: Sequelize.BelongsToSetAssociationMixin<story, storyId>;
  createStory!: Sequelize.BelongsToCreateAssociationMixin<story>;

  static initModel(sequelize: Sequelize.Sequelize): typeof storyGenreDetail {
    return storyGenreDetail.init({
    storyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'story',
        key: 'id'
      }
    },
    genreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'genre',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'storyGenreDetail',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "storyId" },
          { name: "genreId" },
        ]
      },
      {
        name: "FK_genre_storyGenreDetail_idx",
        using: "BTREE",
        fields: [
          { name: "genreId" },
        ]
      },
    ]
  });
  }
}
