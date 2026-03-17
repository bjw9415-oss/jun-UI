import { Link } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <>
      {/*  공통 뒤로가기 버튼 */}
      <div className="w-full max-w-5xl mb-8">
        <Link
          to="/"
          className="text-gray-400 hover:text-white transition-colors"
        >
          ← 메인으로 돌아가기
        </Link>
      </div>

      {/*  공통 제목 & 설명 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
        <p className="text-gray-400">{description}</p>
      </div>
    </>
  );
}
