import fs from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "data", "seasons.json");

export async function GET(request) {
  try {
    if (!fs.existsSync(dataFile)) {
      return new Response(JSON.stringify({ seasons: [] }), { status: 200 });
    }
    const content = fs.readFileSync(dataFile, "utf8");
    const json = JSON.parse(content);
    // Return only slug and title
    const seasons = json.seasons.map(({ slug, title }) => ({ slug, title }));
    return new Response(JSON.stringify({ seasons }), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: "Error reading seasons data",
        error: err.message,
      }),
      { status: 500 }
    );
  }
}
