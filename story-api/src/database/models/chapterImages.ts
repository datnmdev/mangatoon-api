import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { chapter, chapterId } from './chapter';

export interface chapterImagesAttributes {
  id: number;
  path: string;
  chapterId: number;
  order?: number;
}

export type chapterImagesPk = "id";
export type chapterImagesId = chapterImages[chapterImagesPk];
export type chapterImagesOptionalAttributes = "id" | "order";
export type chapterImagesCreationAttributes = Optional<chapterImagesAttributes, chapterImagesOptionalAttributes>;

export class chapterImages extends Model<chapterImagesAttributes, chapterImagesCreationAttributes> implements chapterImagesAttributes {
  id!: number;
  path!: string;
  chapterId!: number;
  order?: number;

  // chapterImages belongsTo chapter via chapterId
  chapter!: chapter;
  getChapter!: Sequelize.BelongsToGetAssociationMixin<chapter>;
  setChapter!: Sequelize.BelongsToSetAssociationMixin<chapter, chapterId>;
  createChapter!: Sequelize.BelongsToCreateAssociationMixin<chapter>;

  static initModel(sequelize: Sequelize.Sequelize): typeof chapterImages {
    return chapterImages.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    path: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    chapterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'chapter',
        key: 'id'
      }
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'chapterImages',
    hasTrigger: true,
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
        name: "FK_chapter_chapterImages_idx",
        using: "BTREE",
        fields: [
          { name: "chapterId" },
        ]
      },
    ]
  });
  }
}
