import { useState, useEffect } from "react";
import api from "./api";

export function usePricing() {

  const [pricing, setPricing] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPricing = async () => {
    try {
      const { data } = await api.get("/pricing");
      setPricing(data.pricing);
    } catch (err) {
      console.error("Pricing fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchPricing();

    // listen for dashboard update
    const refresh = () => fetchPricing();

    window.addEventListener("pricingUpdated", refresh);

    return () => window.removeEventListener("pricingUpdated", refresh);

  }, []);

  return { pricing, loading };
}