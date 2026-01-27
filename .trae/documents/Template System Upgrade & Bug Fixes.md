I have completed the requested template features and fixed the reported button issues.

### **1. Website Templates Upgrade**
*   **New "Templates" Page**: Added a dedicated section in the dashboard (sidebar) to manage website templates.
*   **Upload Feature**: You can now upload your own HTML templates directly or paste the code.
*   **Dynamic Site Builder**: The system now checks for your custom templates in the database before falling back to the default one.
*   **Modern Default Design**: I significantly upgraded the default "Luxury Real Estate" template with:
    *   Smooth scroll animations & reveal effects.
    *   Interactive photo gallery with hotspots.
    *   Mobile-responsive navigation.
    *   Dark/Gold luxury color scheme.

### **2. Bug Fixes**
*   **"Create Proposal" Button**: 
    *   **Fixed**: The button in the Lead Drawer was a dead placeholder. I connected it to the `CreateProposalWizard`, so clicking it now opens the proposal creator pre-filled with the lead's name, email, and business info.
*   **"Send to n8n" Button**:
    *   **Improved**: Added better error handling. If it fails, it will now tell you if the `N8N_WEBHOOK_URL` is missing in your Supabase secrets, which is the most common cause of failure.

**Next Steps for You:**
1.  **Check Templates**: Visit the new "Templates" tab in the sidebar.
2.  **Test Proposal**: Go to "Leads", click a lead, and try the "Create Proposal" button.
3.  **n8n Setup**: If "Send to n8n" still fails, ensure your `N8N_WEBHOOK_URL` is set in your Supabase Dashboard > Settings > Edge Functions > Secrets.