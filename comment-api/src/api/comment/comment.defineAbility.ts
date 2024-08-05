import { defineAbility } from '@casl/ability'

import { Payload } from '../../jwt/jwt.type'
import { Role } from '../../enums/role.enum'

export function defineAbilityFor(user: Payload) {
    return defineAbility((can, cannot) => {
        switch (user.role) {
            case Role.ADMIN:
                can('manage', 'comment')
                break
        
            default:
                can('read', 'comment')
                can('create', 'comment', {
                    userId: user.userId
                })
                can('update', 'comment', {
                    userId: user.userId
                })
                can('delete', 'comment', {
                    userId: user.userId
                })
        }
    })
}