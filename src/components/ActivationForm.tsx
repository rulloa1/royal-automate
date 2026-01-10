import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Upload, CheckCircle2 } from "lucide-react";

import ContractAgreement from "./ContractAgreement";

// Zod Schema
const formSchema = z.object({
    // Section 1 - Identity
    fullName: z.string().min(2, "Name is required"),
    businessName: z.string().min(2, "Business details are required"),
    role: z.string().min(1, "Please select a role"),
    licenseNumber: z.string().optional(),

    // Section 2 - Contact Info (Public)
    phone: z.string().min(10, "Valid phone number required"),
    businessEmail: z.string().email("Valid email required"),
    officeAddress: z.string().optional(),

    // Section 3 - Domain & Hosting
    hasDomain: z.enum(["yes", "no"]),
    domainName: z.string().optional(),
    registrarLogin: z.string().optional(),

    // Section 4 - Branding
    logo: z.any().optional(), // File handling is manual
    profilePicture: z.any().optional(), // File handling is manual
    brandColors: z.string().optional(),
    preferredFont: z.string().optional(),

    // Section 5 - Content
    bio: z.string().min(50, "Please provide a short bio (at least 50 chars)"),
    services: z.string().min(10, "List at least one service"),
    areasServed: z.string().min(2, "Required"),
    specialOffers: z.string().optional(),

    // Section 6 - Social & Media
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    linkedin: z.string().optional(),

    // Section 7 - Lead Routing
    leadRouting: z.enum(["email", "phone", "both"]),
    leadEmail: z.string().optional(),
    leadPhone: z.string().optional(),

    // Section 8 - Contract
    isContractSigned: z.boolean().refine((val) => val === true, {
        message: "You must sign the agreement to proceed.",
    }),

    // Section 9 - Final Confirmation
    specialRequests: z.string().optional(),
    acknowledgeTimeline: z.boolean().refine((val) => val === true, {
        message: "You must acknowledge the timeline to proceed.",
    }),
}).superRefine((data, ctx) => {
    if ((data.leadRouting === "email" || data.leadRouting === "both") && (!data.leadEmail || !data.leadEmail.includes("@"))) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Valid lead email is required",
            path: ["leadEmail"],
        });
    }
    if ((data.leadRouting === "phone" || data.leadRouting === "both") && (!data.leadPhone || data.leadPhone.length < 10)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Valid lead phone is required",
            path: ["leadPhone"],
        });
    }
});

