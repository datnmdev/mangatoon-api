import type { Sequelize } from "sequelize";
import { alias as _alias } from "./alias";
import type { aliasAttributes, aliasCreationAttributes } from "./alias";
import { author as _author } from "./author";
import type { authorAttributes, authorCreationAttributes } from "./author";
import { chapter as _chapter } from "./chapter";
import type { chapterAttributes, chapterCreationAttributes } from "./chapter";
import { chapterImages as _chapterImages } from "./chapterImages";
import type { chapterImagesAttributes, chapterImagesCreationAttributes } from "./chapterImages";
import { country as _country } from "./country";
import type { countryAttributes, countryCreationAttributes } from "./country";
import { genre as _genre } from "./genre";
import type { genreAttributes, genreCreationAttributes } from "./genre";
import { historyDetail as _historyDetail } from "./historyDetail";
import type { historyDetailAttributes, historyDetailCreationAttributes } from "./historyDetail";
import { story as _story } from "./story";
import type { storyAttributes, storyCreationAttributes } from "./story";
import { storyAuthorDetail as _storyAuthorDetail } from "./storyAuthorDetail";
import type { storyAuthorDetailAttributes, storyAuthorDetailCreationAttributes } from "./storyAuthorDetail";
import { storyFollowDetail as _storyFollowDetail } from "./storyFollowDetail";
import type { storyFollowDetailAttributes, storyFollowDetailCreationAttributes } from "./storyFollowDetail";
import { storyGenreDetail as _storyGenreDetail } from "./storyGenreDetail";
import type { storyGenreDetailAttributes, storyGenreDetailCreationAttributes } from "./storyGenreDetail";
import { storyRatingDetail as _storyRatingDetail } from "./storyRatingDetail";
import type { storyRatingDetailAttributes, storyRatingDetailCreationAttributes } from "./storyRatingDetail";
import { user as _user } from "./user";
import type { userAttributes, userCreationAttributes } from "./user";
import { viewDetail as _viewDetail } from "./viewDetail";
import type { viewDetailAttributes, viewDetailCreationAttributes } from "./viewDetail";

export {
  _alias as alias,
  _author as author,
  _chapter as chapter,
  _chapterImages as chapterImages,
  _country as country,
  _genre as genre,
  _historyDetail as historyDetail,
  _story as story,
  _storyAuthorDetail as storyAuthorDetail,
  _storyFollowDetail as storyFollowDetail,
  _storyGenreDetail as storyGenreDetail,
  _storyRatingDetail as storyRatingDetail,
  _user as user,
  _viewDetail as viewDetail,
};

