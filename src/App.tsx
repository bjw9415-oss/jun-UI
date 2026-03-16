import Button from "./components/Button";

function App() {
  return (
    // 다크 모드 배경
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Jun-UI</h1>
        <p className="text-gray-400">My First TSX Component Library</p>
      </div>

      <div className="flex flex-col gap-8 items-center">
        {/* 1. 디자인(Variant) 테스트 */}
        <div className="flex gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="danger">Danger</Button>
        </div>

        {/* 2. 크기(Size) 테스트 */}
        <div className="flex gap-4 items-center">
          <Button variant="primary" size="sm">
            Small
          </Button>
          <Button variant="primary" size="md">
            Medium
          </Button>
          <Button variant="primary" size="lg">
            Large
          </Button>
        </div>

        {/* 3. HTML 속성 상속 테스트 (disabled) */}
        <div className="flex gap-4">
          <Button
            variant="primary"
            disabled
            onClick={() => alert("이건 안 눌립니다!")}
          >
            Disabled Button
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
