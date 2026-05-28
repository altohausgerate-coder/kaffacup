import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'

const tables = Array.from({ length: 16 }, (_, i) => ({ id: i + 1, seats: i < 6 ? 4 : i < 12 ? 2 : 6, x: (i % 4) * 140 + 60, y: Math.floor(i / 4) * 130 + 60 }))

const TableMap = () => {
  const [selected, setSelected] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const { addReservation, reservations } = useApp()
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', guests: 2 })

  const reservedIds = new Set(reservations.filter(r => r.status !== 'cancelled').map(r => r.tableId))
  const isReserved = (id) => reservedIds.has(id)

  const handleReserve = () => {
    addReservation({ ...form, tableId: selected, status: 'pending', time: new Date().toISOString() })
    setShowForm(false); setSelected(null); setForm({ name: '', phone: '', date: '', time: '', guests: 2 })
  }

  return (
    <section className="py-20 px-4 bg-white" id="reservation">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 className="text-4xl md:text-5xl font-heading font-bold text-primary"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Masa Rezervasiyası
          </motion.h2>
          <motion.p className="text-gray-500 mt-2">Boş masanı seçin və rezerv edin</motion.p>
          <motion.div className="h-0.5 bg-primary/30 rounded-full mx-auto mt-3" style={{ maxWidth: 80 }}
            initial={{ width: 0 }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
          <div className="flex justify-center gap-6 mt-6 text-sm">
            <span className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-green-500/20 border border-green-500"></span> Boş</span>
            <span className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-red-500/20 border border-red-500"></span> Rezervə</span>
            <span className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-yellow-500/20 border border-yellow-500"></span> Seçilmiş</span>
          </div>
        </div>

        <div className="relative w-full aspect-[4/3] bg-mint/50 rounded-3xl border border-primary/10 max-w-lg mx-auto shadow-inner">
          {tables.map(t => {
            const reserved = isReserved(t.id)
            const isSelected = selected === t.id
            return (
              <motion.button key={t.id} onClick={() => { if (!reserved) { setSelected(t.id); setShowForm(true) } }}
                className={`absolute flex items-center justify-center rounded-xl font-bold text-sm transition-colors ${
                  isSelected ? 'bg-yellow-400 text-yellow-900 border-2 border-yellow-500' :
                  reserved ? 'bg-red-100 text-red-400 border border-red-300 cursor-not-allowed' :
                  'bg-green-50 text-primary border border-green-300 hover:bg-green-100'
                }`}
                style={{ left: t.x - 50, top: t.y - 35, width: 100, height: 70 }}
                whileHover={!reserved ? { scale: 1.08 } : undefined} whileTap={!reserved ? { scale: 0.95 } : undefined}>
                <div className="text-center"><div>Masa {t.id}</div><div className="text-[10px] opacity-70">{t.seats} nəfər</div></div>
              </motion.button>
            )
          })}
        </div>

        <div className="flex justify-center gap-3 mt-8 text-xs text-gray-400">
          <span>🪑 2 nəfərlik</span><span>🪑 4 nəfərlik</span><span>🪑 6 nəfərlik</span>
        </div>

        <AnimatePresence>
          {showForm && selected && (
            <motion.div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl" initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 40 }}>
                <h3 className="font-heading text-2xl font-bold text-primary mb-2">Masa {selected} - Rezervasiya</h3>
                <p className="text-sm text-gray-400 mb-6">{tables.find(t => t.id === selected)?.seats} nəfərlik masa</p>
                <div className="space-y-3">
                  <input placeholder="Adınız" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none" />
                  <input placeholder="Telefon" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none" />
                  <div className="flex gap-3">
                    <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none text-sm" />
                    <input type="time" value={form.time} onChange={e => setForm({...form, time: e.target.value})} className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none text-sm" />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">Nəfər:</span>
                    <button onClick={() => setForm({...form, guests: Math.max(1, form.guests - 1)})} className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold">−</button>
                    <span className="font-bold">{form.guests}</span>
                    <button onClick={() => setForm({...form, guests: form.guests + 1})} className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold">+</button>
                  </div>
                  <motion.button onClick={handleReserve} className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary-dark transition-colors"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Rezervi Təsdiqlə</motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default TableMap
