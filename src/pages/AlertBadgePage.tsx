import { useState, useMemo } from "react";
import Alert, { type AlertVariant } from "../components/feedback/Alert";
import Badge, { type BadgeVariant } from "../components/feedback/Badge";
import PageHeader from "../components/layout/PageHeader";
import CodeViewer from "../components/layout/CodeViewer";
import { Terminal } from "lucide-react";

export default function AlertBadgePage() {
  const [variant, setVariant] = useState<AlertVariant | BadgeVariant>(
    "default",
  );

  const usageExampleCode = useMemo(() => {
    return `import Alert from '../components/Alert';
import Badge from '../components/Badge';

export default function SystemStatus() {
  return (
    <div className="flex flex-col gap-4">
      {/* 뱃지 사용 예시 */}
      <div className="flex items-center gap-2">
        <h3 className="text-white font-bold">API 서버 상태</h3>
        <Badge variant="${variant}">
          ${variant === "success" ? "정상 작동중" : variant === "danger" ? "장애 발생" : "점검중"}
        </Badge>
      </div>

      {/* 경고창 사용 예시 */}
      <Alert 
        variant="${variant}" 
        title="시스템 업데이트 안내"
      >
        새로운 기능이 배포되었습니다. 최적의 환경을 위해 브라우저를 새로고침 해주세요.
      </Alert>
    </div>
  );
}`;
  }, [variant]);

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-20 px-4">
      <PageHeader
        title="Alert & Badge"
        description="중요한 메시지를 전달하는 경고창과 요소의 상태나 카테고리를 직관적으로 나타내는 뱃지입니다."
      />

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
        {/* 왼쪽: 미리보기(Preview) */}
        <div className="flex-1 min-w-0 bg-[#161b22] rounded-2xl border border-gray-800 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-800 text-sm text-gray-400 font-medium">
            Preview
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-10 min-h-100 bg-[#0a0d12] bg-[radial-gradient(#30363d_1px,transparent_1px)] bg-size-[16px_16px]">
            <div className="w-full max-w-lg mx-auto flex flex-col gap-10">
              {/*  뱃지 미리보기 */}
              <div className="flex flex-col items-center gap-4">
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                  Badges
                </span>
                <div className="flex flex-wrap items-center justify-center gap-3 p-6 border border-gray-800/50 rounded-2xl bg-[#161b22]/50">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="info">Info</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="danger">Danger</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </div>

              {/* 경고창 미리보기 */}
              <div className="flex flex-col items-center gap-4 w-full">
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                  Alert Box
                </span>
                <Alert
                  variant={variant as AlertVariant}
                  title="Jun-UI 시스템 알림"
                >
                  선택하신{" "}
                  <Badge variant={variant} className="mx-1">
                    {variant}
                  </Badge>{" "}
                  테마의 경고창입니다. 데이터 저장 실패, 서버 점검, 업데이트
                  완료 등 중요한 메시지를 사용자 화면에 고정하여 보여줄 때
                  사용합니다.
                </Alert>

                {/* 커스텀 아이콘 예시 */}
                <Alert
                  variant="default"
                  title="커스텀 아이콘 적용"
                  icon={<Terminal className="h-5 w-5 text-gray-400" />}
                >
                  기본 제공되는 아이콘 대신 원하는 Lucide 아이콘을 Prop으로
                  주입할 수도 있습니다!
                </Alert>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 조종판(Controls) */}
        <div className="w-full lg:w-md shrink-0 flex flex-col gap-6">
          <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 flex flex-col gap-6">
            <h3 className="text-white font-semibold mb-1">Theme Settings</h3>

            <div className="space-y-3">
              <label className="text-sm text-gray-300">
                Variant (상태 테마)
              </label>
              <div className="grid grid-cols-3 gap-2 bg-[#0a0d12] p-2 rounded-xl border border-gray-800">
                {(
                  [
                    "default",
                    "info",
                    "success",
                    "warning",
                    "danger",
                    "outline",
                  ] as const
                ).map((v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={`text-xs uppercase font-bold py-2.5 rounded-lg transition-all ${
                      variant === v
                        ? "bg-[#161b22] text-white border border-gray-700 shadow-sm"
                        : "text-gray-500 hover:text-gray-300 border border-transparent"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 px-1">
              <button className="text-xs font-medium px-3 py-1.5 rounded-t-lg transition-colors bg-[#161b22] text-[#00a2ff] border-t border-x border-gray-800">
                실무 적용 예시 💡 (코드 실시간 연동)
              </button>
            </div>
            <CodeViewer code={usageExampleCode} />
          </div>
        </div>
      </div>
    </div>
  );
}
