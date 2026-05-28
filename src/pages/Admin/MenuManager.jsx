import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdmin } from '../../context/AdminContext'
import AdminLayout from '../../components/AdminLayout'

const categories = [
  { key: 'breakfast', label: 'Səhər Yeməyi', icon: '🥞' },
  { key: 'croissants', label: 'Kruassan', icon: '🥐' },
  { key: 'rolls', label: 'Roll', icon: '🌯' },
  { key: 'salads', label: 'Salat', icon: '🥗' },
  { key: 'coffee', label: 'Qəhvə', icon: '☕' },
  { key: 'drinks', label: 'İçkilər', icon: '🍹' },
]

const MenuManager = () => {
  const { menuItems, updateMenuItem, addMenuItem, removeMenuItem } = useAdmin()
  const [activeCategory, setActiveCategory] = useState('breakfast')
  const [editForm, setEditForm] = useState(null)

  const filtered = menuItems.filter(i => i.category === activeCategory)

  const handleSave = (item) => {
    updateMenuItem(item.id, item)
    setEditForm(null)
  }

  const handleAdd = () => {
    const newItem = {
      id: `new_${Date.now()}`,
      category: activeCategory,
      name: 'Yeni Məhsul',
      price: '5.00',
      available: true,
      img: 'food',
      desc: ''
    }
    addMenuItem(newItem)
    setEditForm(newItem)
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <motion.h1 className="text-3xl font-heading font-bold text-gray-800"
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>Menyu</motion.h1>
        <button onClick={handleAdd}
          className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors">
          + Yeni Məhsul
        </button>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map(c => (
          <button key={c.key} onClick={() => setActiveCategory(c.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${activeCategory === c.key ? 'bg-primary text-white' : 'bg-white text-gray-600 border hover:bg-gray-50'}`}>
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item, i) => (
          <motion.div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 truncate">{item.name}</p>
                  <p className="text-primary font-bold mt-1">{item.price} ₼</p>
                  {item.priceS && <p className="text-xs text-gray-400">S: {item.priceS} ₼ | M: {item.price} ₼</p>}
                  {item.priceM && <p className="text-xs text-gray-400">S: {item.priceS} ₼ | M: {item.priceM} ₼ | K: {item.price} ₼</p>}
                  <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mt-2 ${item.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {item.available ? 'Aktiv' : 'Deaktiv'}
                  </span>
                </div>
                <button onClick={() => setEditForm(item)} className="text-gray-400 hover:text-gray-600 p-1">
                  ✏️
                </button>
              </div>
              <div className="flex gap-2">
                <button onClick={() => updateMenuItem(item.id, { ...item, available: !item.available })}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${item.available ? 'text-red-500 border-red-200 hover:bg-red-50' : 'text-green-500 border-green-200 hover:bg-green-50'}`}>
                  {item.available ? 'Deaktiv et' : 'Aktiv et'}
                </button>
                <button onClick={() => { if (confirm('Silmək istədiyinizə əminsiniz?')) removeMenuItem(item.id) }}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full border border-red-200 text-red-400 hover:bg-red-50">
                  Sil
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {editForm && (
          <motion.div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditForm(null)}>
            <motion.div className="bg-white rounded-2xl w-full max-w-md p-6"
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}>
              <h3 className="font-heading text-xl font-bold text-gray-800 mb-4">Redaktə et</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-400 block mb-1">Ad</label>
                  <input value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 block mb-1">Qiymət (₼)</label>
                  <input value={editForm.price} onChange={e => setEditForm({...editForm, price: e.target.value})}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 block mb-1">Şəkil açar sözü</label>
                  <input value={editForm.img || ''} onChange={e => setEditForm({...editForm, img: e.target.value})}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:border-primary outline-none" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => handleSave(editForm)}
                    className="flex-1 bg-primary text-white font-bold py-2.5 rounded-xl text-sm">Yadda saxla</button>
                  <button onClick={() => setEditForm(null)}
                    className="flex-1 border border-gray-200 text-gray-500 font-bold py-2.5 rounded-xl text-sm">Ləğv et</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  )
}

export default MenuManager
