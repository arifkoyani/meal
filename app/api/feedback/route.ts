import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { feedback, timestamp } = body;

    if (!feedback) {
      return NextResponse.json(
        { success: false, error: "Missing required field: feedback is required." },
        { status: 400 }
      );
    }

    const webhookUrl = "https://automation.uconnect.work/webhook/fe38bfbf-c71e-4270-a279-6b771c2d18ac";

    const webhookPayload = {
      mode: "feedback",
      feedback,
      timestamp: timestamp || new Date().toISOString(),
    };

    // Forward feedback data to the webhook via POST method
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(webhookPayload),
    });

    if (!webhookResponse.ok) {
      const responseText = await webhookResponse.text().catch(() => "");
      console.error("Feedback webhook post failed:", webhookResponse.status, responseText);
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
      message: "Feedback data sent to webhook successfully",
      data: webhookPayload,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    console.error("Feedback API Route Error:", errorMessage);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
