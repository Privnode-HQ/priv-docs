import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center text-center flex-1">
      <h1 className="text-2xl font-bold mb-4">Privnode 文档</h1>
      <p>
        您可打开{' '}
        <Link href="/docs" className="font-medium underline">
          /docs
        </Link>{' '}
        以查看文档。
      </p>
    </div>
  );
}
