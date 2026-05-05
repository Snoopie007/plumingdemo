"use client"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { Field, FieldError, FieldLabel } from "@/components/forms/field"
import { Input } from "@/components/forms/input"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/forms/select"
import { SelectContent, SelectValue, SelectTrigger, SelectItem } from "./select"

const leadFormSchema = z.object({
    name: z
        .string()
        .min(5, "Name must be at least 5 characters.")
        .max(32, "Name must be at most 32 characters."),
    email: z.email("Invalid email address"),
    phone: z.string().min(10, "Phone must be at least 10 characters.").max(15, "Phone must be at most 15 characters."),
    program: z.string().min(1, "Program is required"),
})


export function LeadForm({ locationName }: { locationName: string }) {
    const form = useForm<z.infer<typeof leadFormSchema>>({
        resolver: zodResolver(leadFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            program: "",

        },
    })
    return (
        <form className="space-y-2">
            <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                        <Input {...field} id={field.name} aria-invalid={fieldState.invalid} />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
            <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                        <Input {...field} id={field.name} aria-invalid={fieldState.invalid} />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
            <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                        <Input {...field} id={field.name} aria-invalid={fieldState.invalid} />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
            <Controller
                name="program"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Program</FieldLabel>
                        <Select {...field} aria-invalid={fieldState.invalid}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a program" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="program1">Program 1</SelectItem>
                                <SelectItem value="program2">Program 2</SelectItem>
                                <SelectItem value="program3">Program 3</SelectItem>
                            </SelectContent>
                        </Select>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
            <div>
                <Button type="submit" size="lg" form="ContactForm"
                    className="w-full
                    ">
                    Submit
                </Button>
            </div>
            <p className="text-sm text-muted-foreground">
                By opting into the web form above you are providing consent to {locationName} send you periodic text messages.
                Standard rates may apply. You can reply HELP at anytime to learn more. You may opt-out anytime by replying STOP.
            </p>
        </form>

    )
}