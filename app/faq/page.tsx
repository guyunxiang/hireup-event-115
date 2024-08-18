"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// interface for faq item
interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

// mock data
const faqs: FAQItem[] = [
  { id: 1, question: 'What is Next.js?', answer: 'Next.js is a React framework for building web applications.' },
  { id: 2, question: 'How does Tailwind CSS work?', answer: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom designs.' },
  { id: 3, question: 'What is the purpose of getStaticProps?', answer: 'getStaticProps is used to fetch data at build time in Next.js.' },
  { id: 4, question: 'What is server-side rendering in Next.js?', answer: 'Server-side rendering (SSR) in Next.js is a technique where the initial content is generated on the server, which can improve performance and SEO.' },
  { id: 5, question: 'How do you create dynamic routes in Next.js?', answer: 'In Next.js, you can create dynamic routes by adding brackets to a page name, like [id].js. This allows you to handle variable paths.' },
  { id: 6, question: 'What are the benefits of using Typescript with React?', answer: 'TypeScript adds static typing to JavaScript, which can help catch errors early, improve code quality, and enhance developer productivity in React projects.' },
  { id: 7, question: 'How does Next.js handle API routes?', answer: 'Next.js allows you to create API routes by adding files inside the pages/api directory. These can be used to create serverless functions.' },
  { id: 8, question: 'What is the purpose of the _app.js file in Next.js?', answer: 'The _app.js file in Next.js is used to initialize pages. It can be used to add global styles, layout components, or manage state that persists between page changes.' }
];

// FAQList component
const FAQList: React.FC<{
  faqList: FAQItem[],
  expandedIds: number[],
  handleExpand: (id: number) => void
}> = ({ faqList, expandedIds, handleExpand }) => {

  // if no faqs found
  if (!faqList.length) {
    return <p className='py-4 px-6 text-slate-500'>No results found</p>;
  }

  // render faq list
  return faqList.map((item) => {
    const isExpand = expandedIds.includes(item.id);
    return (
      <div key={item.id} className="border-b border-gray-200">
        <button
          className="flex justify-between items-center w-full py-4 px-6 text-left"
          onClick={() => handleExpand(item.id)}
        >
          <span className="font-medium">{item.question}</span>
          <span className={`transform duration-300 transition-transform ${isExpand ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpand ? 'max-h-96' : 'max-h-0'}`}>
          <p className='pb-4 px-6 text-slate-500'>{item.answer}</p>
        </div>
      </div>
    )
  });
};

// FaqPage component
const FAQPage: React.FC = () => {

  const router = useRouter();

  const searchParams = useSearchParams();
  const searchValue = searchParams.get('search');

  // state for faq list
  const [faqList, setFaqList] = useState(faqs);
  // state for expanded ids
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  // state for searc
  const [search, setSearch] = useState(searchValue || '');

  useEffect(() => {
    // fetch faqs
    const fetchFaqs = () => {
      // if search is not empty, filter faqs
      if (searchValue) {
        // filter faqs
        const faqList = faqs.filter((item) => {
          return (
            // search for question and answer
            item.question.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchValue.toLowerCase())
          )
        });
        // set faq list
        setFaqList(faqList);
      } else {
        // if search is empty, set faqs from local data
        setFaqList(faqs);
      }
    }
    fetchFaqs();
  }, [searchValue]);

  // handle expand or collapse
  const handleExpand = (id: number) => {
    // if index is already expanded, collapse it
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((i) => i !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  }

  // handle expand all or collapse all
  const handleExpandAll = () => {
    // if all faqs are expanded, collapse all
    if (expandedIds.length === faqs.length) {
      setExpandedIds([]);
    } else {
      setExpandedIds(faqs.map(({ id }) => id));
    }
  }

  // handle search
  const handleSearch = () => {
    // if search is empty and searchValue is empty, no need to redirect
    if (!search && !searchValue) return;
    // if search is not empty, redirect to /faq?search={search}
    if (search) {
      router.push(`/faq?search=${search}`);
    } else {
      // if search is empty, redirect to /faq
      router.push('/faq');
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">
          HireUp - Web Developer Position
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 justify-between max-w-3xl mx-auto">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-2 rounded-l-md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <button className="bg-blue-500 text-white px-3 py-2 rounded-r-md" onClick={handleSearch}>
              Search
            </button>
          </div>
          <button
            className="bg-blue-500 text-white px-3 py-2 rounded"
            onClick={handleExpandAll}
          >
            {expandedIds.length === faqs.length ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
        <hr className="my-3" />
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md">
          <FAQList
            faqList={faqList}
            expandedIds={expandedIds}
            handleExpand={handleExpand}
          />
        </div>
      </main>
    </div>
  );
}

export default FAQPage;
