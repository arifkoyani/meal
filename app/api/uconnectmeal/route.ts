import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, date, time, timestamp, token, tokenId } = body;

    if (!name || !date || !time) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: name, date, and time are required." },
        { status: 400 }
      );
    }

    const webhookUrl = "https://automation.uconnect.work/webhook/fe38bfbf-c71e-4270-a279-6b771c2d18ac";

    const webhookPayload = {
      name,
      token: token || tokenId || "",
      tokenId: tokenId || token || "",
      date,
      time,
      timestamp: timestamp || new Date().toISOString(),
    };

    // Forward data to the webhook via POST method
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(webhookPayload),
    });

    if (!webhookResponse.ok) {
      const responseText = await webhookResponse.text().catch(() => "");
      console.error("Webhook post failed:", webhookResponse.status, responseText);
      return NextResponse.json(
        {
          success: false,
          error: `Webhook server returned status ${webhookResponse.status}`,
          details: responseText,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Token data sent to webhook successfully",
      data: webhookPayload,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    console.error("API Route Error:", errorMessage);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
