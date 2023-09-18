import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        console.log(reqBody);

        // Check if user already exists
        const user = await User.findOne({ email: email })

        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        // Check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        // Create and assign token
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "10s" });

        const response = NextResponse.json({    
            message: "Logged in successfully",
            success: true,
        });

        response.cookies.set("token", token, {
            httpOnly: true
        });

        return response;

    }
    catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}