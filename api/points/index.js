let points = [];

module.exports = async function (context, req) {
  context.res = { headers: { "Access-Control-Allow-Origin": "*" } };

  if (req.method === "OPTIONS") {
    context.res = {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
    return;
  }

  if (req.method === "GET") {
    context.res = { ...context.res, body: points };
    return;
  }

  if (req.method === "POST") {
    const point = req.body;
    if (
      !point ||
      typeof point.lat !== "number" ||
      typeof point.lng !== "number" ||
      !point.title ||
      !point.type
    ) {
      context.res = { ...context.res, status: 400, body: { error: "Invalid point" } };
      return;
    }
    points.push(point);
    context.res = { ...context.res, body: points };
    return;
  }

  context.res = { ...context.res, status: 405, body: "Method Not Allowed" };
};