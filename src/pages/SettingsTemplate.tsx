import { useState } from "react";
import { User, Bell, Shield, KeyRound, MonitorSmartphone } from "lucide-react";
import { Button, Input, Toggle, useToast, PageHeader } from "@/components";
export default function SettingsTemplate() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const menuItems = [
    { id: "general", label: "일반 설정", icon: User },
    { id: "security", label: "보안 및 인증", icon: Shield },
    { id: "notifications", label: "알림 설정", icon: Bell },
    { id: "devices", label: "디바이스 관리", icon: MonitorSmartphone },
  ];
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
        <nav className="animate-in fade-in slide-in-from-left-8 duration-500 fill-mode-both flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50 border border-transparent"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>
        {/*  오른쪽: 메인 콘텐츠 영역 (조건부 렌더링) */}
        <main className="flex-1 space-y-6 overflow-hidden">
          {/* 1. 일반 설정 탭일 때 */}
          {activeTab === "general" && (
            <section className="bg-[#161b22] rounded-2xl border border-gray-800 p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-8 duration-500 fill-mode-both">
              {/* 자식 1: 제목 */}
              <h3 className="text-lg font-bold text-white mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300 delay-100 fill-mode-both">
                공개 프로필
              </h3>

              <div className="space-y-4">
                {/* 자식 2: 이름 입력 */}
                <div className="grid gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300 delay-150 fill-mode-both">
                  <label className="text-sm font-medium text-gray-300">
                    표시될 이름
                  </label>
                  <Input
                    defaultValue="Jun Frontend"
                    placeholder="이름을 입력하세요"
                  />
                </div>

                {/* 자식 3: 이메일 입력 */}
                <div className="grid gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300 delay-200 fill-mode-both">
                  <label className="text-sm font-medium text-gray-300">
                    이메일 주소
                  </label>
                  <Input
                    type="email"
                    defaultValue="hello@jun-ui.dev"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    이메일은 변경할 수 없습니다. 고객센터로 문의해주세요.
                  </p>
                </div>

                {/* 자식 4: 계정 보안 영역 */}
                <div className="pt-6 mt-2 border-t border-gray-800 animate-in fade-in slide-in-from-bottom-2 duration-300 delay-250 fill-mode-both">
                  <h4 className="text-sm font-medium text-gray-300 mb-3">
                    계정 보안
                  </h4>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <KeyRound className="w-4 h-4 mr-2" /> 비밀번호 변경
                  </Button>
                </div>
              </div>
            </section>
          )}

          {/*  2. 보안 및 인증 탭일 때 */}
          {activeTab === "security" && (
            <section className="bg-[#161b22] rounded-2xl border border-gray-800 p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-8 duration-500 fill-mode-both">
              <h3 className="text-lg font-bold text-white mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300 delay-100 fill-mode-both">
                보안 및 인증
              </h3>
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 delay-150 fill-mode-both">
                <p className="text-gray-400">
                  비밀번호 변경 및 2단계 인증 설정 화면입니다.
                </p>
              </div>
            </section>
          )}

          {/*  3. 알림 설정 탭일 때 */}
          {activeTab === "notifications" && (
            <section className="bg-[#161b22] rounded-2xl border border-gray-800 p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-8 duration-500 fill-mode-both">
              <h3 className="text-lg font-bold text-white mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300 delay-100 fill-mode-both">
                알림 설정
              </h3>
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 delay-150 fill-mode-both">
                <p className="text-gray-400">
                  이메일 및 푸시 알림 수신 여부를 설정합니다.
                </p>
              </div>
            </section>
          )}

          {/*  4. 디바이스 관리 탭일 때 */}
          {activeTab === "devices" && (
            <section className="bg-[#161b22] rounded-2xl border border-gray-800 p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-8 duration-500 fill-mode-both">
              <h3 className="text-lg font-bold text-white mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300 delay-100 fill-mode-both">
                디바이스 관리
              </h3>
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 delay-150 fill-mode-both">
                <p className="text-gray-400">
                  현재 로그인된 기기 목록을 확인하고 로그아웃 할 수 있습니다.
                </p>
              </div>
            </section>
          )}

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
