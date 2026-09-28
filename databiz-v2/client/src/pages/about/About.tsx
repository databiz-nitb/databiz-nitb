import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Compass, Lightbulb, Sparkles, Users, Wrench } from 'lucide-react';
import aboutHeroImage from '../../assets/images/2.png';
import missionImage from '../../assets/images/3.png';
import learningImage from '../../assets/images/4.png';
import communityImage from '../../assets/images/5.png';
import industryImage from '../../assets/images/6.png';
import innovationImage from '../../assets/images/7.png';
import SEO from "../../components/SEO/SEO";

const focusAreas = [
    {
        title: 'Learn with direction',
        description: 'Follow learning pathways that make data science, machine learning, and AI easier to explore.',
        link: '/pathways',
        linkText: 'Explore pathways',
        icon: BookOpen,
        tone: 'text-sky-200',
    },
    {
        title: 'Practice together',
        description: 'Meet peers through workshops, talks, and events built around hands-on learning.',
        link: '/events',
        linkText: 'See events',
        icon: Wrench,
        tone: 'text-emerald-200',
    },
    {
        title: 'Share what you discover',
        description: 'Explore ideas and perspectives from the DataBiz community through articles and stories.',
        link: '/blogs',
        linkText: 'Read the blog',
        icon: Lightbulb,
        tone: 'text-amber-200',
    },
];

const coreValues = [
    {
        title: 'Learn by doing',
        description: 'Use sessions and projects to apply concepts to real-world scenarios.',
        icon: Wrench,
        tone: 'text-sky-200',
    },
    {
        title: 'Community first',
        description: 'Build confidence through collaboration and peer learning.',
        icon: Users,
        tone: 'text-emerald-200',
    },
    {
        title: 'Think across disciplines',
        description: 'Connect data with economics, healthcare, the environment, and more.',
        icon: Compass,
        tone: 'text-amber-200',
    },
    {
        title: 'Create responsible impact',
        description: 'Use data to encourage meaningful, socially responsible innovation.',
        icon: Sparkles,
        tone: 'text-rose-200',
    },
];

const approach = [
    { label: 'Learning by doing', image: learningImage },
    { label: 'Community driven', image: communityImage },
    { label: 'Industry ready', image: industryImage },
    { label: 'Innovation first', image: innovationImage },
];

