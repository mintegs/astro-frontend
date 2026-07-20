import type { Achievement } from '../types'

const achievements: Achievement[] = [
  {
    name: 'Pull Shark',
    icon: '🦈',
    description: '۲۵ پول‌ریکوست ادغام شده',
    tier: 'gold',
  },
  {
    name: 'Quickdraw',
    icon: '⚡',
    description: 'بستن ایسیو در کمتر از ۵ دقیقه',
    tier: 'silver',
  },
  {
    name: 'Arctic Code Vault',
    icon: '❄️',
    description: 'مشارکت در آرشیو قطب شمال',
    tier: 'bronze',
  },
  {
    name: 'Galaxy Brain',
    icon: '🧠',
    description: '۲ پاسخ در discussions',
    tier: 'bronze',
  },
  {
    name: 'YOLO',
    icon: '🤠',
    description: 'ادغام بدون ریویو',
    tier: 'bronze',
  },
]

export default achievements
