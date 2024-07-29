import { Sequelize } from 'sequelize'

import { envVariables } from '../dotenv'
import { initModels } from './models/init-models'

export const sequelize = new Sequelize(envVariables.MYSQL_URL)

export const Models = initModels(sequelize)

sequelize.authenticate()
    .then(() => {
        console.log('Connected to mysql...')
    })
    .catch(err => {
        console.log(`Database Error::${err}`)
    })