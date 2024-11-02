export const statusData = [
  'Departed 10:49',
  'Final Call - Gate 31',
  'Departed 10:45',
  'Departed 10:50',
  'Final Call - Gate 22',
  'Final Call - Gate 208',
  'Departed 10:58',
  'Go to Gate 204',
  'Final Call - Gate A1',
  'Final Call - Gate 25',
  'Departed 11:02',
  'Departed 11:15',
  'Departed 11:16',
  'Departed 11:33',
  'Go to Gate A6',
  'Final Call - Gate 10',
  'Final Call - Gate A10',
  'Final Call - Gate A9',
  'Final Call - Gate 5',
  'Final Call - Gate 3D',
  'Go to Gate 52',
  'Final Call - Gate 7',
  'Final Call - Gate 32',
  'Go to Gate 37',
  'Final Call - Gate 51',
  'Scheduled',
  'Departing at 12:55',
  'Go to Gate 48',
  'Departing at 12:30',
  'Go to Gate A11',
  'Go to Gate 202',
  'Wait in Lounge',
  'Wait in Lounge',
  'Departing at 13:05',
  'Departing at 13:50',
  'Wait in Lounge',
  'Wait in Lounge',
  'Wait in Lounge',
  'Wait in Lounge',
  'Wait in Lounge',
  'Wait in Lounge',
  'Wait in Lounge',
  'Departing at 13:45',
  'Departing at 14:05',
  'Departing at 14:05',
  'Departing at 14:15',
  'Departing at 14:25',
  'Departing at 14:25',
  'Departing at 14:25',
  'Departing at 14:25',
  'Departing at 14:30',
  'Departing at 14:57',
  'Departing at 14:30',
  'Departing at 15:30',
  'Departing at 14:40',
]

// Sorting function
const sortStatusData = statusData.sort((a, b) => {
  const timeRegex = /(\d{1,2}:\d{2})/

  const extractTime = (str) => {
    const match = str.match(timeRegex)
    return match ? match[0] : null
  }

  const parseTime = (time) => {
    if (!time) return null
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes // Convert time to minutes
  }

  const statusOrder = [
    'Departed',
    'Final Call',
    'Go to Gate',
    'Scheduled',
    'Departing at',
    'Wait in Lounge',
  ]

  const getStatusPriority = (status) => {
    for (let i = 0; i < statusOrder.length; i++) {
      if (status.startsWith(statusOrder[i])) {
        return i
      }
    }
    return statusOrder.length
  }

  const priorityA = getStatusPriority(a)
  const priorityB = getStatusPriority(b)

  if (priorityA !== priorityB) {
    return priorityA - priorityB
  }

  // Compare times if the statuses are of the same type
  const timeA = parseTime(extractTime(a))
  const timeB = parseTime(extractTime(b))

  if (timeA !== null && timeB !== null) {
    return timeA - timeB
  }

  return 0
})

export default sortStatusData

export const results = [
  'Departed 10:45',
  'Departed 10:49',
  'Departed 10:50',
  'Departed 10:58',
  'Departed 11:02',
  'Departed 11:15',
  'Departed 11:16',
  'Departed 11:33',
  'Final Call - Gate 31',
  'Final Call - Gate 22',
  'Final Call - Gate 208',
  'Final Call - Gate A1',
  'Final Call - Gate 25',
  'Final Call - Gate 10',
  'Final Call - Gate A10',
  'Final Call - Gate A9',
  'Final Call - Gate 5',
  'Final Call - Gate 3D',
  'Final Call - Gate 7',
  'Final Call - Gate 32',
  'Final Call - Gate 51',
  'Go to Gate 204',
  'Go to Gate A6',
  'Go to Gate 52',
  'Go to Gate 37',
  'Go to Gate 48',
  'Go to Gate A11',
  'Go to Gate 202',
  'Scheduled',
  'Departing at 12:30',
  'Departing at 12:55',
  'Departing at 13:05',
  'Departing at 13:45',
  'Departing at 13:50',
  'Departing at 14:05',
  'Departing at 14:05',
  'Departing at 14:15',
  'Departing at 14:25',
  'Departing at 14:25',
  'Departing at 14:25',
  'Departing at 14:25',
  'Departing at 14:30',
  'Departing at 14:30',
  'Departing at 14:40',
  'Departing at 14:57',
  'Departing at 15:30',
  'Wait in Lounge',
  'Wait in Lounge',
  'Wait in Lounge',
  'Wait in Lounge',
  'Wait in Lounge',
  'Wait in Lounge',
  'Wait in Lounge',
  'Wait in Lounge',
  'Wait in Lounge',
]
