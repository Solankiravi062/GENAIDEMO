import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Is LinkShortener really free?",
    answer:
      "Yes! LinkShortener offers a free tier with generous limits. You can shorten unlimited links and track basic analytics without paying a dime.",
  },
  {
    question: "How long are shortened links valid?",
    answer:
      "Your shortened links never expire. They'll work forever unless you delete them. We maintain 99.9% uptime to ensure your links are always accessible.",
  },
  {
    question: "Can I customize my shortened URLs?",
    answer:
      "Absolutely! With our premium features, you can use custom domains and create branded short links that reflect your brand identity.",
  },
  {
    question: "How detailed is the analytics?",
    answer:
      "We provide comprehensive analytics including click counts, geographic data, device types, referrers, and more. All in real-time dashboards.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. We use enterprise-grade encryption and security protocols. Your data is always protected and we never share information with third parties.",
  },
  {
    question: "Can I use LinkShortener for business?",
    answer:
      "Of course! Many businesses and agencies use LinkShortener for marketing campaigns, email marketing, and social media. We offer business plans for teams.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-20 px-4 bg-muted/50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground">
            Find answers to common questions about LinkShortener.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
