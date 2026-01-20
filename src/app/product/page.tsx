'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Product } from '../../types/product';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const API_URL = 'http://localhost:3001/products';

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setProducts(data);
  };

  // ✅ แก้จาก number → string
  const handleDelete = async (id: string) => {
    if (!confirm('คุณต้องการลบสินค้านี้ใช่หรือไม่?')) return;

    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      fetchProducts();
    } else {
      alert('ลบสินค้าไม่สำเร็จ');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8">
      {/* ===== Header ===== */}
      <div className="relative mb-14 overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-500" />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative max-w-7xl mx-auto px-8 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Product Management
            </h1>
            <p className="mt-2 text-blue-100">
              จัดการสินค้า เพิ่ม แก้ไข และลบข้อมูลในระบบ
            </p>

            <div className="mt-5 flex gap-8">
              <div>
                <p className="text-sm text-blue-100">จำนวนสินค้า</p>
                <p className="text-3xl font-bold text-white">
                  {products.length}
                </p>
              </div>
            </div>
          </div>

          <Link href="/product/create">
            <button className="rounded-full bg-white px-7 py-3 font-semibold text-blue-700 shadow-lg hover:scale-105 transition">
              + เพิ่มสินค้า
            </button>
          </Link>
        </div>
      </div>

      {/* ===== Product Grid ===== */}
      <div className="max-w-7xl mx-auto">
        {products.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            ยังไม่มีข้อมูลสินค้า
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div
                key={p._id}
                className="rounded-2xl bg-white shadow-lg hover:shadow-2xl transition overflow-hidden"
              >
                <div className="h-40 bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white text-4xl font-bold">
                  {p.name.charAt(0)}
                </div>

                <div className="p-5">
                  <h2 className="text-lg font-bold text-slate-800 truncate">
                    {p.name}
                  </h2>

                  <p className="mt-2 text-sm text-slate-500 line-clamp-2">
                    {p.description}
                  </p>

                  <p className="mt-4 text-xl font-extrabold text-emerald-600">
                    {p.price.toLocaleString()} บาท
                  </p>

                  <div className="mt-5 flex gap-2">
                    <Link
                      href={`/product/${p._id}`}
                      className="flex-1 text-center px-4 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                    >
                      แก้ไข
                    </Link>

                    {/* ✅ ไม่แปลง _id เป็น number */}
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="flex-1 px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
                    >
                      ลบ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
