import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { emailPasswordCredential, emailPasswordCredentialCreationAttributes, emailPasswordCredentialId } from './emailPasswordCredential';
import type { facebookCredential, facebookCredentialCreationAttributes, facebookCredentialId } from './facebookCredential';
import type { googleCredential, googleCredentialCreationAttributes, googleCredentialId } from './googleCredential';
import type { user, userId } from './user';

export interface accountAttributes {
  id: number;
  status: number;
  role: string;
  createdAt: Date;
  userId: number;
  provider: string;
}

export type accountPk = "id";
export type accountId = account[accountPk];
export type accountOptionalAttributes = "id" | "status" | "role" | "createdAt" | "provider";
export type accountCreationAttributes = Optional<accountAttributes, accountOptionalAttributes>;

export class account extends Model<accountAttributes, accountCreationAttributes> implements accountAttributes {
  id!: number;
  status!: number;
  role!: string;
  createdAt!: Date;
  userId!: number;
  provider!: string;

  // account hasOne emailPasswordCredential via id
  emailPasswordCredential!: emailPasswordCredential;
  getEmailPasswordCredential!: Sequelize.HasOneGetAssociationMixin<emailPasswordCredential>;
  setEmailPasswordCredential!: Sequelize.HasOneSetAssociationMixin<emailPasswordCredential, emailPasswordCredentialId>;
  createEmailPasswordCredential!: Sequelize.HasOneCreateAssociationMixin<emailPasswordCredential>;
  // account hasOne facebookCredential via id
  facebookCredential!: facebookCredential;
  getFacebookCredential!: Sequelize.HasOneGetAssociationMixin<facebookCredential>;
  setFacebookCredential!: Sequelize.HasOneSetAssociationMixin<facebookCredential, facebookCredentialId>;
  createFacebookCredential!: Sequelize.HasOneCreateAssociationMixin<facebookCredential>;
  // account hasOne googleCredential via id
  googleCredential!: googleCredential;
  getGoogleCredential!: Sequelize.HasOneGetAssociationMixin<googleCredential>;
  setGoogleCredential!: Sequelize.HasOneSetAssociationMixin<googleCredential, googleCredentialId>;
  createGoogleCredential!: Sequelize.HasOneCreateAssociationMixin<googleCredential>;
  // account belongsTo user via userId
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof account {
    return account.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "user"
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
      },
      unique: "FK_user_account"
    },
    provider: {
      type: DataTypes.STRING(150),
      allowNull: false,
      defaultValue: "local"
    }
  }, {
    sequelize,
    tableName: 'account',
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
        name: "userId_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
  }
}
