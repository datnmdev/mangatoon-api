import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { account, accountId } from './account';

export interface facebookCredentialAttributes {
  id: number;
  uid: string;
}

export type facebookCredentialPk = "id";
export type facebookCredentialId = facebookCredential[facebookCredentialPk];
export type facebookCredentialCreationAttributes = facebookCredentialAttributes;

export class facebookCredential extends Model<facebookCredentialAttributes, facebookCredentialCreationAttributes> implements facebookCredentialAttributes {
  id!: number;
  uid!: string;

  // facebookCredential belongsTo account via id
  id_account!: account;
  getId_account!: Sequelize.BelongsToGetAssociationMixin<account>;
  setId_account!: Sequelize.BelongsToSetAssociationMixin<account, accountId>;
  createId_account!: Sequelize.BelongsToCreateAssociationMixin<account>;

  static initModel(sequelize: Sequelize.Sequelize): typeof facebookCredential {
    return facebookCredential.init({
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
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "uid_UNIQUE"
    }
  }, {
    sequelize,
    tableName: 'facebookCredential',
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
