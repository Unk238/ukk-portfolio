export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ message: "Please complete all fields." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Log the contact submission (in production, you could forward to an email service, database, etc.)
    console.log("Contact form submission:", { name, email, message });

    return new Response(
      JSON.stringify({ message: "Your message was sent successfully!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch {
    return new Response(
      JSON.stringify({ message: "Error sending message." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