const About = () => {
    return (
        <>
            <SEO
                title="About DataBiz - Data Science & Analytics Club | NIT Bhopal"
                description="DataBiz is the official Data Science and Analytics Club of NIT Bhopal. Student-led community for Data Science, ML, AI, hackathons and workshops."
                path="/about"
                keywords="DataBiz about, NIT Bhopal data science club, analytics club, ML AI community"
            />
            <div className="min-h-screen bg-[#080c11] text-white">
                <header className="relative isolate flex min-h-[590px] items-end overflow-hidden bg-[#080c11] pb-14 pt-36 sm:min-h-[640px] sm:pb-16 md:pt-40">
                    <img src={aboutHeroImage} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover object-center" fetchPriority="high" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#080c11]/95 via-[#080c11]/75 to-[#080c11]/25" aria-hidden="true" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080c11]/75 via-transparent to-[#080c11]/15" aria-hidden="true" />
                    <div className="container relative z-10 mx-auto px-4 md:px-12">
                        <div className="max-w-6xl">
                            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-sky-200">Student-led · NIT Bhopal</p>
                            <h1 className="text-5xl font-semibold leading-none text-white sm:text-6xl md:text-7xl">DataBiz</h1>
                            <p className="mt-5 max-w-2xl text-lg leading-7 text-slate-200 sm:text-xl">
                                The Data Science and Analytics Club of NIT Bhopal.
                            </p>
                            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                                Learn data science by building practical skills, sharing ideas, and tackling real-world problems with the NIT Bhopal community.
                            </p>
                            <div className="mt-7 flex flex-wrap gap-3">
                                <Link to="/pathways" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-sky-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300">
                                    Explore pathways <ArrowRight size={16} aria-hidden="true" />
                                </Link>
                                <Link to="/team" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/25 bg-black/20 px-5 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300">
                                    Meet the team <ArrowRight size={16} aria-hidden="true" />
                                </Link>
                            </div>
                            <ul aria-label="DataBiz activities" className="mt-8 grid max-w-3xl grid-cols-1 gap-3 border-t border-white/20 pt-5 text-sm text-slate-200 sm:grid-cols-3 sm:gap-5">
                                {['Learning pathways', 'Workshops & hackathons', 'Student projects'].map((item, index) => (
                                    <li key={item} className="flex items-center gap-3">
                                        <span className="text-xs font-semibold tabular-nums text-sky-200">0{index + 1}</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </header>

                <div>
                    <section className="container mx-auto px-4 py-16 md:px-12 md:py-20" aria-labelledby="who-we-are">
                        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.7fr_1.3fr] md:gap-16">
                            <div>
                                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-sky-300">Who we are</p>
                                <h2 id="who-we-are" className="max-w-sm text-3xl font-semibold leading-tight text-white sm:text-4xl">A place to explore what data can do.</h2>
                            </div>
                            <p className="text-base leading-7 text-slate-300 sm:text-lg">
                                DataBiz is the official Data Science and Analytics Club of NIT Bhopal. Built by students passionate about transforming raw data into real insights, we bring learners together to explore Data Science, Machine Learning, and Artificial Intelligence—from fundamentals to advanced applications.
                            </p>
                        </div>
                    </section>

                    <section id="what-we-do" className="border-y border-white/10 bg-[#0d141c] py-16 md:py-20" aria-labelledby="what-we-do-heading">
                        <div className="container mx-auto px-4 md:px-12">
                            <div className="mx-auto max-w-6xl">
                                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-sky-300">Find your next step</p>
                                <h2 id="what-we-do-heading" className="mb-8 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">Turn curiosity into practice.</h2>
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                                    {focusAreas.map(({ title, description, link, linkText, icon: Icon, tone }) => (
                                        <article key={title} className="flex min-h-64 flex-col rounded-lg border border-white/10 bg-[#101820] p-5 transition-colors hover:border-white/20 sm:p-6">
                                            <Icon size={22} className={tone} aria-hidden="true" />
                                            <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
                                            <p className="mt-2 flex-1 text-sm leading-6 text-slate-400">{description}</p>
                                            <Link to={link} className="mt-5 inline-flex min-h-10 items-center gap-2 self-start text-sm font-semibold text-sky-200 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300">
                                                {linkText} <ArrowRight size={15} aria-hidden="true" />
                                            </Link>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="container mx-auto px-4 py-16 md:px-12 md:py-20" aria-labelledby="mission-heading">
                        <div className="mx-auto grid max-w-6xl gap-8 border-b border-white/10 pb-16 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:pb-20">
                            <div>
                                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-200">Our mission</p>
                                <h2 id="mission-heading" className="max-w-sm text-3xl font-semibold leading-tight text-white sm:text-4xl">Make data useful, understandable, and human.</h2>
                            </div>
                            <div>
                                <p className="text-base leading-7 text-slate-300 sm:text-lg">
                                    We empower students with data-driven thinking so they can solve real-world problems using modern analytical tools and technologies. Data is more than numbers—it can tell stories, reveal patterns, and help people make better decisions.
                                </p>
                                <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg">
                                    Our goal is to help every member become a confident storyteller through data, and to use that knowledge with care and purpose.
                                </p>
                                <img src={missionImage} alt="Students exploring data together in a campus workshop" className="mt-8 aspect-[16/9] w-full rounded-xl border border-white/10 object-cover" />
                            </div>
                        </div>
                    </section>

                    <section className="container mx-auto px-4 pb-16 md:px-12 md:pb-20" aria-labelledby="values-heading">
                        <div className="mx-auto max-w-6xl">
                            <div className="mb-8 max-w-2xl">
                                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-amber-200">What guides us</p>
                                <h2 id="values-heading" className="text-3xl font-semibold text-white sm:text-4xl">Core values</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                                {coreValues.map(({ title, description, icon: Icon, tone }, index) => (
                                    <article key={title} className="flex gap-4 border-t border-white/10 py-5 sm:py-6">
                                        <span className="mt-0.5 text-xs font-semibold tabular-nums text-slate-500">0{index + 1}</span>
                                        <Icon size={19} className={`mt-0.5 shrink-0 ${tone}`} aria-hidden="true" />
                                        <div>
                                            <h3 className="font-semibold text-white">{title}</h3>
                                            <p className="mt-1 text-sm leading-6 text-slate-400">{description}</p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="border-t border-white/10 bg-[#0d141c] py-16 md:py-20" aria-labelledby="approach-heading">
                        <div className="container mx-auto px-4 md:px-12">
                            <div className="mx-auto max-w-6xl">
                                <div className="mb-8 max-w-2xl">
                                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-sky-300">How we work</p>
                                    <h2 id="approach-heading" className="text-3xl font-semibold text-white sm:text-4xl">Our approach</h2>
                                </div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                    {approach.map(({ label, image }, index) => (
                                        <article key={label} className="overflow-hidden rounded-lg border border-white/10 bg-[#101820]">
                                            <div className="aspect-[4/3] overflow-hidden">
                                                <img src={image} alt="" aria-hidden="true" className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]" />
                                            </div>
                                            <div className="flex items-center gap-3 px-4 py-4">
                                                <span className="text-xs font-semibold tabular-nums text-slate-500">0{index + 1}</span>
                                                <h3 className="text-sm font-semibold text-white sm:text-base">{label}</h3>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="container mx-auto px-4 py-14 md:px-12 md:py-16">
                        <div className="mx-auto flex max-w-6xl flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-lg font-semibold text-white">Curious about what’s next?</p>
                                <p className="mt-1 text-sm text-slate-400">Join a workshop, meet the community, and keep learning.</p>
                            </div>
                            <Link to="/events" className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-lg bg-sky-300 px-5 text-sm font-semibold text-slate-950 transition hover:bg-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 sm:self-auto">
                                Browse events <ArrowRight size={16} aria-hidden="true" />
                            </Link>
                        </div>
                    </section>
                </div>
                    </div>
        </>
    );
};

export default About;
