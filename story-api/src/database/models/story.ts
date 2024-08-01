import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { alias, aliasId } from './alias';
import type { author, authorId } from './author';
import type { chapter, chapterId } from './chapter';
import type { country, countryId } from './country';
import type { genre, genreId } from './genre';
import type { storyAuthorDetail, storyAuthorDetailId } from './storyAuthorDetail';
import type { storyFollowDetail, storyFollowDetailId } from './storyFollowDetail';
import type { storyGenreDetail, storyGenreDetailId } from './storyGenreDetail';
import type { storyRatingDetail, storyRatingDetailId } from './storyRatingDetail';
import type { user, userId } from './user';

export interface storyAttributes {
  id: number;
  title: string;
  description?: string;
  coverImageUrl: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  countryId: number;
}

export type storyPk = "id";
export type storyId = story[storyPk];
export type storyOptionalAttributes = "id" | "description" | "status" | "createdAt" | "updatedAt";
export type storyCreationAttributes = Optional<storyAttributes, storyOptionalAttributes>;

export class story extends Model<storyAttributes, storyCreationAttributes> implements storyAttributes {
  id!: number;
  title!: string;
  description?: string;
  coverImageUrl!: string;
  status!: number;
  createdAt!: Date;
  updatedAt!: Date;
  countryId!: number;

