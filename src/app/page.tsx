import App from "../App";
import { profilePageSchema, jsonLd } from "../lib/schema";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(profilePageSchema())} />
      <App />
    </>
  );
}
