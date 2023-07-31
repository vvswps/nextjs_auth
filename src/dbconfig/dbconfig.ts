import mongoose from "mongoose";

export async function connect() {
  try {
    const connection = (await mongoose.connect(process.env.DB_URL!)).connection;

    connection.on("error", (error) => {
      console.error("Some error occurred!", error);
    });

    connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
  } catch (error) {
    console.error("Some error occurred!", error);
  }
}
