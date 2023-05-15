import { compare } from 'bcryptjs';

const authServiceFactory = () => {
    const validate = async (password,dbPassword) => {
    return await compare(password, dbPassword)
    }

    return {validate}
}

export default authServiceFactory;