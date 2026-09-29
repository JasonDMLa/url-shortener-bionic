import { useState } from "react";

const API_BASE_URL = "http://localhost:4000";

export function useShortenUrl() {
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  async function shorten(url: string) {
    setError("");
    setShortUrl("");

    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error(
          "Please enter a valid URL starting with http:// or https://",
        );
      }

      const data = await response.json();
      setShortUrl(`${API_BASE_URL}${data.short_url}`);
      
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return { shortUrl, error, shorten };
}
