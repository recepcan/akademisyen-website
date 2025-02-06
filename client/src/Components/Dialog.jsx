import React, { useEffect, useState } from "react";

const parseMessages = (lines) => {
  return lines
    .map((line) => {
      const match = line.match(/(\d+\.\d+\.\d+) (\d+:\d+) - (.*?): (.*)/);
      if (match) {
        return {
          date: match[1],
          time: match[2],
          sender: match[3],
          content: match[4],
        };
      }
      return null;
    })
    .filter(Boolean);
};

// 🔥 Metindeki aranan kelimeyi vurgulayan fonksiyon
const highlightText = (text, search) => {
  if (!search) return text;
  const parts = text.split(new RegExp(`(${search})`, "gi")); // Aranan kelimeye göre böl
  return parts.map((part, index) =>
    part.toLowerCase() === search.toLowerCase() ? (
      <span key={index} className="bg-yellow-300 text-black px-1 rounded">
        {part}
      </span>
    ) : (
      part
    )
  );
};

const Dialog = () => {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState(""); // 🔍 Arama kutusu için state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/messages.txt")
      .then((response) => response.text())
      .then((text) => {
        const lines = text.trim().split("\n");
        let index = 0;
        const chunkSize = 50; // Her seferde 50 mesaj ekle

        const processChunk = () => {
          const chunk = lines.slice(index, index + chunkSize);
          if (chunk.length === 0) {
            setLoading(false);
            return;
          }

          setMessages((prev) => [...prev, ...parseMessages(chunk)]);
          index += chunkSize;
          setTimeout(processChunk, 100);
        };

        processChunk();
      })
      .catch((error) => console.error("Dosya okunamadı:", error));
  }, []);

  // 🔍 Arama filtresi
  const filteredMessages = messages.filter((msg) =>
    msg.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 max-w-lg mx-auto">
     
    <div className="sticky top-0 bg-gray-500 p-3 rounded-lg">
    <h2 className="text-lg font-bold mb-2">Mesajlar</h2>

    {/* 🔍 Arama Kutusu */}
    <input
      type="text"
      placeholder="Mesajlarda ara..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full p-4 border rounded mb-4"
    />
    </div>

      {loading && <p>Yükleniyor...</p>}

      <div className="flex flex-col gap-2">
        {filteredMessages.length === 0 ? (
          <p className="text-gray-500">Sonuç bulunamadı.</p>
        ) : (
          filteredMessages.map((msg, index) => (
            <div
              key={index}
              className={`p-2  rounded-lg max-w-xs ${
                msg.sender === "Recep"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-300 text-black self-start"
              }`}
            >
              <p className="text-sm font-bold">{msg.sender}</p>
              <p>{highlightText(msg.content, search)}</p> {/* 🔥 Vurgulanan metin */}
              <p className="text-xs text-right opacity-75">{msg.time}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dialog;
