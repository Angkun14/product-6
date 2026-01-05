'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreateProduct() {
  const router = useRouter();

  // 🔹 State สำหรับรับข้อมูลฟอร์ม
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  // 🔸 State สำหรับแสดง Error Message
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const res = await fetch('http://localhost:3000/products', {
        method: 'POST',
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
        const errorData = await res.json();
        setErrorMessage(
          Array.isArray(errorData.message)
            ? errorData.message.join(', ')
            : errorData.message || 'เกิดข้อผิดพลาด'
        );
      }
    } catch (error) {
      setErrorMessage('ไม่สามารถเชื่อมต่อกับ Server ได้');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200
                    dark:from-gray-900 dark:to-gray-800 flex justify-center items-center px-4">
      <div className="bg-white dark:bg-gray-900 shadow-2xl p-8 rounded-2xl w-full max-w-lg">
        
        {/* Title */}
        <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white mb-6 text-center">
          ➕ เพิ่มสินค้าใหม่
        </h1>

        {/* Error Message UI */}
        {errorMessage && (
          <div className="flex items-center gap-3 p-4 mb-5 rounded-xl border border-red-400 bg-red-50 dark:bg-red-900 dark:border-red-600 animate fadeIn">
            <span className="text-red-700 dark:text-red-200 font-medium">
              ⚠️ {errorMessage}
            </span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200">ชื่อสินค้า</label>
            <input
              type="text"
              className="w-full mt-1 p-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200">ราคา</label>
            <input
              type="number"
              className="w-full mt-1 p-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 ring-blue-500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-200">รายละเอียดสินค้า</label>
            <textarea
              className="w-full mt-1 p-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-4 pt-4">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              ✔ บันทึกสินค้า
            </button>

            <Link
              href="/product"
              className="w-full text-center py-3 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              ✖ ยกเลิก
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
