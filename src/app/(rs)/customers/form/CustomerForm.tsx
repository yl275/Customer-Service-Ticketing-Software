'use client'

import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"


import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"

import { insertCustomerSchema, selectCustomerSchemaType, type insertCustomerSchemaType, type selectCustomerSchema } from "@/zod-schemas/customer"

type Props = {
    customer?: selectCustomerSchemaType,
}


export default function CustomerForm({customer}:Props) {

    const { getPermission, getPermissions, isLoading} = useKindeBrowserClient();
    const isManager = !isLoading && getPermission('manager')?.isGranted
    const permObj = getPermissions()
    // const isAuthorized = !isLoading && 
    // permObj.permissions.some(perm => perm === 'manager' || perm === 'admin')

    const defaultValues: insertCustomerSchemaType = {
        id: customer?.id || 0,
        firstName: customer?.firstName||'',
        lastName: customer?.lastName||'',
        address1: customer?.address1||'',
        address2: customer?.address2||'',
        city: customer?.city||'',
        state: customer?.city||'',
        zip: customer?.zip||'',
        phone: customer?.phone||'',
        email: customer?.email||'',
        notes: customer?.notes||'',
        active: customer?.active||true,
    }
    const form = useForm<insertCustomerSchemaType>({
        mode:'onBlur',
        resolver:zodResolver(insertCustomerSchema),
        defaultValues,
    })
    async function submitForm(data: insertCustomerSchemaType){
        console.log(data)
    }
    return (
    <>
        <div className="flex flex-col gap-1 sm:px-8">
            <div>
                <h2 className="text-2xl font-bold">
                    {customer?.id ? "Edit" : "New"} Customer Form
                </h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitForm)}
                        className="flex flex-col sm:flex-row gap-4 sm:gap-8"
                    >
                     <p>{JSON.stringify(form.getValues())}</p>   
                    </form>
                </Form>
            </div>
        </div>

    </>)
}