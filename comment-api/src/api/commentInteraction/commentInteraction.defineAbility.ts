import { defineAbility } from '@casl/ability'

import { Payload } from '../../jwt/jwt.type'
import { Role } from '../../enums/role.enum'

export function defineAbilityFor(user: Payload) {
    return defineAbility((can, cannot) => {
        switch(user.role) {
            case Role.ADMIN:
                can('manage', 'commentInteraction')
                break
            
            default:
                can('create', 'commentInteraction', {
                    userId: user.userId
                })
                can('update', 'commentInteraction', {
                    userId: user.userId
                })
                can('delete', 'commentInteraction', {
                    userId: user.userId
                })
        }
    })
}