import amqp from 'amqplib'

import { UserWorker } from './worker/userWorker.class'
import { ServicePackageWorker } from './worker/servicePackageWorker.class'
import { ServicePackageTransactionWorker } from './worker/servicePackageTransactionWorker.class'
import { InvoiceWorker } from './worker/invoiceWorker.class'

export function createWorker(amqpConnector: amqp.Connection) {
    new UserWorker(amqpConnector).do()
    new ServicePackageWorker(amqpConnector).do()
    new ServicePackageTransactionWorker(amqpConnector).do()
    new InvoiceWorker(amqpConnector).do()
}