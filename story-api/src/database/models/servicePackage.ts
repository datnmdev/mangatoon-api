import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { servicePackageTransaction, servicePackageTransactionId } from './servicePackageTransaction';

export interface servicePackageAttributes {
  id: number;
  expireIn: number;
}

export type servicePackagePk = "id";
export type servicePackageId = servicePackage[servicePackagePk];
export type servicePackageCreationAttributes = servicePackageAttributes;

export class servicePackage extends Model<servicePackageAttributes, servicePackageCreationAttributes> implements servicePackageAttributes {
  id!: number;
  expireIn!: number;

  // servicePackage hasMany servicePackageTransaction via servicePackageId
  servicePackageTransactions!: servicePackageTransaction[];
  getServicePackageTransactions!: Sequelize.HasManyGetAssociationsMixin<servicePackageTransaction>;
  setServicePackageTransactions!: Sequelize.HasManySetAssociationsMixin<servicePackageTransaction, servicePackageTransactionId>;
  addServicePackageTransaction!: Sequelize.HasManyAddAssociationMixin<servicePackageTransaction, servicePackageTransactionId>;
  addServicePackageTransactions!: Sequelize.HasManyAddAssociationsMixin<servicePackageTransaction, servicePackageTransactionId>;
  createServicePackageTransaction!: Sequelize.HasManyCreateAssociationMixin<servicePackageTransaction>;
  removeServicePackageTransaction!: Sequelize.HasManyRemoveAssociationMixin<servicePackageTransaction, servicePackageTransactionId>;
  removeServicePackageTransactions!: Sequelize.HasManyRemoveAssociationsMixin<servicePackageTransaction, servicePackageTransactionId>;
  hasServicePackageTransaction!: Sequelize.HasManyHasAssociationMixin<servicePackageTransaction, servicePackageTransactionId>;
  hasServicePackageTransactions!: Sequelize.HasManyHasAssociationsMixin<servicePackageTransaction, servicePackageTransactionId>;
  countServicePackageTransactions!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof servicePackage {
    return servicePackage.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    expireIn: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'servicePackage',
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
    ]
  });
  }
}
