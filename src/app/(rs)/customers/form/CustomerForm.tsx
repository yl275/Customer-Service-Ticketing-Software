'use client'

import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"

import { InputWithLabel } from "@/components/inputs/InputWithLabel"
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel"
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel"

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"

import { insertCustomerSchema, selectCustomerSchemaType, type insertCustomerSchemaType, type selectCustomerSchema } from "@/zod-schemas/customer"
import { StatesArray } from "@/constants/StatesArray"
import { CheckboxWithLabel } from "@/components/inputs/CheckboxWithLabel"

import { useAction } from 'next-safe-action/hooks'
import { saveCustomerAction } from "@/actions/saveCustomerActions"
import { toast } from "sonner"
import { LoaderCircle } from "lucide-react"
import { DisplayServerActionResponse } from "@/components/DisplayServerActionResponse"

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
        state: customer?.state||'',
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

    const {
        execute: executeSave,
        result: saveResult,
        isExecuting: isSaving,
        reset: resetSaveAction,
    } = useAction(saveCustomerAction, {
        onSuccess({ data }){
            toast(`Success 🎉${data?.message}`)
        },
        onError({ error }){
            toast.warning(`Error ❌ ${error}`)
        }
    })

    async function submitForm(data: insertCustomerSchemaType){
        // console.log(data)
        executeSave(data)

    }
    return (
    <>
        <div className="flex flex-col gap-1 sm:px-8">
            <DisplayServerActionResponse result={saveResult}/>
            <div>
                <h2 className="text-2xl font-bold">
                    {customer?.id ? "Edit" : "New"} Customer Form
                </h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(submitForm)}
                        className="flex flex-col md:flex-row gap-4 md:gap-8"
                    >
                        <div className="flex flex-col gap-4 w-full max-w-xs">
                            <InputWithLabel<insertCustomerSchemaType>
                                fieldTitle= "First Name"
                                nameInSchema= "firstName"/>
                            <InputWithLabel<insertCustomerSchemaType>
                                fieldTitle= "Last Name"
                                nameInSchema= "lastName"/>
                            <InputWithLabel<insertCustomerSchemaType>
                                fieldTitle= "Address 1"
                                nameInSchema= "address1"/>
                            <InputWithLabel<insertCustomerSchemaType>
                                fieldTitle= "Address 2"
                                nameInSchema= "address2"/>
                            <InputWithLabel<insertCustomerSchemaType>
                                fieldTitle= "City"
                                nameInSchema= "city"/>
                            <SelectWithLabel<insertCustomerSchemaType>
                                fieldTitle= "State"
                                nameInSchema= "state"
                                data={StatesArray}
                                />
                        </div>
                        <div className="flex flex-col gap-4 w-full max-w-xs">

                            <InputWithLabel<insertCustomerSchemaType>
                                fieldTitle= "Zip Code"
                                nameInSchema= "zip"/>
                            <InputWithLabel<insertCustomerSchemaType>
                                fieldTitle= "Email"
                                nameInSchema= "email"/>
                            <InputWithLabel<insertCustomerSchemaType>
                                fieldTitle= "Phone"
                                nameInSchema= "phone"/>
                            <TextAreaWithLabel<insertCustomerSchemaType>
                                fieldTitle= "Notes"
                                nameInSchema= "notes"
                                className="h-40"/>
                            {isLoading ? <p>Loading...</p> : isManager ? (
                                <CheckboxWithLabel<insertCustomerSchemaType>
                                    fieldTitle="Active"
                                    nameInSchema="active"
                                    message="Yes"
                                    disabled={false}
                                />
                            ): null}


                            <div className="flex gap-2">
                                <Button 
                                type="submit"
                                className="w-3/4"
                                variant="default"
                                title="Save"
                                disabled={isSaving}
                                >
                                    Save
                                {isSaving ? (
                                    <>
                                        <LoaderCircle className="animate-spin"/> Saving
                                    </>
                                ): "Save"}
                                </Button>

                                <Button 
                                type="button"
                                variant="destructive"
                                title="Reset"
                                onClick={() => {
                                    form.reset(defaultValues)
                                    resetSaveAction()
                                }}
                                >
                                    Reset
                                </Button>
                            </div>
                        </div>
                     
                    </form>
                </Form>
            </div>
        </div>

    </>)
}