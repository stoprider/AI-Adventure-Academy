const ethicsCards = [
  {
    title: "Fake News",
    tip: "เช็กแหล่งข่าวก่อนแชร์ทุกครั้ง"
  },
  {
    title: "Copyright",
    tip: "อย่านำงานคนอื่นไปใช้โดยไม่ให้เครดิต"
  },
  {
    title: "Privacy",
    tip: "ไม่ใส่ข้อมูลส่วนตัวสำคัญลงใน AI แบบไม่จำเป็น"
  },
  {
    title: "Hallucination",
    tip: "AI ตอบมั่นใจได้แม้ข้อมูลผิด ต้องตรวจซ้ำ"
  },
  {
    title: "Cyber Safety",
    tip: "ระวังลิงก์ปลอม รหัสผ่าน และการหลอกลวงออนไลน์"
  }
];

export function EthicsPage() {
  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-white">AI Ethics Mini Game</h1>
        <p className="text-slate-300">เรียนรู้การใช้ AI อย่างรับผิดชอบผ่านหัวข้อสำคัญที่เด็กต้องเจอในชีวิตจริง</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {ethicsCards.map((card) => (
          <div key={card.title} className="card animate-pulseGlow p-6">
            <div className="text-xl font-bold text-white">{card.title}</div>
            <p className="mt-3 text-slate-300">{card.tip}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
