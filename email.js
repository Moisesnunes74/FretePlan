import nodemailer from 'nodemailer';

export async function conectarEmail(email) {
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "freteplan@gmail.com",
        pass: "jzqslzvqjpvxlyzl"
    }
})
    return transporter;
}
