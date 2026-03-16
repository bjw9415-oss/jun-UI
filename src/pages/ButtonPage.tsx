import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function ButtonPage() {
  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-20">
      {/* 뒤로 가기 링크 */}
      <div className="w-full max-w-3xl px-4 mb-8">
        <Link
          to="/"
          className="text-gray-400 hover:text-white transition-colors"
        >
          ← 메인으로 돌아가기
        </Link>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Button Component</h1>
        <p className="text-gray-400">다양한 스타일의 버튼을 확인해 보세요.</p>
      </div>

      <div className="flex flex-col gap-8 items-center bg-[#161b22] p-10 rounded-2xl border border-gray-800 w-full max-w-3xl">
        <div className="flex gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="danger">Danger</Button>
        </div>

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

        <div className="flex gap-4 items-center">
          <Button variant="outline" className="gap-2">
            <img
              src="https://placecats.com/neo/32/32"
              alt="고양이"
              className="w-6 h-6 rounded-full"
            />
            고양이 버튼
          </Button>
          <Button
            variant="primary"
            className="rounded-full w-12 h-12 p-0 text-2xl"
          >
            😻
          </Button>
        </div>
      </div>
    </div>
  );
}
