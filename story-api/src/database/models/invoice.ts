import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { story, storyId } from './story';
import type { user, userId } from './user';

export interface invoiceAttributes {
  storyId: number;
  userId: number;
}

export type invoicePk = "storyId" | "userId";
export type invoiceId = invoice[invoicePk];
export type invoiceCreationAttributes = invoiceAttributes;

export class invoice extends Model<invoiceAttributes, invoiceCreationAttributes> implements invoiceAttributes {
  storyId!: number;
  userId!: number;

  // invoice belongsTo story via storyId
  story!: story;
  getStory!: Sequelize.BelongsToGetAssociationMixin<story>;
  setStory!: Sequelize.BelongsToSetAssociationMixin<story, storyId>;
  createStory!: Sequelize.BelongsToCreateAssociationMixin<story>;
  // invoice belongsTo user via userId
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof invoice {
    return invoice.init({
    storyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'story',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'invoice',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "storyId" },
          { name: "userId" },
        ]
      },
      {
        name: "FK_user_invoice_idx",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
  }
}
