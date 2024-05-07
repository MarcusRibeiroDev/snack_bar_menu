export function useSendMessage() {
  async function sendMessage(msg, number) {
    const GZAPPY_URL = "https://api.gzappy.com/v1/message/send-message";

    const response = await fetch(GZAPPY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        user_token_id: "67e20117-8dbd-48c4-9d38-b8f3e4d7702e",
      },
      body: JSON.stringify({
        instance_id: "R5CA90UEHJ3WHKR1H719AVF0",
        instance_token: "08d1aea1-86a8-4864-8d08-7b7b2f768dd4",
        message: [msg],
        phone: [`55${number}`],
      }),
    });

    const data = await response.json();

    return data;
  }

  return {
    sendMessage,
  };
}
