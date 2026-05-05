"use client"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { Field, FieldError, FieldLabel } from "@/components/forms/field"
import { Input } from "@/components/forms/input"
import { Textarea } from "@/components/forms/textarea"
import { Button } from "@/components/ui/button"

const contactFormSchema = z.object({
    name: z
        .string()
        .min(5, "Name must be at least 5 characters.")
        .max(32, "Name must be at most 32 characters."),
    email: z.email("Invalid email address"),
    phone: z.string().min(10, "Phone must be at least 10 characters.").max(15, "Phone must be at most 15 characters."),
    message: z
        .string()
        .min(20, "Message must be at least 20 characters.")
        .max(100, "Message must be at most 100 characters."),
})


export function ContactForm({ locationName }: { locationName: string }) {
    const form = useForm<z.infer<typeof contactFormSchema>>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: "",
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
                name="message"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Message</FieldLabel>
                        <Textarea {...field} id={field.name} aria-invalid={fieldState.invalid} />
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