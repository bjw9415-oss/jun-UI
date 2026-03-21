import { useState, useMemo } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/navigation/Tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/data-display/Card";
import { PageHeader, CodeViewer } from "../components/layout";

export default function TabsPage() {
  const [activeTab, setActiveTab] = useState("account");

  const usageExampleCode = useMemo(() => {
    return `import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/Tabs';

export default function Settings() {
  return (
    <Tabs defaultValue="account" className="w-100">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">계정</TabsTrigger>
        <TabsTrigger value="password">비밀번호</TabsTrigger>
      </TabsList>
      
      <TabsContent value="account">
        {/* 계정 설정 카드 내용 */}
      </TabsContent>
      
      <TabsContent value="password">
        {/* 비밀번호 변경 카드 내용 */}
      </TabsContent>
    </Tabs>
  );
}`;
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-20 px-4">
      <PageHeader
        title="Tabs"
        description="동일한 공간에서 여러 섹션의 콘텐츠를 전환할 수 있게 해주는 네비게이션 컴포넌트입니다."
      />

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0 bg-[#161b22] rounded-2xl border border-gray-800 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-800 text-sm text-gray-400 font-medium">
            Preview
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-10 min-h-100 bg-[#0a0d12] bg-[radial-gradient(#30363d_1px,transparent_1px)] bg-size-[16px_16px]">
            {/*  탭 컨테이너 시작 */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full max-w-100"
            >
              {/* 탭 버튼 영역 */}
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="account">계정 (Account)</TabsTrigger>
                <TabsTrigger value="password">보안 (Password)</TabsTrigger>
              </TabsList>

              {/*  탭 내용 1: 계정 설정 (방금 만든 Card 활용!) */}
              <TabsContent value="account">
                <Card className="border-gray-800/60 shadow-xl shadow-black/40">
                  <CardHeader>
                    <CardTitle>계정 정보</CardTitle>
                    <CardDescription>
                      공개 프로필 정보를 수정할 수 있습니다.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-300">
                        이름
                      </label>
                      <input
                        className="w-full h-9 rounded-md border border-gray-700 bg-[#0a0d12] px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00a2ff]"
                        defaultValue="Jun Developer"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-300">
                        이메일
                      </label>
                      <input
                        className="w-full h-9 rounded-md border border-gray-700 bg-[#0a0d12] px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00a2ff]"
                        defaultValue="jun@example.com"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <button className="w-full px-4 py-2 bg-[#161b22] text-white hover:bg-gray-800 border border-gray-700 rounded-md text-sm font-medium transition-colors">
                      변경사항 저장
                    </button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/*  탭 내용 2: 보안 설정 */}
              <TabsContent value="password">
                <Card className="border-gray-800/60 shadow-xl shadow-black/40">
                  <CardHeader>
                    <CardTitle>비밀번호 변경</CardTitle>
                    <CardDescription>
                      안전을 위해 정기적으로 비밀번호를 변경해 주세요.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-300">
                        현재 비밀번호
                      </label>
                      <input
                        type="password"
                        className="w-full h-9 rounded-md border border-gray-700 bg-[#0a0d12] px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00a2ff]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-300">
                        새 비밀번호
                      </label>
                      <input
                        type="password"
                        className="w-full h-9 rounded-md border border-gray-700 bg-[#0a0d12] px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00a2ff]"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <button className="w-full px-4 py-2 bg-[#00a2ff] text-white hover:bg-[#0081cc] rounded-md text-sm font-medium transition-colors">
                      비밀번호 업데이트
                    </button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="w-full lg:w-md shrink-0 flex flex-col gap-6">
          <div className="bg-[#161b22] p-6 rounded-2xl border border-gray-800 flex flex-col gap-6">
            <h3 className="text-white font-semibold mb-1">Tabs Settings</h3>

            <div className="space-y-3">
              <label className="text-sm text-gray-300">
                Active Tab (외부에서 탭 조종하기)
              </label>
              <div className="grid grid-cols-2 gap-2 bg-[#0a0d12] p-2 rounded-xl border border-gray-800">
                <button
                  onClick={() => setActiveTab("account")}
                  className={`text-sm font-medium py-2.5 rounded-lg transition-all ${activeTab === "account" ? "bg-[#161b22] text-[#00a2ff] border border-[#00a2ff]/30 shadow-sm" : "text-gray-500 hover:text-gray-300 border border-transparent"}`}
                >
                  계정 (Account)
                </button>
                <button
                  onClick={() => setActiveTab("password")}
                  className={`text-sm font-medium py-2.5 rounded-lg transition-all ${activeTab === "password" ? "bg-[#161b22] text-[#00a2ff] border border-[#00a2ff]/30 shadow-sm" : "text-gray-500 hover:text-gray-300 border border-transparent"}`}
                >
                  보안 (Password)
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                좌측 Preview 화면에서 탭을 직접 누르거나, 위 버튼을 눌러 상태를
                동기화할 수 있습니다.
              </p>
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
