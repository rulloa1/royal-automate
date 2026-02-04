import { Helmet } from "react-helmet-async";

export default function ConversationsPage() {
  return (
    <>
      <Helmet>
        <title>Conversations | Admin | ROYSCOMPANY</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div>
        <div className="mb-8">
          <p className="text-primary font-mono text-sm mb-1">// CONVERSATIONS</p>
          <h1 className="font-display text-3xl tracking-tight text-foreground">
            VOICE <span className="text-primary">CONVERSATIONS</span>
          </h1>
        </div>

        <div className="border border-muted/50 bg-card/50 p-8 text-center">
          <p className="text-muted-foreground font-mono text-sm">
            Voice conversation logs will appear here.
          </p>
        </div>
      </div>
    </>
  );
}
