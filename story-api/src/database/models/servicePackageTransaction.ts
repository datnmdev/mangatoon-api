import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { servicePackage, servicePackageId } from './servicePackage';
import type { user, userId } from './user';

export interface servicePackageTransactionAttributes {
  id: number;
  createdAt: Date;
  servicePackageId: number;
  userId: number;
}

export interface servicePackageTransactionAttr extends servicePackageTransactionAttributes {
  servicePackage: servicePackage
}

export type servicePackageTransactionPk = "id";
export type servicePackageTransactionId = servicePackageTransaction[servicePackageTransactionPk];
export type servicePackageTransactionOptionalAttributes = "createdAt";
export type servicePackageTransactionCreationAttributes = Optional<servicePackageTransactionAttributes, servicePackageTransactionOptionalAttributes>;

export class servicePackageTransaction extends Model<servicePackageTransactionAttributes, servicePackageTransactionCreationAttributes> implements servicePackageTransactionAttributes {
  id!: number;
  createdAt!: Date;
  servicePackageId!: number;
  userId!: number;

  // servicePackageTransaction belongsTo servicePackage via servicePackageId
  servicePackage!: servicePackage;
  getServicePackage!: Sequelize.BelongsToGetAssociationMixin<servicePackage>;
  setServicePackage!: Sequelize.BelongsToSetAssociationMixin<servicePackage, servicePackageId>;
  createServicePackage!: Sequelize.BelongsToCreateAssociationMixin<servicePackage>;
  // servicePackageTransaction belongsTo user via userId
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof servicePackageTransaction {
    return servicePackageTransaction.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    servicePackageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'servicePackage',
        key: 'id'
      }
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
    tableName: 'servicePackageTransaction',
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
        name: "FK_servicePackage_servicePackageTransaction_idx",
        using: "BTREE",
        fields: [
          { name: "servicePackageId" },
        ]
      },
      {
        name: "FK_user_servicePackageTransaction_idx",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
  }
}
