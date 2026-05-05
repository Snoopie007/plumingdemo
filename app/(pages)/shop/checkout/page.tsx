import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { HugeiconsIcon } from "@hugeicons/react";
import { Trash2 } from "@hugeicons/core-free-icons";
import {
    Card, CardContent,
    CardDescription, CardHeader, CardTitle
} from "@/components/ui";
import { Input } from "@/components/forms";
type CartItem = {
    id: string;
    name: string;
    description: string;
    price_cents: number;
    quantity: number;
    image_url: string;
};

const cartItems: CartItem[] = [
    { id: "1", name: "Red cap", description: "Red and white cap", price_cents: 3600, quantity: 1, image_url: "https://picsum.photos/seed/cap/200/200" },
    { id: "2", name: "Oversized T-shirt", description: "Awesome white T-shirt", price_cents: 2900, quantity: 1, image_url: "https://picsum.photos/seed/tee/200/200" },
    { id: "3", name: "Girl brown T-shirt", description: "It's a nice brown t-shirt", price_cents: 3000, quantity: 1, image_url: "https://picsum.photos/seed/brown/200/200" },
];

const subtotal = cartItems.reduce((sum, item) => sum + item.price_cents * item.quantity, 0);
const shipping = 1066;
const discount = 900;
const total = subtotal + shipping - discount;

export default function CheckoutPage() {
    return (
        <section className="min-h-screen bg-muted/40 py-20">
            <div className="max-w-6xl mx-auto px-4 space-y-4">
                <h1 className="text-2xl  uppercase font-sans font-black ">Checkout</h1>

                <div className="grid grid-cols-5 gap-6 items-start">

                    {/* LEFT — Cart items */}
                    <div className="bg-white rounded-xl col-span-3 border border-border/60 shadow-xs overflow-hidden">
                        <div className="p-6 border-b border-border/60">
                            <h2 className="text-lg font-bold">Shopping Cart</h2>
                            <p className="text-sm text-muted-foreground mt-0.5">
                                You have {cartItems.length} items in your cart
                            </p>
                        </div>

                        <div className="divide-y divide-border/60">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 p-6">
                                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-muted">
                                        <Image
                                            src={item.image_url}
                                            alt={item.name}
                                            fill
                                            sizes="64px"
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-sm truncate">{item.name}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5 truncate">{item.description}</p>

                                        {/* Quantity control */}
                                        <div className="flex items-center gap-2 mt-2">
                                            <button className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-xs hover:bg-muted transition-colors">−</button>
                                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                            <button className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-xs hover:bg-muted transition-colors">+</button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-2 shrink-0">
                                        <p className="font-bold text-sm">${(item.price_cents / 100).toFixed(2)}</p>
                                        <button className="text-muted-foreground hover:text-destructive transition-colors">
                                            <HugeiconsIcon icon={Trash2} strokeWidth={2} className="size-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — Summary + coupon + place order */}
                    <div className="space-y-4 col-span-2">

                        {/* Coupon */}
                        <Card>
                            <CardHeader className="border-b border-border/60">
                                <CardTitle className="font-semibold  text-base flex items-center gap-2">

                                    Coupon Code
                                </CardTitle>
                                <CardDescription className="text-sm">
                                    Enter your coupon code to get a discount
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex gap-2">
                                <Input
                                    type="text"
                                    placeholder="Enter code"
                                    className="border-border/60 bg-white h-9 px-3 shadow-xs"
                                />
                                <Button variant="outline"
                                    className="shrink-0 font-bold h-9 px-4 bg-black text-white shadow-xs">
                                    Apply
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Order summary */}
                        <div className="bg-white rounded-xl border border-border/60 shadow-xs p-6 space-y-4">
                            <h3 className="font-semibold">Order Summary</h3>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="font-medium">${(subtotal / 100).toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between text-green-600">
                                    <span>Discount (−)</span>
                                    <span className="font-medium">−${(discount / 100).toFixed(2)}</span>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex justify-between font-bold text-base">
                                <span>Total Payable</span>
                                <span>${(total / 100).toFixed(2)}</span>
                            </div>

                            <div className="flex flex-col gap-1">
                                <Button className="w-full" size="lg">
                                    Place Order
                                </Button>

                                <p className="text-sm text-muted-foreground  leading-relaxed">
                                    By placing your order, you agree to our{" "}
                                    <a href="/privacy" className="underline underline-offset-2 hover:text-foreground">Privacy Policy</a>
                                    {" "}and{" "}
                                    <a href="/terms" className="underline underline-offset-2 hover:text-foreground">Conditions of Use</a>.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
