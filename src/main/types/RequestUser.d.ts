import type {User} from "../api/models/user";
import {Request} from "express";

interface RequestUser extends Request {
    user: {fullName: string, email: string, userType: "free" | "premium", password: string, created: Date},
    authorization: string
    body: Request["body"] & {eventUrl?: string}

}