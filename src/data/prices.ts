import type { PriceItem } from "@/types";

/**
 * DEMO PRICE LIST — currency is Georgian Lari (GEL, ₾), the clinic's
 * real operating currency. Amounts are calibrated to typical private
 * clinic pricing in Tbilisi (~90-120 GEL for a specialist consultation,
 * ~45-80 GEL for common diagnostics), so the catalog feels realistic —
 * but they are still NOT the clinic's own confirmed price list. Replace
 * via a future CSV/Excel/API import once real prices are supplied (see
 * task requirement #15).
 */
export const prices: PriceItem[] = [
  { id: "price-consult-cardiology", name: { ru: "Консультация кардиолога", ka: "კარდიოლოგის კონსულტაცია", hy: "Սրտաբանի խորհրդատվություն" }, category: "consultation", departmentSlugs: ["cardiology"], priceFrom: true, amount: 120, serviceSlug: "consult-cardiology" },
  { id: "price-ecg-service", name: { ru: "ЭКГ с расшифровкой", ka: "ეკგ განშიფვრით", hy: "ԷՍԳ վերծանմամբ" }, category: "procedure", departmentSlugs: ["cardiology"], priceFrom: false, amount: 50, serviceSlug: "ecg-service" },
  { id: "price-echocardiography", name: { ru: "Эхокардиография (УЗИ сердца)", ka: "ექოკარდიოგრაფია", hy: "Էխոսրտագրություն" }, category: "diagnostics", departmentSlugs: ["cardiology"], priceFrom: false, amount: 130 },
  { id: "price-consult-therapy", name: { ru: "Консультация терапевта", ka: "თერაპევტის კონსულტაცია", hy: "Թերապևտի խորհրդատվություն" }, category: "consultation", departmentSlugs: ["therapy"], priceFrom: true, amount: 90, serviceSlug: "consult-therapy" },
  { id: "price-lab-blood-panel", name: { ru: "Общий и биохимический анализ крови", ka: "სისხლის საერთო და ბიოქიმიური ანალიზი", hy: "Արյան ընդհանուր և կենսաքիմիական վերլուծություն" }, category: "laboratory", departmentSlugs: ["therapy", "pediatrics", "endocrinology"], priceFrom: true, amount: 45 },
  { id: "price-consult-pediatrics", name: { ru: "Консультация педиатра", ka: "პედიატრის კონსულტაცია", hy: "Մանկաբույժի խորհրդատվություն" }, category: "consultation", departmentSlugs: ["pediatrics"], priceFrom: true, amount: 90, serviceSlug: "consult-pediatrics" },
  { id: "price-child-checkup", name: { ru: "Плановый осмотр ребёнка", ka: "ბავშვის გეგმური შემოწმება", hy: "Երեխայի պլանային զննում" }, category: "consultation", departmentSlugs: ["pediatrics"], priceFrom: true, amount: 90, serviceSlug: "child-checkup" },
  { id: "price-consult-gynecology", name: { ru: "Консультация гинеколога", ka: "გინეკოლოგის კონსულტაცია", hy: "Գինեկոլոգի խորհրդատվություն" }, category: "consultation", departmentSlugs: ["gynecology"], priceFrom: true, amount: 120, serviceSlug: "consult-gynecology" },
  { id: "price-gyn-ultrasound", name: { ru: "УЗИ малого таза", ka: "მცირე მენჯის ულტრაბგერითი კვლევა", hy: "Փոքր կոնքի ուլտրաձայնային հետազոտություն" }, category: "diagnostics", departmentSlugs: ["gynecology"], priceFrom: false, amount: 80, serviceSlug: "gyn-ultrasound" },
  { id: "price-consult-neurology", name: { ru: "Консультация невролога", ka: "ნევროლოგის კონსულტაცია", hy: "Նյարդաբանի խորհրդատվություն" }, category: "consultation", departmentSlugs: ["neurology"], priceFrom: true, amount: 120, serviceSlug: "consult-neurology" },
  { id: "price-consult-endocrinology", name: { ru: "Консультация эндокринолога", ka: "ენდოკრინოლოგის კონსულტაცია", hy: "Էնդոկրինոլոգի խորհրդատվություն" }, category: "consultation", departmentSlugs: ["endocrinology"], priceFrom: true, amount: 120, serviceSlug: "consult-endocrinology" },
  { id: "price-consult-urology", name: { ru: "Консультация уролога", ka: "უროლოგის კონსულტაცია", hy: "Ուրոլոգի խորհրդատվություն" }, category: "consultation", departmentSlugs: ["urology"], priceFrom: true, amount: 120, serviceSlug: "consult-urology" },
  { id: "price-ultrasound-abdominal", name: { ru: "УЗИ органов брюшной полости", ka: "მუცლის ღრუს ორგანოების ულტრაბგერითი კვლევა", hy: "Որովայնի խոռոչի օրգանների ուլտրաձայնային հետազոտություն" }, category: "diagnostics", departmentSlugs: ["gastroenterology", "urology"], priceFrom: false, amount: 80 },
  { id: "price-consult-ent", name: { ru: "Консультация ЛОР-врача", ka: "ყელ-ყურ-ცხვირის ექიმის კონსულტაცია", hy: "ԱԿՔ բժշկի խորհրդատվություն" }, category: "consultation", departmentSlugs: ["ent"], priceFrom: true, amount: 100, serviceSlug: "consult-ent" },
  { id: "price-hearing-test", name: { ru: "Проверка слуха (аудиометрия)", ka: "სმენის შემოწმება (აუდიომეტრია)", hy: "Լսողության ստուգում (աուդիոմետրիա)" }, category: "diagnostics", departmentSlugs: ["ent"], priceFrom: false, amount: 50, serviceSlug: "hearing-test-service" },
  { id: "price-consult-ophthalmology", name: { ru: "Консультация офтальмолога", ka: "ოფთალმოლოგის კონსულტაცია", hy: "Ակնաբույժի խորհրդատվություն" }, category: "consultation", departmentSlugs: ["ophthalmology"], priceFrom: true, amount: 100, serviceSlug: "consult-ophthalmology" },
  { id: "price-vision-test", name: { ru: "Проверка остроты зрения", ka: "მხედველობის სიმახვილის შემოწმება", hy: "Տեսողության սրության ստուգում" }, category: "diagnostics", departmentSlugs: ["ophthalmology"], priceFrom: false, amount: 30, serviceSlug: "vision-test-service" },
  { id: "price-consult-dermatology", name: { ru: "Консультация дерматолога", ka: "დერმატოლოგის კონსულტაცია", hy: "Մաշկաբանի խորհրդատվություն" }, category: "consultation", departmentSlugs: ["dermatology"], priceFrom: true, amount: 100, serviceSlug: "consult-dermatology" },
  { id: "price-mole-check", name: { ru: "Осмотр родинок (дерматоскопия)", ka: "ხალების შემოწმება (დერმატოსკოპია)", hy: "Նշիկների զննում (դերմատոսկոպիա)" }, category: "procedure", departmentSlugs: ["dermatology"], priceFrom: false, amount: 60, serviceSlug: "mole-check-service" },
  { id: "price-consult-gastroenterology", name: { ru: "Консультация гастроэнтеролога", ka: "გასტროენტეროლოგის კონსულტაცია", hy: "Ստամոքսաղիքաբանի խորհրդատվություն" }, category: "consultation", departmentSlugs: ["gastroenterology"], priceFrom: true, amount: 120, serviceSlug: "consult-gastroenterology" },
  { id: "price-consult-surgery", name: { ru: "Консультация хирурга", ka: "ქირურგის კონსულტაცია", hy: "Վիրաբույժի խորհրդատվություն" }, category: "consultation", departmentSlugs: ["surgery"], priceFrom: true, amount: 120, serviceSlug: "consult-surgery" },
  { id: "price-consult-orthopedics", name: { ru: "Консультация ортопеда", ka: "ორთოპედის კონსულტაცია", hy: "Օրթոպեդի խորհրդատվություն" }, category: "consultation", departmentSlugs: ["orthopedics"], priceFrom: true, amount: 100, serviceSlug: "consult-orthopedics" },
  { id: "price-xray", name: { ru: "Рентгенография", ka: "რენტგენოგრაფია", hy: "Ռենտգենագրություն" }, category: "diagnostics", departmentSlugs: ["orthopedics"], priceFrom: true, amount: 70 },
  { id: "price-program-family-checkup", name: { ru: "Семейный чек-ап", ka: "საოჯახო ჩექაპი", hy: "Ընտանեկան չեքափ" }, category: "program", departmentSlugs: ["therapy", "cardiology"], priceFrom: true, amount: 160 },
  { id: "price-program-womens-health", name: { ru: "Check-up женского здоровья", ka: "ქალის ჯანმრთელობის ჩექაპი", hy: "Կանանց առողջության չեքափ" }, category: "program", departmentSlugs: ["gynecology"], priceFrom: true, amount: 170 },
];

export function getPriceById(id: string): PriceItem | undefined {
  return prices.find((p) => p.id === id);
}
