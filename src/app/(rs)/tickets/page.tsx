import { getTicketsSearchResults } from "@/lib/queries/getTickets";
import TicketSearch from "./TicketSearch";
import { getAllTickets } from "@/lib/queries/getOpenTickets";
import TicketTable from "./TicketTable";
export const metadata = {
    title: "Ticket Search"
}

export default async function Home({searchParams}: {
    searchParams: Promise<{[key:string]:string|undefined}>
}) {
    const {searchText} = await searchParams;
    if(!searchText) {
        const results = await getAllTickets();
        return (
            <>
                <TicketSearch/>
                {/* <p>{JSON.stringify(results)}</p> */}
                {results.length ? <TicketTable data={results}/> : null}
            </>
            )
    }
        
    const results = await getTicketsSearchResults(searchText);
    return(
    <>
        <TicketSearch/>

        {results.length 
        ? <TicketTable data={results}/> 
        : <p>No results found</p>}

    </>)
}