import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";

const dataFile = path.join(process.cwd(), "data", "seasons.json");

// Helper functions
function readSeasons() {
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(
      dataFile,
      JSON.stringify({ seasons: [] }, null, 2),
      "utf8"
    );
  }
  return JSON.parse(fs.readFileSync(dataFile, "utf8"));
}

function writeSeasons(json) {
  fs.writeFileSync(dataFile, JSON.stringify(json, null, 2), "utf8");
}

export async function GET(request) {
  try {
    const json = readSeasons();
    return new Response(JSON.stringify(json), { status: 200 });
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

export async function POST(request) {
  // Check for admin token in header
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.ADMIN_TOKEN}`) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }
  try {
    const { title, data } = await request.json();
    if (
      !title ||
      typeof title !== "string" ||
      !data ||
      typeof data !== "string"
    ) {
      return new Response(JSON.stringify({ message: "Invalid input" }), {
        status: 400,
      });
    }
    const json = readSeasons();
    // Generate a slug from title and ensure uniqueness
    const slugBase = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    let slug = slugBase;
    while (json.seasons.find((s) => s.slug === slug)) {
      slug = `${slugBase}-${nanoid(4)}`;
    }
    const newSeason = { slug, title, data };
    json.seasons.push(newSeason);
    writeSeasons(json);
    return new Response(
      JSON.stringify({
        message: "Season created successfully",
        season: newSeason,
      }),
      { status: 201 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ message: "Error creating season", error: err.message }),
      { status: 500 }
    );
  }
}
