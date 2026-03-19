import { useState, useMemo } from "react";
import Avatar, {
  type AvatarSize,
  type AvatarShape,
} from "../components/Avatar";
import PageHeader from "../components/PageHeader";
import CodeViewer from "../components/CodeViewer";

export default function AvatarPage() {
  const [size, setSize] = useState<AvatarSize>("xl");
  const [shape, setShape] = useState<AvatarShape>("circle");
  // 의도적으로 깨진 링크와 정상 링크를 테스트하기 위한 상태
  const [imageType, setImageType] = useState<"valid" | "broken" | "none">(
    "valid",
  );
  const [fallback, setFallback] = useState("JU");

  const validSrc =
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80";
  const brokenSrc = "https://this-image-does-not-exist.com/broken.jpg";

  const currentSrc =
    imageType === "valid"
      ? validSrc
      : imageType === "broken"
        ? brokenSrc
        : undefined;

  const usageExampleCode = useMemo(() => {
    return `import Avatar from '../components/Avatar';

export default function UserProfile() {
  return (
    <div className="flex items-center gap-4">
      <Avatar 
        size="${size}"
        shape="${shape}"
        src="${imageType === "valid" ? "https://.../profile.jpg" : imageType === "broken" ? "broken_link.jpg" : ""}"
        fallback="${fallback}"
      />
      <div>
        <h4 className="text-white font-bold">Jun Developer</h4>
        <p className="text-sm text-gray-400">Frontend Engineer</p>
      </div>
    </div>
  );
}`;
  }, [size, shape, imageType, fallback]);

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-20 px-4">
      <PageHeader
        title="Avatar"
        description="사용자의 프로필 이미지나 이니셜을 예쁘게 표시하는 컴포넌트입니다. 이미지 로드 실패 시 Fallback UI를 제공합니다."
      />

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
        {/* 왼쪽: 미리보기(Preview) */}
        <div className="flex-1 min-w-0 bg-[#161b22] rounded-2xl border border-gray-800 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-800 text-sm text-gray-400 font-medium">
            Preview
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-10 min-h-100 bg-[#0a0d12] bg-[radial-gradient(#30363d_1px,transparent_1px)] bg-size-[16px_16px]">
            <div className="flex flex-col items-center justify-center p-12 border border-gray-800/50 rounded-3xl bg-[#161b22]/50 w-full max-w-sm mx-auto min-h-75">
              {/*  실제 아바타 렌더링 영역 */}
              <Avatar
                size={size}
                shape={shape}
                src={currentSrc}
                fallback={fallback}
                className="shadow-2xl shadow-black/50"
              />
              <div className="mt-6 text-center space-y-1">
                <h3 className="text-white font-semibold">Jun-UI User</h3>
                <p className="text-xs text-gray-500">
                  Status:{" "}
                  {imageType === "valid"
                    ? "이미지 로드 완료"
                    : imageType === "broken"
                      ? "이미지 깨짐 (Fallback 표시)"
                      : "이미지 없음 (Fallback 표시)"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 조종판(Controls) */}
        <div className="w-full lg:w-md shrink-0 flex flex-col gap-6">
          <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 flex flex-col gap-6">
            <h3 className="text-white font-semibold mb-1">Avatar Settings</h3>

            {/* 크기 설정 */}
            <div className="space-y-3">
              <label className="text-sm text-gray-300">Size (크기)</label>
              <div className="grid grid-cols-5 gap-1 bg-[#0a0d12] p-1 rounded-lg border border-gray-800">
                {(["sm", "md", "lg", "xl", "2xl"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`text-xs uppercase font-bold py-2 rounded transition-colors ${size === s ? "bg-[#00a2ff] text-white" : "text-gray-500 hover:text-gray-300"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* 모양 설정 */}
              <div className="space-y-3">
                <label className="text-sm text-gray-300">Shape (모양)</label>
                <div className="grid grid-cols-2 gap-1 bg-[#0a0d12] p-1 rounded-lg border border-gray-800">
                  {(["circle", "square"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setShape(s)}
                      className={`text-xs uppercase font-bold py-2 rounded transition-colors ${shape === s ? "bg-[#00a2ff] text-white" : "text-gray-500 hover:text-gray-300"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* 이미지 상태 설정 */}
              <div className="space-y-3">
                <label className="text-sm text-gray-300">Image Source</label>
                <select
                  value={imageType}
                  onChange={(e) =>
                    setImageType(e.target.value as "valid" | "broken" | "none")
                  }
                  className="w-full h-9 bg-[#0a0d12] border border-gray-800 rounded-lg px-2 text-xs text-white focus:border-[#00a2ff] outline-none"
                >
                  <option value="valid">정상 이미지 URL</option>
                  <option value="broken">깨진 이미지 URL</option>
                  <option value="none">URL 없음 (비우기)</option>
                </select>
              </div>
            </div>

            {/* Fallback 텍스트 설정 */}
            <div className="space-y-3">
              <label className="text-sm text-gray-300">
                Fallback Text (최대 2글자)
              </label>
              <input
                type="text"
                maxLength={2}
                value={fallback}
                onChange={(e) => setFallback(e.target.value.toUpperCase())}
                className="w-full bg-[#0a0d12] border border-gray-800 rounded-lg p-2.5 text-sm text-white focus:border-[#00a2ff] outline-none transition-colors"
                placeholder="ex) JU"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 px-1">
              <button className="text-xs font-medium px-3 py-1.5 rounded-t-lg transition-colors bg-[#161b22] text-[#00a2ff] border-t border-x border-gray-800">
                실무 적용 예시 💡
              </button>
            </div>
            <CodeViewer code={usageExampleCode} />
          </div>
        </div>
      </div>
    </div>
  );
}
