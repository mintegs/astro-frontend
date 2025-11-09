import JSZip from 'jszip'
import { createEffect, createSignal } from 'solid-js'
import Alert from '../common/alert'
import InformationAnalyzingInstagramCard from './informationCard'
import AnalyzingInstagramTabs from './tabs'

export default function AnalyzingInstagramFollowersForm() {
  let fileInputRef: HTMLInputElement | undefined

  const [followersData, setFollowersData] = createSignal<string[]>([])
  const [followingData, setFollowingData] = createSignal<string[]>([])
  const [noFollowData, setNoFollowData] = createSignal<string[]>([])
  const [hideStoryData, setHideStoryData] = createSignal<string[]>([])
  const [pendingRequestsData, setPendingRequestsData] = createSignal<string[]>(
    []
  )
  const [blockData, setBlockData] = createSignal<string[]>([])
  const [errorMessage, setErrorMessage] = createSignal<string | null>(null)
  const [hasData, setHasData] = createSignal(false)

  const parseJsonFile = async (
    file: JSZip.JSZipObject | null,
    property?: string,
    fixUrl?: boolean
  ) => {
    if (!file) return []
    const content = await file.async('string')
    const json = JSON.parse(content)
    const dataArray =
      property && Array.isArray(json[property]) ? json[property] : json
    return Array.isArray(dataArray)
      ? dataArray.map((item: any) =>
          fixUrl
            ? item['string_list_data'][0].href.replace('_u/', '')
            : item['string_list_data'][0].href
        )
      : []
  }

  const resetData = () => {
    setFollowersData([])
    setFollowingData([])
    setNoFollowData([])
    setHideStoryData([])
    setPendingRequestsData([])
    setBlockData([])
  }

  const focusInput = () => fileInputRef?.click()

  const handleFileUpload = async (event: Event) => {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]

    if (!file) return

    if (file.type !== 'application/zip') {
      setErrorMessage('Please upload a valid ZIP file.')
      return
    }

    const zip = new JSZip()

    try {
      const loadedZip = await zip.loadAsync(file)

      const followers = await parseJsonFile(
        loadedZip.file('connections/followers_and_following/followers_1.json')
      )
      const following = await parseJsonFile(
        loadedZip.file('connections/followers_and_following/following.json'),
        'relationships_following',
        true
      )
      const hideStory = await parseJsonFile(
        loadedZip.file(
          'connections/followers_and_following/hide_story_from.json'
        ),
        'relationships_hide_stories_from'
      )
      const pendingRequests = await parseJsonFile(
        loadedZip.file(
          'connections/followers_and_following/pending_follow_requests.json'
        ),
        'relationships_follow_requests_sent'
      )
      const block = await parseJsonFile(
        loadedZip.file(
          'connections/followers_and_following/blocked_profiles.json'
        ),
        'relationships_blocked_users'
      )

      setFollowersData(followers)
      setFollowingData(following)
      setHideStoryData(hideStory)
      setPendingRequestsData(pendingRequests)
      setBlockData(block)

      console.log('followers', followers.length)
      console.log('following', following.length)

      const unFollowed = following.filter(
        (followingItem) => !followers.includes(followingItem)
      )
      setNoFollowData(unFollowed)
    } catch (error) {
      setErrorMessage('Error extracting ZIP file.')
      resetData()
    }
  }

  createEffect(() => {
    setHasData(
      followersData().length > 0 ||
        followingData().length > 0 ||
        noFollowData().length > 0 ||
        hideStoryData().length > 0 ||
        pendingRequestsData().length > 0 ||
        blockData().length > 0
    )
  })

  return (
    <div>
      {!hasData() && (
        <div
          onClick={focusInput}
          class='w-full my-3 py-5 bg-gray-200 rounded-2xl border-2 gap-3 grid border-dashed cursor-pointer border-gray-500 group hover:border-primary'
        >
          <div class='grid gap-1 justify-center'>
            <div class='w-11 h-11 bg-gray-400 rounded-full flex items-center justify-center text-primary'>
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
              <span class='bg-gray-400 text-primary text-xs font-medium px-1.5 py-1 mx-1 rounded-full'>
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

      {/* Display error message */}
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
              followersCount={followersData}
              followingCount={followingData}
              noFollowCount={noFollowData}
              hideStoryCount={hideStoryData}
              pendingRequestsCount={pendingRequestsData}
              blockCount={blockData}
            />
          </div>
          <div>
            <AnalyzingInstagramTabs
              noFollow={noFollowData}
              hideStory={hideStoryData}
              pendingRequests={pendingRequestsData}
              blockList={blockData}
            />
          </div>
        </div>
      )}
    </div>
  )
}
