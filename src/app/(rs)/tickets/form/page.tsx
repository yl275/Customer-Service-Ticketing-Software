import { BackButton } from "@/components/BackButton";
import { getTicket } from "@/lib/queries/getTicket";
import { getCustomer } from "@/lib/queries/getCustomer";
import * as Sentry from "@sentry/nextjs"
import TicketForm from "@/app/(rs)/tickets/form/TicketForm"

export default async function TicketFormPage({searchParams}: {
    searchParams: Promise<{[key:string]:string|undefined}>
}) {
    try{

        const {customerId, ticketId} = await searchParams;

        if(!customerId && !ticketId) {
            return(
                <>
                    <h2 className="text-2xl mb-2">
                        Ticket ID or Customer ID required to load ticket
                    </h2>
                    <BackButton title="Go Back"/>

                </>
            )
        }
        if(customerId) {
            const customer = await getCustomer(parseInt(customerId));
            if(!customer) {
                return(
                    <>
                        <h2 className="text-2xl mb-2">
                            Customer #{customerId} not found
                        </h2>
                        <BackButton title="Go Back"/>
                    </>
                )
            }

            if(!customer.active){
                return(
                    <>
                        <h2 className="text-2xl mb-2">
                            Customer ID #{customerId} is not active.
                        </h2>
                        <BackButton title="Go Back"/>

                    </>
                )
            }

            return <TicketForm customer={customer}/>
        }

        if (ticketId) {
            const ticket = await getTicket(parseInt(ticketId));
            if(!ticket) {
                return(
                    <>
                        <h2 className="text-2xl mb-2">
                            Ticket ID #{ticketId} not found
                        </h2>
                        <BackButton title="Go Back"/>

                    </>
                )
            }
            const customer = await getCustomer(ticket.customerId);

            console.log(ticket);
            console.log(customer);
            return <TicketForm customer={customer} ticket={ticket}></TicketForm>
        }

    } catch (e) {
        Sentry.captureException(e);
        throw(e);
    }
}