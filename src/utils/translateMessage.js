
export const translateMessage = (message, lang = "en") => {
  if (!message) return "";

  const parts = message.split(" / ");
  if (parts.length === 1) return message;

  return lang === "vi" ? parts[1]?.trim() : parts[0]?.trim();
};
