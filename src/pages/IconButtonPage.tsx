import { Link } from "react-router-dom";
import Button from "../components/Button";
import { Mail, ArrowRight, Trash2, Send, Image } from "lucide-react";

export default function IconButtonPage() {
  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center py-20">
      <div className="w-full max-w-3xl px-4 mb-8">
        <Link
          to="/"
          className="text-gray-400 hover:text-white transition-colors"
        >
          ← 메인으로 돌아가기
        </Link>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Icon Button</h1>
        <p className="text-gray-400">
          Lucide 아이콘을 적용한 실무 스타일 버튼입니다.
        </p>
      </div>

      <div className="flex flex-col gap-10 items-center bg-[#161b22] p-10 rounded-2xl border border-gray-800 w-full max-w-3xl">
        <div className="flex gap-4 items-center">
          {/* 왼쪽에 아이콘 */}
          <Button variant="primary">
            <Mail className="w-5 h-5" />
            메일 보내기
          </Button>

          {/* 오른쪽에 아이콘 */}
          <Button variant="outline">
            다음 단계로
            <ArrowRight className="w-5 h-5" />
          </Button>

          {/* 경고 버튼 */}
          <Button variant="danger">
            <Trash2 className="w-5 h-5" />
            삭제
          </Button>

          {/* 아이콘만 있는 동그란 전송 버튼 */}
          <Button variant="primary" size="icon" className="rounded-full">
            <Send className="w-5 h-5" />
          </Button>

          {/* 이미지 아이콘 버튼 */}
          <Button variant="primary" size="icon" className="rounded-full">
            <Image className="w-6 h-6" />
          </Button>

          {/*  */}
        </div>
      </div>
    </div>
  );
}