export type {
  aliasAttributes,
  aliasCreationAttributes,
  authorAttributes,
  authorCreationAttributes,
  chapterAttributes,
  chapterCreationAttributes,
  chapterImagesAttributes,
  chapterImagesCreationAttributes,
  countryAttributes,
  countryCreationAttributes,
  genreAttributes,
  genreCreationAttributes,
  historyDetailAttributes,
  historyDetailCreationAttributes,
  storyAttributes,
  storyCreationAttributes,
  storyAuthorDetailAttributes,
  storyAuthorDetailCreationAttributes,
  storyFollowDetailAttributes,
  storyFollowDetailCreationAttributes,
  storyGenreDetailAttributes,
  storyGenreDetailCreationAttributes,
  storyRatingDetailAttributes,
  storyRatingDetailCreationAttributes,
  userAttributes,
  userCreationAttributes,
  viewDetailAttributes,
  viewDetailCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const alias = _alias.initModel(sequelize);
  const author = _author.initModel(sequelize);
  const chapter = _chapter.initModel(sequelize);
  const chapterImages = _chapterImages.initModel(sequelize);
  const country = _country.initModel(sequelize);
  const genre = _genre.initModel(sequelize);
  const historyDetail = _historyDetail.initModel(sequelize);
  const story = _story.initModel(sequelize);
  const storyAuthorDetail = _storyAuthorDetail.initModel(sequelize);
  const storyFollowDetail = _storyFollowDetail.initModel(sequelize);
  const storyGenreDetail = _storyGenreDetail.initModel(sequelize);
  const storyRatingDetail = _storyRatingDetail.initModel(sequelize);
  const user = _user.initModel(sequelize);
  const viewDetail = _viewDetail.initModel(sequelize);

  author.belongsToMany(story, { as: 'storyId_stories', through: storyAuthorDetail, foreignKey: "authorId", otherKey: "storyId" });
  genre.belongsToMany(story, { as: 'storyId_story_storyGenreDetails', through: storyGenreDetail, foreignKey: "genreId", otherKey: "storyId" });
  story.belongsToMany(author, { as: 'authorId_authors', through: storyAuthorDetail, foreignKey: "storyId", otherKey: "authorId" });
  story.belongsToMany(genre, { as: 'genreId_genres', through: storyGenreDetail, foreignKey: "storyId", otherKey: "genreId" });
  story.belongsToMany(user, { as: 'userId_users', through: storyFollowDetail, foreignKey: "storyId", otherKey: "userId" });
  story.belongsToMany(user, { as: 'userId_user_storyRatingDetails', through: storyRatingDetail, foreignKey: "storyId", otherKey: "userId" });
  user.belongsToMany(story, { as: 'storyId_story_storyFollowDetails', through: storyFollowDetail, foreignKey: "userId", otherKey: "storyId" });
  user.belongsToMany(story, { as: 'storyId_story_storyRatingDetails', through: storyRatingDetail, foreignKey: "userId", otherKey: "storyId" });
  storyAuthorDetail.belongsTo(author, { as: "author", foreignKey: "authorId"});
  author.hasMany(storyAuthorDetail, { as: "storyAuthorDetails", foreignKey: "authorId"});
  chapterImages.belongsTo(chapter, { as: "chapter", foreignKey: "chapterId"});
  chapter.hasMany(chapterImages, { as: "chapterImages", foreignKey: "chapterId"});
  historyDetail.belongsTo(chapter, { as: "chapter", foreignKey: "chapterId"});
  chapter.hasMany(historyDetail, { as: "historyDetails", foreignKey: "chapterId"});
  viewDetail.belongsTo(chapter, { as: "chapter", foreignKey: "chapterId"});
  chapter.hasMany(viewDetail, { as: "viewDetails", foreignKey: "chapterId"});
  story.belongsTo(country, { as: "country", foreignKey: "countryId"});
  country.hasMany(story, { as: "stories", foreignKey: "countryId"});
  storyGenreDetail.belongsTo(genre, { as: "genre", foreignKey: "genreId"});
  genre.hasMany(storyGenreDetail, { as: "storyGenreDetails", foreignKey: "genreId"});
  alias.belongsTo(story, { as: "story", foreignKey: "storyId"});
  story.hasMany(alias, { as: "aliases", foreignKey: "storyId"});
  chapter.belongsTo(story, { as: "story", foreignKey: "storyId"});
  story.hasMany(chapter, { as: "chapters", foreignKey: "storyId"});
  storyAuthorDetail.belongsTo(story, { as: "story", foreignKey: "storyId"});
  story.hasMany(storyAuthorDetail, { as: "storyAuthorDetails", foreignKey: "storyId"});
  storyFollowDetail.belongsTo(story, { as: "story", foreignKey: "storyId"});
  story.hasMany(storyFollowDetail, { as: "storyFollowDetails", foreignKey: "storyId"});
  storyGenreDetail.belongsTo(story, { as: "story", foreignKey: "storyId"});
  story.hasMany(storyGenreDetail, { as: "storyGenreDetails", foreignKey: "storyId"});
  storyRatingDetail.belongsTo(story, { as: "story", foreignKey: "storyId"});
  story.hasMany(storyRatingDetail, { as: "storyRatingDetails", foreignKey: "storyId"});
  historyDetail.belongsTo(user, { as: "user", foreignKey: "userId"});
  user.hasMany(historyDetail, { as: "historyDetails", foreignKey: "userId"});
  storyFollowDetail.belongsTo(user, { as: "user", foreignKey: "userId"});
  user.hasMany(storyFollowDetail, { as: "storyFollowDetails", foreignKey: "userId"});
  storyRatingDetail.belongsTo(user, { as: "user", foreignKey: "userId"});
  user.hasMany(storyRatingDetail, { as: "storyRatingDetails", foreignKey: "userId"});

  return {
    alias: alias,
    author: author,
    chapter: chapter,
    chapterImages: chapterImages,
    country: country,
    genre: genre,
    historyDetail: historyDetail,
    story: story,
    storyAuthorDetail: storyAuthorDetail,
    storyFollowDetail: storyFollowDetail,
    storyGenreDetail: storyGenreDetail,
    storyRatingDetail: storyRatingDetail,
    user: user,
    viewDetail: viewDetail,
  };
}
