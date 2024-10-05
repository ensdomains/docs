import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { Article, WithContext } from 'schema-dts';

import { Prose } from '@/components/mdx/Prose';
import { SectionProvider } from '@/components/SectionProvider';
import { MdxPageProps } from '@/lib/mdxPageProps';
import { Breadcrumbs } from '#/content/prose/breadcrumbs/Breadcrumbs';

import { PageDetails } from './details/PageDetails';
import { ProposalData } from './details/variations/SnapshotDetails';
import { Footer } from './footer/PageFooter';
import { Header } from './header/Header';
import { RouteCheck } from './RouteCheck';
import { Sidebar } from './sidebar/Sidebar';

export const Layout: FC<{
    children: ReactNode;
    mdxProperties: MdxPageProps;
    snapshotData?: ProposalData;
    isHome?: boolean;
    programmedSlug?: string;
}> = ({
    children,
    mdxProperties,
    snapshotData,
    isHome = false,
    programmedSlug = '/',
}) => {
    const schema: WithContext<Article> = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: mdxProperties.meta.title,
        description: mdxProperties.meta.description,
        image: 'https://docs.ens.domains/opengraph' + programmedSlug + '.png',
        author: mdxProperties.meta.contributors?.map((author) => ({
            '@type': 'Person',
            name: author,
            url: 'https://github.com/' + author,
        })),
    };

    return (
        <SectionProvider sections={mdxProperties.sections}>
            <div className="h-full" id="app">
                <RouteCheck slug={programmedSlug} />
                <Header />
                <Sidebar />
                <div className="relative mt-16 lg:mt-16">
                    {isHome ? (
                        <>
                            <main className="relative min-h-[74vh] space-y-4 pb-4">
                                <div className="prose mt-4 w-full space-y-6">
                                    {children}
                                </div>
                            </main>
                            <div className="prose px-4 sm:px-6">
                                <div className="notprose w-full">
                                    <Footer mdxProperties={mdxProperties} />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="lg:ml-72 xl:ml-80">
                            {mdxProperties?.sections?.length > 1 && (
                                <div
                                    className="fixed z-10 ml-4 hidden 2xl:block"
                                    style={{ left: 'calc(50vw + 26rem)' }}
                                >
                                    <div className="m-4 p-4">
                                        <div className="text-sm text-ens-light-text-secondary dark:text-ens-dark-text-secondary">
                                            On this page
                                        </div>
                                        <ul className="text-sm">
                                            {mdxProperties?.sections?.map(
                                                ({
                                                    id,
                                                    navtitle,
                                                    title,
                                                    indent,
                                                }) => (
                                                    <li>
                                                        <Link
                                                            href={'#' + id}
                                                            style={{
                                                                paddingLeft:
                                                                    indent +
                                                                    'rem',
                                                            }}
                                                            className="hover:text-ens-light-blue-primary dark:hover:text-ens-dark-blue-primary"
                                                        >
                                                            {navtitle || title}
                                                        </Link>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            )}
                            <div className="px-6 lg:px-8">
                                <main className="relative my-4 space-y-4 py-4">
                                    <div className="prose x text-ens-light-text-secondary dark:text-ens-dark-text-secondary">
                                        <Breadcrumbs />
                                    </div>

                                    <script
                                        type="application/ld+json"
                                        dangerouslySetInnerHTML={{
                                            __html: JSON.stringify(schema),
                                        }}
                                    />

                                    <Prose>{children}</Prose>

                                    <div className="prose pt-8">
                                        <PageDetails
                                            mdxProperties={mdxProperties}
                                            snapshotData={snapshotData}
                                        />
                                    </div>
                                </main>
                                <div className="prose">
                                    <div className="notprose w-full">
                                        <Footer mdxProperties={mdxProperties} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </SectionProvider>
    );
};
