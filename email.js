import nodemailer from 'nodemailer';

export async function conectarEmail(email) {
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "",
        pass: ""
    }
})
    return transporter;
}
