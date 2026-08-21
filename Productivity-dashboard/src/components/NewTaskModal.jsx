import { useState } from 'react'
import Button from './Button'
import Input from './Input'
import Modal from './Modal'

const BUCKETS = ['Today', 'This week', 'Later']
const EMPTY_FORM = { title: '', priority: 'medium', project: 'General', due: 'Today', bucket: 'Today' }

// Shared styling for the native <select> boxes so they match the Input component.
const fieldClass =
  'w-full h-10 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ' +
  'text-sm text-gray-900 dark:text-white px-3.5 transition-all duration-150 ' +
  'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'

// The one task-creation modal, lifted out of the Todos page so every "New task"
// button (sidebar, dashboard, todos) can open the same thing. It owns its own
// form state and resets on every close, so each open starts fresh.
export default function NewTaskModal({ open, onClose, onCreate }) {
  const [form, setForm] = useState(EMPTY_FORM)

  const updateField = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const close = () => {
    setForm(EMPTY_FORM)
    onClose()
  }

  const handleCreate = () => {
    const title = form.title.trim()
    if (!title) return
    onCreate({ ...form, title })
    close()
  }

  return (
    <Modal
      open={open}
      onClose={close}
      title="New task"
      footer={
        <>
          <Button variant="secondary" onClick={close}>Cancel</Button>
          <Button variant="primary" onClick={handleCreate}>Create task</Button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Title</label>
          <Input
            placeholder="What needs doing?"
            value={form.title}
            onChange={updateField('title')}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Priority</label>
            <select className={fieldClass} value={form.priority} onChange={updateField('priority')}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">When</label>
            <select className={fieldClass} value={form.bucket} onChange={updateField('bucket')}>
              {BUCKETS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Project</label>
            <Input placeholder="e.g. Q3 Launch" value={form.project} onChange={updateField('project')} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Due</label>
            <Input placeholder="e.g. Today, Fri" value={form.due} onChange={updateField('due')} />
          </div>
        </div>
      </div>
    </Modal>
  )
}