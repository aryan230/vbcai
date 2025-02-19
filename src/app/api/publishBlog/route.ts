import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBWZ70dSB0nEnvly15ZWVGwyjDKp7vIYJs",
  authDomain: "vbcai-52c1f.firebaseapp.com",
  projectId: "vbcai-52c1f",
  storageBucket: "vbcai-52c1f.firebasestorage.app",
  messagingSenderId: "267002688291",
  appId: "1:267002688291:web:42ee2a1ce033653ac91296",
  measurementId: "G-GHQSCFPZDW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface BlogPost {
  blog_post: string;
  timestamp: string;
  source: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Ensure the content-type is application/json
    const contentType = req.headers.get("content-type");
    if (contentType !== "application/json") {
      return NextResponse.json(
        { error: "Invalid Content-Type" },
        { status: 400 }
      );
    }

    // Parse JSON payload
    const { blog_post, timestamp, source }: BlogPost = await req.json();

    // Validate required fields
    if (!blog_post || !timestamp || !source) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("Received Blog Post:", { blog_post, timestamp, source });

    // Save to Firestore
    await addDoc(collection(db, "blogs"), {
      blog_post,
      timestamp,
      source,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Blog published successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
