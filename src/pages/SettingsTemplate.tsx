import { useState } from "react";
import { User, Bell, Shield, KeyRound, MonitorSmartphone } from "lucide-react";
import { Button, Input, Toggle, useToast, PageHeader } from "@/components";
export default function SettingsTemplate() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // 저장 버튼 클릭 시뮬레이션
  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "설정 저장 완료",
        description: "회원님의 환경 설정이 성공적으로 업데이트되었습니다.",
        variant: "success",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-20 px-4">
      {/*  PageHeader */}
      <PageHeader
        title="Account Settings"
        description="프로필, 보안, 알림 등 계정의 전반적인 설정을 관리하세요."
      />

      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8 mt-8">
        {/* 왼쪽: 사이드바 네비게이션 */}
        <aside className="w-full md:w-64 shrink-0 space-y-2">
          {/* 애니메이션 1: 왼쪽에서 부드럽게 등장 */}
          <div className="animate-in fade-in slide-in-from-left-8 duration-500 fill-mode-both flex flex-col gap-1">
            <button className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-[#161b22] text-[#00a2ff] font-medium border border-gray-800 transition-colors">
              <User className="w-4 h-4" /> 일반 설정
            </button>
            <button className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-400 hover:bg-[#161b22] hover:text-white transition-colors">
              <Shield className="w-4 h-4" /> 보안 및 인증
            </button>
            <button className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-400 hover:bg-[#161b22] hover:text-white transition-colors">
              <Bell className="w-4 h-4" /> 알림 설정
            </button>
            <button className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-400 hover:bg-[#161b22] hover:text-white transition-colors">
              <MonitorSmartphone className="w-4 h-4" /> 디바이스 관리
            </button>
          </div>
        </aside>

        {/* 오른쪽: 메인 설정 폼 */}
        <main className="flex-1 space-y-6">
          {/* 카드 1: 프로필 설정 (폭포수 애니메이션) */}
          <section className="bg-[#161b22] rounded-2xl border border-gray-800 p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-100 fill-mode-both">
            <h3 className="text-lg font-bold text-white mb-4">공개 프로필</h3>
            <div className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-300">
                  표시될 이름
                </label>
                {/*  Input */}
                <Input
                  defaultValue="Jun Frontend"
                  placeholder="이름을 입력하세요"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-300">
                  이메일 주소
                </label>
                <Input type="email" defaultValue="hello@jun-ui.dev" disabled />
                <p className="text-xs text-gray-500 mt-1">
                  이메일은 변경할 수 없습니다. 고객센터로 문의해주세요.
                </p>
              </div>
              <div className="pt-6 mt-2 border-t border-gray-800">
                <h4 className="text-sm font-medium text-gray-300 mb-3">
                  계정 보안
                </h4>
                <Button variant="outline" className="w-full sm:w-auto">
                  <KeyRound className="w-4 h-4" /> 비밀번호 변경
                </Button>
              </div>
            </div>
          </section>

          {/* 카드 2: 알림 설정 (delay-200) */}
          <section className="bg-[#161b22] rounded-2xl border border-gray-800 p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200 fill-mode-both">
            <h3 className="text-lg font-bold text-white mb-4">이메일 알림</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-300">
                    보안 경고
                  </h4>
                  <p className="text-xs text-gray-500">
                    새로운 기기 로그인 등 중요한 보안 알림을 받습니다.
                  </p>
                </div>
                {/*  Toggle */}
                <Toggle defaultChecked />
              </div>
              <div className="h-px bg-gray-800 my-2" />
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-300">
                    마케팅 수신 동의
                  </h4>
                  <p className="text-xs text-gray-500">
                    새로운 기능 업데이트와 프로모션 소식을 받습니다.
                  </p>
                </div>
                <Toggle />
              </div>
            </div>
          </section>

          {/*  카드 3: 하단 액션 버튼 영역 (delay-300) */}
          <div className="flex justify-end gap-3 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-300 fill-mode-both">
            <Button variant="ghost">변경 취소</Button>
            {/*   Button + 로딩 애니메이션 */}
            <Button
              variant="primary"
              onClick={handleSave}
              disabled={isLoading}
              className="min-w-30"
            >
              {isLoading ? "저장 중..." : "변경사항 저장"}
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
