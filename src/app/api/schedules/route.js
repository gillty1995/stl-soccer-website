import fs from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "data", "schedules.txt");

export async function GET(request) {
  try {
    if (!fs.existsSync(dataFile)) {
      console.error("Data file does not exist.");
      return new Response(JSON.stringify({ message: "Data file not found." }), {
        status: 500,
      });
    }
    const schedule = fs.readFileSync(dataFile, "utf8");
    console.log("Public schedule read successfully");
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
