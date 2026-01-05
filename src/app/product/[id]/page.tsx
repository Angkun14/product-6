'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditProduct({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  // ดึงข้อมูลเดิม
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3000/products/${id}`);
      if (res.ok) {
        const data = await res.json();
        setName(data.name);
        setPrice(String(data.price));
        setDescription(data.description ?? '');
      } else {
        alert('ไม่พบสินค้านี้');
        router.push('/product');
      }
    };
    fetchData();
  }, [id, router]);

  // อัปเดตข้อมูล
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          price: Number(price),
          description,
        }),
      });

      if (res.ok) {
        router.push('/product');
      } else {
        alert('แก้ไขไม่สำเร็จ');
      }
    } catch {
      alert('Error updating product');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-slate-800">
            ✏️ แก้ไขสินค้า
          </h1>
          <p className="text-slate-500 mt-1">
            รหัสสินค้า: <span className="font-medium">{id}</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdate} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              ชื่อสินค้า
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2
                focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              ราคา (บาท)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-2
                focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              รายละเอียดสินค้า
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-slate-300 px-4 py-2
                focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Link
              href="/product"
              className="rounded-lg border border-slate-300 px-5 py-2
                text-slate-700 hover:bg-slate-100 transition"
            >
              ยกเลิก
            </Link>

            <button
              type="submit"
              className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600
                px-6 py-2 font-semibold text-white shadow-lg
                hover:scale-105 transition"
            >
              บันทึกการแก้ไข
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
