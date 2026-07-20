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
    <div
      class='rounded-lg overflow-hidden'
      style={{
        'background-color': 'var(--gh-bg-subtle)',
        border: '1px solid var(--gh-border)',
      }}
    >
      <div class='flex'>
        <ul class='flex overflow-x-auto items-start w-full transition-all duration-300 p-1.5 gap-1'>
          <li
            class={`inline-block py-2 px-3 font-medium text-sm rounded-md whitespace-nowrap cursor-pointer transition-colors duration-150`}
            style={{
              'background-color': tab() === 'no-follow' ? 'var(--gh-surface)' : 'transparent',
              color: tab() === 'no-follow' ? 'var(--gh-fg)' : 'var(--gh-fg-secondary)',
              'border': tab() === 'no-follow' ? '1px solid var(--gh-border)' : '1px solid transparent',
            }}
            onClick={() => setTab('no-follow')}
          >
            دنبال نکرده‌ها
          </li>
          <li
            class={`inline-block py-2 px-3 font-medium text-sm rounded-md whitespace-nowrap cursor-pointer transition-colors duration-150`}
            style={{
              'background-color': tab() === 'hide-story' ? 'var(--gh-surface)' : 'transparent',
              color: tab() === 'hide-story' ? 'var(--gh-fg)' : 'var(--gh-fg-secondary)',
              'border': tab() === 'hide-story' ? '1px solid var(--gh-border)' : '1px solid transparent',
            }}
            onClick={() => setTab('hide-story')}
          >
            مخفی‌شده‌ها
          </li>
          <li
            class={`inline-block py-2 px-3 font-medium text-sm rounded-md whitespace-nowrap cursor-pointer transition-colors duration-150`}
            style={{
              'background-color': tab() === 'pending-requests' ? 'var(--gh-surface)' : 'transparent',
              color: tab() === 'pending-requests' ? 'var(--gh-fg)' : 'var(--gh-fg-secondary)',
              'border': tab() === 'pending-requests' ? '1px solid var(--gh-border)' : '1px solid transparent',
            }}
            onClick={() => setTab('pending-requests')}
          >
            درخواست‌های معلق
          </li>
          <li
            class={`inline-block py-2 px-3 font-medium text-sm rounded-md whitespace-nowrap cursor-pointer transition-colors duration-150`}
            style={{
              'background-color': tab() === 'block-list' ? 'var(--gh-surface)' : 'transparent',
              color: tab() === 'block-list' ? 'var(--gh-fg)' : 'var(--gh-fg-secondary)',
              'border': tab() === 'block-list' ? '1px solid var(--gh-border)' : '1px solid transparent',
            }}
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
              <ul class='flex flex-col divide-y' style={{ 'border-color': 'var(--gh-border-muted)' }}>
                {noFollow().map((item: string) => (
                  <li class='inline-flex items-center justify-between gap-x-2 py-3 text-sm font-medium' style={{ color: 'var(--gh-fg)' }}>
                    <span>
                      {item.replace(/^https:\/\/www\.instagram\.com\//, '')}
                    </span>
                    <a
                      href={item}
                      target='_blank'
                      class='py-1 px-3 text-xs font-medium rounded-md transition-colors duration-150'
                      style={{
                        'background-color': 'var(--gh-danger-emphasis)',
                        color: '#ffffff',
                      }}
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
              <ul class='flex flex-col divide-y' style={{ 'border-color': 'var(--gh-border-muted)' }}>
                {hideStory().map((item: string) => (
                  <li class='inline-flex items-center justify-between gap-x-2 py-3 text-sm font-medium' style={{ color: 'var(--gh-fg)' }}>
                    <span>
                      {item}
                    </span>
                    <a
                      href={`https://www.instagram.com/${item}`}
                      target='_blank'
                      class='py-1 px-3 text-xs font-medium rounded-md transition-colors duration-150'
                      style={{
                        'background-color': 'var(--gh-accent-emphasis)',
                        color: '#ffffff',
                      }}
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
              <ul class='flex flex-col divide-y' style={{ 'border-color': 'var(--gh-border-muted)' }}>
                {pendingRequests().map((item: string) => (
                  <li class='inline-flex items-center justify-between gap-x-2 py-3 text-sm font-medium' style={{ color: 'var(--gh-fg)' }}>
                    <span>
                      {item}
                    </span>
                    <a
                      href={`https://www.instagram.com/${item}`}
                      target='_blank'
                      class='py-1 px-3 text-xs font-medium rounded-md transition-colors duration-150'
                      style={{
                        'background-color': 'var(--gh-accent-emphasis)',
                        color: '#ffffff',
                      }}
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
              <ul class='flex flex-col divide-y' style={{ 'border-color': 'var(--gh-border-muted)' }}>
                {blockList().map((item: string) => (
                  <li class='inline-flex items-center justify-between gap-x-2 py-3 text-sm font-medium' style={{ color: 'var(--gh-fg)' }}>
                    <span>
                      {item}
                    </span>
                    <a
                      href={`https://www.instagram.com/${item}`}
                      target='_blank'
                      class='py-1 px-3 text-xs font-medium rounded-md transition-colors duration-150'
                      style={{
                        'background-color': 'var(--gh-accent-emphasis)',
                        color: '#ffffff',
                      }}
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
