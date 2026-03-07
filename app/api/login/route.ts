import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import axios from 'axios';

// Fallback JSON server URL
const JSON_SERVER_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    let isValidUser = false;
    let userData = null;

    // 1. Verify Credentials against your JSON Server
    try {
      // Assuming you have a "users" array in your db.json
      const response = await axios.get(`${JSON_SERVER_URL}/users`);
      const users = response.data;
      
      const foundUser = users.find((u: any) => u.email === email && u.password === password);
      
      if (foundUser) {
        isValidUser = true;
        userData = { name: foundUser.name, role: foundUser.role, avatar: foundUser.avatar };
      }
    } catch (dbError) {
      // 🚀 FALLBACK: If json-server doesn't have a /users route yet, use this hardcoded check so you don't get locked out!
      if (email === "admin@kiranahub.com" && password === "admin") {
        isValidUser = true;
        userData = { name: "Super Admin", role: "Super Admin" };
      }
    }

    if (isValidUser && userData) {
      // 2. Prepare the Secret
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || 'default_secret_key'
      );

      // 3. Generate the JWT (The "ID Card")
      const token = await new SignJWT({ 
        role: userData.role, 
        email: email 
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h') // Token expires in 24 hours
        .sign(secret);

      // 4. Set the HttpOnly Cookie
      const cookieStore = await cookies();
      
      cookieStore.set('token', token, {
        httpOnly: true, // 🔒 JavaScript cannot read this (Defeats XSS hackers)
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        sameSite: 'lax', // Protects against CSRF
        maxAge: 60 * 60 * 24, // 1 day
        path: '/', // Accessible across the whole site
      });

      // 5. Return Success
      return NextResponse.json({ 
        success: true, 
        message: "Login successful",
        user: userData 
      }, { status: 200 });

    } else {
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 });
    }

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}