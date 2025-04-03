import fs from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "data", "seasons.json");

export async function GET(request, { params }) {
  const { slug } = params;
  console.log("Public GET: Requested season slug:", slug);
  try {
    if (!fs.existsSync(dataFile)) {
      console.error("No seasons file found at", dataFile);
      return new Response(JSON.stringify({ message: "No seasons found" }), {
        status: 404,
      });
    }
    const content = fs.readFileSync(dataFile, "utf8");
    console.log("File content:", content);
    const json = JSON.parse(content);
    const season = json.seasons.find((s) => s.slug === slug);
    if (!season) {
      console.error("Season not found for slug:", slug);
      return new Response(JSON.stringify({ message: "Season not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify({ season }), { status: 200 });
  } catch (err) {
    console.error("Error reading season data:", err);
    return new Response(
      JSON.stringify({
        message: "Error reading season data",
        error: err.message,
      }),
      { status: 500 }
    );
  }
}
