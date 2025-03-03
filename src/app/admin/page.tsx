"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { app, db } from "../lib/firebase";

export default function AdminPage() {
  const router = useRouter();
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [blogs, setBlogs] = useState<any[]>([]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (error) {
      console.error("Error signing in: ", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  const fetchBlogs = async () => {
    try {
      const blogsSnapshot = await getDocs(collection(db, "blogs"));
      const blogsData: any[] = [];
      blogsSnapshot.forEach((docSnap) => {
        blogsData.push({ id: docSnap.id, ...docSnap.data() });
      });
      setBlogs(blogsData);
    } catch (error) {
      console.error("Error fetching blogs: ", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBlogs();
    }
  }, [user]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteDoc(doc(db, "blogs", id));
        setBlogs(blogs.filter((blog) => blog.id !== id));
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded shadow-md w-80"
        >
          <h2 className="text-xl font-bold mb-4">Admin Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <table className="w-full bg-white rounded shadow-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td className="px-4 py-2 border">{blog.title}</td>
                <td className="px-4 py-2 border">{blog.category}</td>
                <td className="px-4 py-2 border space-x-2">
                  <button
                    onClick={() => router.push(`/admin/edit/${blog.id}`)}
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
