import { useState } from "react";

interface CodeViewerProps {
  code: string;
}

export default function CodeViewer({ code }: CodeViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // 2초 뒤에 다시 '복사하기'로 돌아옴!
  };

  return (
    <div className="bg-[#161b22] rounded-2xl border border-gray-800 overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-800 text-sm text-gray-400 font-medium flex justify-between items-center">
        <span>Code</span>
        <button
          onClick={handleCopy}
          className={`text-xs transition-colors ${copied ? "text-green-400 font-bold" : "text-[#00a2ff] hover:text-white"}`}
        >
          {copied ? "✓ 복사 완료!" : "복사하기"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm text-green-400 font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}
