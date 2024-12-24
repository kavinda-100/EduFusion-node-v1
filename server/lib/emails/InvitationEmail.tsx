import {
    Body,
    Button,
    Container,
    Column,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
    Tailwind,
} from "@react-email/components";
import * as React from "react";
import type {UserType} from "../../shared/types";
import dotenv from "dotenv";

dotenv.config();

interface InviteUserEmailProps {
    inviteLink: string;
    logo: string;
    user: UserType
    /**
     * @type {string} - User's password
     * @description - just for invite user, not for another invitation
     * */
    password?: string;
}

const DOMAIN_NAME = process.env.DOMAIN_NAME as string;

export const InvitationEmail = ({inviteLink, logo, user, password}: InviteUserEmailProps) => {

    const invitedByUsername = "@adminEduFusion"
    const invitedByEmail = "adminedufusion@gmail.com"
    const previewText = `Join ${invitedByUsername} on Edufusion`;

    const avatar = user.gender === "male" ?  "https://avatar.iran.liara.run/public/boy" : "https://avatar.iran.liara.run/public/girl";

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className="bg-white my-auto mx-auto font-sans px-2">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
                        <Section className="mt-[32px]">
                            <Img
                                src={logo || "https://placehold.co/400x400/png"}
                                width="40"
                                height="37"
                                alt="Edufusion"
                                className="my-0 mx-auto"
                            />
                        </Section>
                        <Heading className="text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                            Join <strong>{user.firstName}</strong> on <strong>EduFusion</strong>
                        </Heading>
                        <Text className="text-[14px] leading-[24px]">
                            Hello {user.firstName},
                        </Text>
                        <Text className="text-[14px] leading-[24px]">
                            <strong>{invitedByUsername}</strong> (
                            <Link
                                href={`#`}
                                className="text-blue-600 no-underline"
                            >
                                {invitedByEmail}
                            </Link>
                            ) has invited you to the <strong>{user.firstName}</strong> sign in{" "}
                            <strong>EduFusion</strong>.
                        </Text>
                        <Section>
                            <Row>
                                <Column align="right">
                                    <Img
                                        className="rounded-full"
                                        src={user.profilePicture || avatar}
                                        width="64"
                                        height="64"
                                    />
                                </Column>
                                <Column align="center">
                                    <Text className="space-x-3">➡️</Text>
                                </Column>
                                <Column align="left">
                                    <Img
                                        className="rounded-full"
                                        src={logo || "https://placehold.co/400x400/png"}
                                        width="64"
                                        height="64"
                                    />
                                </Column>
                            </Row>
                        </Section>
                        <Section className="text-center mt-[32px] mb-[32px]">
                            <Button
                                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                                href={inviteLink}
                            >
                                Join to EduFusion
                            </Button>
                        </Section>
                        <Text className="text-[14px] leading-[24px]">
                            or copy and paste this URL into your browser:{" "}
                            <Link href={`${DOMAIN_NAME}/auth/sign-in`} className="text-blue-600 no-underline">
                                {`${DOMAIN_NAME}/auth/sign-in`}
                            </Link>
                        </Text>
                        <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                        <section className="w-full m-2">
                            <Heading className="text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                                Your sign in <strong>credentials</strong>
                            </Heading>
                            <Text>Email: <strong>{user.email}</strong></Text>
                            <Text>Password: <strong>{password}</strong></Text>
                            <Text>Role: <strong>{user.role}</strong></Text>
                        </section>
                        <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                        <Text className="text-[#666666] text-[12px] leading-[24px]">
                            If you were not expecting this invitation, you can ignore this email. If
                            you are concerned about your account's safety, please reply to
                            this email to get in touch with us.
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default InvitationEmail;
