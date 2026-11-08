import { NextRequest, NextResponse } from "next/server";

interface ContactFormData {
  name: string;
  email: string;
  organization: string;
  role: string;
  specialty: string;
  monthlyClaimVolume: string;
  biggestDenialPain: string;
  message: string;
  honeypot: string;
}

const REQUIRED_FIELDS: (keyof ContactFormData)[] = [
  "name", "email", "organization", "role", "specialty",
  "monthlyClaimVolume", "biggestDenialPain",
];

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateFormData(data: ContactFormData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (data.honeypot && data.honeypot.trim().length > 0) {
    return { valid: false, errors: ["Bot detected"] };
  }
  for (const field of REQUIRED_FIELDS) {
    if (!data[field] || data[field].trim().length === 0) {
      errors.push(`${field} is required`);
    }
  }
  if (data.email && !validateEmail(data.email)) {
    errors.push("Invalid email format");
  }
  return { valid: errors.length === 0, errors };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ContactFormData;
    const validation = validateFormData(body);
    if (!validation.valid) {
      return NextResponse.json({ success: false, errors: validation.errors }, { status: 400 });
    }
    console.log("Contact form submission:", {
      name: body.name, email: body.email, organization: body.organization,
      role: body.role, specialty: body.specialty, monthlyClaimVolume: body.monthlyClaimVolume,
      biggestDenialPain: body.biggestDenialPain, hasMessage: body.message.trim().length > 0,
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json({
      success: true,
      message: "Thank you for your submission. We'll review your denied claim and respond within 1 business day.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ success: false, errors: ["An error occurred. Please try again later."] }, { status: 500 });
  }
}
