import { render } from "@react-email/render";
import nodemailer from "nodemailer";

import OTPEmail from "../../lib/emails/OTPEmail";
import MagicLinkEmail from "../../lib/emails/MagicLinkEmail";
import InvitationEmail from "../../lib/emails/InvitationEmail";
import type {UserType} from "../../shared/types";
import dotenv from "dotenv";

dotenv.config();

const MY_EMAIL = process.env.MY_EMAIL;
const MY_EMAIL_PASSWORD = process.env.MY_EMAIL_PASSWORD;

// send OTP email for Reset Password
type sendOTPEmailProps = {
    receiverEmail: string;
    receiverName: string;
    OTP: number;
}
/**
 * @param {sendOTPEmailProps} props
 * @returns {Promise<boolean>}
 * @description Send OTP emails E.G: Reset Password
 * */
export const sendOTPEmail = async ({receiverEmail,receiverName,OTP}: sendOTPEmailProps): Promise<boolean> => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: MY_EMAIL,
            pass: MY_EMAIL_PASSWORD,
        },
    });

    const emailHtml = await render(OTPEmail({ name: receiverName, OTP }));

    const options = {
        from: MY_EMAIL,
        to: receiverEmail,
        subject: "Your One Time Password (OTP)",
        html: emailHtml,
    };

    try {
        await transporter.sendMail(options);
        return true;
    } catch (error: any) {
        console.log("Error OTPEmail", error);
        return false;
    }
};

type sendMagicLinkEmailProps = {
    receiverEmail: string;
    receiverName: string;
    buttonText: string;
    subText: string;
    path: string;
}
/**
 * @param {sendMagicLinkEmailProps} props
 * @returns {Promise<boolean>}
 * @description Send Magic Link emails E.G: Verify Email
 * */
export const sendMagicLinkEmail = async ({receiverEmail,receiverName,buttonText,subText,path}: sendMagicLinkEmailProps): Promise<boolean> => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: MY_EMAIL,
            pass: MY_EMAIL_PASSWORD,
        },
    });

    const emailHtml = await render(MagicLinkEmail({ name: receiverName, buttonText, subText, path }));

    const options = {
        from: MY_EMAIL,
        to: receiverEmail,
        subject: `Verify Your ${subText}`,
        html: emailHtml,
    };

    try {
        await transporter.sendMail(options);
        return true;
    } catch (error: any) {
        console.log("Error MagicLinkEmail", error);
        return false;
    }
}


type sendInvitationEmailProps = {
    inviteLink: string;
    logo: string;
    user: UserType;
    /**
     * @type {string} - User's password
     * @description - just for invite user, not for another invitation
     * */
    password?: string;
}
/**
 * @param {sendInvitationEmailProps} props
 * @returns {Promise<boolean>}
 * @description Send Invitation emails E.G: Invite User
 * */
export const sendInvitationEmail = async ({inviteLink,logo,user, password}: sendInvitationEmailProps): Promise<boolean> => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: MY_EMAIL,
            pass: MY_EMAIL_PASSWORD,
        },
    });

    const emailHtml = await render(InvitationEmail({ inviteLink, logo, user, password }));

    const options = {
        from: MY_EMAIL,
        to: user.email,
        subject: `Join ${user.firstName} on Edufusion`,
        html: emailHtml,
    };

    try {
        await transporter.sendMail(options);
        return true;
    } catch (error: any) {
        console.log("Error invitationEmail", error);
        return false;
    }
}

