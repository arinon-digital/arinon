const PAYPAL_BASE =
  process.env.PAYPAL_ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
  console.warn("PayPal credentials are not fully configured.");
}

interface Product {
  id: string;
  title: string;
  price: number;
}

interface CreateOrderOptions {
  product: Product;
  buyerEmail: string;
  returnUrl: string;
  cancelUrl: string;
}

export interface PaypalOrder {
  id: string;
  status: string;
  links?: { href: string; rel: string; method: string }[];
}

async function getAccessToken() {
  const credentials = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");
  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch PayPal token: ${res.status} ${text}`);
  }

  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export async function createPaypalOrder(options: CreateOrderOptions): Promise<PaypalOrder> {
  const token = await getAccessToken();
  const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: options.product.price.toFixed(2),
          },
          description: options.product.title,
          custom_id: options.product.id,
        },
      ],
      application_context: {
        brand_name: "Arinon Store",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: options.returnUrl,
        cancel_url: options.cancelUrl,
      },
      payer: {
        email_address: options.buyerEmail,
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to create PayPal order: ${res.status} ${text}`);
  }

  return (await res.json()) as PaypalOrder;
}

export async function capturePaypalOrder(orderId: string) {
  const token = await getAccessToken();
  const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to capture PayPal order ${orderId}: ${res.status} ${text}`);
  }

  return res.json();
}

export async function getPaypalOrder(orderId: string) {
  const token = await getAccessToken();
  const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch PayPal order ${orderId}: ${res.status} ${text}`);
  }

  return res.json();
}

interface VerifyPayload {
  authAlgo: string | null;
  certUrl: string | null;
  transmissionId: string | null;
  transmissionSig: string | null;
  transmissionTime: string | null;
  webhookId: string;
  webhookEvent: string;
}

export async function verifyPaypalWebhook({
  authAlgo,
  certUrl,
  transmissionId,
  transmissionSig,
  transmissionTime,
  webhookId,
  webhookEvent,
}: VerifyPayload) {
  const token = await getAccessToken();
  const res = await fetch(`${PAYPAL_BASE}/v1/notifications/verify-webhook-signature`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      auth_algo: authAlgo,
      cert_url: certUrl,
      transmission_id: transmissionId,
      transmission_sig: transmissionSig,
      transmission_time: transmissionTime,
      webhook_id: webhookId,
      webhook_event: JSON.parse(webhookEvent),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to verify PayPal webhook: ${res.status} ${text}`);
  }

  const data = (await res.json()) as { verification_status?: string };
  return data.verification_status === "SUCCESS";
}
