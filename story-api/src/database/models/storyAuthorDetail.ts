import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { author, authorId } from './author';
import type { story, storyId } from './story';

export interface storyAuthorDetailAttributes {
  storyId: number;
  authorId: number;
}

export type storyAuthorDetailPk = "storyId" | "authorId";
export type storyAuthorDetailId = storyAuthorDetail[storyAuthorDetailPk];
export type storyAuthorDetailCreationAttributes = storyAuthorDetailAttributes;

export class storyAuthorDetail extends Model<storyAuthorDetailAttributes, storyAuthorDetailCreationAttributes> implements storyAuthorDetailAttributes {
  storyId!: number;
  authorId!: number;

  // storyAuthorDetail belongsTo author via authorId
  author!: author;
  getAuthor!: Sequelize.BelongsToGetAssociationMixin<author>;
  setAuthor!: Sequelize.BelongsToSetAssociationMixin<author, authorId>;
  createAuthor!: Sequelize.BelongsToCreateAssociationMixin<author>;
  // storyAuthorDetail belongsTo story via storyId
  story!: story;
  getStory!: Sequelize.BelongsToGetAssociationMixin<story>;
  setStory!: Sequelize.BelongsToSetAssociationMixin<story, storyId>;
  createStory!: Sequelize.BelongsToCreateAssociationMixin<story>;

  static initModel(sequelize: Sequelize.Sequelize): typeof storyAuthorDetail {
    return storyAuthorDetail.init({
    storyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'story',
        key: 'id'
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'author',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'storyAuthorDetail',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "storyId" },
          { name: "authorId" },
        ]
      },
      {
        name: "FK_story_author_idx",
        using: "BTREE",
        fields: [
          { name: "authorId" },
        ]
      },
    ]
  });
  }
}
