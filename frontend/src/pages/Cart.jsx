import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Cart() {
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState({}) 
  const navigate = useNavigate()

  // 1. Fetch Cart
  const fetchCart = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) return navigate('/login')
      
      const res = await fetch(`${import.meta.env.VITE_API_BASE || ''}/api/orders/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) throw new Error('Failed to load cart')
      const data = await res.json()
      setOrder(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCart() }, [])

  // 2. Handle Remove Item
  const handleRemove = async (itemId) => {
    if (!confirm('Remove this item?')) return
    try {
      const token = localStorage.getItem('token')
      await fetch(`${import.meta.env.VITE_API_BASE || ''}/api/orders/cart/item/${itemId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      await fetchCart()
    } catch (err) {
      alert(err.message)
    }
  }

  // 3. ✅ NEW: Request Quotation (Calls /confirm endpoint which maps to submitQuotation)
  const handleRequestQuote = async () => {
    if (!order) return
    if (!confirm('Send this quotation to the vendor for approval?')) return
    
    try {
      const token = localStorage.getItem('token')
      // Note: We use the /confirm route, but the backend now handles this as "Submit Quote"
      const res = await fetch(`${import.meta.env.VITE_API_BASE || ''}/api/orders/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ orderId: order.id })
      })
      
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Request failed')
      
      alert('Quotation Sent! Please wait for vendor approval.')
      setOrder(null) // Clear view or redirect
      navigate('/profile') // Or wherever you show order history
    } catch (err) {
      alert(err.message)
    }
  }

  // 4. Update item
  const handleUpdate = async (itemId, originalItem) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return navigate('/login')

      const payload = editing[itemId] || {
        quantity: originalItem.quantity,
        startDate: originalItem.startDate,
        endDate: originalItem.endDate
      }

      const res = await fetch(`${import.meta.env.VITE_API_BASE || ''}/api/orders/cart/item/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Update failed')
      await fetchCart()
      alert('Item updated')
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  if (!order || !order.items || order.items.length === 0) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-8 text-center pt-20">
        <h2 className="text-xl font-bold text-slate-700">Your Quotation is Empty</h2>
        <a href="/products" className="text-primary hover:underline mt-4 block">Browse Products</a>
      </div>
      <Footer />
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
           <h1 className="text-2xl font-bold">Draft Quotation</h1>
           <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
             {order.status}
           </span>
        </div>

        <div className="space-y-4">
          {order.items.map((it) => (
            <div key={it.id} className="bg-white p-4 rounded-xl border border-slate-100 flex items-start gap-4 shadow-sm">
               {/* Image Handling */}
               <div className="w-24 h-24 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                  {it.product.images && it.product.images.length > 0 ? (
                    <img src={it.product.images[0].url} alt={it.product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">No Img</div>
                  )}
               </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-slate-900">{it.product.name}</h3>
                <p className="text-sm text-slate-500 mb-2">{it.product.brand}</p>
                
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input type="datetime-local" defaultValue={new Date(it.startDate).toISOString().slice(0,16)} onChange={(e)=> setEditing(prev=> ({...prev, [it.id]: {...(prev[it.id]||{}), startDate: e.target.value}}))} className="p-2 border rounded-lg" />
                  <input type="datetime-local" defaultValue={new Date(it.endDate).toISOString().slice(0,16)} onChange={(e)=> setEditing(prev=> ({...prev, [it.id]: {...(prev[it.id]||{}), endDate: e.target.value}}))} className="p-2 border rounded-lg" />
                  <input type="number" min={1} defaultValue={it.quantity} onChange={(e)=> setEditing(prev=> ({...prev, [it.id]: {...(prev[it.id]||{}), quantity: Math.max(1, Number(e.target.value))}}))} className="p-2 border rounded-lg" />
                </div>

                <div className="flex gap-2 mt-3">
                  <button onClick={()=> handleUpdate(it.id, it)} className="px-4 py-2 bg-primary text-white rounded-lg">Update</button>
                  <button onClick={()=> handleRemove(it.id)} className="px-4 py-2 bg-red-50 border border-red-200 text-red-600 rounded-lg">Remove</button>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Est. Cost</div>
                <div className="text-xl font-bold text-primary">₹{(Number(it.priceAtBooking) * it.quantity).toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="mt-8 p-6 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-slate-500 text-sm">Total Estimated Amount</p>
            <p className="text-3xl font-bold text-slate-900">₹{order.totalAmount?.toLocaleString()}</p>
          </div>
          
          <button 
            onClick={handleRequestQuote} 
            className="w-full md:w-auto px-8 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">send</span>
            Request Quote from Vendor
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Cart