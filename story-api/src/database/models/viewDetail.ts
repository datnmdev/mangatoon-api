import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { chapter, chapterId } from './chapter';

export interface viewDetailAttributes {
  id: number;
  createdAt: Date;
  chapterId: number;
  clientId: string;
}

export type viewDetailPk = "id";
export type viewDetailId = viewDetail[viewDetailPk];
export type viewDetailOptionalAttributes = "id" | "createdAt";
export type viewDetailCreationAttributes = Optional<viewDetailAttributes, viewDetailOptionalAttributes>;

export class viewDetail extends Model<viewDetailAttributes, viewDetailCreationAttributes> implements viewDetailAttributes {
  id!: number;
  createdAt!: Date;
  chapterId!: number;
  clientId!: string;

  // viewDetail belongsTo chapter via chapterId
  chapter!: chapter;
  getChapter!: Sequelize.BelongsToGetAssociationMixin<chapter>;
  setChapter!: Sequelize.BelongsToSetAssociationMixin<chapter, chapterId>;
  createChapter!: Sequelize.BelongsToCreateAssociationMixin<chapter>;

  static initModel(sequelize: Sequelize.Sequelize): typeof viewDetail {
    return viewDetail.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    chapterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'chapter',
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    clientId: {
      type: DataTypes.STRING(250),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'viewDetail',
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
        name: "FK_chapter_viewDetail_idx",
        using: "BTREE",
        fields: [
          { name: "chapterId" },
        ]
      },
    ]
  });
  }
}
