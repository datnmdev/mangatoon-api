import moment from 'moment'

export function getMillisecondsToRoundedTime() {
    const now = moment.utc()
    const roundedTime = now.clone().startOf('day').add(now.hour(), 'hours')
    return roundedTime.valueOf()
}