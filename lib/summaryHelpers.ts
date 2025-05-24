export const parseSection = (section: string):{title:string,points:any[]} => {
  const [title, ...content] = section.split("\n");

  const cleanTitle = title.startsWith("#")
    ? title.substring(1).trim()
    : title.trim();

  const points: String[] = [];
  let currentPoint = "";

  content.forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith("•")) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = trimmedLine;
    } else if (!trimmedLine) {
      if (currentPoint) points.push(currentPoint.trim());
      currentPoint = "";
    } else {
      currentPoint += " " + trimmedLine;
    }
  });

  if (currentPoint) points.push(currentPoint.trim());

  return {
    title: cleanTitle,
    points: points.filter(
      (point) =>
        point && !point.startsWith("#") && !point.startsWith("[Choose]")
    ),
  };
};

export function parsePoint(point: string) {
  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = /^\•/.test(point);

  // Replace the Unicode property escape with a simpler
  // emoji detection
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/u;
  const hasEmoji = emojiRegex.test(point);
  const isEmpty = !point.trim();

  return { isNumbered, isMainPoint, hasEmoji, isEmpty };
}

export function parseEmojiPoint(content: string) {
  console.log("original content:", content);

  // Remove optional leading ".", spaces, or dashes before the emoji
  const cleanContent = content.replace(/^[\s.\-]*([\p{Extended_Pictographic}])/u, '$1').trim();
  console.log("cleaned content:", cleanContent);

  const matches = cleanContent.match(/^([\p{Extended_Pictographic}]+)\s*(.+)$/u);
  console.log("matches:", matches);

  if (!matches) return null;

  const [, emoji, text] = matches;
  return {
    emoji: emoji.trim(),
    text: text.trim(),
  };
}