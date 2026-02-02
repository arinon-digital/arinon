import nodemailer from "nodemailer";

const smtpUrl = process.env.SMTP_URL;
const emailFrom = process.env.EMAIL_FROM;

if (!smtpUrl) {
  console.warn("SMTP_URL is not configured. Emails will fail until provided.");
}

const transporter = smtpUrl
  ? nodemailer.createTransport(smtpUrl)
  : null;

interface Order {
  id: string;
  email: string;
  product: {
    title: string;
  };
  pdfDriveLink: string;
}

interface Purchase {
  id: string;
  buyerEmail: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  email?: string;
  product: {
    title: string;
    driveLink?: string;
  };
}

export async function sendOrderEmail(order: Order) {
  if (!transporter) {
    throw new Error("Email transporter not configured");
  }
  if (!emailFrom) {
    throw new Error("EMAIL_FROM is not configured");
  }

  const subject = `Your Order ${order.id}`;
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
      <p style="margin: 0 0 12px 0; font-size: 16px;">Hi there,</p>
      <p style="margin: 0 0 12px 0; font-size: 16px;">Thank you for your purchase!</p>
      <p style="margin: 0 0 12px 0; font-size: 16px;"><strong>Order ID:</strong> ${order.id}</p>
      <p style="margin: 0 0 12px 0; font-size: 16px;"><strong>Product:</strong> ${order.product.title}</p>
      <p style="margin: 0 0 12px 0; font-size: 16px;">Download your PDF here: <a href="${order.pdfDriveLink}" target="_blank" rel="noopener noreferrer">${order.pdfDriveLink}</a></p>
      <p style="margin: 0; font-size: 16px;">Thank you for your purchase!</p>
    </div>
  `;

  const text = `Hi there,

Thank you for your purchase!

Order ID: ${order.id}
Product: ${order.product.title}

Download your PDF here: ${order.pdfDriveLink}

Thank you for your purchase!`;

  const info = await transporter.sendMail({
    from: emailFrom,
    to: order.email,
    subject,
    html,
    text,
  });

  console.info(`Email sent for order ${order.id}`, info.messageId);
  return info;
}

export async function sendPurchaseEmail(purchase: Purchase, product: { title: string; driveLink?: string }) {
  if (!transporter) {
    throw new Error("Email transporter not configured");
  }
  if (!emailFrom) {
    throw new Error("EMAIL_FROM is not configured");
  }

  const driveLink = product.driveLink || "";
  const razorpayOrderId = (purchase as any).razorpayOrderId || (purchase as any).razorpayPaymentId || purchase.id;
  const subject = `Your order ${razorpayOrderId}`;
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
      <p style="margin: 0 0 12px 0; font-size: 16px;">Hi there,</p>
      <p style="margin: 0 0 12px 0; font-size: 16px;">Thank you for purchasing <strong>${product.title}</strong>.</p>
      <p style="margin: 0 0 12px 0; font-size: 16px;">Your Order ID: <strong>${razorpayOrderId}</strong></p>
      <p style="margin: 0 0 12px 0; font-size: 16px;">Download your PDF here: <a href="${driveLink}" target="_blank" rel="noopener noreferrer">${driveLink}</a></p>
      <p style="margin: 0 0 12px 0; font-size: 16px;">If you have any trouble accessing the file, just reply to this email.</p>
      <p style="margin: 0; font-size: 16px;">— The Arinon Team</p>
    </div>
  `;

  const text = `Hi there,

Thank you for purchasing ${product.title}.
Your Order ID: ${razorpayOrderId}
Download your PDF here: ${driveLink}

If you have any trouble accessing the file, just reply to this email.

— The Arinon Team`;

  const info = await transporter.sendMail({
    from: emailFrom,
    to: (purchase as any).email || purchase.buyerEmail,
    subject,
    html,
    text,
  });

  console.info(`Email sent for order ${razorpayOrderId}`, info.messageId);
  return info;
}
