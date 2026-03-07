import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // 🚀 Import the cookies helper

export async function POST() {
  try {
    // 1. Await the cookie store (Required in Next.js 15+)
    const cookieStore = await cookies();

    // 2. 💣 FORCE DELETE THE COOKIE
    // This native method safely completely wipes the token and handles the expiration automatically
    cookieStore.delete("token");

    // 3. Return the success response
    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
    }, { status: 200 });
    
  } catch (error) {
    console.error("Logout Error:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Failed to logout properly" 
    }, { status: 500 });
  }
}