import nodemailer, { type Transporter } from "nodemailer";

const host = process.env.EMAIL_HOST || "smtp.gmail.com";
const port = Number(process.env.EMAIL_PORT) || 587;
const user = process.env.EMAIL_HOST_USER;
const pass = process.env.EMAIL_HOST_PASSWORD;
const adminEmail = process.env.ADMIN_EMAIL || "tushar4062@gmail.com";

let transporter: Transporter | null = null;

if (user && pass) {
  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user: user.trim(),
      pass: pass.trim(),
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

export async function sendEnquiryEmail(enquiry: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
}) {
  if (!transporter) {
    console.warn("Mail transporter not configured (missing user/pass)");
    return;
  }

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
      <div style="background: linear-gradient(125deg, #ff5500 0%, #ff6b00 100%); padding: 16px; border-radius: 8px; text-align: center;">
        <h2 style="color: #ffffff; margin: 0;">New Project Enquiry — SOSync AI Tech</h2>
      </div>
      <div style="padding: 20px 0; color: #1e293b; line-height: 1.6;">
        <p><strong>Name:</strong> ${enquiry.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${enquiry.email}">${enquiry.email}</a></p>
        <p><strong>Phone:</strong> ${enquiry.phone || "Not provided"}</p>
        <p><strong>Company:</strong> ${enquiry.company || "Not provided"}</p>
        <p><strong>Subject:</strong> ${enquiry.subject || "Project Consultation"}</p>
        <div style="margin-top: 15px; padding: 12px; background: #f8fafc; border-left: 4px solid #ff6b00; border-radius: 4px;">
          <strong>Message:</strong>
          <p style="white-space: pre-wrap; margin: 8px 0 0 0;">${enquiry.message}</p>
        </div>
      </div>
      <div style="text-align: center; border-top: 1px solid #e2e8f0; padding-top: 15px; font-size: 12px; color: #64748b;">
        Received from SOSync AI Tech Web Portal
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"SOSync AI Tech" <${user}>`,
      to: adminEmail,
      replyTo: enquiry.email,
      subject: `[New Inquiry] ${enquiry.subject || "Project Request"} from ${enquiry.name}`,
      html: htmlContent,
    });
    console.log(`✉️ Notification email sent to ${adminEmail}`);
  } catch (err) {
    console.error("Failed to send enquiry email:", err);
  }
}
