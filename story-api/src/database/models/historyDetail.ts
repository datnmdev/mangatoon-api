import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { chapter, chapterId } from './chapter';
import type { user, userId } from './user';

export interface historyDetailAttributes {
  id: number;
  createdAt: Date;
  chapterId: number;
  userId: number;
}

export type historyDetailPk = "id";
export type historyDetailId = historyDetail[historyDetailPk];
export type historyDetailOptionalAttributes = "id" | "createdAt";
export type historyDetailCreationAttributes = Optional<historyDetailAttributes, historyDetailOptionalAttributes>;

export class historyDetail extends Model<historyDetailAttributes, historyDetailCreationAttributes> implements historyDetailAttributes {
  id!: number;
  createdAt!: Date;
  chapterId!: number;
  userId!: number;

  // historyDetail belongsTo chapter via chapterId
  chapter!: chapter;
  getChapter!: Sequelize.BelongsToGetAssociationMixin<chapter>;
  setChapter!: Sequelize.BelongsToSetAssociationMixin<chapter, chapterId>;
  createChapter!: Sequelize.BelongsToCreateAssociationMixin<chapter>;
  // historyDetail belongsTo user via userId
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof historyDetail {
    return historyDetail.init({
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'historyDetail',
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
        name: "FK_chapter_historyDetail_idx",
        using: "BTREE",
        fields: [
          { name: "chapterId" },
        ]
      },
      {
        name: "FK_user_historyDetail_idx",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
  }
}
