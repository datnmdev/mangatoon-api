import { NextFunction, Request, Response } from 'express'
import { plainToClass, plainToInstance } from 'class-transformer'

import { AliasService } from './alias.service'
import { AppResponse } from '../../helpers/response.helper'
import { GetAliasesRequestDTO } from './dtos/getAliasesRequest.dto'
import { CreateAliasRequestDTO } from './dtos/createAliasRequest.dto'
import { DeleteAliasRequestDTO } from './dtos/deleteAlias.dto'

export class AliasController {

    static getAliases = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const getAliasesRequestData = plainToInstance(GetAliasesRequestDTO, req.query)
            const aliases = await AliasService.getAliases(getAliasesRequestData)
            return res.send(new AppResponse(aliases, null))
        } catch (error) {
            console.log(error);
            
            return next(error)
        }
    }

    static createAlias = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const createAliasRequestData = plainToClass(CreateAliasRequestDTO, req.body)
            const newAlias = await AliasService.createAlias(createAliasRequestData)
            return res.send(new AppResponse({
                ...newAlias.dataValues,
                id: newAlias.id
            }, null))
        } catch (error) {
            return next(error)
        }
    }

    static deleteAlias = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deleteAliasRequestData = plainToClass(DeleteAliasRequestDTO, req.params)
            const deletedRowCount = await AliasService.deleteAlias(deleteAliasRequestData.id)
            if (deletedRowCount > 0) {
                return res.send(new AppResponse(true, null))
            }
            return res.send(new AppResponse(false, null))
        } catch (error) {
            return next(error)
        }
    }

}