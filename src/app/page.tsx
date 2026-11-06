import AppV5 from "../AppV5";
import { profilePageSchema, jsonLd } from "../lib/schema";

// The portfolio (formerly the /v10 preview). Title, description and share
// image come from the root layout.
export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(profilePageSchema())} />
      <AppV5 portfolio journal />
    </>
  );
}
