import express, { Router } from 'express'

import { AliasRouter } from '../api/alias/alias.route'
import { AuthorRouter } from '../api/author/author.route'
import { StoryAuthorDetailRouter } from '../api/storyAuthorDetail/storyAuthorDetail.route'
import { CountryRouter } from '../api/country/country.route'
import { GenreRouter } from '../api/genre/genre.route'
import { StoryRouter } from '../api/story/story.route'
import { StoryGenreDetailRouter } from '../api/storyGenreDetail/storyGenreDetail.route'
import { StoryPriceHistoryRouter } from '../api/storyPriceHistory/storyPriceHistory.route'
import { StoryFollowDetailRouter } from '../api/storyFollowDetail/storyFollowDetail.route'
import { StoryRatingDetailRouter } from '../api/storyRatingDetail/storyRatingDetail.route'
import { ChapterRouter } from '../api/chapter/chapter.route'
import { ChapterImageRouter } from '../api/chapterImage/chapterImage.route'
import { HistoryDetailRouter } from '../api/historyDetail/historyDetail.route'
import { ViewDetailRouter } from '../api/viewDetail/viewDetail.route'

export const AppRouter = Router()

AppRouter.use('/uploads', express.static('uploads'))
AppRouter.use('/alias', AliasRouter)
AppRouter.use('/author', AuthorRouter)
AppRouter.use('/storyAuthorDetail', StoryAuthorDetailRouter)
AppRouter.use('/country', CountryRouter)
AppRouter.use('/genre', GenreRouter)
AppRouter.use('/story', StoryRouter)
AppRouter.use('/storyGenreDetail', StoryGenreDetailRouter)
AppRouter.use('/storyPriceHistory', StoryPriceHistoryRouter)
AppRouter.use('/storyFollowDetail', StoryFollowDetailRouter)
AppRouter.use('/storyRatingDetail', StoryRatingDetailRouter)
AppRouter.use('/chapter', ChapterRouter)
AppRouter.use('/chapterImage', ChapterImageRouter)
AppRouter.use('/historyDetail', HistoryDetailRouter)
AppRouter.use('/viewDetail', ViewDetailRouter)