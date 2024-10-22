import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <p>محصول مورد نظر یافت نشد.</p>
      <Link href="/">بازگشت به خانه</Link>
    </div>
  );
}
