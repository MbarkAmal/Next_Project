import { NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file found" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary using a Promise wrapper
    const uploadedImage = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      uploadStream.end(buffer); // ⬅️ IMPORTANT: send the buffer to Cloudinary
    });

    return NextResponse.json({
      success: true,
      url: uploadedImage.secure_url, // ⬅️ Cloudinary image URL
      
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
