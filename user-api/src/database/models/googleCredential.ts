import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { account, accountId } from './account';

export interface googleCredentialAttributes {
  id: number;
  uid: string;
}

export type googleCredentialPk = "id";
export type googleCredentialId = googleCredential[googleCredentialPk];
export type googleCredentialCreationAttributes = googleCredentialAttributes;

export class googleCredential extends Model<googleCredentialAttributes, googleCredentialCreationAttributes> implements googleCredentialAttributes {
  id!: number;
  uid!: string;

  // googleCredential belongsTo account via id
  id_account!: account;
  getId_account!: Sequelize.BelongsToGetAssociationMixin<account>;
  setId_account!: Sequelize.BelongsToSetAssociationMixin<account, accountId>;
  createId_account!: Sequelize.BelongsToCreateAssociationMixin<account>;

  static initModel(sequelize: Sequelize.Sequelize): typeof googleCredential {
    return googleCredential.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'account',
        key: 'id'
      }
    },
    uid: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: "uid_UNIQUE"
    }
  }, {
    sequelize,
    tableName: 'googleCredential',
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
        name: "uid_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "uid" },
        ]
      },
    ]
  });
  }
}
