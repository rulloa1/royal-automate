I have successfully connected the Email Settings to the backend. The application will now respect your SMTP configuration and custom signature.

**Completed Tasks:**
1.  **Dynamic Backend Logic**: Modified `supabase/functions/_shared/outreach.ts` to fetch user settings from the database. It now supports:
    *   **SMTP**: Uses `nodemailer` if you provide Host, Port, User, and Password.
    *   **Resend Fallback**: Defaults to the built-in Resend API key if no SMTP settings are provided.
    *   **Custom Signature**: Uses your configured signature instead of the hardcoded "Best, Roy".
2.  **Test Email Functionality**: Created a new `send-test-email` Edge Function.
3.  **Frontend Integration**: Wired up the "Send Test Email" button in the Settings page to trigger the test function.

**Verification:**
You can now go to **Settings > Email**, configure your SMTP details or Signature, and click **"Send Test Email"**. It will attempt to send an email using your provided credentials.

**Note:** Ensure your SMTP provider (e.g., Gmail, Outlook) allows external connections. For Gmail, you may need an "App Password".