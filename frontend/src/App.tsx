import { useState } from "react";
import { useShortenUrl } from "./hooks/useShortenUrl";

function App() {
  const [url, setUrl] = useState("");
  const { shortUrl, error, shorten } = useShortenUrl();

  return (
    <main>
      <h1>URL Shortener</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          shorten(url);
        }}
      >
        <input
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://example.com"
          aria-label="URL to shorten"
        />
        <button type="submit">Shorten</button>
      </form>

      {error && <p>{error}</p>}

      {shortUrl && (
        <p>
          Short URL: <a href={shortUrl}>{shortUrl}</a>
        </p>
      )}
    </main>
  );
}

export default App;
