import Image from "next/image";
import Link from "next/link";
import { Compass, Settings, Building2, Server, Layers, Zap, Eye, FileText, Palette, Trees } from "lucide-react";
import { Jost } from "next/font/google";

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jost",
});

export const metadata = {
  title: "Architecture & Engineering | JelasBeres.id",
  description: "Bridging the gap between structural CAD engineering and high-performance digital IT infrastructure.",
};

export default function ArchitectPage() {
  return (
    <div 
      className={`${jost.className} bg-background text-foreground selection:bg-green selection:text-white`}
      style={{
        fontFamily: `Futura, ${jost.style.fontFamily}, sans-serif`,
        "--font-display": `Futura, ${jost.style.fontFamily}, sans-serif`,
        "--font-sans": `Futura, ${jost.style.fontFamily}, sans-serif`,
      } as React.CSSProperties}
    >
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden blueprint-grid">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface-hover border border-border rounded-sm mb-8">
            <Compass size={16} className="text-green" />
            <span className="font-mono text-xs uppercase tracking-widest text-foreground font-medium">Engineering Excellence</span>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-8 max-w-5xl mx-auto text-foreground uppercase">
            Equilibrium<br className="hidden md:block" /> In Precision
          </h1>
          
          <p className="font-sans text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed">
            Bridging the gap between structural CAD engineering and high-performance digital IT infrastructure. We design the physical and code the virtual.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="#contact" 
              className="w-full sm:w-auto bg-foreground text-background font-mono text-xs font-medium px-8 py-4 uppercase tracking-widest hover:bg-green hover:text-white transition-all active:scale-95 text-center"
            >
              Initiate System Sync
            </Link>
            <Link 
              href="#showcase" 
              className="w-full sm:w-auto border border-border text-foreground font-mono text-xs font-medium px-8 py-4 uppercase tracking-widest hover:bg-surface-hover transition-all active:scale-95 text-center"
            >
              View Blueprint
            </Link>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="mt-24 max-w-7xl mx-auto px-6">
          <div className="relative w-full aspect-video md:aspect-[21/9] rounded-none overflow-hidden border border-border shadow-2xl bg-surface group">
            <img 
              alt="Technical blueprint of a turbine assembly" 
              className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100" 
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2942&auto=format&fit=crop"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"></div>
            
            <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div className="bg-surface/80 backdrop-blur-md p-6 border border-border">
                <p className="font-mono text-xs font-bold tracking-widest text-green mb-2">PROJECT: SYNC-01</p>
                <p className="font-display text-xl md:text-2xl font-bold text-foreground">Integrated Infrastructure Hub</p>
              </div>
              
              <div className="hidden md:block font-mono text-xs text-muted text-right bg-surface/80 backdrop-blur-md p-4 border border-border">
                COORDINATES: 40.7128° N, 74.0060° W<br/>
                LATENCY: 0.2MS / PRECISION: ±0.001MM
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-32 bg-surface" id="expertise">
        <div className="max-w-[90rem] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">Layanan Studio Arsitektur</h2>
              <p className="font-sans text-lg text-muted">Solusi perancangan menyeluruh mulai dari konsep awal hingga detail konstruksi fisik.</p>
            </div>
            <div className="font-mono text-xs font-medium uppercase tracking-widest text-muted border border-border px-4 py-2">
              Layanan / 01-05
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {/* Architectural Design */}
            <div className="group p-8 border border-border hover:border-green transition-all duration-500 bg-background flex flex-col justify-between min-h-[460px]">
              <div>
                <Building2 size={40} className="text-foreground mb-8 group-hover:text-green transition-colors" strokeWidth={1.5} />
                <h3 className="font-display text-xl font-bold mb-4 text-foreground">1. Architectural Design</h3>
                <p className="font-sans text-sm text-muted leading-relaxed">Perancangan estetis, fungsional, dan ramah lingkungan yang disesuaikan dengan kebutuhan Anda.</p>
              </div>
              <ul className="font-sans text-xs tracking-wide space-y-3 text-muted mt-8">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green rounded-full"></span> Desain Rumah Tinggal</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green rounded-full"></span> Desain Villa & Resort</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green rounded-full"></span> Desain Bangunan Komersial</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green rounded-full"></span> Desain Perkantoran</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green rounded-full"></span> Desain Fasilitas Pendidikan</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green rounded-full"></span> Master Planning</li>
              </ul>
            </div>
            
            {/* Architectural Visualization */}
            <div className="group p-8 border border-border hover:border-green transition-all duration-500 bg-background flex flex-col justify-between min-h-[460px]">
              <div>
                <Eye size={40} className="text-foreground mb-8 group-hover:text-green transition-colors" strokeWidth={1.5} />
                <h3 className="font-display text-xl font-bold mb-4 text-foreground">2. Architectural Visualization</h3>
                <p className="font-sans text-sm text-muted leading-relaxed">Presentasi visual berkualitas tinggi untuk memberikan gambaran nyata sebelum konstruksi dimulai.</p>
              </div>
              <ul className="font-sans text-xs tracking-wide space-y-3 text-muted mt-8">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green rounded-full"></span> 3D Modeling</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green rounded-full"></span> Photorealistic Rendering</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green rounded-full"></span> Interior Rendering</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green rounded-full"></span> Exterior Rendering</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green rounded-full"></span> Architectural Animation</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green rounded-full"></span> Virtual Tour & VR</li>
              </ul>
            </div>
            
            {/* Construction Documentation */}
            <div className="group p-8 border border-border hover:border-green transition-all duration-500 bg-background flex flex-col justify-between min-h-[460px]">
              <div>
                <FileText size={40} className="text-foreground mb-8 group-hover:text-green transition-colors" strokeWidth={1.5} />
                <h3 className="font-display text-xl font-bold mb-4 text-foreground">3. Construction Documentation</h3>
                <p className="font-sans text-sm text-muted leading-relaxed">Penyusunan gambar teknis detail dan dokumen perizinan untuk kelancaran pembangunan.</p>
              </div>
              <ul className="font-sans text-xs tracking-wide space-y-3 text-muted mt-8">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green rounded-full"></span> Gambar Kerja Arsitektur</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green rounded-full"></span> Detail Konstruksi</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green rounded-full"></span> Shop Drawing</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green rounded-full"></span> As-Built Drawing</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green rounded-full"></span> Dokumen Perizinan (PBG/SLF)</li>
              </ul>
            </div>
            
            {/* Interior Design */}
            <div className="group p-8 border border-border hover:border-green transition-all duration-500 bg-background flex flex-col justify-between min-h-[460px]">
              <div>
                <Palette size={40} className="text-foreground mb-8 group-hover:text-green transition-colors" strokeWidth={1.5} />
                <h3 className="font-display text-xl font-bold mb-4 text-foreground">4. Interior Design</h3>
                <p className="font-sans text-sm text-muted leading-relaxed">Penciptaan ruang dalam yang harmonis, efisien, dan mencerminkan karakter penghuninya.</p>
              </div>
              <ul className="font-sans text-xs tracking-wide space-y-3 text-muted mt-8">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green rounded-full"></span> Desain Interior Residensial</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green rounded-full"></span> Desain Interior Komersial</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green rounded-full"></span> Space Planning</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green rounded-full"></span> Material & Furniture Selection</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green rounded-full"></span> Custom Furniture Design</li>
              </ul>
            </div>
            
            {/* Landscape Design */}
            <div className="group p-8 border border-border hover:border-green transition-all duration-500 bg-background flex flex-col justify-between min-h-[460px]">
              <div>
                <Trees size={40} className="text-foreground mb-8 group-hover:text-green transition-colors" strokeWidth={1.5} />
                <h3 className="font-display text-xl font-bold mb-4 text-foreground">5. Landscape Design</h3>
                <p className="font-sans text-sm text-muted leading-relaxed">Perencanaan area luar ruangan hijau yang asri dan terintegrasi dengan arsitektur utama.</p>
              </div>
              <ul className="font-sans text-xs tracking-wide space-y-3 text-muted mt-8">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green rounded-full"></span> Desain Taman Residensial</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green rounded-full"></span> Desain Taman Komersial</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green rounded-full"></span> Hardscape & Softscape Planning</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green rounded-full"></span> Courtyard Design</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green rounded-full"></span> Plaza & Public Space Design</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green rounded-full"></span> Landscape Master Planning</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Alur Kerja Section */}
      <section className="py-32 bg-background border-y border-border overflow-hidden relative" id="process">
        <div className="absolute inset-0 blueprint-grid opacity-35"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">Alur Kerja Perancangan</h2>
            <p className="font-sans text-lg text-muted max-w-2xl mx-auto">Proses bertahap yang sistematis untuk merealisasikan visi arsitektur Anda dengan presisi.</p>
            <div className="h-1 w-20 bg-green mx-auto mt-6"></div>
          </div>
          
          <div className="relative pl-8 md:pl-12 border-l border-border/80 ml-4 md:ml-8 space-y-20">
            {/* Step 1 */}
            <div className="relative group">
              {/* Timeline dot */}
              <div className="absolute -left-[40px] md:-left-[56px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-green group-hover:bg-green transition-all duration-300"></div>
              
              <div>
                <span className="font-mono text-xs font-bold tracking-widest text-green mb-2 block">TAHAP 01</span>
                <h4 className="font-display text-2xl font-bold mb-3 text-foreground">1. Konsultasi Awal & Brief Klien</h4>
                <p className="font-sans text-muted text-sm leading-relaxed mb-4 max-w-2xl">Pengumpulan data awal dan diskusi target rencana pembangunan.</p>
                <ul className="text-xs text-muted/80 space-y-2 list-disc pl-4 font-sans max-w-2xl">
                  <li>Hubungi via WhatsApp, Email, atau Online Meeting.</li>
                  <li>Pengumpulan data kebutuhan (fungsi, luas, lokasi, budget, referensi).</li>
                  <li>Diskusi target waktu dan lingkup pekerjaan.</li>
                  <li>Penawaran jasa dan estimasi awal biaya.</li>
                </ul>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative group">
              {/* Timeline dot */}
              <div className="absolute -left-[40px] md:-left-[56px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-green group-hover:bg-green transition-all duration-300"></div>
              
              <div>
                <span className="font-mono text-xs font-bold tracking-widest text-green mb-2 block">TAHAP 02</span>
                <h4 className="font-display text-2xl font-bold mb-3 text-foreground">2. Penawaran & Kontrak Kerja</h4>
                <p className="font-sans text-muted text-sm leading-relaxed mb-4 max-w-2xl">Penyusunan kesepakatan kerja dan administrasi legalitas proyek.</p>
                <ul className="text-xs text-muted/80 space-y-2 list-disc pl-4 font-sans max-w-2xl">
                  <li>Pengiriman proposal dan formal quotation.</li>
                  <li>Revisi lingkup pekerjaan bila diperlukan.</li>
                  <li>Persetujuan penawaran secara tertulis.</li>
                  <li>Penandatanganan kontrak kerja arsitektur.</li>
                  <li>Pembayaran termin pertama (DP).</li>
                </ul>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative group">
              {/* Timeline dot */}
              <div className="absolute -left-[40px] md:-left-[56px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-green group-hover:bg-green transition-all duration-300"></div>
              
              <div>
                <span className="font-mono text-xs font-bold tracking-widest text-green mb-2 block">TAHAP 03</span>
                <h4 className="font-display text-2xl font-bold mb-3 text-foreground">3. Pengumpulan Data Lokasi</h4>
                <p className="font-sans text-muted text-sm leading-relaxed mb-4 max-w-2xl">Pengumpulan berkas data fisik lokasi tanah dari klien:</p>
                <ul className="text-xs text-muted/80 space-y-2 list-disc pl-4 font-sans max-w-2xl">
                  <li>Sertifikat tanah atau gambar site plan.</li>
                  <li>Foto & rekaman video kondisi lapangan.</li>
                  <li>Titik koordinat presisi Google Maps.</li>
                  <li>Data kontur/topografi (jika ada).</li>
                  <li>Peraturan daerah/setempat (jika tersedia).</li>
                </ul>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="relative group">
              {/* Timeline dot */}
              <div className="absolute -left-[40px] md:-left-[56px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-green group-hover:bg-green transition-all duration-300"></div>
              
              <div>
                <span className="font-mono text-xs font-bold tracking-widest text-green mb-2 block">TAHAP 04</span>
                <h4 className="font-display text-2xl font-bold mb-3 text-foreground">4. Konsep Desain (Concept Design)</h4>
                <p className="font-sans text-muted text-sm leading-relaxed mb-4 max-w-2xl">Penyusunan dasar arsitektural dan gagasan awal tata ruang.</p>
                <ul className="text-xs text-muted/80 space-y-2 list-disc pl-4 font-sans max-w-2xl">
                  <li>Analisis kebutuhan kapasitas ruang.</li>
                  <li>Penyusunan zoning dan diagram hubungan ruang.</li>
                  <li>Pembuatan moodboard visual dan konsep tema.</li>
                  <li>Sketsa denah kasar atau studi massing 3D.</li>
                  <li>Presentasi konsep secara online.</li>
                </ul>
              </div>
            </div>
            
            {/* Step 5 */}
            <div className="relative group">
              {/* Timeline dot */}
              <div className="absolute -left-[40px] md:-left-[56px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-green group-hover:bg-green transition-all duration-300"></div>
              
              <div>
                <span className="font-mono text-xs font-bold tracking-widest text-green mb-2 block">TAHAP 05</span>
                <h4 className="font-display text-2xl font-bold mb-3 text-foreground">5. Pengembangan Desain</h4>
                <p className="font-sans text-muted text-sm leading-relaxed mb-4 max-w-2xl">Pematangan rancangan dasar menjadi bentuk arsitektur konkret.</p>
                <ul className="text-xs text-muted/80 space-y-2 list-disc pl-4 font-sans max-w-2xl">
                  <li>Pengembangan denah presisi berskala.</li>
                  <li>Pembuatan tampak depan, samping, dan potongan bangunan.</li>
                  <li>Pemilihan jenis material utama eksterior & interior.</li>
                  <li>Pemodelan detail model 3D bangunan.</li>
                  <li>Revisi berdasarkan feedback klien.</li>
                </ul>
              </div>
            </div>
            
            {/* Step 6 */}
            <div className="relative group">
              {/* Timeline dot */}
              <div className="absolute -left-[40px] md:-left-[56px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-green group-hover:bg-green transition-all duration-300"></div>
              
              <div>
                <span className="font-mono text-xs font-bold tracking-widest text-green mb-2 block">TAHAP 06</span>
                <h4 className="font-display text-2xl font-bold mb-3 text-foreground">6. Visualisasi Arsitektur</h4>
                <p className="font-sans text-muted text-sm leading-relaxed mb-4 max-w-2xl">Pembuatan output presentasi realistik beresolusi tinggi.</p>
                <ul className="text-xs text-muted/80 space-y-2 list-disc pl-4 font-sans max-w-2xl">
                  <li>Rendering 3D realistik eksterior & interior.</li>
                  <li>Animasi video walkthrough arsitektur (opsional).</li>
                  <li>Presentasi desain final secara online.</li>
                  <li>Persetujuan/approval desain resmi oleh klien.</li>
                </ul>
              </div>
            </div>
            
            {/* Step 7 */}
            <div className="relative group">
              {/* Timeline dot */}
              <div className="absolute -left-[40px] md:-left-[56px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-green group-hover:bg-green transition-all duration-300"></div>
              
              <div>
                <span className="font-mono text-xs font-bold tracking-widest text-green mb-2 block">TAHAP 07</span>
                <h4 className="font-display text-2xl font-bold mb-3 text-foreground">7. Gambar Kerja</h4>
                <p className="font-sans text-muted text-sm leading-relaxed mb-4 max-w-2xl">Pembuatan dokumen gambar teknis lengkap untuk panduan pembangunan di lapangan.</p>
                <ul className="text-xs text-muted/80 space-y-2 list-disc pl-4 font-sans max-w-2xl">
                  <li>Denah teknis berdimensi lengkap.</li>
                  <li>Tampak teknis dan potongan struktural arsitektur.</li>
                  <li>Gambar detail arsitektur (kamar mandi, fasad, dll).</li>
                  <li>Detail pintu, jendela, tangga, dan pola finishing lantai.</li>
                  <li>Layout arsitektural untuk kebutuhan konstruksi fisik.</li>
                </ul>
              </div>
            </div>
            
            {/* Step 8 */}
            <div className="relative group">
              {/* Timeline dot */}
              <div className="absolute -left-[40px] md:-left-[56px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-green group-hover:bg-green transition-all duration-300"></div>
              
              <div>
                <span className="font-mono text-xs font-bold tracking-widest text-green mb-2 block">TAHAP 08</span>
                <h4 className="font-display text-2xl font-bold mb-3 text-foreground">8. Estimasi Biaya (Opsional)</h4>
                <p className="font-sans text-muted text-sm leading-relaxed mb-4 max-w-2xl">Penyusunan anggaran biaya untuk efisiensi budget pembangunan.</p>
                <ul className="text-xs text-muted/80 space-y-2 list-disc pl-4 font-sans max-w-2xl">
                  <li>Penyusunan Rencana Anggaran Biaya (RAB) terperinci.</li>
                  <li>Daftar spesifikasi lengkap material konstruksi.</li>
                  <li>BOQ (Bill of Quantity) untuk acuan kontraktor.</li>
                </ul>
              </div>
            </div>
            
            {/* Step 9 */}
            <div className="relative group">
              {/* Timeline dot */}
              <div className="absolute -left-[40px] md:-left-[56px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-green group-hover:bg-green transition-all duration-300"></div>
              
              <div>
                <span className="font-mono text-xs font-bold tracking-widest text-green mb-2 block">TAHAP 09</span>
                <h4 className="font-display text-2xl font-bold mb-3 text-foreground">9. Penyerahan Dokumen</h4>
                <p className="font-sans text-muted text-sm leading-relaxed mb-4 max-w-2xl">Pengiriman paket data file final kepada klien dalam format lengkap:</p>
                <ul className="text-xs text-muted/80 space-y-2 list-disc pl-4 font-sans max-w-2xl">
                  <li>File PDF (Siap Cetak) dan DWG (AutoCAD).</li>
                  <li>File SKP / Revit (sesuai kesepakatan awal).</li>
                  <li>Berkas gambar render final resolusi tinggi.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Showcase Section */}
      <section className="py-32 bg-surface" id="showcase">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative z-10 border border-border p-2 bg-background shadow-xl">
                <img 
                  alt="A sleek computer monitor displaying advanced 3D CAD software" 
                  className="w-full grayscale hover:grayscale-0 transition-all duration-1000" 
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2940&auto=format&fit=crop"
                />
              </div>
              
              {/* Floating Code Snippet Card */}
              <div className="absolute -bottom-10 -right-4 md:-right-10 p-6 bg-[#0B0B0F] text-gray-300 font-mono text-[11px] max-w-[280px] hidden sm:block border-l-4 border-green shadow-2xl z-20">
                <p className="mb-4 text-green opacity-80">// INITIALIZING CORE_STACK</p>
                <p className="mb-2 text-blue-400">const <span className="text-yellow-200">architecture</span> = new <span className="text-green">Hub</span>({'{'}</p>
                <p className="pl-4">nodes: <span className="text-orange-300">"Industrial_Tier_4"</span>,</p>
                <p className="pl-4">sync: <span className="text-purple-400">true</span>,</p>
                <p className="pl-4">precision: <span className="text-purple-400">0.001</span></p>
                <p className="text-blue-400">{"});"}</p>
                <p className="mt-4 text-green font-bold animate-pulse">STATUS: SYSTEM_READY</p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 text-foreground tracking-tight">Convergence of Design and Logic</h2>
              <p className="font-sans text-lg text-muted mb-10 leading-relaxed">
                We don't just build server rooms; we engineer digital environments that respect the physical constraints of space while maximizing computational throughput. 
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 border border-border bg-background flex items-center justify-center flex-shrink-0 mt-1">
                    <Layers className="text-foreground" size={20} />
                  </div>
                  <div>
                    <h4 className="font-display text-xl font-bold mb-2 text-foreground">Multi-Layered Architecture</h4>
                    <p className="font-sans text-muted text-sm leading-relaxed">Synchronized physical blueprints with digital network topology mapping.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 border border-border bg-background flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="text-foreground" size={20} />
                  </div>
                  <div>
                    <h4 className="font-display text-xl font-bold mb-2 text-foreground">Zero-Loss Performance</h4>
                    <p className="font-sans text-muted text-sm leading-relaxed">Optimized cabling and infrastructure layouts for minimal signal attenuation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 bg-foreground text-background overflow-hidden relative">
        {/* Atmospheric effects */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full blueprint-grid filter invert"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold mb-10 tracking-tighter uppercase">Ready To<br/>Stabilize?</h2>
          <p className="font-sans text-xl text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed">
            Connect with our lead architects to discuss your next precision-critical infrastructure project.
          </p>
          <Link 
            href="#contact"
            className="inline-block bg-background text-foreground font-mono text-sm font-bold px-12 py-5 uppercase tracking-[0.2em] hover:bg-green hover:text-white hover:border-green transition-all duration-300 scale-100 hover:scale-105 active:scale-95 border border-transparent"
          >
            Initiate System Sync
          </Link>
        </div>
      </section>
    </div>
  );
}
