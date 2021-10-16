import { hash , compare} from "bcryptjs";

export async function hashPassword(pass){
    const hashedPass = await hash(pass , 12)
    return hashedPass;
}

export async function verifyPassword(pass , hashedPassword){
    const isVaild = await compare(pass , hashedPassword)
    return isVaild;
}