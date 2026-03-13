const mongoose = require("mongoose");
const Task = require("./models/task");

const MONGO_URI = "mongodb://127.0.0.1:27017/tasks";

// --- Data for seeding ---
const titles = [
  "Design basketball jersey concept",
  "Edit portrait photoshoot",
  "Create Instagram poster for brand",
  "Design football kit mockup",
  "Retouch product photography",
  "Create logo variations for client",
  "Design social media carousel",
  "Color grade landscape photos",
  "Prepare print-ready poster design",
  "Create jersey typography layout",
  "Edit wedding photo batch",
  "Design esports jersey concept",
  "Build brand identity moodboard",
  "Create YouTube thumbnail design",
  "Design sports team logo",
];

const descriptions = [
  "Refine visual composition and improve color balance",
  "Adjust lighting, contrast, and sharpness",
  "Prepare assets for client delivery",
  "Export high resolution files for printing",
  "Experiment with typography and layout structure",
  "Retouch images and remove imperfections",
  "Optimize design for social media platforms",
  "Develop multiple creative variations",
  "Ensure consistent brand style and colors",
  "Finalize design and export production files",
];

const statuses = ["pending", "in-progress", "done"];

const tagsPool = [
  "graphic-design",
  "photography",
  "jersey-design",
  "branding",
  "social-media",
  "photo-editing",
  "sports-design",
  "print-design",
  "logo-design",
  "color-grading",
  "retouching",
  "client-work",
];

// --- Helper functions ---
function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomTags() {
  const count = Math.floor(Math.random() * 3) + 1;
  const shuffled = [...tagsPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function randomDate(daysBack = 90) {
  const now = new Date();
  const past = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
  return new Date(
    past.getTime() + Math.random() * (now.getTime() - past.getTime()),
  );
}

function generateTask() {
  const status = randomItem(statuses);

  return {
    title: randomItem(titles),
    description: randomItem(descriptions),
    status,
    priority: Math.floor(Math.random() * 5) + 1,
    tags: randomTags(),
    assignedTo: `user_${Math.floor(Math.random() * 50) + 1}`,
    estimatedHours: Math.floor(Math.random() * 10) + 1,
    completed: status === "done",
    createdAt: randomDate(),
    dueDate: randomDate(),
  };
}

// --- Seed Function ---
async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to database");

    // Clear old tasks
    const deleted = await Task.deleteMany({});
    console.log(`Deleted ${deleted.deletedCount} old tasks`);

    // Generate 20,000 tasks
    const tasks = [];
    for (let i = 0; i < 20000; i++) {
      tasks.push(generateTask());
    }

    await Task.insertMany(tasks);
    console.log("Inserted 20,000 tasks");

    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

// Run seed
seedDatabase();
