import fs from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "data", "schedules.txt");

export async function GET() {
  console.log("=== API Route: /api/admin/schedules (GET) ===");
  console.log("Working directory:", process.cwd());
  console.log("Data file path:", dataFile);
  console.log("ADMIN_TOKEN from env:", process.env.ADMIN_TOKEN);
  try {
    if (!fs.existsSync(dataFile)) {
      console.error("Data file does not exist.");
      return new Response(JSON.stringify({ message: "Data file not found." }), {
        status: 500,
      });
    }
    const schedule = fs.readFileSync(dataFile, "utf8");
    console.log("Schedule read successfully");
    return new Response(JSON.stringify({ schedule }), { status: 200 });
  } catch (err) {
    console.error("Error reading schedule data:", err);
    return new Response(
      JSON.stringify({
        message: "Error reading schedule data",
        error: err.message,
      }),
      { status: 500 }
    );
  }
}

export async function POST(request) {
  console.log("=== API Route: /api/admin/schedules (POST) ===");
  const authHeader = request.headers.get("authorization");
  console.log("Authorization header:", authHeader);
  if (authHeader !== `Bearer ${process.env.ADMIN_TOKEN}`) {
    console.error("Unauthorized: Token mismatch");
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }
  try {
    const { schedule } = await request.json();
    if (typeof schedule !== "string") {
      console.error("Invalid schedule data type");
      return new Response(
        JSON.stringify({ message: "Invalid schedule data" }),
        {
          status: 400,
        }
      );
    }
    fs.writeFileSync(dataFile, schedule, "utf8");
    console.log("Schedule written successfully");
    return new Response(
      JSON.stringify({ message: "Schedule updated successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error writing schedule data:", err);
    return new Response(
      JSON.stringify({
        message: "Error writing schedule data",
        error: err.message,
      }),
      { status: 500 }
    );
  }
}
