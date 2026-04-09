const axios = require("axios");
require("dotenv").config();

async function judge0({ code, languageId, input = "" }) {
  if (!code || !languageId) {
    throw new Error("Missing required fields: code or languageId");
  }

  const encodedCode = Buffer.from(code, "utf8").toString("base64");
  const encodedInput = Buffer.from(input, "utf8").toString("base64");

  try {
    const response = await axios.post(
      `${process.env.Judge0_URL}?base64_encoded=true&wait=true`,
      {
        source_code: encodedCode,
        language_id: languageId,
        stdin: encodedInput,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = response.data;

    return {
      output: data.stdout
        ? Buffer.from(data.stdout, "base64").toString("utf8")
        : "",
      error: data.stderr
        ? Buffer.from(data.stderr, "base64").toString("utf8")
        : data.compile_output
        ? Buffer.from(data.compile_output, "base64").toString("utf8")
        : "",
      status: data.status.description,
      time: data.time,
      memory: data.memory,
    };
  } catch (err) {
    console.error("Judge0 error:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || err.message);
  }
}

module.exports = judge0;