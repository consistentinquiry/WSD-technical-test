import {UserType} from "./UserType";

interface RequestUser extends Request {
    user: string,
    authorization: string
}