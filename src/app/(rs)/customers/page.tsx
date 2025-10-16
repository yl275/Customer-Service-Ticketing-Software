import CustomerSearch from "./CustomerSearch"
import { getCustomerSearchResults } from "@/lib/queries/getCustomers";
import * as Sentry from "@sentry/nextjs"
import CustomerTable from "./CustomerTable";

export const metadata = {
    title: "Customers Search"
}

export default async function Customers({searchParams}: {
    searchParams: Promise<{[key:string]:string|undefined}>
}) {
    const { searchText } = await searchParams;

    if (!searchText) return <CustomerSearch/>
    const span = Sentry.startInactiveSpan({
        name: 'getCustomerSearchResults-2'
    })
    const results = await getCustomerSearchResults(searchText)
    span.end()

    return(
    <>
        <CustomerSearch/>
        {/* <p>{JSON.stringify(results)}</p> */}
        {results.length? <CustomerTable data={results}/> :
            <p className="mt"> No results found </p>
        }
    </>)

}