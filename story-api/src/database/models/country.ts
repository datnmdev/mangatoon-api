import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { story, storyId } from './story';

export interface countryAttributes {
  id: number;
  name: string;
}

export type countryPk = "id";
export type countryId = country[countryPk];
export type countryOptionalAttributes = "id";
export type countryCreationAttributes = Optional<countryAttributes, countryOptionalAttributes>;

export class country extends Model<countryAttributes, countryCreationAttributes> implements countryAttributes {
  id!: number;
  name!: string;

  // country hasMany story via countryId
  stories!: story[];
  getStories!: Sequelize.HasManyGetAssociationsMixin<story>;
  setStories!: Sequelize.HasManySetAssociationsMixin<story, storyId>;
  addStory!: Sequelize.HasManyAddAssociationMixin<story, storyId>;
  addStories!: Sequelize.HasManyAddAssociationsMixin<story, storyId>;
  createStory!: Sequelize.HasManyCreateAssociationMixin<story>;
  removeStory!: Sequelize.HasManyRemoveAssociationMixin<story, storyId>;
  removeStories!: Sequelize.HasManyRemoveAssociationsMixin<story, storyId>;
  hasStory!: Sequelize.HasManyHasAssociationMixin<story, storyId>;
  hasStories!: Sequelize.HasManyHasAssociationsMixin<story, storyId>;
  countStories!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof country {
    return country.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'country',
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
