export function HeroPanel() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="card overflow-hidden p-8">
        <div className="mb-3 inline-flex rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100">
          Future Adventure for Ages 12-15
        </div>
        <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-6xl">
          เรียนรู้ AI ผ่านภารกิจสุดสนุกในเมืองอนาคต
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
          สำรวจการสร้างภาพ การถาม AI การคิดวิเคราะห์ และจริยธรรมดิจิทัล ผ่านเกมที่ออกแบบให้เด็กเข้าใจง่ายและเล่นได้จริง
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#start" className="button-primary">
            เริ่มภารกิจ
          </a>
          <a href="#levels" className="button-secondary">
            ดูระดับทั้งหมด
          </a>
        </div>
      </div>

      <div className="card flex min-h-[320px] items-center justify-center bg-[radial-gradient(circle_at_top,#22d3ee33,transparent_40%),linear-gradient(180deg,#082f49,#111827)] p-8">
        <div className="animate-floaty rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl">
          <div className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan-200">Mission Console</div>
          <div className="grid gap-3">
            <div className="rounded-2xl bg-emerald-400/15 p-4">AI Image Challenge: สร้างแมวอวกาศ</div>
            <div className="rounded-2xl bg-amber-400/15 p-4">Problem Solver: จัดโต๊ะสอบ 500 คน</div>
            <div className="rounded-2xl bg-pink-400/15 p-4">AI Ethics: เช็กข่าวปลอมก่อนแชร์</div>
          </div>
        </div>
      </div>
    </section>
  );
}
