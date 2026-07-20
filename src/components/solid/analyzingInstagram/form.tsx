import { createEffect, createSignal } from 'solid-js'
import { parseInstagramZip, validateInstagramData, type InstagramData } from '../../../utils/instagram'
import Alert from '../common/alert'
import InformationAnalyzingInstagramCard from './informationCard'
import AnalyzingInstagramTabs from './tabs'

export default function AnalyzingInstagramFollowersForm() {
  let fileInputRef: HTMLInputElement | undefined

  const [data, setData] = createSignal<InstagramData>({
    followers: [],
    following: [],
    noFollowBack: [],
    hideStory: [],
    pendingRequests: [],
    blocked: [],
  })
  const [errorMessage, setErrorMessage] = createSignal<string | null>(null)
  const [hasData, setHasData] = createSignal(false)

  const resetData = () => {
    setData({
      followers: [],
      following: [],
      noFollowBack: [],
      hideStory: [],
      pendingRequests: [],
      blocked: [],
    })
  }

  const focusInput = () => fileInputRef?.click()

  const handleFileUpload = async (event: Event) => {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]

    if (!file) return

    setErrorMessage(null)

    if (file.type !== 'application/zip') {
      setErrorMessage('Please upload a valid ZIP file.')
      input.value = ''
      return
    }

    try {
      const parsedData = await parseInstagramZip(file)
      const error = validateInstagramData(parsedData)
      if (error) {
        setErrorMessage(error)
        resetData()
      } else {
        setData(parsedData)
      }
      input.value = ''
    } catch (error) {
      console.error('Error extracting ZIP file:', error)
      setErrorMessage('The uploaded archive appears to be empty or unsupported.')
      resetData()
      input.value = ''
    }
  }

  createEffect(() => {
    const d = data()
    setHasData(
      d.followers.length > 0 ||
        d.following.length > 0 ||
        d.noFollowBack.length > 0 ||
        d.hideStory.length > 0 ||
        d.pendingRequests.length > 0 ||
        d.blocked.length > 0,
    )
  })

  return (
    <div>
      {!hasData() && (
        <div
          onClick={focusInput}
          class='w-full my-3 py-5 rounded-lg border-2 gap-3 grid border-dashed cursor-pointer group transition-colors duration-150'
          style={{
            'background-color': 'var(--gh-bg-subtle)',
            'border-color': 'var(--gh-border)',
            color: 'var(--gh-fg-secondary)',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLElement).style.borderColor =
              'var(--gh-accent)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.borderColor =
              'var(--gh-border)'
          }}
        >
          <div class='grid gap-1 justify-center'>
            <div
              class='w-11 h-11 rounded-full flex items-center justify-center'
              style={{
                'background-color': 'var(--gh-bg-muted)',
                color: 'var(--gh-fg-secondary)',
              }}
            >
              <svg
                width={20}
                height={20}
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z'
                />
              </svg>
            </div>
          </div>
          <div class='grid gap-2'>
            <h4 class='text-center text-sm font-medium leading-snug'>
              فایل{' '}
              <span
                class='text-xs font-medium px-1.5 py-1 mx-1 rounded-full'
                style={{
                  'background-color': 'var(--gh-bg-muted)',
                  color: 'var(--gh-fg)',
                }}
              >
                zip.
              </span>
              که از اینستاگرام دریافت کرده‌اید را انتخاب کنید
            </h4>
            <div class='flex items-center justify-center'>
              <label>
                <input
                  type='file'
                  accept='.zip'
                  onInput={handleFileUpload}
                  ref={fileInputRef}
                  hidden
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {errorMessage() && (
        <Alert
          message={errorMessage() as string}
          type='danger'
          onClose={() => setErrorMessage(null)}
        />
      )}

      {hasData() && (
        <div class='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <InformationAnalyzingInstagramCard
              followersCount={() => data().followers}
              followingCount={() => data().following}
              noFollowCount={() => data().noFollowBack}
              hideStoryCount={() => data().hideStory}
              pendingRequestsCount={() => data().pendingRequests}
              blockCount={() => data().blocked}
            />
          </div>
          <div>
            <AnalyzingInstagramTabs
              noFollow={() => data().noFollowBack}
              hideStory={() => data().hideStory}
              pendingRequests={() => data().pendingRequests}
              blockList={() => data().blocked}
            />
          </div>
        </div>
      )}
    </div>
  )
}
