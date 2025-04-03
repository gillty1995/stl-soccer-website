import fs from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "data", "seasons.json");

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

export async function GET(request, { params }) {
  const { slug } = params;
  try {
    const json = readSeasons();
    const season = json.seasons.find((s) => s.slug === slug);
    if (!season) {
      return new Response(JSON.stringify({ message: "Season not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify({ season }), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({
        message: "Error reading season data",
        error: err.message,
      }),
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  // Check for admin token
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.ADMIN_TOKEN}`) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }
  const { slug } = params;
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
    const index = json.seasons.findIndex((s) => s.slug === slug);
    if (index === -1) {
      return new Response(JSON.stringify({ message: "Season not found" }), {
        status: 404,
      });
    }
    json.seasons[index].title = title;
    json.seasons[index].data = data;
    writeSeasons(json);
    return new Response(
      JSON.stringify({
        message: "Season updated successfully",
        season: json.seasons[index],
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ message: "Error updating season", error: err.message }),
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  // Check for admin token
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.ADMIN_TOKEN}`) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }
  const { slug } = params;
  try {
    const json = readSeasons();
    const index = json.seasons.findIndex((s) => s.slug === slug);
    if (index === -1) {
      return new Response(JSON.stringify({ message: "Season not found" }), {
        status: 404,
      });
    }
    json.seasons.splice(index, 1);
    writeSeasons(json);
    return new Response(
      JSON.stringify({ message: "Season deleted successfully" }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ message: "Error deleting season", error: err.message }),
      { status: 500 }
    );
  }
}
