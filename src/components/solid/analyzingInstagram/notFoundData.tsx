export default function NotFoundData() {
  return (
    <>
      <p class='text-base' style={{ color: 'var(--gh-fg)' }}>
        به نظر می‌رسد که داده‌ای برای نمایش وجود ندارد. این ممکن است به دلایل
        مختلفی باشد:
      </p>
      <ul class='space-y-1 text-sm list-disc list-inside my-3' style={{ color: 'var(--gh-fg-secondary)' }}>
        <li>صرفاً داده‌ای برای نمایش وجود ندارد.</li>
        <li>فایلی که آپلود کرده‌اید دستکاری شده است.</li>
      </ul>
      <p class='text-sm underline' style={{ color: 'var(--gh-link)' }}>
        اگر مطمئن هستید که برنامه به درستی کار نمی‌کند، لطفاً به ما اطلاع دهید
        تا بتوانیم آن را در سریع‌ترین زمان ممکن حل کنیم.
      </p>
    </>
  )
}
