import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { chapterImages, chapterImagesId } from './chapterImages';
import type { historyDetail, historyDetailId } from './historyDetail';
import type { story, storyId } from './story';
import type { viewDetail, viewDetailId } from './viewDetail';

export interface chapterAttributes {
  id: number;
  order: number;
  name: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  storyId: number;
}

export type chapterPk = "id";
export type chapterId = chapter[chapterPk];
export type chapterOptionalAttributes = "id" | "status" | "createdAt" | "updatedAt";
export type chapterCreationAttributes = Optional<chapterAttributes, chapterOptionalAttributes>;

export class chapter extends Model<chapterAttributes, chapterCreationAttributes> implements chapterAttributes {
  id!: number;
  order!: number;
  name!: string;
  status!: number;
  createdAt!: Date;
  updatedAt!: Date;
  storyId!: number;

  // chapter hasMany chapterImages via chapterId
  chapterImages!: chapterImages[];
  getChapterImages!: Sequelize.HasManyGetAssociationsMixin<chapterImages>;
  setChapterImages!: Sequelize.HasManySetAssociationsMixin<chapterImages, chapterImagesId>;
  addChapterImage!: Sequelize.HasManyAddAssociationMixin<chapterImages, chapterImagesId>;
  addChapterImages!: Sequelize.HasManyAddAssociationsMixin<chapterImages, chapterImagesId>;
  createChapterImage!: Sequelize.HasManyCreateAssociationMixin<chapterImages>;
  removeChapterImage!: Sequelize.HasManyRemoveAssociationMixin<chapterImages, chapterImagesId>;
  removeChapterImages!: Sequelize.HasManyRemoveAssociationsMixin<chapterImages, chapterImagesId>;
  hasChapterImage!: Sequelize.HasManyHasAssociationMixin<chapterImages, chapterImagesId>;
  hasChapterImages!: Sequelize.HasManyHasAssociationsMixin<chapterImages, chapterImagesId>;
  countChapterImages!: Sequelize.HasManyCountAssociationsMixin;
  // chapter hasMany historyDetail via chapterId
  historyDetails!: historyDetail[];
  getHistoryDetails!: Sequelize.HasManyGetAssociationsMixin<historyDetail>;
  setHistoryDetails!: Sequelize.HasManySetAssociationsMixin<historyDetail, historyDetailId>;
  addHistoryDetail!: Sequelize.HasManyAddAssociationMixin<historyDetail, historyDetailId>;
  addHistoryDetails!: Sequelize.HasManyAddAssociationsMixin<historyDetail, historyDetailId>;
  createHistoryDetail!: Sequelize.HasManyCreateAssociationMixin<historyDetail>;
  removeHistoryDetail!: Sequelize.HasManyRemoveAssociationMixin<historyDetail, historyDetailId>;
  removeHistoryDetails!: Sequelize.HasManyRemoveAssociationsMixin<historyDetail, historyDetailId>;
  hasHistoryDetail!: Sequelize.HasManyHasAssociationMixin<historyDetail, historyDetailId>;
  hasHistoryDetails!: Sequelize.HasManyHasAssociationsMixin<historyDetail, historyDetailId>;
  countHistoryDetails!: Sequelize.HasManyCountAssociationsMixin;
  // chapter hasMany viewDetail via chapterId
  viewDetails!: viewDetail[];
  getViewDetails!: Sequelize.HasManyGetAssociationsMixin<viewDetail>;
  setViewDetails!: Sequelize.HasManySetAssociationsMixin<viewDetail, viewDetailId>;
  addViewDetail!: Sequelize.HasManyAddAssociationMixin<viewDetail, viewDetailId>;
  addViewDetails!: Sequelize.HasManyAddAssociationsMixin<viewDetail, viewDetailId>;
  createViewDetail!: Sequelize.HasManyCreateAssociationMixin<viewDetail>;
  removeViewDetail!: Sequelize.HasManyRemoveAssociationMixin<viewDetail, viewDetailId>;
  removeViewDetails!: Sequelize.HasManyRemoveAssociationsMixin<viewDetail, viewDetailId>;
  hasViewDetail!: Sequelize.HasManyHasAssociationMixin<viewDetail, viewDetailId>;
  hasViewDetails!: Sequelize.HasManyHasAssociationsMixin<viewDetail, viewDetailId>;
  countViewDetails!: Sequelize.HasManyCountAssociationsMixin;
  // chapter belongsTo story via storyId
  story!: story;
  getStory!: Sequelize.BelongsToGetAssociationMixin<story>;
  setStory!: Sequelize.BelongsToSetAssociationMixin<story, storyId>;
  createStory!: Sequelize.BelongsToCreateAssociationMixin<story>;

  static initModel(sequelize: Sequelize.Sequelize): typeof chapter {
    return chapter.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
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
    tableName: 'chapter',
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
        name: "FK_story_chapter_idx",
        using: "BTREE",
        fields: [
          { name: "storyId" },
        ]
      },
      {
        name: "FTS_name_chapter",
        type: "FULLTEXT",
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
  }
}
