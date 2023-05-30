import Mint from "mint-filter";

async function loadWordList(): Promise<string[]> {
  const response = await fetch("/words.txt");

  if (!response.ok) {
    console.error(
      "Failed to load word list:",
      response.status,
      response.statusText,
    );
    return [];
  }
  const text = await response.text();
  return text.split("\n").map((line) => line.trim());
}

export async function initializeMint(): Promise<Mint> {
  const wordList = await loadWordList();
  console.log("Loaded word list:", wordList); // 查看加载的词库
  const mint = new Mint(wordList);
  mint.add("习近平");

  return mint;
}
