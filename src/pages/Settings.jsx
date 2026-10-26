import { useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'
import Avatar from '../components/Avatar'
import Chip from '../components/Chip'
import Switch from '../components/Switch'
import { Icons } from '../components/Icons'
import { useTheme } from '../context/ThemeContext'

const SECTIONS = [
  { id: 'profile',       label: 'Profile' },
  { id: 'team',          label: 'Team' },
  { id: 'appearance',    label: 'Appearance' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'billing',       label: 'Billing' },
]

// Same string the New task modal uses, so native <select> boxes match Input.
const selectClass =
  'w-full h-10 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ' +
  'text-sm text-gray-900 dark:text-white px-3.5 transition-all duration-150 ' +
  'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'

// One settings row: label + optional hint on the left third, control on the right.
// Defined at module scope (NOT nested inside Settings) — a component defined inside
// another is a brand-new type every render, so React would remount its inputs and
// drop focus/value on each parent state change.
function Field({ label, hint, children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-5 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <div className="md:col-span-1">
        <div className="text-sm font-semibold text-gray-900 dark:text-white">{label}</div>
        {hint && <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{hint}</div>}
      </div>
      <div className="md:col-span-2">{children}</div>
    </div>
  )
}

// Profile pane. Inputs are uncontrolled placeholders (defaultValue) — there's no
// user store to persist to yet, so Save / Cancel are intentionally inert for now.
function ProfileSection() {
  return (
    <>
      <div className="flex items-center gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
        <Avatar name="Maya Okonkwo" size={64} />
        <div className="flex-1 min-w-0">
          <div className="text-base font-semibold text-gray-900 dark:text-white">Maya Okonkwo</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Product Manager · Acme Workspace</div>
        </div>
        <Button variant="secondary" size="sm">Change photo</Button>
      </div>

      <Field label="Full name">
        <Input defaultValue="Maya Okonkwo" />
      </Field>
      <Field label="Email" hint="Used for notifications and sign-in">
        <Input type="email" defaultValue="maya@acme.co" />
      </Field>
      <Field label="Role">
        <Input defaultValue="Product Manager" />
      </Field>
      <Field label="Time zone">
        <select className={selectClass} defaultValue="pacific">
          <option value="pacific">Pacific — Los Angeles</option>
          <option value="mountain">Mountain — Denver</option>
          <option value="eastern">Eastern — New York</option>
          <option value="utc">UTC</option>
        </select>
      </Field>

      <div className="pt-5 flex justify-end gap-2">
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Save changes</Button>
      </div>
    </>
  )
}

// The workspace roster. Same five people already referenced across the app
// (todo assignees, the activity feed) so the team stays consistent everywhere.
const TEAM = [
  { name: 'Maya Okonkwo', email: 'maya@acme.co',   role: 'Owner'  },
  { name: 'Aiden Chen',   email: 'aiden@acme.co',  role: 'Admin'  },
  { name: 'Sofia Reyes',  email: 'sofia@acme.co',  role: 'Member' },
  { name: 'Daniel Park',  email: 'daniel@acme.co', role: 'Member' },
  { name: 'Jordan Liu',   email: 'jordan@acme.co', role: 'Member' },
]

const ROLE_TONE = { Owner: 'brand', Admin: 'info', Member: 'neutral' }

// Team pane: roster with an (inert) Invite action. Display-only for now — no
// invite backend or role editing yet, same as Profile's Save.
function TeamSection() {
  return (
    <>
      <div className="flex items-center justify-between pb-5 border-b border-gray-200 dark:border-gray-700">
        <div>
          <div className="text-base font-semibold text-gray-900 dark:text-white">Members</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{TEAM.length} people in this workspace</div>
        </div>
        <Button variant="primary" size="sm" leading={<Icons.Plus className="w-4 h-4" />}>Invite</Button>
      </div>

      <ul>
        {TEAM.map(m => (
          <li
            key={m.email}
            className="flex items-center gap-3 py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
          >
            <Avatar name={m.name} size={40} />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{m.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{m.email}</div>
            </div>
            <Chip tone={ROLE_TONE[m.role] ?? 'neutral'} size="sm">{m.role}</Chip>
          </li>
        ))}
      </ul>
    </>
  )
}

// Appearance pane: one real control for now — dark mode, wired straight to our
// ThemeContext. `Toggle` just flips the boolean, and `darkMode` is the source of
// truth, so passing Switch's next-value arg to Toggle is harmless (it's ignored).
function AppearanceSection() {
  const { darkMode, Toggle } = useTheme()
  return (
    <Field label="Dark mode" hint="Use a darker color theme across the app.">
      <Switch checked={darkMode} onChange={Toggle} />
    </Field>
  )
}

// Notifications pane. These are real controls with in-session state, but aren't
// wired to any delivery system yet — flipping one doesn't start or stop anything.
// Reuses the Field row + the Switch we built for Appearance.
function NotificationsSection() {
  const [notif, setNotif] = useState({ email: true, push: true, weekly: false })
  // update('email') returns a handler that receives Switch's next value.
  const update = key => value => setNotif(n => ({ ...n, [key]: value }))

  return (
    <>
      <Field label="Email notifications" hint="Updates about your tasks and mentions.">
        <Switch checked={notif.email} onChange={update('email')} />
      </Field>
      <Field label="Push notifications" hint="Real-time alerts on this device.">
        <Switch checked={notif.push} onChange={update('push')} />
      </Field>
      <Field label="Weekly summary" hint="A digest of your week, every Monday.">
        <Switch checked={notif.weekly} onChange={update('weekly')} />
      </Field>
    </>
  )
}

// Placeholder for Billing, which we're leaving inert for now.
function ComingSoon({ label }) {
  return (
    <div className="py-16 text-center">
      <div className="text-sm font-medium text-gray-900 dark:text-white">{label}</div>
      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">This section isn&apos;t built yet.</div>
    </div>
  )
}

export default function Settings() {
  const [section, setSection] = useState('profile')
  const activeLabel = SECTIONS.find(s => s.id === section)?.label

  return (
    <div>
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your workspace, team, and preferences
        </p>
      </div>

      {/* Nav rail + content */}
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
        <Card className="p-2 h-fit space-y-2">
          {SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              className={`w-full text-left px-3 h-10 rounded-xl text-sm font-medium transition-all duration-150 ${
                section === s.id
                  ? 'bg-indigo-50 dark:bg-indigo-600/15 text-indigo-700 dark:text-indigo-200'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/40 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </Card>

        <Card className="p-6 lg:p-8">
          {section === 'profile'       && <ProfileSection />}
          {section === 'team'          && <TeamSection />}
          {section === 'appearance'    && <AppearanceSection />}
          {section === 'notifications' && <NotificationsSection />}
          {section === 'billing'       && <ComingSoon label={activeLabel} />}
        </Card>
      </div>
    </div>
  )
}