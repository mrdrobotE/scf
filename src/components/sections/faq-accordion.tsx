"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

// Define the FAQ item type
interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FaqAccordion() {
  const [activeItem, setActiveItem] = useState<number | null>(1);

  // FAQ data - Updated for SCF AI Ethiopia
  const faqItems: FAQItem[] = [
    // Product & Technology
    {
      id: 1,
      question: "What is SCF AI and how does it work?",
      answer:
        "SCF AI (Smart Credit Financing AI) is an AI-powered platform that uses federated learning and explainable AI to provide privacy-preserving credit scoring, real-time risk intelligence, and automated supply chain financing. Our platform analyzes thousands of data points including transaction history, invoice patterns, logistics data, and behavioral signals to deliver instant, accurate credit decisions with full transparency.",
    },
    {
      id: 2,
      question: "What is federated learning and why is it important?",
      answer:
        "Federated learning is a machine learning approach that trains models across multiple institutions without sharing raw data. Each institution trains locally on their own data, and only encrypted model updates are shared and aggregated. This preserves data privacy while benefiting from collective intelligence, making it ideal for sensitive financial data in Ethiopia and globally.",
    },
    {
      id: 3,
      question: "How does explainable AI (XAI) work in SCF AI?",
      answer:
        "Our XAI framework uses techniques like SHAP (SHapley Additive exPlanations), LIME (Local Interpretable Model-agnostic Explanations), and counterfactual analysis to provide human-readable explanations for every credit decision. Users can see exactly which factors influenced a decision, how each factor contributed, and what changes would yield different outcomes.",
    },
    {
      id: 4,
      question: "Is my data secure with federated learning?",
      answer:
        "Absolutely. Federated learning ensures your data never leaves your infrastructure. Only encrypted model updates are shared. We combine this with differential privacy, secure multi-party computation, and homomorphic encryption to ensure complete data protection while still benefiting from collaborative model training.",
    },
    {
      id: 5,
      question: "What types of credit scoring models does SCF AI support?",
      answer:
        "SCF AI supports a wide range of credit scoring models including invoice financing, buyer-supplier credit matching, automated working capital loans, and embedded B2B financing. Our AI engine evaluates thousands of data points including transaction history, invoice patterns, logistics data, and behavioral signals.",
    },

    // Ethiopian Market Specific
    {
      id: 6,
      question: "How does SCF AI address the Ethiopian market's unique needs?",
      answer:
        "SCF AI is designed specifically for the Ethiopian market, considering local business practices, financial regulations, and the unique challenges of supply chain financing in Ethiopia. We support local banks, microfinance institutions, and businesses with tailored solutions that account for Ethiopian business culture and regulatory requirements.",
    },
    {
      id: 7,
      question: "Is SCF AI compliant with Ethiopian financial regulations?",
      answer:
        "Yes, SCF AI is fully compliant with Ethiopian financial regulations including the National Bank of Ethiopia (NBE) guidelines. We work closely with local regulatory bodies to ensure our platform meets all compliance requirements for credit scoring, data privacy, and financial services in Ethiopia.",
    },
    {
      id: 8,
      question: "Can SCF AI integrate with Ethiopian banks and financial institutions?",
      answer:
        "Absolutely. Our platform is designed to seamlessly integrate with Ethiopian banks, microfinance institutions, and other financial service providers. We support local banking APIs, mobile money platforms like Telebirr, and ERP systems commonly used in Ethiopia.",
    },
    {
      id: 9,
      question: "Does SCF AI support local Ethiopian businesses and SMEs?",
      answer:
        "Yes, SCF AI is built to support Ethiopian businesses of all sizes, from micro-enterprises to large corporations. We understand the unique challenges faced by Ethiopian SMEs and provide tailored credit scoring solutions that consider local business practices, informal sector activities, and the specific needs of the Ethiopian market.",
    },
    {
      id: 10,
      question: "How does SCF AI handle Ethiopian currency (ETB) and local pricing?",
      answer:
        "SCF AI fully supports Ethiopian Birr (ETB) for all transactions, pricing, and financial calculations. Our platform is designed to handle local currency requirements, inflation considerations, and the specific economic conditions of Ethiopia.",
    },

    // Implementation & Integration
    {
      id: 11,
      question: "How can I integrate SCF AI with my existing systems?",
      answer:
        "Our developer-first REST API makes integration seamless. We provide comprehensive documentation, SDKs for JavaScript, Python, Ruby, and PHP, and webhook support. You can easily plug into fintech apps, banks, ERPs, and other business systems. Our AI Credit Scoring API delivers instant credit decisions with full explainability.",
    },
    {
      id: 12,
      question: "Does SCF AI support offline or low-connectivity environments?",
      answer:
        "Yes, SCF AI is designed to work in environments with limited or intermittent internet connectivity common in parts of Ethiopia. We offer offline capabilities for data collection and sync capabilities that allow for batch processing when connectivity is restored.",
    },
    {
      id: 13,
      question: "What kind of training and support does SCF AI offer?",
      answer:
        "We provide comprehensive training and support including onboarding assistance, documentation, API guides, and dedicated customer support. For Ethiopian clients, we offer support in both English and Amharic, with localized documentation and training materials.",
    },
    {
      id: 14,
      question: "What is the minimum investment required to start with SCF AI?",
      answer:
        "SCF AI offers flexible pricing plans designed for businesses of all sizes. Our Starter plan begins at ETB 499/month for small businesses and startups, while larger enterprises can contact us for customized pricing. We also offer a free trial to help you evaluate our platform.",
    },

    // Security & Privacy
    {
      id: 15,
      question: "How does SCF AI protect customer data and privacy?",
      answer:
        "SCF AI takes data privacy and security seriously. We use end-to-end encryption, secure multi-party computation, differential privacy, and homomorphic encryption. Our federated learning approach ensures customer data never leaves your infrastructure, and we comply with all Ethiopian data protection regulations.",
    },
    {
      id: 16,
      question: "Who can access my data on the SCF AI platform?",
      answer:
        "Your data is strictly controlled and accessible only to authorized users within your organization. SCF AI never shares, sells, or uses your data for any purpose other than providing the services you've subscribed to. We are committed to maintaining the highest standards of data privacy and security.",
    },

    // Business & ROI
    {
      id: 17,
      question: "What is the ROI of using SCF AI for my business?",
      answer:
        "SCF AI delivers significant ROI by improving credit decision accuracy, reducing default rates, automating manual processes, and enabling faster lending decisions. Businesses typically see a 20-40% reduction in risk, 90% faster loan processing, and significant operational cost savings.",
    },
    {
      id: 18,
      question: "Can SCF AI help me access better financing terms?",
      answer:
        "Yes, SCF AI helps businesses access better financing by providing accurate credit scores and risk assessments that enable lenders to offer more competitive rates and terms. Our platform also helps suppliers get paid faster through invoice financing and early payment discounts.",
    },
    {
      id: 19,
      question: "How does SCF AI reduce credit default risk?",
      answer:
        "SCF AI reduces credit default risk through advanced predictive analytics, real-time risk monitoring, and explainable AI models that provide early warning signals. Our platform helps lenders make more informed decisions with 99.7% model accuracy, significantly reducing the risk of defaults.",
    },

    // Technical
    {
      id: 20,
      question: "What technical requirements does SCF AI have?",
      answer:
        "SCF AI is a cloud-based platform that requires internet access and standard web browsers. We offer both cloud and on-premise deployment options. Our REST API can be integrated with any modern programming language or system that supports HTTP requests.",
    },
  ];

  const toggleItem = (itemId: number) => {
    setActiveItem(activeItem === itemId ? null : itemId);
  };

  return (
    <section id="faq" className="py-14 md:py-28 dark:bg-[#171f2e]">
      <div className="wrapper">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="mb-3 font-bold text-center text-gray-800 text-3xl dark:text-white/90 md:text-title-lg">
            Frequently Asked Questions
          </h2>
          <p className="max-w-md mx-auto leading-6 text-gray-500 dark:text-gray-400">
            Answered all frequently asked questions about SCF AI in Ethiopia. Still confused? Feel free to contact us.
          </p>
        </div>
        <div className="max-w-[800px] mx-auto">
          <div className="space-y-4">
            {faqItems.map((item) => (
              <FAQItem
                key={item.id}
                item={item}
                isActive={activeItem === item.id}
                onToggle={() => toggleItem(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// FAQ Item Component
function FAQItem({
  item,
  isActive,
  onToggle,
}: {
  item: FAQItem;
  isActive: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="pb-5 border-b border-gray-200 dark:border-gray-800">
      <button
        type="button"
        className="flex items-center justify-between w-full text-left"
        onClick={onToggle}
        aria-expanded={isActive}
      >
        <span className="text-lg font-medium text-gray-800 dark:text-white/90">
          {item.question}
        </span>
        <span className="flex-shrink-0 ml-6">
          {isActive ? <Minus className="w-6 h-6 text-gray-400" /> : <Plus className="w-6 h-6 text-gray-400" />}
        </span>
      </button>
      {isActive && (
        <div className="mt-5">
          <p className="text-base leading-7 text-gray-500 dark:text-gray-400">
            {item.answer}
          </p>
        </div>
      )}
    </div>
  );
}