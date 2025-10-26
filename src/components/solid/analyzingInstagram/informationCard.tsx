import { createSignal, onCleanup, type Accessor } from 'solid-js'

interface Props {
  followersCount: Accessor<string[]>
  followingCount: Accessor<string[]>
  noFollowCount: Accessor<string[]>
  hideStoryCount: Accessor<string[]>
  pendingRequestsCount: Accessor<string[]>
  blockCount: Accessor<string[]>
}

export default function InformationAnalyzingInstagramCard({
  followersCount,
  followingCount,
  noFollowCount,
  hideStoryCount,
  pendingRequestsCount,
  blockCount,
}: Props) {
  const [isOpen, setIsOpen] = createSignal(window.innerWidth >= 768)

  const updateIsOpen = () => {
    setIsOpen(window.innerWidth >= 768)
  }

  window.addEventListener('resize', updateIsOpen)

  onCleanup(() => {
    window.removeEventListener('resize', updateIsOpen)
  })

  return (
    <div class='card'>
      <div
        onclick={() => setIsOpen(!isOpen())}
        class='w-full text-left text-lg font-semibold flex justify-between items-center cursor-pointer'
      >
        <span>اطلاعات تکمیلی</span>
        <span>
          {isOpen() ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              class='size-6'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='m4.5 15.75 7.5-7.5 7.5 7.5'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              class='size-6'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='m19.5 8.25-7.5 7.5-7.5-7.5'
              />
            </svg>
          )}
        </span>
      </div>
      {isOpen() && (
        <div class='md:h-48 h-auto'>
          <p class='text-base mt-2'>
            بر اساس داده‌های اینستاگرام ارائه‌شده از طریق فایل:
          </p>
          <p class='text-sm mt-2'>
            تعداد دنبال‌کنندگان شما:{' '}
            <span class='font-bold'>{followersCount().length}</span>
          </p>
          <p class='text-sm mt-2'>
            تعداد افرادی که شما آنها را دنبال می‌کنید:{' '}
            <span class='font-bold'>{followingCount().length}</span>
          </p>
          <p class='text-sm mt-2'>
            تعداد افرادی که شما را دنبال نکرده‌اند:{' '}
            <span class='font-bold'>{noFollowCount().length}</span>
          </p>
          <p class='text-sm mt-2'>
            تعداد افرادی که استوری شما ازشون مخفی کرده‌اند:{' '}
            <span class='font-bold'>{hideStoryCount().length}</span>
          </p>
          <p class='text-sm mt-2'>
            تعداد افرادی که به آنها درخواست ارسال کرده‌اید اما هنوز قبول
            نکرده‌اند:{' '}
            <span class='font-bold'>{pendingRequestsCount().length}</span>
          </p>
          <p class='text-sm mt-2'>
            تعداد افرادی که شما آنها را بلاک کرده‌اید:{' '}
            <span class='font-bold'>{blockCount().length}</span>
          </p>
        </div>
      )}
    </div>
  )
}
