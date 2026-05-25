import { prisma } from "../config/db.js";
import { sendSupportMail } from "../utils/mailer.js";
export class SupportTicketService {
    static async createTicket(data, sendAsEmail) {
        const ticket = await prisma.supportTicket.create({
            data: {
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                message: data.message,
                sendAsEmail,
            },
        });
        if (sendAsEmail) {
            await sendSupportMail(data);
            return { status: "email_sent", ticket };
        }
        return { status: "saved_to_db", ticket };
    }
}
