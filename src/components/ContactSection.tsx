const { data, error } = await supabase.functions.invoke("lead-qualifier", {
  body: {
    business_name: formData.company,
    email: formData.email,
    phone: "",
    city: "",
    state: "TX",
    notes: `Name: ${formData.name}, Package: ${formData.package || "Not specified"}, Message: ${formData.message || "No message"}`,
    source: "website",
  },
});