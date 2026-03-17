import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#00a2ff] to-[#00ff88] mb-4">
          Jun-UI
        </h1>
        <p className="text-xl text-gray-400">
          나만의 다크 테마 React 컴포넌트 라이브러리
        </p>
      </div>

      <div className="flex gap-4">
        <Link to="/buttons">
          <Button variant="primary" size="lg">
            버튼 컴포넌트 보기
          </Button>
        </Link>
        <Link to="/icon-buttons">
          <Button variant="outline" size="lg">
            아이콘 버튼 보기
          </Button>
        </Link>
        <Link to="/image-button">
          <Button variant="success" size="lg">
            이미지 버튼 보기
          </Button>
        </Link>
        <Link to="/inputs">
          <Button variant="ghost" className="border border-gray-700">
            입력창 (Input) 보기
          </Button>
        </Link>
        <Link to="/textarea">
          <Button variant="outline" size="lg">
            텍스트 영역 (Textarea) 보기
          </Button>
        </Link>
        <Button
          variant="outline"
          size="lg"
          onClick={() => alert("다음 컴포넌트는 뭘 만들까요?")}
        >
          준비 중...
        </Button>
      </div>
    </div>
  );
}
