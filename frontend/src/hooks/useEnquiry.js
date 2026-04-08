// src/hooks/useEnquiry.js
// Reusable hook for submitting enquiry forms to the backend.
// Usage:
//   const { status, errorMsg, submit, reset } = useEnquiry();
//   await submit({ name, email, source: 'home-contact', ... });

import { useState } from "react";
import api from "../utils/api";

export function useEnquiry() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (payload) => {
    setStatus("loading");
    setErrorMsg("");
    try {
      await api.post("/enquiries", payload);
      setStatus("success");
      // Auto-reset after 4 s
      setTimeout(() => setStatus("idle"), 4000);
      return true;
    } catch (err) {
      setErrorMsg(
        err?.response?.data?.message || "Something went wrong. Please try again."
      );
      setStatus("error");
      return false;
    }
  };

  const reset = () => {
    setStatus("idle");
    setErrorMsg("");
  };

  return { status, errorMsg, submit, reset };
}