  // story belongsTo country via countryId
  country!: country;
  getCountry!: Sequelize.BelongsToGetAssociationMixin<country>;
  setCountry!: Sequelize.BelongsToSetAssociationMixin<country, countryId>;
  createCountry!: Sequelize.BelongsToCreateAssociationMixin<country>;
  // story hasMany alias via storyId
  aliases!: alias[];
  getAliases!: Sequelize.HasManyGetAssociationsMixin<alias>;
  setAliases!: Sequelize.HasManySetAssociationsMixin<alias, aliasId>;
  addAlias!: Sequelize.HasManyAddAssociationMixin<alias, aliasId>;
  addAliases!: Sequelize.HasManyAddAssociationsMixin<alias, aliasId>;
  createAlias!: Sequelize.HasManyCreateAssociationMixin<alias>;
  removeAlias!: Sequelize.HasManyRemoveAssociationMixin<alias, aliasId>;
  removeAliases!: Sequelize.HasManyRemoveAssociationsMixin<alias, aliasId>;
  hasAlias!: Sequelize.HasManyHasAssociationMixin<alias, aliasId>;
  hasAliases!: Sequelize.HasManyHasAssociationsMixin<alias, aliasId>;
  countAliases!: Sequelize.HasManyCountAssociationsMixin;
  // story belongsToMany author via storyId and authorId
  authorId_authors!: author[];
  getAuthorId_authors!: Sequelize.BelongsToManyGetAssociationsMixin<author>;
  setAuthorId_authors!: Sequelize.BelongsToManySetAssociationsMixin<author, authorId>;
  addAuthorId_author!: Sequelize.BelongsToManyAddAssociationMixin<author, authorId>;
  addAuthorId_authors!: Sequelize.BelongsToManyAddAssociationsMixin<author, authorId>;
  createAuthorId_author!: Sequelize.BelongsToManyCreateAssociationMixin<author>;
  removeAuthorId_author!: Sequelize.BelongsToManyRemoveAssociationMixin<author, authorId>;
  removeAuthorId_authors!: Sequelize.BelongsToManyRemoveAssociationsMixin<author, authorId>;
  hasAuthorId_author!: Sequelize.BelongsToManyHasAssociationMixin<author, authorId>;
  hasAuthorId_authors!: Sequelize.BelongsToManyHasAssociationsMixin<author, authorId>;
  countAuthorId_authors!: Sequelize.BelongsToManyCountAssociationsMixin;
  // story hasMany chapter via storyId
  chapters!: chapter[];
  getChapters!: Sequelize.HasManyGetAssociationsMixin<chapter>;
  setChapters!: Sequelize.HasManySetAssociationsMixin<chapter, chapterId>;
  addChapter!: Sequelize.HasManyAddAssociationMixin<chapter, chapterId>;
  addChapters!: Sequelize.HasManyAddAssociationsMixin<chapter, chapterId>;
  createChapter!: Sequelize.HasManyCreateAssociationMixin<chapter>;
  removeChapter!: Sequelize.HasManyRemoveAssociationMixin<chapter, chapterId>;
  removeChapters!: Sequelize.HasManyRemoveAssociationsMixin<chapter, chapterId>;
  hasChapter!: Sequelize.HasManyHasAssociationMixin<chapter, chapterId>;
  hasChapters!: Sequelize.HasManyHasAssociationsMixin<chapter, chapterId>;
  countChapters!: Sequelize.HasManyCountAssociationsMixin;
  // story belongsToMany genre via storyId and genreId
  genreId_genres!: genre[];
  getGenreId_genres!: Sequelize.BelongsToManyGetAssociationsMixin<genre>;
  setGenreId_genres!: Sequelize.BelongsToManySetAssociationsMixin<genre, genreId>;
  addGenreId_genre!: Sequelize.BelongsToManyAddAssociationMixin<genre, genreId>;
  addGenreId_genres!: Sequelize.BelongsToManyAddAssociationsMixin<genre, genreId>;
  createGenreId_genre!: Sequelize.BelongsToManyCreateAssociationMixin<genre>;
  removeGenreId_genre!: Sequelize.BelongsToManyRemoveAssociationMixin<genre, genreId>;
  removeGenreId_genres!: Sequelize.BelongsToManyRemoveAssociationsMixin<genre, genreId>;
  hasGenreId_genre!: Sequelize.BelongsToManyHasAssociationMixin<genre, genreId>;
  hasGenreId_genres!: Sequelize.BelongsToManyHasAssociationsMixin<genre, genreId>;
  countGenreId_genres!: Sequelize.BelongsToManyCountAssociationsMixin;
  // story hasMany storyAuthorDetail via storyId
  storyAuthorDetails!: storyAuthorDetail[];
  getStoryAuthorDetails!: Sequelize.HasManyGetAssociationsMixin<storyAuthorDetail>;
  setStoryAuthorDetails!: Sequelize.HasManySetAssociationsMixin<storyAuthorDetail, storyAuthorDetailId>;
  addStoryAuthorDetail!: Sequelize.HasManyAddAssociationMixin<storyAuthorDetail, storyAuthorDetailId>;
  addStoryAuthorDetails!: Sequelize.HasManyAddAssociationsMixin<storyAuthorDetail, storyAuthorDetailId>;
  createStoryAuthorDetail!: Sequelize.HasManyCreateAssociationMixin<storyAuthorDetail>;
  removeStoryAuthorDetail!: Sequelize.HasManyRemoveAssociationMixin<storyAuthorDetail, storyAuthorDetailId>;
  removeStoryAuthorDetails!: Sequelize.HasManyRemoveAssociationsMixin<storyAuthorDetail, storyAuthorDetailId>;
  hasStoryAuthorDetail!: Sequelize.HasManyHasAssociationMixin<storyAuthorDetail, storyAuthorDetailId>;
  hasStoryAuthorDetails!: Sequelize.HasManyHasAssociationsMixin<storyAuthorDetail, storyAuthorDetailId>;
  countStoryAuthorDetails!: Sequelize.HasManyCountAssociationsMixin;
  // story hasMany storyFollowDetail via storyId
  storyFollowDetails!: storyFollowDetail[];
  getStoryFollowDetails!: Sequelize.HasManyGetAssociationsMixin<storyFollowDetail>;
  setStoryFollowDetails!: Sequelize.HasManySetAssociationsMixin<storyFollowDetail, storyFollowDetailId>;
  addStoryFollowDetail!: Sequelize.HasManyAddAssociationMixin<storyFollowDetail, storyFollowDetailId>;
  addStoryFollowDetails!: Sequelize.HasManyAddAssociationsMixin<storyFollowDetail, storyFollowDetailId>;
  createStoryFollowDetail!: Sequelize.HasManyCreateAssociationMixin<storyFollowDetail>;
  removeStoryFollowDetail!: Sequelize.HasManyRemoveAssociationMixin<storyFollowDetail, storyFollowDetailId>;
  removeStoryFollowDetails!: Sequelize.HasManyRemoveAssociationsMixin<storyFollowDetail, storyFollowDetailId>;
  hasStoryFollowDetail!: Sequelize.HasManyHasAssociationMixin<storyFollowDetail, storyFollowDetailId>;
  hasStoryFollowDetails!: Sequelize.HasManyHasAssociationsMixin<storyFollowDetail, storyFollowDetailId>;
  countStoryFollowDetails!: Sequelize.HasManyCountAssociationsMixin;
  // story hasMany storyGenreDetail via storyId
  storyGenreDetails!: storyGenreDetail[];
  getStoryGenreDetails!: Sequelize.HasManyGetAssociationsMixin<storyGenreDetail>;
  setStoryGenreDetails!: Sequelize.HasManySetAssociationsMixin<storyGenreDetail, storyGenreDetailId>;
  addStoryGenreDetail!: Sequelize.HasManyAddAssociationMixin<storyGenreDetail, storyGenreDetailId>;
  addStoryGenreDetails!: Sequelize.HasManyAddAssociationsMixin<storyGenreDetail, storyGenreDetailId>;
  createStoryGenreDetail!: Sequelize.HasManyCreateAssociationMixin<storyGenreDetail>;
  removeStoryGenreDetail!: Sequelize.HasManyRemoveAssociationMixin<storyGenreDetail, storyGenreDetailId>;
  removeStoryGenreDetails!: Sequelize.HasManyRemoveAssociationsMixin<storyGenreDetail, storyGenreDetailId>;
  hasStoryGenreDetail!: Sequelize.HasManyHasAssociationMixin<storyGenreDetail, storyGenreDetailId>;
  hasStoryGenreDetails!: Sequelize.HasManyHasAssociationsMixin<storyGenreDetail, storyGenreDetailId>;
  countStoryGenreDetails!: Sequelize.HasManyCountAssociationsMixin;
  // story hasMany storyRatingDetail via storyId
  storyRatingDetails!: storyRatingDetail[];
  getStoryRatingDetails!: Sequelize.HasManyGetAssociationsMixin<storyRatingDetail>;
  setStoryRatingDetails!: Sequelize.HasManySetAssociationsMixin<storyRatingDetail, storyRatingDetailId>;
  addStoryRatingDetail!: Sequelize.HasManyAddAssociationMixin<storyRatingDetail, storyRatingDetailId>;
  addStoryRatingDetails!: Sequelize.HasManyAddAssociationsMixin<storyRatingDetail, storyRatingDetailId>;
  createStoryRatingDetail!: Sequelize.HasManyCreateAssociationMixin<storyRatingDetail>;
  removeStoryRatingDetail!: Sequelize.HasManyRemoveAssociationMixin<storyRatingDetail, storyRatingDetailId>;
  removeStoryRatingDetails!: Sequelize.HasManyRemoveAssociationsMixin<storyRatingDetail, storyRatingDetailId>;
  hasStoryRatingDetail!: Sequelize.HasManyHasAssociationMixin<storyRatingDetail, storyRatingDetailId>;
  hasStoryRatingDetails!: Sequelize.HasManyHasAssociationsMixin<storyRatingDetail, storyRatingDetailId>;
  countStoryRatingDetails!: Sequelize.HasManyCountAssociationsMixin;
  // story belongsToMany user via storyId and userId
  userId_users!: user[];
  getUserId_users!: Sequelize.BelongsToManyGetAssociationsMixin<user>;
  setUserId_users!: Sequelize.BelongsToManySetAssociationsMixin<user, userId>;
  addUserId_user!: Sequelize.BelongsToManyAddAssociationMixin<user, userId>;
  addUserId_users!: Sequelize.BelongsToManyAddAssociationsMixin<user, userId>;
  createUserId_user!: Sequelize.BelongsToManyCreateAssociationMixin<user>;
  removeUserId_user!: Sequelize.BelongsToManyRemoveAssociationMixin<user, userId>;
  removeUserId_users!: Sequelize.BelongsToManyRemoveAssociationsMixin<user, userId>;
  hasUserId_user!: Sequelize.BelongsToManyHasAssociationMixin<user, userId>;
  hasUserId_users!: Sequelize.BelongsToManyHasAssociationsMixin<user, userId>;
  countUserId_users!: Sequelize.BelongsToManyCountAssociationsMixin;
  // story belongsToMany user via storyId and userId
  userId_user_storyRatingDetails!: user[];
  getUserId_user_storyRatingDetails!: Sequelize.BelongsToManyGetAssociationsMixin<user>;
  setUserId_user_storyRatingDetails!: Sequelize.BelongsToManySetAssociationsMixin<user, userId>;
  addUserId_user_storyRatingDetail!: Sequelize.BelongsToManyAddAssociationMixin<user, userId>;
  addUserId_user_storyRatingDetails!: Sequelize.BelongsToManyAddAssociationsMixin<user, userId>;
  createUserId_user_storyRatingDetail!: Sequelize.BelongsToManyCreateAssociationMixin<user>;
  removeUserId_user_storyRatingDetail!: Sequelize.BelongsToManyRemoveAssociationMixin<user, userId>;
  removeUserId_user_storyRatingDetails!: Sequelize.BelongsToManyRemoveAssociationsMixin<user, userId>;
  hasUserId_user_storyRatingDetail!: Sequelize.BelongsToManyHasAssociationMixin<user, userId>;
  hasUserId_user_storyRatingDetails!: Sequelize.BelongsToManyHasAssociationsMixin<user, userId>;
  countUserId_user_storyRatingDetails!: Sequelize.BelongsToManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof story {
    return story.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    coverImageUrl: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'country',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'story',
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
        name: "FK_country_story_idx",
        using: "BTREE",
        fields: [
          { name: "countryId" },
        ]
      },
      {
        name: "FTS_title_description_story",
        type: "FULLTEXT",
        fields: [
          { name: "title" },
          { name: "description" },
        ]
      },
      {
        name: "FTS_titile_story",
        type: "FULLTEXT",
        fields: [
          { name: "title" },
        ]
      },
      {
        name: "FTS_description_story",
        type: "FULLTEXT",
        fields: [
          { name: "description" },
        ]
      },
    ]
  });
  }
}
