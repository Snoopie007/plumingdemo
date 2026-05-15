'use client';
import { Controller } from "react-hook-form";
import { Field, FieldLabel, FieldError, Input } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const quoteFormSchema = z.object({
    name: z
        .string()
        .min(5, "Name must be at least 5 characters.")
        .max(32, "Name must be at most 32 characters."),
    email: z.email("Invalid email address"),
    phone: z.string().min(10, "Phone must be at least 10 characters.").max(15, "Phone must be at most 15 characters."),

})




export default function QuizQuote() {
    const form = useForm<z.infer<typeof quoteFormSchema>>({
        resolver: zodResolver(quoteFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    })
    return (
        <div className="flex flex-col px-6 py-8 gap-3 ">
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-xl font-black text-center leading-snug ">Request Your Precise Quote</h2>
                <p className="text-sm text-muted-foreground text-center">Get an accurate quote for your home.</p>
            </div>
            <form className="space-y-2" id="ContactForm">
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

                <div>
                    <Button type="submit" size="lg" form="ContactForm"
                        className="w-full
                ">
                        Get Precise Quote
                    </Button>
                </div>

            </form>
            <p className="text-sm text-muted-foreground">
                By opting into the web form above you are providing consent to send you periodic text messages.
                Standard rates may apply. You can reply HELP at anytime to learn more. You may opt-out anytime by replying STOP.
            </p>
        </div>
    );
}