"use client";
import { useState } from "react";
import { supabase } from "@/app/lib/supabase"; 

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  // State Artwork
  const [artTitle, setArtTitle] = useState("");
  const [artFile, setArtFile] = useState<File | null>(null);

  // State Project
  const [projTitle, setProjTitle] = useState("");
  const [projDesc, setProjDesc] = useState("");
  const [projLink, setProjLink] = useState("");
  const [projTags, setProjTags] = useState("");
  const [projFile, setProjFile] = useState<File | null>(null);

  const handleLogin = () => {
    if (pin === "1234") {
      setIsAuthenticated(true);
    } else {
      alert("PIN Salah bro!");
    }
  };

  const handleSaveArtwork = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!artFile) return alert("Pilih gambar dulu!");
    setLoading(true);

    try {
      const fileExt = artFile.name.split(".").pop();
      const fileName = `art-${Date.now()}.${fileExt}`;

      // Upload ke Storage (Gua pake 'portfolio' sesuai yang terakhir bisa jalan)
      const { error: uploadError } = await supabase.storage
        .from("portofolio")
        .upload(fileName, artFile);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("portofolio").getPublicUrl(fileName);

      // Simpan ke Database
      const { error } = await supabase.from("artwork").insert([
        { title: artTitle, image_url: data.publicUrl },
      ]);

      if (error) throw error;

      alert("Artwork Berhasil Disimpan! 🔥");
      setArtTitle("");
      setArtFile(null);
    } catch (err: any) {
      alert("Error Artwork: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projFile) return alert("Thumbnail wajib dipilih!");
    setLoading(true);

    try {
      const fileExt = projFile.name.split(".").pop();
      const fileName = `proj-${Date.now()}.${fileExt}`;

      // Upload ke Storage
      const { error: uploadError } = await supabase.storage
        .from("portofolio")
        .upload(fileName, projFile);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("portofolio").getPublicUrl(fileName);

      const tagArray = projTags.split(",").map((t) => t.trim()).filter(Boolean);

      // --- DISINI KUNCINYA: Gua balikin ke 'tag' (tanpa s) sesuai database lo ---
      const { error } = await supabase.from("project").insert([
        {
          title: projTitle,
          description: projDesc,
          link: projLink,
          tag: tagArray, // Balik ke 'tag' biar bisa masuk datanya
          image_url: data.publicUrl,
        },
      ]);

      if (error) throw error;

      alert("Project Berhasil Disimpan! 🚀");
      setProjTitle("");
      setProjDesc("");
      setProjLink("");
      setProjTags("");
      setProjFile(null);
    } catch (err: any) {
      alert("Error Project: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col gap-4">
          <h2 className="text-xl font-bold text-black text-center">Admin Access</h2>
          <input
            type="password"
            placeholder="PIN: 1234"
            className="border p-3 rounded-xl text-black"
            onChange={(e) => setPin(e.target.value)}
          />
          <button onClick={handleLogin} className="bg-black text-white py-3 rounded-xl font-bold transition-all active:scale-95">
            Login Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10 font-sans text-black">
      <h1 className="text-4xl font-black mb-10 text-center uppercase tracking-tighter">My.Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* FORM ARTWORK */}
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-6">🎨 Upload Artwork</h2>
          <form onSubmit={handleSaveArtwork} className="space-y-4">
            <input
              type="text"
              placeholder="Judul Artwork"
              className="w-full border p-3 rounded-xl bg-gray-50"
              value={artTitle}
              onChange={(e) => setArtTitle(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              className="w-full border p-3 rounded-xl bg-gray-50 text-sm"
              onChange={(e) => setArtFile(e.target.files?.[0] || null)}
            />
            <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95">
              {loading ? "Lagi Proses..." : "Upload Artwork"}
            </button>
          </form>
        </div>

        {/* FORM PROJECT */}
        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-6">💻 Simpan Project</h2>
          <form onSubmit={handleSaveProject} className="space-y-4">
            <input
              type="text"
              placeholder="Nama Project"
              className="w-full border p-3 rounded-xl bg-gray-50"
              value={projTitle}
              onChange={(e) => setProjTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Deskripsi"
              className="w-full border p-3 rounded-xl bg-gray-50"
              rows={2}
              value={projDesc}
              onChange={(e) => setProjDesc(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Link Project"
              className="w-full border p-3 rounded-xl bg-gray-50"
              value={projLink}
              onChange={(e) => setProjLink(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Tag (pisah koma: React, PHP)"
              className="w-full border p-3 rounded-xl bg-gray-50"
              value={projTags}
              onChange={(e) => setProjTags(e.target.value)}
              required
            />
            <p className="text-[10px] font-bold text-gray-400 uppercase">Thumbnail Project</p>
            <input
              type="file"
              accept="image/*"
              className="w-full border p-3 rounded-xl bg-gray-50 text-sm"
              onChange={(e) => setProjFile(e.target.files?.[0] || null)}
              required
            />
            <button disabled={loading} className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95">
              {loading ? "Lagi Proses..." : "Simpan Project"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}