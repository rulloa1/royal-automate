# Website Demo Outreach Workflow Analysis

This document outlines the requirements and potential issues found in the `website-demo-outreach.json` n8n workflow.

## 1. Configuration Required (Placeholders)
You must replace the following placeholders in the workflow nodes:

*   **Google Sheets Nodes ("New Lead Added", "Update Sheet")**:
    *   `YOUR_SPREADSHEET_ID`: Replace with the ID from your Google Sheet URL.
    *   `Outreach`: Ensure your sheet tab is named exactly "Outreach".
*   **GitHub Nodes ("Upload to GitHub", "Generate Live URL")**:
    *   `YOUR_USERNAME`: Replace with your GitHub username.
    *   **Repository**: The workflow assumes a repository named `client-demos` exists. You must create this repository and enable GitHub Pages for it (e.g., from the `main` branch).
*   **OpenAI Node ("Write Email")**:
    *   **Prompt**: The prompt contains "I'm Roy from RoysCompany". You should update this to your actual name and company.

## 2. Spreadsheet Structure
Your Google Sheet must have the following headers (Case Sensitive):
*   `Status` (Workflow filters for value "Generate Website")
*   `Email`
*   `Business Name`
*   `Industry`
*   `City`
*   `State`
*   `Phone`
*   `Contact Name` (Optional)
*   `Demo URL` (Written by workflow)
*   `Email Sent` (Written by workflow)
*   `Subject Used` (Written by workflow)

## 3. Credentials Needed
Ensure you have connected the following accounts in n8n:
*   **Google Sheets** (for Trigger and Update)
*   **OpenAI** (for Website Generation and Email Writing)
*   **GitHub** (for File Upload)
*   **Gmail** (for Sending Email)

## 4. Potential Improvements
*   **Deployment Verification**: The workflow waits 60 seconds blindly. Adding an HTTP Request node to check if the page is actually 200 OK before sending the email would be safer.
*   **Error Handling**: If the OpenAI generation fails, the workflow might stop. Consider adding error paths.
*   **Unique Filenames**: The slug generation uses `Date.now()`, which is generally safe, but ensure `Business Name` is populated.
