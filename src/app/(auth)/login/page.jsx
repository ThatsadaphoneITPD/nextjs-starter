"use client";
import toast from 'react-hot-toast';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form className="flex flex-col gap-4">
          <input type="email" placeholder="Email" className="border p-2 rounded" />
          <input type="password" placeholder="Password" className="border p-2 rounded" />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded" onClick={()=>{toast.success("done")}}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
