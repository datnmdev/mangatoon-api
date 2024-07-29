import { defineAbility } from '@casl/ability'
import { Role } from '../../enums/role.enum'
import { Payload } from '../../jwt/jwt.type'

export function defineAbilityFor(user: Payload) {
    return defineAbility((can, cannot) => {
        switch (user.role) {
            case Role.ADMIN:
                can('manage', 'account')
                can('manage', 'accounts')
                break
            default:
                can('read', 'account')
        }
    })
}