import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { account, accountId } from './account';

export interface emailPasswordCredentialAttributes {
  id: number;
  email: string;
  password: string;
}

export type emailPasswordCredentialPk = "id";
export type emailPasswordCredentialId = emailPasswordCredential[emailPasswordCredentialPk];
export type emailPasswordCredentialCreationAttributes = emailPasswordCredentialAttributes;

export class emailPasswordCredential extends Model<emailPasswordCredentialAttributes, emailPasswordCredentialCreationAttributes> implements emailPasswordCredentialAttributes {
  id!: number;
  email!: string;
  password!: string;

  // emailPasswordCredential belongsTo account via id
  id_account!: account;
  getId_account!: Sequelize.BelongsToGetAssociationMixin<account>;
  setId_account!: Sequelize.BelongsToSetAssociationMixin<account, accountId>;
  createId_account!: Sequelize.BelongsToCreateAssociationMixin<account>;

  static initModel(sequelize: Sequelize.Sequelize): typeof emailPasswordCredential {
    return emailPasswordCredential.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'account',
        key: 'id'
      }
    },
    email: {
      type: DataTypes.STRING(75),
      allowNull: false,
      unique: "email_UNIQUE"
    },
    password: {
      type: DataTypes.STRING(250),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'emailPasswordCredential',
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
        name: "email_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
  }
}
