import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Check } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isSuccess = searchParams.get("payment") === "success";

  useEffect(() => {
    if (!isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="glass-card p-12 max-w-md text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
          <Check className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your purchase. We'll be in touch shortly to begin your project.
        </p>
        <button
          onClick={() => navigate("/")}
          className="gradient-button px-8 py-3"
        >
          Return Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
