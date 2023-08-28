const timezones = {
  'America/New_York': { name: 'Eastern Time (ET)', offset: 'UTC-04:00' },
  'America/Chicago': { name: 'Central Time (CT)', offset: 'UTC-05:00' },
  'America/Denver': { name: 'Mountain Time (MT)', offset: 'UTC-06:00' },
  'America/Los_Angeles': { name: 'Pacific Time (PT)', offset: 'UTC-07:00' },
  'Europe/London': { name: 'Greenwich Mean Time (GMT)', offset: 'UTC+00:00' },
  'Europe/Berlin': { name: 'Central European Time (CET)', offset: 'UTC+01:00' },
  'Asia/Tokyo': { name: 'Japan Standard Time (JST)', offset: 'UTC+09:00' },
  'Asia/Shanghai': { name: 'China Standard Time (CST)', offset: 'UTC+08:00' },
  'Australia/Sydney': {
    name: 'Australian Eastern Time (AEST)',
    offset: 'UTC+10:00',
  },
}

const timezonesSelectOptions = Object.entries(timezones).map(
  ([code, description]) => {
    return {
      label: {
        name: description.name,
        utc: description.offset,
      },
      value: code,
    }
  },
)

export { timezones, timezonesSelectOptions }
