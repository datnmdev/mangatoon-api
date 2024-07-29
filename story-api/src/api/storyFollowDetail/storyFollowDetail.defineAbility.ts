import { defineAbility } from '@casl/ability'

import { Payload } from '../../jwt/jwt.type'

export function defineAbilityFor(user: Payload) {
    return defineAbility((can, cannot) => {
        can('manage', 'storyFollowDetail', {
            userId: user.userId
        })
    })
}