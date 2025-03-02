import { createSignal, Show, type Accessor } from 'solid-js'
import NotFoundData from './notFoundData'

interface Props {
  noFollow: Accessor<string[]>
  hideStory: Accessor<string[]>
  pendingRequests: Accessor<string[]>
  blockList: Accessor<string[]>
}

export default function AnalyzingInstagramTabs({
  noFollow,
  hideStory,
  pendingRequests,
  blockList,
}: Props) {
  const [tab, setTab] = createSignal<string>('no-follow')

  return (
    <div class='shadow-lg bg-gray-200 rounded-lg'>
      <div class='flex'>
        <ul class='flex overflow-x-auto items-start w-full transition-all duration-300 p-2'>
          <li
            class={`${
              tab() === 'no-follow' ? 'bg-white text-[#556ee6]' : ''
            } inline-block py-3 px-4 font-medium rounded-lg whitespace-nowrap cursor-pointer`}
            onClick={() => setTab('no-follow')}
          >
            دنبال نکرده‌ها
          </li>
          <li
            class={`${
              tab() === 'hide-story' ? 'bg-white text-[#556ee6]' : ''
            } inline-block py-3 px-4 font-medium rounded-lg whitespace-nowrap cursor-pointer`}
            onClick={() => setTab('hide-story')}
          >
            مخفی‌شده‌ها
          </li>
          <li
            class={`${
              tab() === 'pending-requests' ? 'bg-white text-[#556ee6]' : ''
            } inline-block py-3 px-4 font-medium rounded-lg whitespace-nowrap cursor-pointer`}
            onClick={() => setTab('pending-requests')}
          >
            درخواست‌های معلق
          </li>
          <li
            class={`${
              tab() === 'block-list' ? 'bg-white text-[#556ee6]' : ''
            } inline-block py-3 px-4 font-medium rounded-lg whitespace-nowrap cursor-pointer`}
            onClick={() => setTab('block-list')}
          >
            بلاک‌شده‌ها
          </li>
        </ul>
      </div>
      <div class='py-2 px-4'>
        <Show when={tab() === 'no-follow'}>
          <div class='overflow-y-auto max-h-72 md:h-[11.3rem] lg:h-[11.3rem]'>
            {noFollow().length > 0 ? (
              <ul class='flex flex-col divide-y divide-gray-400'>
                {noFollow().map((item: string) => (
                  <li class='inline-flex items-center justify-between gap-x-2 py-3 text-sm font-medium'>
                    <span>
                      {item.replace(/^https:\/\/www\.instagram\.com\//, '')}
                    </span>
                    <a
                      href={item}
                      target='_blank'
                      class='py-1.5 px-3.5 text-xs bg-red-500 text-white rounded-md font-medium leading-5 text-center shadow-xs transition-all duration-500 hover:bg-red-700'
                    >
                      آنفالو
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <NotFoundData />
            )}
          </div>
        </Show>
        <Show when={tab() === 'hide-story'}>
          <div class='overflow-y-auto max-h-72 md:h-[11.3rem] lg:h-[11.3rem]'>
            {hideStory().length > 0 ? (
              <ul class='flex flex-col divide-y divide-gray-400'>
                {hideStory().map((item: string) => (
                  <li class='inline-flex items-center justify-between gap-x-2 py-3 text-sm font-medium'>
                    <span>
                      {item.replace(/^https:\/\/www\.instagram\.com\//, '')}
                    </span>
                    <a
                      href={item}
                      target='_blank'
                      class='py-1.5 px-3.5 text-xs bg-[#556ee6] hover:bg-[#3b53c9] text-white rounded-md font-medium leading-5 text-center shadow-xs transition-all duration-500'
                    >
                      مشاهده
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <NotFoundData />
            )}
          </div>
        </Show>
        <Show when={tab() === 'pending-requests'}>
          <div class='overflow-y-auto max-h-72 md:h-[11.3rem] lg:h-[11.3rem]'>
            {pendingRequests().length > 0 ? (
              <ul class='flex flex-col divide-y divide-gray-400'>
                {pendingRequests().map((item: string) => (
                  <li class='inline-flex items-center justify-between gap-x-2 py-3 text-sm font-medium'>
                    <span>
                      {item.replace(/^https:\/\/www\.instagram\.com\//, '')}
                    </span>
                    <a
                      href={item}
                      target='_blank'
                      class='py-1.5 px-3.5 text-xs bg-[#556ee6] hover:bg-[#3b53c9] text-white rounded-md font-medium leading-5 text-center shadow-xs transition-all duration-500'
                    >
                      مشاهده
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <NotFoundData />
            )}
          </div>
        </Show>
        <Show when={tab() === 'block-list'}>
          <div class='overflow-y-auto max-h-72 md:h-[11.3rem] lg:h-[11.3rem]'>
            {blockList().length > 0 ? (
              <ul class='flex flex-col divide-y divide-gray-400'>
                {blockList().map((item: string) => (
                  <li class='inline-flex items-center justify-between gap-x-2 py-3 text-sm font-medium'>
                    <span>
                      {item.replace(/^https:\/\/www\.instagram\.com\/_u\//, '')}
                    </span>
                    <a
                      href={item}
                      target='_blank'
                      class='py-1.5 px-3.5 text-xs bg-[#556ee6] hover:bg-[#3b53c9] text-white rounded-md font-medium leading-5 text-center shadow-xs transition-all duration-500'
                    >
                      مشاهده
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <NotFoundData />
            )}
          </div>
        </Show>
      </div>
    </div>
  )
}
