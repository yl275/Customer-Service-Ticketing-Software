import { getTicketsSearchResults } from "@/lib/queries/getTickets";
import TicketSearch from "./TicketSearch";
import { getOpenTickets } from "@/lib/queries/getOpenTickets";

export const metadata = {
    title: "Ticket Search"
}

export default async function Home({searchParams}: {
    searchParams: Promise<{[key:string]:string|undefined}>
}) {
    const {searchText} = await searchParams;
    if(!searchText) {
        const results = await getOpenTickets();
        return (
            <>
                <TicketSearch/>
                <p>{JSON.stringify(results)}</p>
            </>
            )
    }
        
    const results = await getTicketsSearchResults(searchText);
    return(
    <>
        <TicketSearch/>
        <p>{JSON.stringify(results)}</p>
    </>)
}