import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Button,
} from "@react-email/components";
import dotenv from "dotenv";

dotenv.config();

const PROD_DOMAIN_NAME = process.env.DOMAIN_NAME as string;
const DOMAIN_NAME =
  process.env.DEV_MODE === "development"
    ? "http://localhost:5173/dashboard/profile"
    : `${PROD_DOMAIN_NAME}/dashboard/profile`;

type OTPEmailProps = {
  name: string;
  OTP: number;
};

const OTPEmail = ({ name, OTP }: OTPEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset Password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={company}>Hi, {name}</Text>
          <Heading style={codeTitle}>Your authentication code</Heading>
          <Text style={codeDescription}>
            Press the Reset button to proceed with the password reset. And enter
            it in your open browser window. This code will expire in 15 minutes.
          </Text>
          <Section style={codeContainer}>
            <Heading style={codeStyle}>{OTP}</Heading>
          </Section>
          <Section style={buttonContainer}>
            <Button href={DOMAIN_NAME} style={button}>
              Reset Password
            </Button>
          </Section>
          <Text style={paragraph}>Not expecting this email?</Text>
          <Text style={paragraph}>
            Contact{" "}
            <Link href="#" style={link}>
              support@edufusion.com
            </Link>{" "}
            if you did not request this code.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default OTPEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
  textAlign: "center" as const,
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #ddd",
  borderRadius: "5px",
  marginTop: "20px",
  width: "480px",
  maxWidth: "100%",
  margin: "0 auto",
  padding: "12% 6%",
};

const company = {
  fontWeight: "bold",
  fontSize: "18px",
  textAlign: "center" as const,
};

const codeTitle = {
  textAlign: "center" as const,
};

const codeDescription = {
  textAlign: "center" as const,
};

const codeContainer = {
  background: "rgba(0,0,0,.05)",
  borderRadius: "4px",
  margin: "16px auto 14px",
  verticalAlign: "middle",
  width: "280px",
  maxWidth: "100%",
};

const codeStyle = {
  color: "#000",
  display: "inline-block",
  paddingBottom: "8px",
  paddingTop: "8px",
  margin: "0 auto",
  width: "100%",
  textAlign: "center" as const,
  letterSpacing: "8px",
};

const buttonContainer = {
  margin: "27px auto",
  width: "auto",
};

const button = {
  backgroundColor: "black",
  borderRadius: "3px",
  fontWeight: "600",
  color: "#fff",
  textAlign: "center" as const,
  padding: "12px 24px",
  margin: "0 auto",
};

const paragraph = {
  color: "#444",
  letterSpacing: "0",
  padding: "0 40px",
  margin: "0",
  textAlign: "center" as const,
};

const link = {
  color: "#444",
  textDecoration: "underline",
};
