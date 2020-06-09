import * as EventsModule from './events'
import * as Misc from './misc'
import * as Wallet from './wallet'

const { default: Events, setEvents } = EventsModule

export { Events, Misc, Wallet, setEvents, EventsModule as EventsTypes }