export function ActivationForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [profileFile, setProfileFile] = useState<File | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            businessName: "",
            role: "",
            licenseNumber: "",
            phone: "",
            businessEmail: "",
            officeAddress: "",
            hasDomain: "no",
            domainName: "",
            registrarLogin: "",
            brandColors: "",
            preferredFont: "",
            bio: "",
            services: "",
            areasServed: "",
            specialOffers: "",
            instagram: "",
            facebook: "",
            linkedin: "",
            leadRouting: "email",
            leadEmail: "",
            leadPhone: "",
            isContractSigned: false,
            specialRequests: "",
            acknowledgeTimeline: false,
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'profile') => {
        if (e.target.files && e.target.files[0]) {
            if (type === 'logo') setLogoFile(e.target.files[0]);
            else setProfileFile(e.target.files[0]);
        }
    };

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        try {
            let logoBase64 = "";
            let profileBase64 = "";

            if (logoFile) {
                logoBase64 = await convertToBase64(logoFile);
            }
            if (profileFile) {
                profileBase64 = await convertToBase64(profileFile);
            }

            // Map form values to agent_data structure expected by backend
            const payload = {
                ...values,
                logo: logoBase64,
                profilePicture: profileBase64,
                source: "Activation Form",
                // Explicit mapping for template
                agent_name: values.fullName,
                brokerage: values.businessName,
                city_area: values.areasServed.split(',')[0], // Take first area
                bio: values.bio
            };

            // 1. Send to n8n webhook (Logging & Data)
            try {
                await fetch("http://localhost:5678/webhook-test/activate-site", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
            } catch (err) {
                console.error("n8n webhook failed (non-blocking)", err);
            }

            // 2. Send to Supabase Edge Function (Provisioning)
            const provisionResponse = await fetch("https://pshjpksmzvwyzugrbmiu.supabase.co/functions/v1/provision-site", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ agent_data: payload }),
            });

            if (!provisionResponse.ok) throw new Error("Provisioning failed");

            const provisionData = await provisionResponse.json();

            // Create a Blob URL for preview if HTML content is returned
            if (provisionData.html_content) {
                const blob = new Blob([provisionData.html_content], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                setGeneratedUrl(url);
            }

            toast.success("Activation submitted! Website generated.");
            setIsSuccess(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (error) {
            console.error("Error submitting form", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isSuccess) {
        return (
            <div className="max-w-3xl mx-auto py-20 px-4 text-center">
                <div className="bg-green-500/10 text-green-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Website Generated Successfully!</h2>
                <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
                    Your website has been provisioned. You can preview it immediately below.
                </p>

                {generatedUrl && (
                    <div className="mb-8">
                        <Button
                            size="lg"
                            className="bg-[#00FF9D] text-black hover:bg-[#00FF9D]/90 font-bold text-lg px-8 py-6 h-auto shadow-[0_0_20px_rgba(0,255,157,0.3)]"
                            onClick={() => window.open(generatedUrl, '_blank')}
                        >
                            PREVIEW MY WEBSITE
                        </Button>
                    </div>
                )}

                <div className="p-4 bg-muted/50 rounded-lg max-w-md mx-auto text-sm text-left">
                    <p className="font-medium mb-2">What happens next?</p>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        <li>We are configuring your custom domain DNS (approx. 30 mins)</li>
                        <li>Final QA check is performed</li>
                        <li>Launch email sent to {form.getValues().businessEmail}</li>
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Website Activation</h1>
                <p className="text-muted-foreground">
                    Submit your details to start the 60-minute provisioning process.
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    {/* Section 1: Identity */}
                    <Card>
                        <CardHeader><CardTitle>1. Identity</CardTitle></CardHeader>
                        <CardContent className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name <span className="text-red-500">*</span></FormLabel>
                                        <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="businessName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Business / Brand Name <span className="text-red-500">*</span></FormLabel>
                                        <FormControl><Input placeholder="JD Realty Group" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role / License Type <span className="text-red-500">*</span></FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a role" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Real Estate Agent">Real Estate Agent</SelectItem>
                                                <SelectItem value="Insurance Agent">Insurance Agent</SelectItem>
                                                <SelectItem value="Loan Officer">Loan Officer</SelectItem>
                                                <SelectItem value="Other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="licenseNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>License Number (if applicable)</FormLabel>
                                        <FormControl><Input placeholder="e.g. #12345678" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Section 2: Contact Info */}
                    <Card>
                        <CardHeader><CardTitle>2. Contact Info (Public)</CardTitle></CardHeader>
                        <CardContent className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number <span className="text-red-500">*</span></FormLabel>
                                        <FormControl><Input placeholder="(555) 123-4567" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="businessEmail"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Business Email Address <span className="text-red-500">*</span></FormLabel>
                                        <FormControl><Input placeholder="john@example.com" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="officeAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Office Address</FormLabel>
                                        <FormControl><Textarea placeholder="123 Main St, City, State, ZIP" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Section 3: Domain & Hosting */}
                    <Card>
                        <CardHeader><CardTitle>3. Domain & Hosting</CardTitle></CardHeader>
                        <CardContent className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="hasDomain"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Do you already own a domain?</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-col space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="yes" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Yes</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="no" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">No (I want RoysCompany to provide one)</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {form.watch("hasDomain") === "yes" && (
                                <>
                                    <FormField
                                        control={form.control}
                                        name="domainName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Enter your domain name</FormLabel>
                                                <FormControl><Input placeholder="example.com" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="registrarLogin"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Domain registrar login (Optional)</FormLabel>
                                                <FormControl><Textarea placeholder="Provider, Username, Password (if you want us to connect it)" {...field} /></FormControl>
                                                <FormDescription>Only if you want us to handle the DNS connection.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Section 4: Branding */}
                    <Card>
                        <CardHeader><CardTitle>4. Branding</CardTitle></CardHeader>
                        <CardContent className="grid gap-4">
                            <FormItem>
                                <FormLabel>Upload your logo</FormLabel>
                                <FormControl>
                                    <div className="flex items-center gap-4">
                                        <Input
                                            type="file"
                                            accept="image/png, image/jpeg, image/svg+xml"
                                            onChange={(e) => handleFileChange(e, 'logo')}
                                            className="cursor-pointer"
                                        />
                                    </div>
                                </FormControl>
                                <FormDescription>PNG, JPG, or SVG preferred.</FormDescription>
                            </FormItem>

                            <FormItem>
                                <FormLabel>Upload your profile picture / headshot</FormLabel>
                                <FormControl>
                                    <div className="flex items-center gap-4">
                                        <Input
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            onChange={(e) => handleFileChange(e, 'profile')}
                                            className="cursor-pointer"
                                        />
                                    </div>
                                </FormControl>
                                <FormDescription>High quality headshot preferred.</FormDescription>
                            </FormItem>

                            <FormField
                                control={form.control}
                                name="brandColors"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Brand colors (if different from default)</FormLabel>
                                        <FormControl><Input placeholder="e.g., Navy Blue #000080, Gold #FFD700" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="preferredFont"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Preferred font (Optional)</FormLabel>
                                        <FormControl><Input placeholder="e.g., Montserrat, Open Sans" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Section 5: Content */}
                    <Card>
                        <CardHeader><CardTitle>5. Content</CardTitle></CardHeader>
                        <CardContent className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Short Bio / About You <span className="text-red-500">*</span></FormLabel>
                                        <FormControl><Textarea className="min-h-[100px]" placeholder="Tell us about your experience and approach..." {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="services"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Services You Offer <span className="text-red-500">*</span></FormLabel>
                                        <FormControl><Textarea placeholder="Residential Buying, Selling, Commercial..." {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="areasServed"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Areas You Serve <span className="text-red-500">*</span></FormLabel>
                                        <FormControl><Input placeholder="City, Neighborhoods, Counties" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="specialOffers"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Special Offers / CTA</FormLabel>
                                        <FormControl><Input placeholder="e.g., 'Free Home Valuation', 'Instant Quote'" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Section 6: Social & Media */}
                    <Card>
                        <CardHeader><CardTitle>6. Social & Media</CardTitle></CardHeader>
                        <CardContent className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="instagram"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Instagram Link</FormLabel>
                                        <FormControl><Input placeholder="https://instagram.com/..." {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="facebook"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Facebook Link</FormLabel>
                                        <FormControl><Input placeholder="https://facebook.com/..." {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="linkedin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>LinkedIn Link</FormLabel>
                                        <FormControl><Input placeholder="https://linkedin.com/in/..." {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Section 7: Lead Routing */}
                    <Card>
                        <CardHeader><CardTitle>7. Lead Routing</CardTitle></CardHeader>
                        <CardContent className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="leadRouting"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Where should website leads go?</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-col space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl><RadioGroupItem value="email" /></FormControl>
                                                    <FormLabel className="font-normal">Email</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl><RadioGroupItem value="phone" /></FormControl>
                                                    <FormLabel className="font-normal">Phone</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl><RadioGroupItem value="both" /></FormControl>
                                                    <FormLabel className="font-normal">Both</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="leadEmail"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Lead Email Address</FormLabel>
                                            <FormControl><Input placeholder="leads@example.com" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="leadPhone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Lead Phone Number</FormLabel>
                                            <FormControl><Input placeholder="(555) 123-4567" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Section 8: Contract */}
                    <Card>
                        <CardHeader><CardTitle>8. Service Agreement</CardTitle></CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="isContractSigned"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <ContractAgreement
                                                clientName={form.watch("fullName") || form.watch("businessName")}
                                                onSigned={() => field.onChange(true)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {/* Section 9: Confirmation */}
                    <Card>
                        <CardHeader><CardTitle>9. Final Confirmation</CardTitle></CardHeader>
                        <CardContent className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="specialRequests"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Any special requests or changes?</FormLabel>
                                        <FormControl><Textarea placeholder="Notes for the design team..." {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="acknowledgeTimeline"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>
                                                I understand my website will be provisioned within 60 minutes after this form is submitted.
                                            </FormLabel>
                                            <FormDescription>
                                                This form initiates the automated build process.
                                            </FormDescription>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <Button type="submit" size="lg" className="w-full text-lg h-12" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting Activation...
                            </>
                        ) : (
                            <>
                                <CheckCircle2 className="mr-2 h-5 w-5" />
                                Activate Website Now
                            </>
                        )}
                    </Button>

                </form>
            </Form>
        </div>
    );
}
