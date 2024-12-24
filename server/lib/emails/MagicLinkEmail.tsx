import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";

interface MagicLinkEmailProps {
    name: string;
    buttonText?: string;
    subText: string;
    path: string;
}

// const baseUrl = process.env.DOMAIN_NAME as string;

export const MagicLinkEmail = ({name,buttonText,subText,path}: MagicLinkEmailProps) => {

    //e.g: magicLink = "http://localhost:3000/auth/verify-email?magicLink=123456nguyenynewd$&%#CV%677890";
    // const link = `${baseUrl}/auth/verify-email?magicLink=${magicLink}`;

    return (
        <Html>
            <Head />
            <Preview>Verify Your Email</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section>
                        <Text style={text}>Hi, {name}</Text>
                        <Text style={text}>
                            You have requested a {subText} for your Edufusion
                            account. If this was you, you can verify your email here:
                        </Text>
                        <Button style={button} href={path}>
                            {buttonText || "Click here"}
                        </Button>
                        <Text style={text}>
                            If you don&apos;t want to {subText} or didn&apos;t
                            request this, just ignore and delete this message.
                        </Text>
                        <Text style={text}>
                            To keep your account secure, please don&apos;t forward this email
                            to anyone. See our Help Center for{" "}
                            <Link style={anchor} href="#">
                                more security tips.
                            </Link>
                        </Text>
                        <Text style={text}>Happy Learning!</Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

export default MagicLinkEmail;

const main = {
    backgroundColor: "#f6f9fc",
    padding: "10px 0",
};

const container = {
    backgroundColor: "#ffffff",
    border: "1px solid #f0f0f0",
    padding: "45px",
};

const text = {
    fontSize: "16px",
    fontFamily:
        "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
    fontWeight: "300",
    color: "#404040",
    lineHeight: "26px",
};

const button = {
    backgroundColor: "black",
    borderRadius: "4px",
    color: "#fff",
    fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
    fontSize: "15px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    width: "210px",
    padding: "14px 7px",
};

const anchor = {
    textDecoration: "underline",
};
