"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

import { supabase } from "@/app/lib/supabase";

// --- DATA UNTUK SECTION 4 ---
// const GALLERY_IMAGES = [
//   "./design/2.png",
//   "./design/5.png",
//   "./design/BOLA.png",
//   "./design/lp.jpg",
//   "./design/final keychain.png",
//   "./design/ig.png",
//   "./design/ikbal.png",
//   "./design/ilham.png",
//   "./design/owner qiya.png",
//   "./design/phone.png",
//   "./design/vamer.png",
// ];

const SKILLS = [
  {
    name: "Next.js",
    icon: "./icon/laravel.svg", // Pastiin ada file next-js.svg di public/icon
  },
  {
    name: "React.js",
    icon: "./icon/react.svg", // Ganti ke file lokal
  },
  {
    name: "",
    icon: "./icon/javascript.svg",
  },
  {
    name: "Laravel",
    icon: "./icon/arcgis.png", // Ganti ke file lokal
  },
  {
    name: "PHP",
    icon: "./icon/php.svg",
  },
  {
    name: "Photoshop",
    icon: "./icon/ps.png",
  },
];

const FADE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 12, stiffness: 100 },
  },
};

export default function Home() {
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [cards, setCards] = useState(SKILLS);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk Mobile Menu

  const shuffle = () => {
    setCards((prev) => {
      const newArray = [...prev];
      const firstItem = newArray.shift();
      if (firstItem) newArray.push(firstItem);
      return newArray;
    });
  };

  useEffect(() => {
    const interval = setInterval(shuffle, 3000);
    return () => clearInterval(interval);
  }, []);

  // Fungsi Smooth Scroll
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false); // Tutup menu mobile setelah klik
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  useEffect(() => {
    console.log("ISI GALLERY:", galleryImages);
  }, [galleryImages]);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchArtworks() {
    const { data, error } = await supabase
      .from("artwork")
      .select("id, image_url, created_at");

    console.log("DATA DB:", data);
    console.log("ERROR DB:", error);

    if (!error) {
      setGalleryImages(data || []);
    }
  }

  async function fetchProjects() {
    const { data, error } = await supabase
      .from("project")
      .select("id,title, description, image_url, link, tag, created_at")
      .order("created_at", { ascending: false });

    console.log("PROJECT DATA:", data);
    console.log("PROJECT ERROR:", error);

    if (!error) {
      setProjects(data || []);
    }
  }

  const heroText = "Creative Tech Mind Building Digital Impact".split(" ");
  const heroSubtitle = "Frontend Dev & Designer".split("");

  return (
    <main className="min-h-screen bg-white text-black overflow-x-hidden font-sans text-left">
      {/* --- NAVBAR FIX: MOBILE BURGER & SMOOTH SCROLL --- */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] w-full max-w-fit px-4">
        <div className="flex items-center gap-8 px-6 py-3 rounded-full border border-gray-100 bg-white/90 backdrop-blur-xl shadow-lg relative">
          {/* LOGO */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-black text-xl tracking-tighter italic text-black"
          >
            MY.PORT
          </button>

          {/* MENU DESKTOP */}
          <div className="hidden lg:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
            <button
              onClick={() => scrollTo("about")}
              className="hover:text-black transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollTo("projects")}
              className="hover:text-black transition-colors"
            >
              Impact
            </button>
            <button
              onClick={() => scrollTo("design")}
              className="hover:text-black transition-colors"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollTo("web-projects")}
              className="hover:text-black transition-colors"
            >
              Web
            </button>
            <button
              onClick={() => scrollTo("tools")}
              className="hover:text-black transition-colors"
            >
              Stack
            </button>
          </div>

          {/* BUTTON CONTACT (Desktop) */}
          {/* BUTTON CONTACT (Desktop) - Panggil fungsi scrollTo */}
          <button
            onClick={() => scrollTo("contact")}
            className="hidden lg:block bg-black text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all active:scale-95"
          >
            Contact
          </button>

          {/* BURGER MENU ICON (Mobile Only) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 8 : 0 }}
              className="w-6 h-0.5 bg-black"
            />
            <motion.div
              animate={{ opacity: isMenuOpen ? 0 : 1 }}
              className="w-6 h-0.5 bg-black"
            />
            <motion.div
              animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -8 : 0 }}
              className="w-6 h-0.5 bg-black"
            />
          </button>

          {/* MOBILE MENU DROPDOWN */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="absolute top-full left-0 right-0 mt-4 p-6 bg-white rounded-[32px] border border-gray-100 shadow-2xl flex flex-col gap-6 lg:hidden"
              >
                <button
                  onClick={() => scrollTo("about")}
                  className="text-sm font-bold uppercase tracking-widest text-gray-500 text-left"
                >
                  About
                </button>
                <button
                  onClick={() => scrollTo("projects")}
                  className="text-sm font-bold uppercase tracking-widest text-gray-500 text-left"
                >
                  Impact
                </button>
                <button
                  onClick={() => scrollTo("design")}
                  className="text-sm font-bold uppercase tracking-widest text-gray-500 text-left"
                >
                  Gallery
                </button>
                <button
                  onClick={() => scrollTo("web-projects")}
                  className="text-sm font-bold uppercase tracking-widest text-gray-500 text-left"
                >
                  Web Projects
                </button>
                <button
                  onClick={() => scrollTo("tools")}
                  className="text-sm font-bold uppercase tracking-widest text-gray-500 text-left"
                >
                  Tech Stack
                </button>
                <button className="w-full bg-black text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-widest">
                  Contact Me
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* --- SECTION 1: HERO --- */}
      <section className="relative pt-32 pb-20 px-4 flex flex-col items-center text-center bg-white font-sans">
        <div
          className="relative w-16 h-16 mb-8 cursor-pointer mx-auto"
          onClick={shuffle}
        >
          <AnimatePresence mode="popLayout">
            {cards.map((skill, index) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: 1 - index * 0.08,
                  y: index * -6,
                  opacity: 1 - index * 0.25,
                  zIndex: cards.length - index,
                }}
                exit={{ x: 50, opacity: 0, scale: 0.5, rotate: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="absolute inset-0 flex items-center justify-center bg-white border border-gray-100 rounded-xl shadow-md p-3"
              >
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.h1
          className="max-w-4xl text-5xl md:text-[72px] font-bold tracking-tight leading-[0.9] mb-4 mx-auto"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
        >
          {heroText.map((word, wordIndex) => (
            <span key={wordIndex} className="inline-block mr-2 text-black">
              {word.split("").map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  className="inline-block"
                  variants={FADE_UP_VARIANTS}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        <motion.p
          className="text-gray-400 font-medium italic text-xl md:text-2xl mb-10"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.03, delayChildren: 1.5 }}
        >
          {heroSubtitle.map((char, index) => (
            <motion.span
              key={index}
              className="inline-block"
              variants={FADE_UP_VARIANTS}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => scrollTo("projects")} // 'Jelajahi' bisa lo arahin ke section impact/project
            className="bg-black text-white px-8 py-3.5 rounded-full font-bold text-base hover:bg-gray-900 shadow-lg"
          >
            Jelajahi
          </button>

          <button
            onClick={() => scrollTo("contact")} // Ini fungsi buat lari ke Section 7
            className="bg-white border border-gray-200 px-8 py-3.5 rounded-full font-bold text-base hover:bg-gray-50 flex items-center gap-2 text-black active:scale-95 transition-all"
          >
            Jalin Kerjasama <span>→</span>
          </button>
        </div>
      </section>

      {/* --- SECTION 2: ABOUT --- */}
      <section
        id="about"
        className="relative min-h-screen bg-black py-20 px-4 flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <FloatingIcon
            img="/icon/javascript.svg"
            top="15%"
            left="10%"
            delay={0}
          />
          <FloatingIcon img="/icon/php.svg" top="20%" right="10%" delay={1} />
          <FloatingIcon
            img="/icon/ps.png"
            bottom="12%"
            right="5%"
            delay={0.5}
          />
          <FloatingIcon
            img="/icon/vscode.png"
            bottom="18%"
            left="6%"
            delay={1.5}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 w-full max-w-5xl"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute -top-20 left-1/2 -translate-x-1/2 text-7xl md:text-[140px] font-black text-white/80 uppercase tracking-tighter select-none whitespace-nowrap"
          >
            Introduction
          </motion.h2>
          <div className="relative bg-gradient-to-br from-white/10 to-transparent backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center shadow-2xl">
            <div className="flex-1 space-y-8">
              <div className="flex items-center gap-3">
                <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  ABOUT
                </h3>
                <span className="px-3 py-1 rounded-full border border-white/30 text-white text-xs font-bold uppercase">
                  Me
                </span>
              </div>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light text-left">
                Hai Selamat Datang di halaman Portofolio Saya, Saya{" "}
                <span className="text-white font-bold underline decoration-blue-500 underline-offset-4">
                  Abdul Rohman
                </span>
                . Mahasiswa program studi{" "}
                <span className="text-blue-400">Sistem Informasi</span> dari
                Universitas Mathla’ul Anwar Banten. Saya fokus di bidang SIG
                Disaster Mapping, Web Development, Visual Identity, Graphic
                Designer, Videoeditor, UI/UX Designer dan Social Media
                Specialist.
              </p>
              <div className="flex gap-4 pt-4">
                <SocialPill
                  icon=""
                  label="instagram"
                  link="https://www.instagram.com/pemuda.hijrah.real?igsh=anFkejJ5ZXN2d285"
                />
                <SocialPill icon="" label="explore my project" link="#" />
              </div>
            </div>
            <div className="relative w-64 h-80 md:w-80 md:h-[450px] shrink-0">
              <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full animate-pulse" />
              <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative w-full h-full rounded-[30px] overflow-hidden border border-white/20 shadow-2xl"
              >
                <img
                  src="/abdull.png"
                  alt="Abdul Rohman"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- SECTION 3: PROJECT EXPLOSION --- */}
      <section
        id="projects"
        className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden py-20"
      >
        <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-black">
            <ExplodingLogo
              img="/icon/javascript.svg"
              targetX={-400}
              targetY={-250}
              rotate={-15}
              delay={0.1}
            />
            <ExplodingLogo
              img="/icon/laravel.svg"
              targetX={-250}
              targetY={-380}
              rotate={24}
              delay={0.2}
            />
            <ExplodingLogo
              img="/icon/capcut.png"
              targetX={-480}
              targetY={-150}
              rotate={28}
              delay={0.3}
            />
            <ExplodingLogo
              img="/icon/php.svg"
              targetX={400}
              targetY={-280}
              rotate={20}
              delay={0.15}
            />
            <ExplodingLogo
              img="/icon/react.svg"
              targetX={280}
              targetY={-420}
              rotate={21}
              delay={0.25}
            />
            <ExplodingLogo
              img="/icon/ps.png"
              targetX={-420}
              targetY={320}
              rotate={-11}
              delay={0.35}
            />
            <ExplodingLogo
              img="/icon/svelt.png"
              targetX={-300}
              targetY={400}
              rotate={27}
              delay={0.2}
            />
            <ExplodingLogo
              img="/icon/msoffice.svg"
              targetX={-500}
              targetY={100}
              rotate={17}
              delay={0.4}
            />
            <ExplodingLogo
              img="/icon/vscode.png"
              targetX={350}
              targetY={350}
              rotate={16}
              delay={0.45}
            />
            <ExplodingLogo
              img="/icon/figma.png"
              targetX={480}
              targetY={280}
              rotate={18}
              delay={0.2}
            />
            <ExplodingLogo
              img="/icon/canva.png"
              targetX={520}
              targetY={80}
              rotate={10}
              delay={0.3}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-center z-10 px-4"
          >
            <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-xs mb-6">
              Explore My Works
            </p>
            <h2 className="text-6xl md:text-[100px] font-black tracking-tighter leading-[0.85] mb-8 text-black">
              DIGITAL <br /> INNOVATION
            </h2>
            <div className="flex items-center justify-center gap-4 text-gray-400 font-medium text-lg italic">
              <span>Web Development</span>
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span>GIS Mapping</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 4: DESIGN GALLERY --- */}
      <section
        id="design"
        className="relative min-h-screen bg-white py-24 overflow-hidden"
      >
        <div className="container mx-auto px-4 mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-blue-500 font-bold uppercase tracking-widest text-[10px] mb-4"
          >
            Visual Showcase
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-black"
          >
            Artwork
          </motion.h2>
        </div>

        <div className="relative flex overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 25,
              repeat: Infinity,
            }}
            className="flex gap-6 whitespace-nowrap"
          >
            {[...galleryImages, ...galleryImages].map((item, index) => (
              <DesignCard key={index} src={item.image_url} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 5: WEB PROJECTS --- */}
      <section
        id="web-projects"
        className="relative min-h-screen bg-white py-24 px-4 overflow-hidden font-sans"
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-20 text-center text-black">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-blue-600 font-bold uppercase tracking-[0.4em] text-[10px] mb-4"
            >
              Development
            </motion.p>

            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black tracking-tighter text-black flex justify-center flex-wrap gap-x-3"
            >
              {"Selected Works".split(" ").map((word, i) => (
                <span key={i} className="inline-block whitespace-nowrap">
                  {word.split("").map((char, j) => (
                    <motion.span
                      key={j}
                      variants={FADE_UP_VARIANTS}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.h2>
          </div>

          {/* LIST PROJECT */}
          {projects && projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-4xl mx-auto">
              {projects.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.title || "Project Image"}
                      className="w-full h-56 object-cover"
                    />
                  )}

                  <div className="p-6">
                    {/* JUDUL PROJECT HITAM TEBAL */}
                    <h3 className="text-xl font-bold text-black mb-2 uppercase tracking-tight">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4">
                      {item.description}
                    </p>

                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-black font-semibold hover:underline"
                      >
                        Lihat Project →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">
              Belum ada project yang ditampilkan.
            </p>
          )}
        </div>
      </section>

      {/* --- SECTION 6: TOOLS SUPPORT --- */}
      <section
        id="tools"
        className="relative min-h-screen bg-white py-24 overflow-hidden font-sans"
      >
        <div className="container mx-auto px-4 mb-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-blue-600 font-bold uppercase tracking-[0.4em] text-[10px] mb-4"
          >
            My Ecosystem
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-black"
          >
            Tools Support
          </motion.h2>
        </div>

        <div className="relative flex overflow-hidden mb-8">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ ease: "linear", duration: 20, repeat: Infinity }}
            className="flex gap-8 whitespace-nowrap"
          >
            {[...TOOLS_ROW_1, ...TOOLS_ROW_1].map((tool, i) => (
              <ToolPill key={i} img={tool.img} name={tool.name} />
            ))}
          </motion.div>
        </div>

        <div className="relative flex overflow-hidden mb-8">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
            className="flex gap-8 whitespace-nowrap"
          >
            {[...TOOLS_ROW_2, ...TOOLS_ROW_2].map((tool, i) => (
              <ToolPill key={i} img={tool.img} name={tool.name} />
            ))}
          </motion.div>
        </div>

        <div className="relative flex overflow-hidden">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ ease: "linear", duration: 22, repeat: Infinity }}
            className="flex gap-8 whitespace-nowrap"
          >
            {[...TOOLS_ROW_3, ...TOOLS_ROW_3].map((tool, i) => (
              <ToolPill key={i} img={tool.img} name={tool.name} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 7: CONTACT & RESUME (FINAL) --- */}
      <section
        id="contact"
        className="relative min-h-screen bg-white py-24 px-4 overflow-hidden font-sans"
      >
        <div className="max-w-6xl mx-auto">
          {/* Bagian Atas: Header & Form Simple */}
          <div className="flex flex-col md:flex-row gap-16 mb-24">
            <div className="flex-1 space-y-8">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-black tracking-tighter text-black"
              >
                Get in touch <br /> with me
              </motion.h2>
              <p className="text-gray-500 text-lg max-w-md leading-relaxed">
                Punya ide gila atau mau kolaborasi buat project selanjutnya? Gas
                bro, langsung hubungin gua lewat platform di bawah ini.
              </p>

              <div className="grid grid-cols-1 gap-8 pt-4">
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Email Saya
                  </p>
                  <a
                    href="mailto:email-lo@gmail.com"
                    className="text-black font-bold hover:text-blue-600 transition-colors underline decoration-gray-200 underline-offset-4"
                  >
                    affdulrahman187@gmail.com
                  </a>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Location
                  </p>
                  <p className="text-black font-bold">
                    Carita Pandeglang, Banten
                  </p>
                </div>
              </div>
            </div>

            {/* Form Simple ala Referensi */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex-1 bg-gray-50 rounded-[40px] p-8 md:p-12 border border-gray-100"
            >
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  const target = e.target as any;
                  const firstName = target[0].value;
                  const lastName = target[1].value;
                  const email = target[2].value;
                  const message = target[3].value;

                  // Ganti nomor ini dengan nomor WA lo (pake kode negara 62)
                  const phone = "6283134513073";

                  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=Halo Abdul Rohman, gua ${firstName} ${lastName} (${email}). %0A%0APesan: ${message}`;

                  window.open(whatsappUrl, "_blank");
                }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-black"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    required
                    className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-black"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-black"
                />
                <textarea
                  placeholder="Message"
                  rows={4}
                  required
                  className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-black"
                />
                <button
                  type="submit"
                  className="w-full bg-black text-white font-bold py-5 rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-black/10 active:scale-95"
                >
                  Send message
                </button>
              </form>
            </motion.div>
          </div>

          {/* Bagian Bawah: Resume & Footer ala Calmerry */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Box Download CV */}
            <div className="flex-[0.4] bg-[#0A1A2F] rounded-[40px] p-10 flex flex-col justify-between items-start text-white">
              <h3 className="text-3xl font-bold leading-tight mb-8">
                Ingin lihat detail <br /> pengalaman saya?
              </h3>
              {/* Path download CV lo di public folder */}
              <a
                href="/CV.ABDUL ROHMAN.pdf"
                download
                className="bg-white text-[#0A1A2F] px-10 py-4 rounded-full font-bold hover:bg-blue-400 hover:text-white transition-all active:scale-95"
              >
                Download CV
              </a>
            </div>

            {/* Box Footer Branding */}
            <div className="flex-[0.6] bg-gray-50 rounded-[40px] p-10 border border-gray-100 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="font-black text-2xl tracking-tighter italic text-black">
                  MY.PORT
                </div>
                <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-xs font-bold uppercase tracking-widest text-gray-400 text-right md:text-left">
                  <a
                    href="#about"
                    className="hover:text-black transition-colors"
                  >
                    About
                  </a>
                  <a
                    href="#design"
                    className="hover:text-black transition-colors"
                  >
                    Gallery
                  </a>
                  <a
                    href="#projects"
                    className="hover:text-black transition-colors"
                  >
                    Projects
                  </a>
                  <a
                    href="#tools"
                    className="hover:text-black transition-colors"
                  >
                    Tools
                  </a>
                </div>
              </div>

              <div className="flex justify-between items-end pt-12">
                <div className="flex gap-6 items-center">
                  {" "}
                  {/* Gap gua gedein dikit biar gak rapet banget */}
                  <SocialIcon
                    icon="/icon/instagram.svg"
                    link="https://www.instagram.com/pemuda.hijrah.real?igsh=anFkejJ5ZXN2d285"
                  />
                  <SocialIcon
                    icon="/icon/tiktok.svg"
                    link="https://www.tiktok.com/@sporty.guyy?_r=1&_t=ZS-93sNlsP7QO4"
                  />
                  <SocialIcon
                    icon="/icon/link.svg"
                    link="https://www.linkedin.com/in/abdul-rohman-a2b166293/"
                  />
                </div>

                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                  © 2026 Abdul Rohman. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// --- SUB-COMPONENTS ---

function SocialIcon({ icon, link }: { icon: string; link: string }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
    >
      {/* Sekarang pake tag img biar logo .svg lo muncul */}
      <img
        src={icon}
        alt="Social Media"
        className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
        onError={(e) => {
          e.currentTarget.src = "https://via.placeholder.com/40?text=Icon";
        }}
      />
    </a>
  );
}

const TOOLS_ROW_1 = [
  { name: "JavaScript", img: "/icon/javascript.svg" },
  { name: "Laravel", img: "/icon/laravel.svg" },
  { name: "React", img: "/icon/react.svg" },
  { name: "PHP", img: "/icon/php.svg" },
  { name: "ARCGIS", img: "/icon/arcgis.png" },
];

const TOOLS_ROW_2 = [
  { name: "Photoshop", img: "/icon/ps.png" },
  { name: "Capcut", img: "/icon/capcut.png" },
  { name: "Figma", img: "/icon/figma.png" },
  { name: "VS Code", img: "/icon/vscode.png" },
];

const TOOLS_ROW_3 = [
  { name: "Canva", img: "/icon/canva.png" },
  { name: "Svelte", img: "/icon/svelt.png" },
  { name: "MS Office", img: "/icon/msoffice.svg" },
  { name: "Next.js", img: "https://cdn.worldvectorlogo.com/logos/next-js.svg" },
];

function ToolPill({ img, name }: { img: string; name: string }) {
  return (
    <div className="flex items-center gap-4 bg-white border border-gray-100 px-6 py-4 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
      <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
        <img src={img} alt={name} className="w-full h-full object-contain" />
      </div>
      <span className="text-xl font-bold tracking-tight text-black">
        {name}
      </span>
    </div>
  );
}

function FloatingIcon({ img, top, left, right, bottom, delay }: any) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [0, -25, 0], rotate: [0, 5, -5, 0] }}
      transition={{ duration: 5, repeat: Infinity, delay, ease: "easeInOut" }}
      className="absolute w-20 h-20 md:w-28 md:h-28 opacity-40 hover:opacity-100 transition-opacity duration-500"
      style={{ top, left, right, bottom }}
    >
      <img
        src={img}
        alt="icon"
        className="w-full h-full object-contain filter drop-shadow-2xl"
      />
    </motion.div>
  );
}

function SocialPill({ icon, label, link }: any) {
  return (
    <a
      href={link}
      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all text-white text-sm group"
    >
      <span className="group-hover:scale-125 transition-transform">{icon}</span>
      <span className="font-medium">{label}</span>
    </a>
  );
}

function ExplodingLogo({ img, targetX, targetY, rotate, delay }: any) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const finalX = isMobile ? targetX * 0.35 : targetX;
  const finalY = isMobile ? targetY * 0.45 : targetY;
  const finalSize = isMobile ? "w-14 h-14" : "w-20 h-20 md:w-24 md:h-24";

  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
      whileInView={{
        x: [0, finalX, finalX + 5, finalX - 5, finalX],
        y: [0, finalY, finalY - 8, finalY + 8, finalY],
        opacity: 1,
        scale: 1,
        rotate: [0, rotate, rotate + 2, rotate - 2, rotate],
      }}
      viewport={{ once: true }}
      transition={{
        duration: 1.2,
        delay: delay,
        ease: "easeOut",
        x: {
          duration: 4,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: delay + 1.2,
        },
        y: {
          duration: 3.5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: delay + 1.2,
        },
        rotate: {
          duration: 5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: delay + 1.2,
        },
      }}
      className={`absolute ${finalSize} shadow-2xl rounded-2xl p-2 md:p-4 bg-white border border-gray-100 flex items-center justify-center`}
    >
      <img
        src={img}
        alt="skill logo"
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
}

function DesignCard({ src }: { src: string }) {
  return (
    <div
      className="relative flex-shrink-0 bg-gray-100 rounded-[32px] overflow-hidden border border-gray-200 shadow-sm"
      style={{ width: "350px", height: "437.5px" }}
    >
      <img
        src={src}
        alt="Karya Seni Abdul Rohman"
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
        onError={(e) => {
          e.currentTarget.src =
            "https://via.placeholder.com/1080x1350?text=Karya+Seni";
        }}
      />
    </div>
  );
}

function ProjectCard({ title, description, img, link, tag }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
      onClick={() => window.open(link, "_blank")}
    >
      <div className="relative aspect-[16/10] md:aspect-[16/9] w-full overflow-hidden rounded-[32px] border border-gray-100 bg-gray-50 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:border-gray-200">
        <img
          src={img}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/1200x800?text=Web+Preview";
          }}
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="mt-8 space-y-3 px-2">
        <div className="flex flex-wrap gap-2">
          {tag.map((tag: string, i: number) => (
            <span
              key={i}
              className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-3xl font-bold tracking-tight text-black group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-gray-400 font-medium">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
