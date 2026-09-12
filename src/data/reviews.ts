import type { Review } from "@/types";

/**
 * DEMO TESTIMONIALS. First names only, no identifying medical detail —
 * placeholders for the review-section layout until real, consented
 * patient testimonials are provided.
 */
export const reviews: Review[] = [
  {
    id: "review-1",
    authorName: "Нино",
    departmentSlug: "pediatrics",
    doctorId: "doc-pediatrics",
    text: {
      ru: "Понравилось, что врач подробно всё объяснила и не торопила. Ребёнок чувствовал себя спокойно.",
      ka: "მომეწონა, რომ ექიმმა დაწვრილებით ყველაფერი ახსნა და არ ჩქარობდა. ბავშვი მშვიდად გრძნობდა თავს.",
      hy: "Դուր եկավ, որ բժիշկը մանրամասն ամեն ինչ բացատրեց և չէր շտապեցնում։ Երեխան հանգիստ էր զգում իրեն։",
    },
    date: "2026-06-12",
  },
  {
    id: "review-2",
    authorName: "Давид",
    departmentSlug: "cardiology",
    doctorId: "doc-cardiology",
    text: {
      ru: "Записался через WhatsApp — быстро подтвердили время. На приёме врач всё подробно рассказала по результатам ЭКГ.",
      ka: "ჩავეწერე WhatsApp-ის საშუალებით — სწრაფად დამიდასტურეს დრო. მიღებაზე ექიმმა დაწვრილებით მიამბო ეკგ-ს შედეგებზე.",
      hy: "Գրանցվեցի WhatsApp-ով — արագ հաստատեցին ժամը։ Ընդունելության ժամանակ բժիշկը մանրամասն պատմեց ԷՍԳ-ի արդյունքների մասին։",
    },
    date: "2026-05-30",
  },
  {
    id: "review-3",
    authorName: "Ани",
    departmentSlug: "gynecology",
    doctorId: "doc-gynecology",
    text: {
      ru: "Приятная и спокойная атмосфера, врач внимательно выслушала все вопросы.",
      ka: "სასიამოვნო და მშვიდი ატმოსფერო, ექიმმა ყურადღებით მოისმინა ყველა კითხვა.",
      hy: "Հաճելի և հանգիստ մթնոլորտ, բժիշկը ուշադիր լսեց բոլոր հարցերը։",
    },
    date: "2026-04-18",
  },
  {
    id: "review-4",
    authorName: "Георгий",
    departmentSlug: null,
    doctorId: null,
    text: {
      ru: "Удобно, что можно записаться прямо через WhatsApp без лишних звонков.",
      ka: "მოსახერხებელია, რომ შეგიძლიათ ჩაეწეროთ პირდაპირ WhatsApp-ის საშუალებით ზედმეტი ზარების გარეშე.",
      hy: "Հարմար է, որ կարելի է գրանցվել ուղղակի WhatsApp-ով՝ առանց ավելորդ զանգերի։",
    },
    date: "2026-03-22",
  },
];
