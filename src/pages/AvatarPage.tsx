import { useState, useMemo, useRef, type ChangeEvent } from "react";
import Avatar, {
  type AvatarSize,
  type AvatarShape,
} from "../components/Avatar";
import PageHeader from "../components/PageHeader";
import CodeViewer from "../components/CodeViewer";
import {
  UploadCloud,
  Image as ImageIcon,
  AlertCircle,
  RotateCcw,
} from "lucide-react";

export default function AvatarPage() {
  const [size, setSize] = useState<AvatarSize>("2xl");
  const [shape, setShape] = useState<AvatarShape>("circle");
  const [fallback, setFallback] = useState("JU");

  //  초기 상태 undefined ->기본 아이콘
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const presetSrc =
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
  const brokenSrc = "https://this-image-link-is-broken.com/avatar.jpg";

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImageSrc(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // 현재 상태를 알려주는 헬퍼 함수
  const getStatusText = () => {
    if (!imageSrc) return "기본 프로필 (Empty) 👤";
    if (imageSrc === brokenSrc) return "이미지 로드 실패 (Fallback) ⚠️";
    if (imageSrc === presetSrc) return "샘플 이미지 로드 완료 ✨";
    return "내 사진 업로드 완료 📸";
  };

  const usageExampleCode = useMemo(() => {
    const srcProp = imageSrc
      ? `src="${imageSrc === presetSrc ? presetSrc : imageSrc === brokenSrc ? brokenSrc : "[사용자 업로드 이미지]"}"`
      : "";
    return `import Avatar from '../components/Avatar';

export default function UserProfile() {
  return (
    <div className="flex items-center gap-4 p-4 bg-[#161b22] border border-gray-800 rounded-2xl">
      <Avatar 
        size="${size}"
        shape="${shape}"
        ${srcProp}
        fallback="${fallback}"
      />
      <div>
        <h4 className="text-white font-bold">Jun Developer</h4>
        <p className="text-sm text-gray-400">Frontend Engineer</p>
      </div>
    </div>
  );
}`;
  }, [size, shape, imageSrc, fallback]);

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-20 px-4">
      <PageHeader
        title="Avatar"
        description="사용자의 프로필 이미지나 이니셜을 예쁘게 표시하는 컴포넌트입니다. 사용자 이미지 업로드 테스트 및 3가지 상태(정상, 에러 Fallback, Empty)를 지원합니다."
      />

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
        {/* 왼쪽: 미리보기(Preview) */}
        <div className="flex-1 min-w-0 bg-[#161b22] rounded-2xl border border-gray-800 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-800 text-sm text-gray-400 font-medium">
            Preview
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-10 min-h-100 bg-[#0a0d12] bg-[radial-gradient(#30363d_1px,transparent_1px)] bg-size-[16px_16px]">
            <div className="flex flex-col items-center justify-center p-12 border border-gray-800/50 rounded-3xl bg-[#161b22]/50 w-full max-w-sm mx-auto h-96 transition-all duration-300">
              <Avatar
                size={size}
                shape={shape}
                src={imageSrc}
                fallback={fallback}
                className="shadow-2xl shadow-black/70 animate-in zoom-in duration-300"
              />
              <div className="mt-8 text-center space-y-2">
                <h3 className="text-white font-semibold text-lg">
                  Jun-UI User
                </h3>
                <p className="text-sm text-[#00a2ff] font-medium px-3 py-1 bg-[#00a2ff]/10 rounded-full inline-block border border-[#00a2ff]/20">
                  Status: {getStatusText()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 조종판(Controls) */}
        <div className="w-full lg:w-md shrink-0 flex flex-col gap-6">
          <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 flex flex-col gap-6">
            <h3 className="text-white font-semibold mb-1">Avatar Settings</h3>

            <div className="space-y-3">
              <label className="text-sm text-gray-300">
                Image Source (상태 테스트)
              </label>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#0a0d12] border border-gray-800 rounded-lg text-sm font-medium text-[#00a2ff] hover:border-[#00a2ff]/50 transition-colors"
                >
                  <UploadCloud className="w-4 h-4" /> 내 사진
                </button>
                <button
                  onClick={() => setImageSrc(presetSrc)}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#0a0d12] border border-gray-800 rounded-lg text-sm font-medium text-emerald-400 hover:border-emerald-500/50 transition-colors"
                >
                  <ImageIcon className="w-4 h-4" /> 샘플 사진
                </button>
                <button
                  onClick={() => setImageSrc(brokenSrc)}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#0a0d12] border border-gray-800 rounded-lg text-sm font-medium text-yellow-500 hover:border-yellow-500/50 transition-colors"
                >
                  <AlertCircle className="w-4 h-4" /> 에러 유도
                </button>
                <button
                  onClick={clearImage}
                  disabled={!imageSrc}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#0a0d12] border border-gray-800 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:border-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RotateCcw className="w-4 h-4" /> 초기화
                </button>
              </div>
            </div>

            <div className="border-t border-gray-800"></div>

            <div className="space-y-3">
              <label className="text-sm text-gray-300">Size (크기)</label>
              <div className="grid grid-cols-5 gap-1 bg-[#0a0d12] p-1 rounded-lg border border-gray-800">
                {(["sm", "md", "lg", "xl", "2xl"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`text-xs uppercase font-bold py-2 rounded transition-colors ${size === s ? "bg-[#00a2ff] text-white shadow-md" : "text-gray-500 hover:text-gray-300"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
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

              <div className="space-y-3">
                <label className="text-sm text-gray-300">
                  Initials (이니셜)
                </label>
                <input
                  type="text"
                  maxLength={2}
                  value={fallback}
                  onChange={(e) => setFallback(e.target.value.toUpperCase())}
                  className="w-full bg-[#0a0d12] border border-gray-800 rounded-lg h-9 px-3 text-sm text-white focus:border-[#00a2ff] outline-none transition-colors"
                  placeholder="ex) JU"
                />
              </div>
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
