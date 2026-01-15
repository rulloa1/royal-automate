# Local Development Makefile

.PHONY: dev stop-ngrok

# Start the entire local stack: Vite dev server + Supabase local functions
dev:
	@echo "Starting local development stack..."
	# Run Vite and Supabase functions serve in parallel
	# Note: This uses powershell syntax for background jobs if on Windows, 
	# but for simplicity we'll suggest running in separate terminals or using a tool like 'concurrently'
	npx concurrently -k \
		"npm run dev" \
		"npx supabase functions serve n8n-proxy --no-verify-jwt --env-file .env"

# Helper to stop the background ngrok if it's still running
stop-ngrok:
	@echo "Stopping ngrok..."
	-taskkill /F /IM ngrok.exe /T
